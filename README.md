# Interactive Code Learnign Platform

Our primary idea is to develop a learning platform where students can learn in an interactive manner. In this app, there will be games, quizes, videos and other possible ways of interaction to keep the attention of the user.

## User and their roles:
- **Anonymous User:** Anonymous users will be able to register to our system. They can browse our site and view the brief of the courses. But the anonymous users cannot access the course contents. 
- **Registered User:** They will access the course contents and start learning. 
- **Instructor:** They will create the courses, evaluate assignments and update contents when necessary.
- **Admin:** Admin will have the highest privilege among all the users. An admin will monitor the system. An admin can add/remove instructors.

## Use cases of the system:

| Use case | Actor |
| ------- | ------ |
| Create Account | Anonymous user |
| Create/Update Course | Instructor |
| Find Course | All |
| Enroll Course | Registered User |
| Complete Course | Registered User |
| Manage Instructor | Admin |
| Set Quizzes | Instructor |
| Upload game | Admin |
| Play game | Registered User |

## Built with

The app uses the following technologies:

- Vue.js
- Node.js
- Express(Framework)
- Mysql(Database)
- Sass/CSS
- Adobe XD

## Authors

- [Md. Tahmidur Rafid](https://github.com/tahmidurrafid)
- [Nazrin Shukti](https://github.com/Shukti042)
- [Rabeeb Ibrat](https://github.com/RabeebIbrat)

## Installation

Interactive Code Learning Platform requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd iclp
npm install
node run dev
```

Install the dependencies and devDependencies and start the front-end client.

```sh
cd client
npm install
node run serve
```
