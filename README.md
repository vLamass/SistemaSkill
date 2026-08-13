# 🎯 Sistema Skill

<p align="center">
  <strong>Uma aplicação Full Stack para gerenciamento e acompanhamento de habilidades.</strong>
</p>

<p align="center">
  React • React Native • Spring Boot • PostgreSQL • JWT
</p>

---

## 📖 Sobre o projeto

O **Sistema Skill** é uma aplicação Full Stack desenvolvida para permitir que usuários gerenciem suas habilidades e acompanhem seu nível de conhecimento em cada uma delas.

A aplicação possui uma API REST responsável pelas regras de negócio e autenticação, uma interface Web desenvolvida em React e uma aplicação Mobile desenvolvida em React Native.

O objetivo é oferecer uma experiência simples e organizada para que cada usuário possa manter seu próprio conjunto de Skills e acompanhar sua evolução.

### ✨ Principais funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- Proteção de endpoints
- Gerenciamento de usuários
- Listagem de Skills
- Adição de Skills ao perfil
- Alteração do nível de conhecimento
- Remoção de Skills
- Paginação
- Logout
- Interface Web responsiva
- Aplicação Mobile
- Tema visual
- Documentação da API com Swagger/OpenAPI

---

## 🧩 Funcionamento

O fluxo principal da aplicação funciona da seguinte maneira:

    Cadastro
       ↓
    Login
       ↓
    Autenticação JWT
       ↓
    Home
       ↓
    Visualização das Skills
       ↓
    Adicionar Skill
       ↓
    Definir / alterar nível
       ↓
    Acompanhar conhecimentos
       ↓
    Logout

Cada usuário possui suas próprias Skills associadas ao seu perfil.

---

## 📊 Níveis de conhecimento

Cada Skill pode possuir um nível de conhecimento entre **1 e 5**.

| Nível | Classificação |
|:-----:|---------------|
| 1 | Iniciante |
| 2 | Básico |
| 3 | Intermediário |
| 4 | Avançado |
| 5 | Especialista |

O backend também possui validações para impedir níveis fora desse intervalo.

---

# 🏗️ Arquitetura

O projeto é dividido em três aplicações principais:

    Sistema Skill
    │
    ├── backend/
    │   └── API REST
    │
    ├── frontend/
    │   └── Aplicação Web
    │
    ├── mobile/
    │   └── Aplicação Mobile
    │
    └── database/
        └── Script PostgreSQL

### 🔵 Backend

Responsável por:

- Autenticação
- Geração e validação de JWT
- Regras de negócio
- Validação dos dados
- Comunicação com o banco
- Gerenciamento de usuários
- Gerenciamento de Skills
- Relacionamento entre usuários e Skills
- Tratamento de exceções
- Documentação da API

### 🟢 Frontend Web

Interface desenvolvida em React para utilização através do navegador.

Inclui:

- Tela de Login
- Cadastro
- Home
- Resumo das Skills
- Lista de Skills
- Adição de Skills
- Alteração de nível
- Paginação
- Logout
- Controle de autenticação
- Rotas protegidas
- Tema visual

### 🟣 Mobile

Aplicação desenvolvida em React Native utilizando Expo.

Inclui:

- Tela de apresentação
- Login
- Cadastro
- Autenticação
- Armazenamento local do token
- Home
- Skills do usuário
- Adição de Skills
- Alteração de nível
- Logout
- Tema

---

# 🛠️ Tecnologias

## Backend

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- JWT
- OAuth2 Resource Server
- Bean Validation
- PostgreSQL
- Lombok
- SpringDoc OpenAPI
- Swagger UI
- Maven

## Frontend Web

- React
- TypeScript
- Vite
- React Router
- React Hook Form
- Zod
- Axios
- React Toastify
- Lucide React
- CSS Modules

## Mobile

- React Native
- Expo
- TypeScript
- React Navigation
- AsyncStorage
- React Native Safe Area Context
- React Native Screens

## Banco de dados

- PostgreSQL

---

# 🔐 Autenticação

A aplicação utiliza **JWT (JSON Web Token)** para autenticação.

O fluxo funciona da seguinte forma:

    Usuário
       │
       ├── Login
       ↓
    Backend
       │
       ├── Validação das credenciais
       ↓
    JWT
       │
       ↓
    Frontend / Mobile
       │
       └── Bearer Token
              │
              ↓
       Endpoints protegidos

Os endpoints de cadastro e login não exigem autenticação.

Os demais endpoints protegidos exigem um JWT válido.

As senhas dos usuários são armazenadas utilizando `PasswordEncoder`.

> ⚠️ Nunca publique senhas, tokens ou chaves JWT reais em um repositório público. Utilize variáveis de ambiente ou outro mecanismo seguro para ambientes reais.

---

# 🗄️ Banco de dados

O projeto utiliza **PostgreSQL**.

Banco esperado:

    sistema_skill

Principais tabelas:

    users
    skills
    user_skills

