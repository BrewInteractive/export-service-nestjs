# Local Development Instructions

First, create your ".env" file. Then, you can follow the steps below.

Install the npm packages for the service requirements.

```bash
$ yarn install
```

You can run the project with one of the following commands.

```bash
# development
$ yarn start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Running Tests

There are unit and integration tests within the service, which are written using NestJS's built-in testing framework. You can run the tests using the following commands.

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```