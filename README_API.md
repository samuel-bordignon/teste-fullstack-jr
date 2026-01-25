# 📚 Documentação da API - Sistema de Gestão de Estoque

Esta documentação descreve todos os endpoints disponíveis na API REST do sistema de gestão de estoque.

## Base URL

```
http://localhost:3000/api
```

---

<details>
<summary>📦 Categorias</summary>

### Listar todas as categorias

**Endpoint:** `GET /api/categorias`

**Descrição:** Retorna todas as categorias cadastradas, com filtro opcional por período.

**Query Parameters:**
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| inicio | string | Não | Data de início  |
| fim | string | Não | Data de fim  |

**Exemplo de Request:**

```bash
GET /api/categorias
GET /api/categorias?inicio=2024-01-01&fim=2024-12-31
```

**Exemplo de Response (200 OK):**

```json
[
  {
    "id": "1",
    "nome": "Limpeza e Higienização",
    "descricao": "Produtos para limpeza e higienização de ambientes",
    "criado_em": "2024-01-15T10:30:00.000Z"
  },
  {
    "id": "2",
    "nome": "Utensílios de Limpeza",
    "descricao": "Materiais e utensílios utilizados para limpeza",
    "criado_em": "2024-01-16T14:20:00.000Z"
  },
  {
    "id": "3",
    "nome": "Consumíveis de Limpeza",
    "descricao": "Produtos consumíveis para limpeza diária",
    "criado_em": "2024-01-17T08:45:00.000Z"
  }
]
```

---

### Buscar categoria por ID

**Endpoint:** `GET /api/categorias/{id}`

**Descrição:** Retorna uma categoria específica pelo ID.

**Path Parameters:**
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | string | Sim | ID da categoria |

**Exemplo de Request:**

```bash
GET /api/categorias/1
```

**Exemplo de Response (200 OK):**

```json
{
  "id": "1",
  "nome": "Limpeza e Higienização",
  "descricao": "Produtos para limpeza e higienização de ambientes",
  "criado_em": "2024-01-15T10:30:00.000Z"
}
```

**Respostas de Erro:**
* `400 Bad Request`: ID inválido
* `404 Not Found`: Categoria não encontrada

---

### Criar nova categoria

**Endpoint:** `POST /api/categorias`

**Descrição:** Cria uma nova categoria.

**Request Body:**

```json
{
  "nome": "string (obrigatório)",
  "descricao": "string (opcional)"
}
```

**Exemplo de Request:**

```bash
POST /api/categorias
Content-Type: application/json

{
  "nome": "Móveis",
  "descricao": "Móveis para casa e escritório"
}
```

**Exemplo de Response (201 Created):**

```json
{
  "id": "3",
  "nome": "Móveis",
  "descricao": "Móveis para casa e escritório",
  "criado_em": "2024-01-17T09:15:00.000Z"
}
```

**Respostas de Erro:**
* `400 Bad Request`: Nome é obrigatório
* `500 Internal Server Error`: Falha ao criar categoria

---

### Atualizar categoria

**Endpoint:** `PUT /api/categorias/{id}`

**Descrição:** Atualiza uma categoria existente.

**Path Parameters:**
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | string | Sim | ID da categoria |

**Request Body:**

```json
{
  "nome": "string (opcional)",
  "descricao": "string (opcional)"
}
```

**Exemplo de Request:**

```bash
PUT /api/categorias/3
Content-Type: application/json

{
  "nome": "Móveis e Decoração",
  "descricao": "Móveis e artigos de decoração para casa e escritório"
}
```

**Exemplo de Response (200 OK):**

```json
{
  "id": "3",
  "nome": "Móveis e Decoração",
  "descricao": "Móveis e artigos de decoração para casa e escritório",
  "criado_em": "2024-01-17T09:15:00.000Z"
}
```

**Respostas de Erro:**
* `404 Not Found`: Categoria não encontrada para atualização
* `500 Internal Server Error`: Falha ao atualizar categoria

---

### Excluir categoria

**Endpoint:** `DELETE /api/categorias/{id}`

**Descrição:** Exclui uma categoria.

**Path Parameters:**
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | string | Sim | ID da categoria |

**Exemplo de Request:**

```bash
DELETE /api/categorias/3
```

**Exemplo de Response (204 No Content):**

```
(sem conteúdo)
```

**Respostas de Erro:**
* `404 Not Found`: Categoria não encontrada para exclusão
* `500 Internal Server Error`: Falha ao excluir categoria

</details>

---

<details>
<summary>🛍️ Produtos</summary>

