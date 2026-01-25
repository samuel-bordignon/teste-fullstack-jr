# RESPOSTAS

## 1. O que você fez?
---

Durante o desenvolvimento do projeto, organizei as implementações e correções em branches separadas, seguindo uma abordagem incremental e focada em responsabilidade única por branch. Isso facilitou o versionamento, a revisão de código e a rastreabilidade dos commits.

Branches criadas:
  - `main`, Versão mais estável, estado funcional testado e revisado
  - `feat-01`, Correção de listagem de produtos e reimplementação dos módulos `estoque` e `estoque_movimentacoes` (BackEnd)
  - `feat-02`, Reimplementação dos módulos `estoque` e `estoque_movimentacoes` (FrontEnd)
  - `feat-03`, Implementação dos módulos de `ordenação`, `pesquisa` e `filtragem avançada`

### 1.1 Correções Realizadas — Branch `feat-01`
    
O bug na lisatgem de produtos citado na [Parte 1 do desafio]() estava sendo causado pelo retorno fixo um erro ao invés da busca os dados do banco. ([`e1e887c`](https://github.com/samuel-bordignon/teste-fullstack-jr/commit/e1e887c99dd9c9cb0bc2317e75fe60659cd693d6))

> linha do código em questão
```javascript
return NextResponse.json({ error: 'erro desconhecido' }, { status: 500 });
```
**Solução implementada**:
  - Removido o return problemático
  - Implementada o service, serielized e a validação com try/cath
  
#### 1.2. Reimplementação dos módulos `estoque` e `estoque_movimentacoes` (BackEnd) — Branch `feat-01`

Nesta branch, implementei no backend os módulos de **Estoque** e **Movimentações de Estoque**, criando o schema, repositórios, serviços e rotas da API (sem mudanças de front-end nesta etapa).

**Arquivos alterados e adicionados**
```text
app/
  └── api/
      ├── estoque/
      │   └── route.ts                             (novo)
      └── movimentacoes/
          └── route.ts                             (novo)
prisma/
  └── schema.prisma                                (editado)
repositories/
  ├── estoque.repository.ts                        (novo)
  └── movimentacoes.repository.ts                  (novo)
services/
  ├── estoque.service.ts                           (novo)
  └── movimentacoes.service.ts                     (novo)
```

**Schema do banco (Prisma)**
  - Criei os models `estoque` e `estoque_movimentacoes`.
  - Adicionei o enum `tipo_movimentacao` com valores `entrada` e `saida`.
  - Configurei os relacionamentos com `produtos` e `ON DELETE CASCADE` para evitar registros órfãos.
  - Gerei o Prisma Client após a alteração do schema.

**Repository layer**
  - `repositories/estoque.repository.ts`
    - `findAllEstoque()`: lista o estoque com joins para produtos.
    - `updateEstoqueQuantidade()`: atualiza a quantidade em estoque.
  - `repositories/movimentacoes.repository.ts`
    - `findAllMovimentacoes()`: lista o histórico.
    - `createMovimentacao()`: registra uma movimentação.

**Service layer (regras de negócio)**
  - `services/estoque.service.ts`
    - `getAllEstoque()`
    - `updateEstoque(...)`
  - `services/movimentacoes.service.ts`
    - `getAllMovimentacoes()`
    - `createMovimentacoes(...)`: regra de entrada/saída:
      - valida se o produto existe;
      - busca/cria estoque do produto;
      - bloqueia `saida` quando não há quantidade suficiente;
      - calcula novo saldo (entrada soma, saída subtrai);
      - cria a movimentação e persiste o novo saldo.

**Rotas da API (Next.js Route Handlers)**
  - `app/api/estoque/route.ts`
    - `GET`: lista estado atual do estoque.
  - `app/api/estoque/[id]route.ts`
    - `GET`: atualiza a quantidade em estoque.
  - `app/api/movimentacoes/route.ts`
    - `GET`: lista movimentações.
    - `POST`: cria movimentação com validações.

**Validações implementadas**
  - Produto deve existir para registrar movimentação.
  - `saida` é bloqueada se a quantidade disponível for insuficiente.
  - Quantidade deve ser maior que zero.
  - Tipo deve ser `entrada` ou `saida`.


#### 1.3. Reimplementação das abas `estoque` e `movimentacoes` (FrontEnd) — Branch `feat-02`

Nesta branch, reestruturei a UI para consumir os módulos de **Estoque** e **Movimentações** entregues no backend, adicionando telas, colunas de tabela, hooks e o fluxo de criação de movimentação.

**Arquivos alterados e adicionados**
```text
app/
  └── page.tsx                                    (editado)
components/
  ├── estoque/
  │   └── estoque-columns.tsx                     (novo)
  ├── movimentacoes/
  │   ├── movimentacoes-add-modal.tsx             (novo)
  │   └── movimentacoes-columns.tsx               (novo)
  └── views/
      ├── estoque-view.tsx                        (novo)
      └── movimentacoes-view.tsx                  (novo)
hooks/
  ├── use-estoque.ts                              (novo)
  └── use-movimentacoes.ts                        (novo)

# ajustes de suporte para a UI
repositories/
  └── produtos.repository.ts                      (editado)
app/
  └── api/
      └── movimentacoes/route.ts                  (editado)
```

**UI / Navegação**
  - Em `app/page.tsx`, adicionei 2 novas abas no layout: **Estado do estoque** e **Histórico de movimentações**.
  - Em `components/views/estoque-view.tsx` e `components/views/movimentacoes-view.tsx`, padronizei a tela usando o `DataTable`, com busca local (normalização de string) e disparo de modal de filtros.

**Tabelas (colunas e formatação)**
  - `components/estoque/estoque-columns.tsx`: colunas do estoque (dados da tabela + produto.nome e produto.estoque_minimo) para melhorar a usabilidade.
  - `components/movimentacoes/movimentacoes-columns.tsx`: colunas do histórico (dados da tabela + produto.nome) também para melhorar a usabilidade.

**Integração com a API (React Query + Zod)**
  - `hooks/use-estoque.ts`: `useQuery` para `GET /api/estoque`, mas sem um hook de edição pois n foi requisitado.
  - `hooks/use-movimentacoes.ts`: `useQuery` para `GET /api/movimentacoes` e `useMutation` para `POST /api/movimentacoes`.

**Criação de movimentações (modal)**
  - `components/movimentacoes/movimentacoes-add-modal.tsx`: modal com `DynamicForm` e validação com Zod.
  - O campo de produto carrega opções via `useProdutos()` e exibe também a quantidade em estoque, melhorando a usabilidade.
  - Feedback visual de sucesso/erro via `sonner` (toast).

**Ajustes no backend para suportar o FrontEnd**
  - `repositories/produtos.repository.ts`: passei a incluir `estoque`  no `findMany()` para a UI conseguir exibir estoque e nas ações do modal de criação de movimentções.
  - `app/api/movimentacoes/route.ts`: padronizei a resposta de erro:
    - retorna `400` com a mensagem "Quantidade insuficiente em estoque" quando aplicável;
    - retorna `500` com mensagem genérica para erros internos.

### 1.4 Implementação dos módulos de `ordenação`, `pesquisa` e `filtragem avançada` — Branch `feat-03`

Nesta branch, implementei uma camada completa de **busca**, **ordenação** e **filtros avançados** (range e campos combináveis) para todas as abas do sistema (Categorias, Produtos, Estoque e Movimentações), mantendo componentes reutilizáveis e padronizando a comunicação via query string.

**Arquivos alterados e adicionados (principais)**
```text
components/
  ├── custom/
  │   ├── data-table.tsx                           (editado)
  │   ├── dynamic-form.tsx                         (editado)
  │   ├── form-fields.tsx                          (editado)
  │   ├── filter-trigger.tsx                       (novo)
  │   └── sortable-header.tsx                      (novo)
  ├── categorias/
  │   ├── categoria-columns.tsx                    (editado)
  │   └── categoria-filter-modal.tsx               (novo)
  ├── produtos/
  │   ├── produto-columns.tsx                      (editado)
  │   └── produto-filter-modal.tsx                 (novo)
  ├── estoque/
  │   ├── estoque-columns.tsx                      (editado)
  │   └── estoque-filter-modal.tsx                 (novo)
  ├── movimentacoes/
  │   ├── movimentacoes-columns.tsx                (editado)
  │   ├── movimentacoes-add-modal.tsx              (editado)
  │   └── movimentacoes-filter-modal.tsx           (novo)
  └── views/
      ├── categorias-view.tsx                      (editado)
      ├── produtos-view.tsx                        (editado)
      ├── estoque-view.tsx                         (editado)
      └── movimentacoes-view.tsx                   (editado)
hooks/
  ├── use-categorias.ts                            (editado)
  ├── use-produtos.ts                              (editado)
  ├── use-estoque.ts                               (editado)
  └── use-movimentacoes.ts                         (editado)
lib/
  ├── query-params.ts                              (novo)
  └── string-utils.ts                              (novo)

# backend: filtros via query string
app/api/
  ├── categorias/route.ts                          (editado)
  ├── produtos/route.ts                            (editado)
  ├── estoque/route.ts                             (editado)
  └── movimentacoes/route.ts                       (editado)
repositories/
  ├── categorias.repository.ts                     (editado)
  ├── produtos.repository.ts                       (editado)
  ├── estoque.repository.ts                        (editado)
  └── movimentacoes.repository.ts                  (editado)
services/
  ├── categorias.service.ts                        (editado)
  ├── produtos.service.ts                          (editado)
  ├── estoque.service.ts                           (editado)
  └── movimentacoes.service.ts                     (editado)
```

**Pesquisa (search) nas tabelas**
  - Padronizei a busca local em todas as abas com `normalizeString(...)` (remove acentos e aplica lowercase), melhorando a UX.
  - As views passaram a filtrar o `data` antes de renderizar no `DataTable` (por nome/ID/SKU, conforme o domínio).

**Ordenação (sorting) nas tabelas**
  - Atualizei o `DataTable` para habilitar sorting do `@tanstack/react-table` (`SortingState` + `getSortedRowModel`).
  - Criei o `SortableHeader` para padronizar o cabeçalho clicável e exibir o estado (asc/desc) de forma consistente.
  - Ajustei as colunas (`*-columns.tsx`) para usar `SortableHeader` e, quando necessário, `sortingFn` com `localeCompare`.

**Filtros avançados (UI)**
  - Criei um padrão de filtros por aba usando:
    - `FilterTrigger` (abrir modal + limpar filtros);
    - modais específicos por domínio (`*-filter-modal.tsx`).
  - Evoluí o `DynamicForm` para suportar o componente `inputRanger` (range “De/Até”) para número e data.

**Padronização do envio de filtros (query string)**
  - Adicionei `lib/query-params.ts` para montar `URLSearchParams` por domínio (produtos/estoque/movimentações/categorias).
  - Atualizei os hooks (`use-*.ts`) para aceitar `filters` tipados (Zod) e enviar os parâmetros via query string.

**Backend: suporte a filtros nos endpoints**
  - Atualizei as rotas `GET` dos endpoints para ler `searchParams` e montar um payload de filtros.
  - Atualizei repositories/services para aceitar filtros e construir `where` do Prisma com:
    - ranges de data (`gte/lte`) para `criado_em`/`atualizado_em`;
    - ranges numéricos (`gte/lte`) para `quantidade`;
    - filtros por categoria, marca, tipo e produto.

---

## 2. O que poderia ser diferente? (Opcional)

- Alguns filtros poderiam ser abstraídos ainda mais em uma camada compartilhada entre frontend e backend, reduzindo duplicação de lógica (ex: definição de ranges e operadores que são atualmente definidos no frontend e backend).
- A construção dos payloads de filtros poderia utilizar um padrão mais declarativo ou um builder, facilitando a manutenção conforme o número de filtros cresce.
- A relação entre produtos com categoria e produtos com estoque poderia ser mais restrita adicionando NOT NULL em produto_id (estoque) e categoria_id(produto), visando redução de erros em populações manuais do banco e de tipagem.
- O serialized que é feito para cada rota do tipo "getAll" poderia se tornar uma função externa para tornar a manutenção e leitura do código mais dinâmica, além de dar mais margem para expansão de regras de negócio mais complexas.
- Possível falha em casos de erro em createProduto, esse método em use-produtos.ts tenta extrair "message" de "errorData", mas aparentemente nenhum endPoint retorna nesse formado. A sugestão seria criar handlerError ou um ErrorType conhecido entre a api, hooks e services.

**Possível ganho:**  
Menor acoplamento entre camadas, maior reaproveitamento de código e redução de erros em futuras expansões.

---

## 3. Sugestões de próximos passos (Opcional)

- Implementar paginação e cache nos endpoints mais utilizados
- Armazenar os filtros na url do front para melhor controle
- Adicionar filtros mais cirúrgicos para uma consulta aindaa mais refinada como "produtos em estoque crítico" na aba "Estado de estoque" e "produtos mais (e menos) movimentados" em "histórico de movimentações"
- indicar visualmente quando um produto está com um estoque abaixo do mínimo
- expandir as possibilidade de filtros via select com mult-selects (ex: podendo filtrar mais de uma categoria ao mesmo tempo)
- construir um login autenticado para registrar as movimentações á usuários do estoque (dependendo do modelo de negócio)
- Criar testes automatizados para:
  - Serviços de filtro
  - Construção de queries Prisma
- Centralizar configurações de filtros em um módulo compartilhado
- Melhorar feedback visual no frontend (loading, empty states, erros de filtro)

---

