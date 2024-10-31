# Desafio técnico backend para empresa arrow digital

## Api criada para listar as threads hot no subreddit artificial

# 🚀 Deploy 🚀

O Deploy da aplicação foi feito no [Render](https://render.com/) utilizando de um Pipeline no [GitHub Actions do repositório](https://github.com/fernandosenacruz/backend-challenger-arrow-digital). Seguem os links de acesso da aplicação:

**Back-end**

- **Redocly**: https://backend-challenger-arrow-digital.onrender.com/api/redocly
- **Swagger**: https://backend-challenger-arrow-digital.onrender.com/api/docs

### Testar Rotas do Back-end

# 💻 Rodar a aplicação na sua máquina 💻

### Você vai precisar ter instalado

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/get-started/) (Recomendado) ou uma conta [Mongodb](https://www.mongodb.com/pt-br/atlas)

## 🐋 Rodar com Docker 🐋

<details>
<summary>Instruções</summary>

## Clonar o repositório

Primeiramente você vai precisar clonar este repositório para qualquer diretório em sua máquina local.

Para isso você vai executar o seguinte comando no seu terminal:

```console
git clone https://github.com/fernandosenacruz/backend-challenger-arrow-digital.git
```

## Setup

Antes de inicializar o projeto, é importante configurar algumas variáveis de ambiente (.env.example) e instalar as dependências do projeto.

### Configurar o ambiente (.env)

- **Back-end**
  - Acesse o diretório `./backend-challenger-arrow-digital`
  - Crie o arquivo `.env` com as variáveis de ambiente indicadas:
  ```
  DB_USERNAME="" // host
  DB_PASSWORD="" // password
  MONGO_URL=mongodb+srv://<user>:<db_password>@<cluster>.mongodb.net/ para coneção com atlas
  BASE_URL="http://localhost:3000" // URL db mongo localmente está rodando (Docker)
  ```
  > Apague os comentários indicados `// ...` ao lado do valor da variável

## Acessar a Aplicação

- Back-end:
  - Você pode testar a aplicação via Postman ou Insomnia - URL: `http://localhost:3000/api/threads?initialDate=2024-10-27T15:24:03&finalDate=2024-10-28T00:00:00.000Z` ou via Swagger - URL `http://localhost:3000/api/docs`

</details>

### Instalar dependências

- Nas pastas `./backend-challenger-arrow-digital` rode o comando `npm install` ou `yarn install`

## Inicializar a Aplicação

- Obs: O cron.schedule está configurado para buscar as threads todos os dias às 9H. Mas este agendamento pode ser alterado.

  ```
    // Agenda a tarefa para ser executada diariamente às 9:00 UTC
    export const scheduleTask = cron.schedule('0 9 * * *', fetchAndSaveThreads); // altere os minutos e hora se desejar
  ```

- Inicialize o back-end com o comando `npm run dev` ou `npm run start`
- Com Docker utilize o comando `docker compose up` para subir o container e `docker compose down` para matá-los

> Por padrão o back-end inicializa na porta 3000

</details>

# 🚧 Testes 🚧

> Os testes necessitam que as dependências do projeto estejam instaladas (`npm install`)

### Testes Unitários

- rode o comando `npm run test:unit`

### Testes de Integração

- rode o comando `npm run test:integration`

### Cobertura

- rode o comando `npm run test:coverage`

## Tecnologias Usadas

### Banco de Dados 💾

- [Mongodb](https://www.mongodb.com/pt-br/atlas)

### Back-end ⚙️

- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [Mongodb](https://www.mongodb.com/pt-br/docs/atlas/)
- [Mongoose](https://mongoosejs.com/docs/guide.html)
- [Jest](https://jestjs.io/pt-BR/)
- [Docker](https://www.docker.com/)
- [GitHub Actions](https://github.com/features/actions)
</details>

# 💡 Referências a outros projetos 💡

Neste projeto foram utilizados recursos e sintaxe de código inspirados em outros projetos pessoais que já fiz:

- 🟨 [Coach da Depressão](https://github.com/fernandosenacruz/CDD_back-end): API de estudos com finalidade lúdica