### Listar todos os produtos

**Endpoint:** `GET /api/produtos`

**Descrição:** Retorna todos os produtos cadastrados, com filtros opcionais.

**Query Parameters:**
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| categoria | string | Não | Nome da categoria para filtrar |
| marca | string | Não | Nome da marca para filtrar |
| inicio | string | Não | Data de início (formato ISO 8601) |
| fim | string | Não | Data de fim (formato ISO 8601) |
| min | number | Não | Quantidade mínima em estoque |
| max | number | Não | Quantidade máxima em estoque |

**Exemplo de Request:**

```bash
GET /api/produtos
GET /api/produtos?categoria=Eletrônicos&marca=Samsung
GET /api/produtos?min=10&max=100
```

**Exemplo de Response (200 OK):**

```json
[
  {
    "id": "1",
    "sku": "LIM-001",
    "nome": "Detergente Líquido 500ml",
    "categoria_id": "1",
    "estoque_minimo": 10,
    "marca": "Ypê",
    "criado_em": "2024-01-15T11:00:00.000Z",
    "categoria": {
      "id": "1",
      "nome": "Limpeza e Higienização",
      "descricao": "Produtos para limpeza e higienização de ambientes",
      "criado_em": "2026-01-22T03:54:03.106Z"
    },
    "estoque": {
      "id": "1",
      "produto_id": "1",
      "quantidade": 0,
      "atualizado_em": "2026-01-22T03:54:03.113Z"
    }
  },
  {
    "id": "4",
    "sku": "UTI-001",
    "nome": "Vassoura de Pelo Sintético",
    "categoria_id": "2",
    "estoque_minimo": 2,
    "marca": "Bettanin",
    "criado_em": "2024-01-15T11:05:00.000Z",
    "categoria": {
      "id": "2",
      "nome": "Utensílios de Limpeza",
      "descricao": "Materiais e utensílios utilizados para limpeza",
      "criado_em": "2026-01-22T03:54:03.106Z"
    },
    "estoque": {
      "id": "4",
      "produto_id": "4",
      "quantidade": 0,
      "atualizado_em": "2026-01-22T03:54:03.113Z"
    }
  }
]
```

---

### Buscar produto por ID

**Endpoint:** `GET /api/produtos/{id}`

**Descrição:** Retorna um produto específico pelo ID.

**Path Parameters:**
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | string | Sim | ID do produto |

**Exemplo de Request:**

```bash
GET /api/produtos/1
```

**Exemplo de Response (200 OK):**

```json
{
  "id": "1",
  "sku": "LIM-001",
  "nome": "Detergente Líquido 500ml",
  "categoria_id": "1",
  "estoque_minimo": 10,
  "marca": "Ypê",
  "criado_em": "2024-01-15T11:00:00.000Z",
  "categoria": {
    "id": "1",
    "nome": "Limpeza e Higienização",
    "descricao": "Produtos para limpeza e higienização de ambientes",
    "criado_em": "2026-01-22T03:54:03.106Z"
  },
  "estoque": {
    "id": "1",
    "produto_id": "1",
    "quantidade": 0,
    "atualizado_em": "2026-01-22T03:54:03.113Z"
  },
  "estoque_movimentacoes": [
    {
      "id": "1",
      "produto_id": "1",
      "quantidade": 50,
      "tipo": "entrada",
      "criado_em": "2026-01-22T03:54:03.117Z"
    },
    {
      "id": "2",
      "produto_id": "1",
      "quantidade": 5,
      "tipo": "saida",
      "criado_em": "2026-01-22T03:54:03.117Z"
    }
  ]
}
```

**Respostas de Erro:**
* `400 Bad Request`: ID inválido
* `404 Not Found`: Produto não encontrado

---

### Criar novo produto

**Endpoint:** `POST /api/produtos`

**Descrição:** Cria um novo produto.

**Request Body:**

```json
{
  "sku": "string (obrigatório)",
  "nome": "string (obrigatório)",
  "categoria_id": "string (opcional)",
  "estoque_minimo": "number (opcional)",
  "marca": "string (opcional)"
}
```

**Exemplo de Request:**

```bash
POST /api/produtos
Content-Type: application/json

{
  "sku": "LGREF450-001",
  "nome": "Refrigerador Duplex 450L",
  "categoria_id": "1",
  "estoque_minimo": 3,
  "marca": "LG"
}
```

**Exemplo de Response (201 Created):**

