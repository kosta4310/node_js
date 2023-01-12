# Simple CRUD API

... written by TypeScript with Node.js.

Task [https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

## 💻 How to install

Clone and install repository and then take branch crud_api

```
git clone https://github.com/kosta4310/node_js

cd node_js

git checkout crud_api_V1.1

```

Install packages

```

npm i

```

Change name of file .env.example to .env and write following text down

```

PORT=4000

DB_PORT=8000

```

## 🚀 How to run

Run the application in development mode

```

npm run start:dev

```

Run the application in production mode

```

npm run start:prod

```

Run tests scenarios for API

```

npm test

```

Run cluster mode with default load balancer and one in-memory-database for all workers

```

npm run start:multi

```

In console you can watch which worker response on the request. Workers should round-robin and data from database should be consistent for all workers.

## 💥 API

Implemented endpoint: `api/users`

`GET api/users` - to get all users

- Server should answer with status code 200 and array of all users records

`GET api/users/${userId}` - to get user by id (uuid)

- Server should answer with status code 200 and and record with id === userId if it exists
- Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
- Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

`POST api/users` - to create record about new user and store it in database

- Server should answer with status code 201 and newly created record
- Server should answer with status code 400 and corresponding message if request body does not contain required fields

`PUT api/users/${userId}` - to update existing user (**all fields required**)

- Server should answer with status code 200 and updated record
- Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
- Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

`DELETE api/users/${userId}` - to delete existing user from database

- Server should answer with status code 204 if the record is found and deleted
- Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
- Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

### User's mandratory fields

- `username` — user's name (string, **required**)

- `age` — user's age (number, **required**)

- `hobbies` — user's hobbies (array of strings or empty array, **required**)

## ⚙️ Postman

You can find Postman collection with all relized API requests in the root of the repository.

Have fun! :)

```
Для проверяющих
слещ в конце урла поначалу обрабатывал, но потом переписал код и сделал это ошибкой, так как Максим в видеоразборе так сказал делать
age >= 0
респонс обьект json
error -> text
по дефолту апп запускается на 4000, а база на 8000 порту
в файле энв нужно задать значение портов
в консоли дождать вывода всех логов
в мульти режиме будет выводиться номер порта воркера который принял запрос
```