### Relacionamentos

    users
      │
      │ 1:N
      ↓
    user_skills
      ↑
      │ N:1
      │
    skills

A tabela `user_skills` representa o relacionamento entre usuários e Skills e também armazena o nível de conhecimento daquela Skill para o usuário.

O sistema também possui validações para impedir:

- Níveis menores que 1
- Níveis maiores que 5
- Associação duplicada da mesma Skill para o mesmo usuário

---

# 🚀 Como executar

## 📋 Pré-requisitos

Antes de executar o projeto, tenha instalado:

- Java 17 ou superior
- Maven, caso não utilize o Maven Wrapper
- PostgreSQL
- Node.js
- npm
- Expo Go, caso queira testar o Mobile em um dispositivo físico

---

# 1️⃣ Configurar o banco

Crie um banco PostgreSQL chamado:

    sistema_skill

Exemplo:

    CREATE DATABASE sistema_skill;

Depois execute o script localizado em:

    database/SistemaSkill.sql

O script contém a estrutura necessária para criação das tabelas, sequences, relacionamentos e dados iniciais.

---

# 2️⃣ Executar o Backend

Entre na pasta:

    cd backend

Configure o arquivo:

    src/main/resources/application.properties

Exemplo de configuração:

    spring.application.name=SistemaSkill

    spring.datasource.url=jdbc:postgresql://localhost:5432/sistema_skill
    spring.datasource.username=postgres
    spring.datasource.password=SUA_SENHA

    spring.jpa.hibernate.ddl-auto=none
    spring.jpa.show-sql=true

    server.port=8080

    jwt.secret=SUA_CHAVE_JWT

Substitua `SUA_SENHA` e `SUA_CHAVE_JWT` pelos valores correspondentes ao seu ambiente.

### Windows

    mvnw.cmd spring-boot:run

### Linux / macOS

    ./mvnw spring-boot:run

A API ficará disponível em:

    http://localhost:8080

---

# 3️⃣ Swagger

Com o backend executando, acesse:

    http://localhost:8080/swagger-ui/index.html

O Swagger permite visualizar e testar os endpoints da API diretamente pelo navegador.

### Fluxo recomendado

Primeiro crie um usuário:

    POST /api/auth/register

Depois faça login:

    POST /api/auth/login

O login retornará um JWT.

Copie o token e clique em:

    Authorize

Informe:

    Bearer SEU_TOKEN

Depois disso será possível testar os endpoints protegidos.

---

# 📚 Endpoints

## 🔑 Autenticação

| Método | Endpoint | Autenticação |
|:------:|----------|:------------:|
| POST | `/api/auth/register` | ❌ |
| POST | `/api/auth/login` | ❌ |

---

## 👤 Usuários

| Método | Endpoint | Autenticação |
|:------:|----------|:------------:|
| GET | `/api/users` | ✅ |
| GET | `/api/users/{id}` | ✅ |
| DELETE | `/api/users/{id}` | ✅ |

---

## 🧠 Skills

| Método | Endpoint | Autenticação |
|:------:|----------|:------------:|
| GET | `/api/skills` | ✅ |
| GET | `/api/skills/{id}` | ✅ |
| POST | `/api/skills` | ✅ |
| DELETE | `/api/skills/{id}` | ✅ |

---

## 👤🧠 Skills do usuário

| Método | Endpoint | Autenticação |
|:------:|----------|:------------:|
| GET | `/api/user-skills` | ✅ |
| GET | `/api/user-skills/{id}` | ✅ |
| POST | `/api/user-skills` | ✅ |
| PUT | `/api/user-skills/{id}?level={level}` | ✅ |
| DELETE | `/api/user-skills/{id}` | ✅ |

---

# 4️⃣ Executar o Frontend Web

Entre na pasta:

    cd frontend

Instale as dependências:

    npm install

Execute:

    npm run dev

O Vite disponibilizará a aplicação em um endereço semelhante a:

    http://localhost:5173

O frontend utiliza a API disponível em:

    http://localhost:8080

### Fluxo de utilização

    Login
       ↓
    Cadastro
       ↓
    Login
       ↓
    Home
       ↓
    Adicionar Skill
       ↓
    Alterar nível
       ↓
    Visualizar Skills
       ↓
    Logout

---

# 5️⃣ Executar o Mobile

Entre na pasta:

    cd mobile

Instale as dependências:

    npm install

Execute o Expo:

    npm start

Também é possível utilizar:

    npm run android

ou:

    npm run web

---

# 📱 Testando no celular

Instale o **Expo Go** no dispositivo.

Depois de executar o projeto, o Expo exibirá um QR Code.

Escaneie o QR Code utilizando o aplicativo Expo Go.

### ⚠️ Atenção ao localhost

Quando o aplicativo Mobile é executado em um celular físico, `localhost` representa o próprio celular.

Nesse caso, o Mobile deve utilizar o endereço IP local da máquina onde o backend está executando.

Exemplo:

    http://192.168.0.100:8080

O computador e o celular precisam estar conectados à mesma rede.

