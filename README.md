# Express Typescript Mikro-Orm Boilerplate

This template can be used as a feature complete server application.
Then you can directly develop and not be doing configurations for hours ;)

If you got any feedback, I'm open to suggestions
Inspired by some awesome templates from awesome people <a href="https://github.com/w3tecch/express-typescript-boilerplate/">w3tecch</a> and <a href="https://github.com/mikro-orm/express-ts-example-app">mikro-orm</a>
<br/>
<sub>Made with love by <a href="https://github.com/blanquartf">blanquartf</a></sub>

<br />

### Features

- **API Testing** with included e2e testing.
- **Dependency Injection** done with the nice framework from [TypeDI](https://github.com/pleerock/typedi).
- **Simplified Database Query** with the ORM [mikro-orm](https://github.com/mikro-orm/mikro-orm).
- **Clear Structure** with different layers such as controllers, services, repositories, models, middlewares...
- **Easy Exception Handling** thanks to [routing-controllers](https://github.com/typestack/routing-controllers).
- **Smart Validation** thanks to [class-validator](https://github.com/typestack/class-validator) with some nice annotations.
- **API Documentation** thanks to [swagger](http://swagger.io/) and [routing-controllers-openapi](https://github.com/epiphone/routing-controllers-openapi).
- **API Monitoring** thanks to [express-status-monitor](https://github.com/RafalWilinski/express-status-monitor).
- **Integrated Testing Tool** thanks to [Jest](https://github.com/mochajs/mocha).
- **E2E API Testing** thanks to [supertest](https://github.com/visionmedia/supertest).
- **Basic Security Features** thanks to [Helmet](https://helmetjs.github.io/).
- **Fast Database Building** with simple migration from [mikro-orm](https://github.com/mikro-orm/mikro-orm).
- **Easy Data Seeding** with our own factories.

## ❯ Table of Contents

- [Getting Started](#-getting-started)
- [Scripts and Tasks](#-scripts-and-tasks)
- [Debugger in VSCode](#-debugger-in-vscode)
- [API Routes](#-api-routes)
- [Project Structure](#-project-structure)
- [Logging](#-logging)
- [Further Documentations](#-further-documentations)
- [License](#-license)

## ❯ Getting Started

### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

Install yarn globally

```bash
npm install yarn -g
```

Install a Postgresql database.

> If you work with a mac, we recommend to use homebrew for the installation.

### Step 2: Create new Project

Fork or download this project. Configure your package.json for your new project.

Then copy the `.env.example` file and rename it to `.env`. In this file you have to add your database connection information.

Then copy the `.env.test.example` file and rename it to `.env`. In this file you have to add your e2e testing database connection information.

Create new databases with the name you have in your `.env`-files.

Then setup your application environment.

```bash
yarn install
```

> This installs all dependencies with yarn.

### Step 3: Serve your App

Go to the project dir and start your app with this yarn script.

```bash
yarn dev
```

> This starts a local server using `nodemon`, which will watch for any file changes and will restart the server according to these changes.
> The server address will be displayed to you as `http://0.0.0.0:3000`.


## ❯ Scripts and Tasks

All script are defined in the `package.json` file.

### Install

- Install all dependencies with `yarn install`

### Linting

- Run code quality analysis using `yarn lint`. This runs tslint.
- There is also a vscode task for this called `lint`.

### Tests

- Run the unit tests using `yarn test`.

### Running in dev mode

- Run `yarn dev` to start nodemon with ts-node, to serve the app.
- The server address will be displayed to you as `http://0.0.0.0:3000`

### Building the project and run it

- Run `yarn build` to generated all JavaScript files from the TypeScript sources (There is also a vscode task for this called `build`).
- To start the builded app located in `dist` use `yarn start`.

### Execute Database Migrations

- Run `yarn mikro-orm migration:up` to execute migrations and setup the database

## ❯ Debugger in VSCode

To debug your code run `yarn dev:debug` 
Then, just set a breakpoint and hit <kbd>F5</kbd> in your Visual Studio Code.

## ❯ API Routes

The route prefix is `/api/v1` by default, but you can change this in the .env file.
The swagger and the monitor route can be altered in the `.env` file.

| Route          | Description |
| -------------- | ----------- |
| **/swagger**   | This is the Swagger UI with our API documentation |
| **/monitor**   | Shows a small monitor page for the server |
| **/api/v1/users** | Example entity endpoint |

## ❯ Project Structure

| Name                              | Description |
| --------------------------------- | ----------- |
| **.vscode/**                      | VSCode tasks for debugging
| **dist/**                         | Compiled source files will be placed here |
| **logs/**                         | The logs will be placed here |
| **src/**                          | Source files |
| **src/api/controllers/**          | REST API Controllers |
| **src/api/interceptors/**         | Interceptors are used to change or replace the data returned to the client. |
| **src/api/middlewares/**          | Express Middlewares like helmet security features |
| **src/api/models/**               | Models for communicating with server |
| **src/core/initializers**         | The core initializers like logger and env variables |
| **src/core/middleware**           | The core express middlewares like error handling |
| **src/core/services**             | The core services |
| **src/database/migrations**                    | Database migration scripts |
| **src/database/entities**         | Database entities |
| **test/integration/**             | Integration test with Postgresql |
| .env.example                      | Environment configurations |
| .env.test.example                 | Test environment configurations |

## ❯ Logging

Our logger is [winston](https://github.com/winstonjs/winston).
I created a simple service for injecting the logger in your app (see example below).

```typescript
import LogService from '../../core/services/LogService';

@Service()
export class UserService {

    constructor(
        public logger: LogService
    ) { }

    ...
```

## ❯ Further Documentations

| Name & Link                       | Description                       |
| --------------------------------- | --------------------------------- |
| [Express](https://expressjs.com/) | Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. |
| [TypeDI](https://github.com/pleerock/typedi) | Dependency Injection for TypeScript. |
| [routing-controllers](https://github.com/pleerock/routing-controllers) | Create structured, declarative and beautifully organized class-based controllers with heavy decorators usage in Express / Koa using TypeScript and Routing Controllers Framework. |
| [Mikro-Orm](https://mikro-orm.io/) | Mikro-Orm is an ORM based on query builder knex. |
| [class-validator](https://github.com/pleerock/class-validator) | Validation made easy using TypeScript decorators. |
| [class-transformer](https://github.com/pleerock/class-transformer) | Proper decorator-based transformation / serialization / deserialization of plain javascript objects to class constructors |
| [Helmet](https://helmetjs.github.io/) | Helmet helps you secure your Express apps by setting various HTTP headers. It’s not a silver bullet, but it can help! |
| [Mocha](https://mochajs.org/) | Delightful JavaScript Testing Library for unit and e2e tests |
| [supertest](https://github.com/visionmedia/supertest) | Super-agent driven library for testing node.js HTTP servers using a fluent API |
| [swagger Documentation](http://swagger.io/) | API Tool to describe and document your api. |

## ❯ License

[MIT](/LICENSE)
