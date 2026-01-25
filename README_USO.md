# 📦 Teste Fullstack JR – Sistema de Estoque

Este projeto é uma aplicação web para gerenciamento de estoque, produtos, categorias e movimentações, com foco em **filtros avançados**, **ordenação dinâmica** e **arquitetura modular**.

---

## 🧰 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

* [Node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/)
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

---

## 🚀 Como executar o projeto

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/samuel-bordignon/teste-fullstack-jr.git
cd teste-fullstack-jr
```

---

### 2️⃣ Instale as dependências

```bash
npm install
```

---

### 3️⃣ Inicie o banco de dados (Docker)

```bash
docker-compose up -d
```

Esse comando iniciará um container PostgreSQL para o projeto.

---

### 4️⃣ Configure o banco de dados

#### Acesse o PostgreSQL via `psql`:

```bash
docker exec -i nextjs_postgres_db_v17 psql -U postgres -d postgres
```

> ℹ️ O nome do container pode variar. Verifique com:
>
> ```bash
> docker ps
> ```

* **Usuário:** `postgres`
* **Senha:** `postgres`

#### Execute o script de inicialização:

```sql
sql/init.sql
```

---

### 5️⃣ Crie o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/postgres"
```

---

### 6️⃣ Execute a aplicação

```bash
npm run dev
```

Acesse no navegador:

```
http://localhost:3000
```

---

## 🗄️ Informações do Banco de Dados

| Campo   | Valor       |
| ------- | ----------- |
| Host    | `localhost` |
| Porta   | `5433`      |
| Usuário | `postgres`  |
| Senha   | `postgres`  |
| Banco   | `postgres`  |

As configurações estão definidas em `docker-compose.yml`.

---

## 📜 Scripts disponíveis

| Script                | Descrição                            |
| --------------------- | ------------------------------------ |
| `npm run dev`         | Inicia o servidor de desenvolvimento |
| `npm run build`       | Gera a build de produção             |
| `npm run start`       | Inicia o servidor de produção        |
| `npm run lint`        | Executa o linter                     |
| `npx prisma generate` | Gera o Prisma Client                 |

---

## 🧭 Como usar o sistema

Ao acessar a aplicação, você será direcionado ao módulo **Categorias**.
O sistema é dividido em **módulos acessíveis por abas**:

* Categorias
* Produtos
* Estado do estoque
* Histórico de movimentações

<img src="./public/HomePage.png" />

---

### 🔹 1. Barra de navegação

Permite alternar entre os módulos de forma simples e direta.

<img src="./public/BarraNavegacao.png" />

---

### 🔹 2. Barra de busca

Presente em todas as abas, permite buscar por:

* Nome
* ID
* SKU (dependendo do módulo)

<img src="./public/BarraFiltragem.png" />

---

### 🔹 3. Filtros avançados

Disponível ao lado da barra de busca, permite realizar consultas mais refinadas, como:

* Categoria
* Marca
* Nome
* Intervalos de quantidade (ex: 10–100)
* Intervalos de datas

<img src="./public/FiltrosAvancados.png" />
<img src="./public/ModalFiltros.png" />

---

### 🔹 4. Ordenação de tabelas

Os cabeçalhos das tabelas permitem ordenação:

* Crescente (↑)
* Decrescente (↓)

Compatível com dados:

* Alfabéticos
* Numéricos
* Datas

<img src="./public/Ordenacao.png" />

---

### 🔹 5. Criar, editar e excluir registros

As interfaces (modais e formulários) já estão estruturadas para:

* Criação
* Edição
* Exclusão

> ⚠️ As operações ainda **não estão completas**, mas a base visual e estrutural já está pronta.

<img src="./public/CRUD.png" />
<img src="./public/ModalCriar.png" />

---

## 🤝 Contribuição

Sinta-se à vontade para:

* Melhorar funcionalidades
* Implementar regras de negócio
* Ajustar UI/UX
* Evoluir o backend

Este é um projeto aberto para colaboração e evolução contínua 🚀