```json
{
  "id": "2",
  "sku": "LGREF450-001",
  "nome": "Refrigerador Duplex 450L",
  "categoria_id": "1",
  "estoque_minimo": 3,
  "marca": "LG",
  "criado_em": "2024-01-17T12:30:00.000Z"
}
```

**Respostas de Erro:**
* `400 Bad Request`: SKU e Nome são obrigatórios
* `500 Internal Server Error`: Falha ao criar produto

---

### Atualizar produto

**Endpoint:** `PUT /api/produtos/{id}`

**Descrição:** Atualiza um produto existente.

**Path Parameters:**
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | string | Sim | ID do produto |

**Request Body:**

```json
{
  "sku": "string (opcional)",
  "nome": "string (opcional)",
  "categoria_id": "string (opcional)",
  "estoque_minimo": "number (opcional)",
  "marca": "string (opcional)"
}
```

**Exemplo de Request:**

```bash
PUT /api/produtos/2
Content-Type: application/json

{
  "nome": "Refrigerador Duplex Inox 450L",
  "estoque_minimo": 5
}
```

**Exemplo de Response (200 OK):**

```json
{
  "id": "2",
  "sku": "LGREF450-001",
  "nome": "Refrigerador Duplex Inox 450L",
  "categoria_id": "1",
  "estoque_minimo": 5,
  "marca": "LG",
  "criado_em": "2024-01-17T12:30:00.000Z"
}
```

**Respostas de Erro:**
* `404 Not Found`: Produto não encontrado para atualização
* `500 Internal Server Error`: Falha ao atualizar produto

---

### Excluir produto

**Endpoint:** `DELETE /api/produtos/{id}`

**Descrição:** Exclui um produto.

**Path Parameters:**
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | string | Sim | ID do produto |

**Exemplo de Request:**

```bash
DELETE /api/produtos/2
```

**Exemplo de Response (204 No Content):**

```
(sem conteúdo)
```

**Respostas de Erro:**
* `404 Not Found`: Produto não encontrado para exclusão
* `500 Internal Server Error`: Falha ao excluir produto

</details>

---

<details>
<summary>📊 Estoque
</summary>

### Listar todo o estoque

**Endpoint:** `GET /api/estoque`

**Descrição:** Retorna informações de estoque de todos os produtos, com filtros opcionais.

**Query Parameters:**
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| categoria | string | Não | Nome da categoria para filtrar |
| inicio | string | Não | Data de início (formato ISO 8601) |
| fim | string | Não | Data de fim (formato ISO 8601) |
| min | number | Não | Quantidade mínima em estoque |
| max | number | Não | Quantidade máxima em estoque |

**Exemplo de Request:**

```bash
GET /api/estoque
GET /api/estoque?categoria=Eletrônicos
GET /api/estoque?min=0&max=10
```

**Exemplo de Response (200 OK):**

```json
[
  {
    "id": "1",
    "produto_id": "1",
    "quantidade": 45,
    "atualizado_em": "2024-01-17T14:00:00.000Z",
    "produtos": {
      "id": "1",
      "categoria_id": "1",
      "sku": "LIM-001",
      "nome": "Detergente Líquido 500ml",
      "estoque_minimo": 10,
      "marca": "Ypê",
      "criado_em": "2026-01-22T03:54:03.109Z"
    }
  },
  {
    "id": "7",
    "produto_id": "7",
    "quantidade": 0,
    "atualizado_em": "2024-01-17T14:05:00.000Z",
    "produtos": {
      "id": "7",
      "categoria_id": "3",
      "sku": "CON-001",
      "nome": "Esponja de Aço multiuso",
      "estoque_minimo": 20,
      "marca": "Assolan",
      "criado_em": "2026-01-22T03:54:03.109Z"
    }
  }
]
```

---

### Atualizar estoque

**Endpoint:** `PUT /api/estoque/{id}`

**Descrição:** Atualiza a quantidade em estoque de um produto específico.

**Path Parameters:**
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| id | string | Sim | ID do produto |

**Request Body:**

```json
{
  "quantidade": "number (obrigatório)"
}
```

**Exemplo de Request:**

```bash
PUT /api/estoque/1
Content-Type: application/json

{
  "quantidade": 30
}
```

**Exemplo de Response (200 OK):**

```json
{
  "id": "1",
  "produto_id": "1",
  "quantidade": 30,
  "atualizado_em": "2024-01-17T15:20:00.000Z"
}
```

**Respostas de Erro:**
* `404 Not Found`: Produto não encontrado para atualização
* `500 Internal Server Error`: Falha ao atualizar produto

</details>

---

