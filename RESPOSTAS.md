# RESPOSTAS

## 1. O que você fez?

Durante o desenvolvimento do projeto, organizei as implementações e correções em branches separadas, seguindo uma abordagem incremental e focada em responsabilidade única por branch. Isso facilitou o versionamento, a revisão de código e a rastreabilidade dos commits.

### Branch `main`
A branch `main` foi mantida como a versão estável do projeto.  
Ela representa o estado funcional consolidado, recebendo apenas merges de branches já testadas e revisadas.

---

### Branch `feat-01` — Estrutura inicial e ajustes base
Nesta branch, foquei em:

- Ajustes iniciais de estrutura do projeto
- Correções de inconsistências existentes no código base
- Organização de componentes e arquivos para melhorar legibilidade e manutenção
- Padronização de nomes e pequenos refactors para alinhar o código às boas práticas do ecossistema React / Next.js

**Processo:**  
Analisei o projeto como um todo, identifiquei pontos de acoplamento excessivo e inconsistências de nomenclatura, e apliquei correções pontuais para criar uma base mais sólida para as próximas features.

---

### Branch `feat-02` — Filtros dinâmicos e suporte a ranges
Nesta branch, implementei melhorias relacionadas a filtros e formulários dinâmicos:

- Criação de um `DynamicForm` genérico baseado em `react-hook-form` e `zod`
- Implementação de campos de range (`inputRanger`) para filtros como:
  - Período (data inicial e final)
  - Intervalo numérico (mínimo e máximo)
- Tipagem mais robusta para payloads de filtros
- Padronização do envio de parâmetros via query string para as rotas da API

**Processo:**  
Parti da necessidade de reutilização dos filtros em diferentes domínios (produtos, estoque, movimentações).  
Desenhei a solução pensando em extensibilidade, permitindo que novos filtros fossem adicionados apenas via configuração, sem necessidade de alterar o formulário em si.

---

### Branch `feat-03` — Ordenação, UX e melhorias na API
Nesta branch, foquei em melhorar a experiência do usuário e a flexibilidade da API:

- Adição de ordenação nas tabelas utilizando `@tanstack/react-table`
- Criação de headers clicáveis (`SortableHeader`) com ordenação customizada
- Suporte a filtros avançados via parâmetros de query nas rotas:
  - categorias
  - produtos
  - estoque
  - movimentações
- Construção dinâmica do `where` no Prisma com base nos filtros recebidos
- Criação de modais de filtro reutilizáveis

**Processo:**  
Analisei como os dados eram consumidos no frontend e como a API poderia ser mais flexível.  
A solução buscou equilibrar clareza, performance e manutenibilidade, evitando queries rígidas e permitindo combinações de filtros sem duplicação de código.

---

## 2. O que poderia ser diferente? (Opcional)

- Alguns filtros poderiam ser abstraídos ainda mais em uma camada compartilhada entre frontend e backend, reduzindo duplicação de lógica (ex: definição de ranges e operadores).
- A construção dos payloads de filtros poderia utilizar um padrão mais declarativo ou um builder, facilitando a manutenção conforme o número de filtros cresce.

**Possível ganho:**  
Menor acoplamento entre camadas, maior reaproveitamento de código e redução de erros em futuras expansões.

---

## 3. Sugestões de próximos passos (Opcional)

- Implementar paginação e cache nos endpoints mais utilizados
- Criar testes automatizados para:
  - Serviços de filtro
  - Construção de queries Prisma
- Centralizar configurações de filtros em um módulo compartilhado
- Melhorar feedback visual no frontend (loading, empty states, erros de filtro)
- Avaliar a adoção de debounce nos filtros para melhorar performance

---

