# Teste Pratico - Cabeleileila Leila

## Tecnologias Utilizadas

<li><a href="https://expressjs.com/pt-br/">ExpressJS</a>: é um framework para Node.js que fornece recursos mínimos para construção de servidores web.

<br>
<li><a href="https://nodejs.org/en/docs/">NodeJS</a>: é um software de código aberto, multiplataforma, baseado no interpretador V8 do Google e que permite a execução de códigos JavaScript fora de um navegador web.

<br>
<li><a href="https://www.typescriptlang.org/">TypeScript</a>: TypeScript é uma linguagem de programação fortemente tipada que se baseia em JavaScript, oferecendo melhores ferramentas em qualquer escala.

<br>
<li><a href="https://typeorm.io/">TipeORM</a>:  é um ORM que pode ser executado nas plataformas NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo e Electron e pode ser usado tanto com o TypeScript, quanto com o JavaScript.

<br>
<li><a href="https://www.postgresql.org/">PostgreSQL</a>: é um sistema gerenciador de banco de dados objeto relacional, desenvolvido como projeto de código aberto

<br>

## Como Rodar o Projeto

<br>

## Documentação da API - Rotas

base URL: <a> http://localhost:3000 </a>

**POST** /users <br>

Rota para a criação de um novo usuário. Não é necessária a criação do usuário administrador (Cabeleileila Leila), que é criado no momento em que o banco de dados é subido usando o método query runner do TypeORM. Todos os outros usuários, por padrão, não são administradores.

Formato da requisição:

```json
{
  "name": "Joana",
  "email": "joana@mail.com",
  "cellphone": "00112223334",
  "password": "123456"
}
```

Resposta esperada:

```json
200

{
	"name": "Joana",
	"cellphone": "00112223334",
	"email": "joana@mail.com",
	"isAdm": false,
	"id": "dd2f4148-65b2-4202-adfd-863638bd3b62",
}
```

<br>

**POST** /login <br>

Rota para logar na aplicação. Retorna um token, informação que será utilizada nas requisições em que é necessário autenticação.

Formato da requisição:

```json
{
  "email": "joana@mail.com",
  "password": "123456"
}
```

Resposta esperada:

```json
200

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxlaWxhQG1haWwuY29tI..."
}
```

<br>

**GET** /users/:userId <br>

Rota para recuperar as informações do usuário. userId é o id do usuário que estamos buscando. Essa rota necessita de autenticação, então é necessário enviar no cabeçalho da requisição o token recebido quando um login é criado.

Headers:

```javascript
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxlaWxhQG1haWwuY29tI...";
```

Resposta esperada:

```json
200

{
	"isAdm": false,
	"cellphone": "00112223334",
	"email": "joana@mail.com",
	"name": "Joana",
	"id": "feacb541-2e82-4eb9-b210-9d9989777862"

}
```

<br>

**POST** /schedules <br>

Rota para a criação de um novo agendamento. Assim como a rota acima, esta também é uma rota que necessita autenticação.

Headers:

```javascript
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxlaWxhQG1haWwuY29tI...";
```

Formato da requisição:

```json
{
  "date": "2023-01-18",
  "time": "12:30:00",
  "service": "corte de cabelo",
  "userId": "feacb541-2e82-4eb9-b210-9d9989777862"
}
```

Resposta esperada:

```json
200

{
    "service": "corte de cabelo",
    "time": "12:30:00",
    "date": "2023-01-18",
    "id": "88319c9c-6593-4329-9d31-8ebccd7d00ea",
    "user": {
        "isAdm": false,
        "cellphone": "00112223334",
        "email": "joana@mail.com",
        "name": "Joana",
        "id": "feacb541-2e82-4eb9-b210-9d9989777862"
    }
}
```

**GET** /schedules <br>

Rota para listar todos os agendamentos cadastrados. Rota que necessita de autenticação.

Headers:

```javascript
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxlaWxhQG1haWwuY29tI...";
```

Resposta esperada:

```json
200
[
    {
        "service": "corte de cabelo",
        "time": "12:30:00",
        "date": "2023/1/11",,
        "id": "90c5f96a-30d8-4ea1-87d0-6983a2b20c8d",
        "user": {
            "isAdm": false,
            "cellphone": "00112223334",
            "email": "joana@mail.com",
            "name": "Joana",
            "id": "8cf164a5-b12a-40e5-8bf2-3735024b9bd9"
        }
    }
]
```

<br>

**GET** /schedules/user/:userId <br>

Rota para listar todos os agendamentos de um usuário especifico. userId é o id do usuário o qual estamos buscando os agendamentos. Rota que necessita de autenticação.

Headers:

```javascript
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxlaWxhQG1haWwuY29tI...";
```

Resposta esperada:

```json
200
[
    {
        "service": "corte de cabelo",
        "time": "12:30:00",
        "date": "2023/1/11",,
        "id": "90c5f96a-30d8-4ea1-87d0-6983a2b20c8d",
        "user": {
            "isAdm": false,
            "cellphone": "00112223334",
            "email": "joana@mail.com",
            "name": "Joana",
            "id": "8cf164a5-b12a-40e5-8bf2-3735024b9bd9"
        }
    }
]
```

<br>

**PATCH** /schedules/:scheduleId <br>

Rota para atualizar um agendamento. scheduleId é o id do agendamento que estamos alterando. Rota que necessita de autenticação.

Headers:

```javascript
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxlaWxhQG1haWwuY29tI...";
```

Formato da requisição:

```json
{
  "date": "2023-01-15",
  "time": "12:30:00"
}
```

Resposta esperada:

```json
200
[
    {
        "service": "corte de cabelo",
        "time": "12:30:00",
        "date": "2023/1/15",,
        "id": "90c5f96a-30d8-4ea1-87d0-6983a2b20c8d",
        "user": {
            "isAdm": false,
            "cellphone": "00112223334",
            "email": "joana@mail.com",
            "name": "Joana",
            "id": "8cf164a5-b12a-40e5-8bf2-3735024b9bd9"
        }
    }
]
```

<br>