<details>
<summary>📦 Movimentações</summary>

### Listar todas as movimentações

**Endpoint:** `GET /api/movimentacoes`

**Descrição:** Retorna todas as movimentações de estoque (entradas e saídas), com filtros opcionais.

**Query Parameters:**
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| inicio | string | Não | Data de início (formato ISO 8601) |
| fim | string | Não | Data de fim (formato ISO 8601) |
| min | number | Não | Quantidade mínima da movimentação |
| max | number | Não | Quantidade máxima da movimentação |
| tipo | string | Não | Tipo da movimentação: "entrada" ou "saida" |
| produto | string | Não | Nome do produto para filtrar |

**Exemplo de Request:**

```bash
GET /api/movimentacoes
GET /api/movimentacoes?tipo=entrada
GET /api/movimentacoes?produto=Smart TV&inicio=2024-01-01
```

**Exemplo de Response (200 OK):**

```json
[
  {
    "id": "1",
    "produto_id": "1",
    "quantidade": 50,
    "tipo": "entrada",
    "criado_em": "2024-01-15T11:30:00.000Z",
    "produtos": {
      "id": "1",
      "categoria_id": "1",
      "sku": "LIM-001",
      "nome": "Detergente Líquido 500ml",
      "estoque_minimo": 10,
      "marca": "Ypê",
      "criado_em": "2026-01-22T03:54:03.109Z"
    }
  },
  {
    "id": "2",
    "produto_id": "1",
    "quantidade": 5,
    "tipo": "saida",
    "criado_em": "2024-01-16T09:15:00.000Z",
    "produtos": {
      "id": "1",
      "categoria_id": "1",
      "sku": "LIM-001",
      "nome": "Detergente Líquido 500ml",
      "estoque_minimo": 10,
      "marca": "Ypê",
      "criado_em": "2026-01-22T03:54:03.109Z"
    }
  }
]
```

---

### Criar nova movimentação

**Endpoint:** `POST /api/movimentacoes`

**Descrição:** Registra uma nova movimentação de estoque (entrada ou saída).

**Request Body:**

```json
{
  "produto_id": "string (obrigatório)",
  "quantidade": "number (obrigatório)",
  "tipo": "string (obrigatório) - 'entrada' ou 'saida'"
}
```

**Exemplo de Request - Entrada:**

```bash
POST /api/movimentacoes
Content-Type: application/json

{
  "produto_id": "1",
  "quantidade": 20,
  "tipo": "entrada"
}
```

**Exemplo de Request - Saída:**

```bash
POST /api/movimentacoes
Content-Type: application/json

{
  "produto_id": "1",
  "quantidade": 3,
  "tipo": "saida"
}
```

**Exemplo de Response (201 Created):**

```json
{
  "id": "3",
  "produto_id": "1",
  "quantidade": 20,
  "tipo": "entrada",
  "criado_em": "2024-01-17T16:30:00.000Z"
}
```

**Respostas de Erro:**
* `400 Bad Request`: Tipo e Quantidade são obrigatórios
* `400 Bad Request`: Quantidade insuficiente em estoque (para saídas)
* `500 Internal Server Error`: Erro interno do servidor

</details>

---

## 📝 Códigos de Status HTTP

| Código | Descrição |
|--------|-----------|
| 200 OK | Requisição bem-sucedida |
| 201 Created | Recurso criado com sucesso |
| 204 No Content | Requisição bem-sucedida, sem conteúdo de retorno |
| 400 Bad Request | Dados inválidos ou campos obrigatórios faltando |
| 404 Not Found | Recurso não encontrado |
| 500 Internal Server Error | Erro interno do servidor |

---

## 🔍 Observações Importantes

1. **Datas**: 
   - Todas as datas devem estar no formato ISO 8601 (ex: `2024-01-17T10:30:00.000Z`)
   - Todas as datas são criadas automaticamente de acordo com o data e horário atual do sistema

2. **IDs**: Todos os IDs são retornados como strings, mesmo quando representam valores numéricos

3. **BigInt Serialization**: A API automaticamente converte valores BigInt para strings na serialização JSON

4. **Movimentações**: 
   - Entradas aumentam o estoque
   - Saídas diminuem o estoque
   - Não é possível registrar saídas maiores que a quantidade disponível em estoque

5. **Filtros**: Todos os parâmetros de query são opcionais e podem ser combinados

6. **Relacionamentos**: 
   - Produtos podem ter uma categoria associada
   - Cada produto tem um registro de estoque
   - Movimentações sempre estão relacionadas a um produto específico
