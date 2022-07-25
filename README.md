# <p align = "center"> DrivenPass </p>

<p align="center">
   <img style="width:300px;height:300px" src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f512.svg"/>
</p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-HMarcos-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/HMarcos/drivenpass?color=4dae71&style=flat-square" />
</p>


##  :clipboard: Descrição

O DrivenPass é uma API para gerenciar senhas desenvolvida utilizando TypeScript

**Deploy Link:** https://hmarcos-drivenpass.herokuapp.com/

***

## :computer:	 Tecnologias e Conceitos

- REST APIs
- JWTs & refresh tokens
- Node.js
- TypeScript
- Prisma
- Postgres SQL

***

## :rocket: Rotas


### Cadastro e Login

```yml
POST /sign-up
    - Rota para cadastrar um novo usuário.
    - headers: {}
    - body: {
        "email": "email@gmail.com",
        "password": "senha"
    }
```
    
```yml 
POST /sign-in
    - Rota para fazer login.
    - headers: {}
    - body: {
        "email": "email@gmail.com",
        "password": "senha"
    }
    - response: {
        token: "$token"
    }
```

### Credenciais

**Credenciais:** são informações de login para um site e/ou serviço.

```yml
POST /credentials (autenticada)
    - Rota que permite o usuário salvar suas informações sobre credenciais.
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "title": "Titulo da Credencial",
        "url": "http(s)://url...",
        "username": "Nome do Usuário"
        "password": "senhaTeste"
    }
```
    
```yml 
GET /credentials (autenticada)
    - Rota para listar todas as credenciais do usuário.
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /credentials/:id (autenticada)
    - Rota para listar uma credencial pelo id.
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
DELETE /credentials/:id (autenticada)
    - Rota para deletar uma credencial pelo id.
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
***

### Notas Seguras

**Notas Seguras:** são informações livres em formato de texto.

```yml
POST /secure-notes (autenticada)
    - Rota que permite o usuário salvar suas informações sobre notas seguras.
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "title": "Titulo da Nota Segura",
        "note": "Conteúdo da Nota Segura"
    }
```
    
```yml 
GET /secure-notes (autenticada)
    - Rota para listar todas as notas seguras do usuário.
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /secure-notes/:id (autenticada)
    - Rota para listar uma nota segura pelo id.
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
DELETE /secure-notes/:id (autenticada)
    - Rota para deletar uma nota segura pelo id.
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
***

### Cartões

**Cartões:** representam cartões de crédito e/ou débito.

```yml
POST /cards (autenticada)
    - Rota que permite o usuário salvar suas informações sobre cartões.
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "title": "Titulo da Cartão",
        "number": "Número do Cartão",
        "name": "Nome Impresso",
        "securityCode": "CVV",
        "expirationDate": "MM/YY",
        "password": "Senha do Cartão",
        "isVirtual": Virtual ou Não (True or False)
        "type": "credito/debito/ambos"
    }
```
    
```yml 
GET /cards (autenticada)
    - Rota para listar todos os cartões do usuário.
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /cards/:id (autenticada)
    - Rota para listar um cartão pelo id.
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
DELETE /cards/:id (autenticada)
    - Rota para deletar um cartão pelo id.
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
***

### Senhas Wi-fi

**Senhas wi-fi:** representam os dados de acesso a uma rede de internet.

```yml
POST /wi-fi-passwords (autenticada)
    - Rota que permite o usuário salvar suas informações sobre senhas wi-fi.
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "title": "Titulo da Credencial",
        "net": "Nome da Rede",
        "password": "senhaTeste"
    }
```
    
```yml 
GET /wi-fi-passwords (autenticada)
    - Rota para listar todas as senhas wi-fi do usuário.
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /wi-fi-passwords/:id (autenticada)
    - Rota para listar uma senha wi-fi pelo id.
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
DELETE /wi-fi-passwords/:id (autenticada)
    - Rota para deletar uma senha wi-fi pelo id.
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
***

## 🏁 Rodando a aplicação

Este projeto foi desenvolvido utilizando **TypeScript**, então certifique-se que você tem a ultima versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente.

Primeiro, clone o repositório na sua maquina:

```
git clone https://github.com/HMarcos/drivenpass
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Em seguida, com o arquivo **.env** configurado, rode os seguintes comandos para configurar o **Prisma** e a base de dados.

```
npx prisma migrate dev

npx prisma generate
```

Finalizado o processo, é só inicializar o servidor
```
npm run dev
```

## Testes com o Thunder Cliente

Para configurar os testes com o **Thunder Client** basta importar os arquivos: [thunder_client/thunder-collection_drivenpass.json](thunder_client/thunder-collection_drivenpass.json) (em *Collections*) e [thunder_client/thunder-environment_drivenpass.json](thunder_client/thunder-environment_drivenpass.json) (em *Env*);

Assim na aba *Env*, coloque a url do servido na variável `url`. Já as variáveis `token-user1`e `token-user2` serão preenchidas automaticamente durante as requisições de `sign-in`.