---

# 🔄 Comunicação entre as aplicações

A arquitetura geral funciona desta maneira:

    ┌─────────────────┐
    │   PostgreSQL    │
    └────────┬────────┘
             │
             ↓
    ┌─────────────────┐
    │   Spring Boot   │
    │       API       │
    │      :8080      │
    └────────┬────────┘
             │
       ┌─────┴─────┐
       │           │
       ↓           ↓
    ┌───────┐   ┌──────────┐
    │ React │   │  React   │
    │  Web  │   │  Native  │
    └───────┘   └──────────┘

Web e Mobile utilizam a mesma API e o mesmo banco de dados.

---

# 📁 Estrutura do projeto

    SistemaSkill/
    │
    ├── backend/
    │   ├── src/
    │   │   ├── main/
    │   │   │   ├── java/
    │   │   │   │   └── com/sistemaskill/backend/
    │   │   │   │       ├── config/
    │   │   │   │       ├── controllers/
    │   │   │   │       ├── dtos/
    │   │   │   │       ├── entities/
    │   │   │   │       ├── exceptions/
    │   │   │   │       ├── repositories/
    │   │   │   │       └── services/
    │   │   │   └── resources/
    │   │   │       └── application.properties
    │   │   └── test/
    │   └── pom.xml
    │
    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── contexts/
    │   │   ├── pages/
    │   │   ├── routes/
    │   │   ├── styles/
    │   │   └── utils/
    │   ├── package.json
    │   └── vite.config.ts
    │
    ├── mobile/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── context/
    │   │   ├── pages/
    │   │   ├── routes/
    │   │   ├── theme/
    │   │   └── utils/
    │   ├── App.tsx
    │   └── package.json
    │
    ├── database/
    │   └── SistemaSkill.sql
    │
    └── README.md

---

# 🧱 Organização do Backend

O backend segue uma separação de responsabilidades:

    Controller
        ↓
    Service
        ↓
    Repository
        ↓
    Database

### Controllers

Responsáveis por receber as requisições HTTP e retornar as respostas da API.

### Services

Concentram as regras de negócio da aplicação.

### Repositories

Responsáveis pela comunicação com o banco de dados utilizando Spring Data JPA.

### DTOs

Responsáveis por transportar os dados entre as camadas sem expor diretamente as entidades em todas as operações.

### Entities

Representam as estruturas e relacionamentos persistidos no banco de dados.

### Config

Contém configurações relacionadas principalmente a:

- Spring Security
- JWT
- PasswordEncoder
- Swagger/OpenAPI

### Exceptions

Centralizam o tratamento de erros e exceções da aplicação.

---

# 🎨 Interface

A aplicação utiliza uma identidade visual baseada em uma interface limpa e moderna.

A proposta visual utiliza principalmente:

- tons claros;
- branco;
- creme;
- marrom;
- dourado;
- cards;
- espaçamento consistente;
- elementos de destaque para ações importantes.

A interface Web também possui comportamento responsivo para diferentes tamanhos de tela.

---

# 🧪 Testes e validações

## Backend

Execute:

    mvnw.cmd test

Ou:

    ./mvnw test

## Frontend

Para verificar o build:

    npm run build

## Mobile

Para verificar o TypeScript:

    npx tsc --noEmit

Além dos comandos acima, recomenda-se testar o fluxo funcional completo:

    Cadastro
       ↓
    Login com credenciais corretas
       ↓
    Login com credenciais incorretas
       ↓
    Recebimento do JWT
       ↓
    Acesso à Home
       ↓
    Listagem das Skills
       ↓
    Adicionar Skill
       ↓
    Alterar nível
       ↓
    Paginação
       ↓
    Logout
       ↓
    Tentativa de acesso sem autenticação

---

# 🔒 Segurança

Algumas informações nunca devem ser versionadas diretamente no repositório:

- Senhas do PostgreSQL
- Chaves JWT
- Tokens
- Credenciais
- Secrets
- Informações privadas de ambiente

Para ambientes reais, recomenda-se utilizar:

- Variáveis de ambiente
- Arquivos de configuração externos
- Secret Managers

---

# 🚧 Possíveis evoluções

O projeto pode ser expandido futuramente com funcionalidades como:

- Recuperação de senha
- Edição de perfil
- Avatar do usuário
- Busca de Skills
- Filtros
- Categorias de habilidades
- Histórico de evolução
- Gráficos de progresso
- Sistema administrativo
- Criação e edição de Skills pela interface
- Paginação diretamente na API
- Endpoint `/me` baseado no usuário autenticado
- Configurações diferentes para desenvolvimento e produção
- Testes automatizados mais abrangentes
- Deploy em ambiente de produção

---

# 📄 Licença

Este projeto foi desenvolvido para fins pessoais e educacionais.

---

<p align="center">
  <strong>🎯 Sistema Skill</strong>
</p>

<p align="center">
  Gerencie suas habilidades. Acompanhe sua evolução.
</p>
