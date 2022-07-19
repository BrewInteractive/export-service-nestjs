<div align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <h1>EXPORT SERVICE</h1>
</div>


## Description
It is a service created for Export processes. The project was written with [Nest](https://github.com/nestjs/nest) Framework.

## Instructions
### Installation

```bash
$ yarn install
```

### Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

### Docker Compose
By creating the `docker-compose.yml` file, it is possible to deploy the project with `docker` commands below.
```yml
version: "3"
services:
  serve:
    container_name: export-service
    image: brewery/export-service:latest
    expose:
      - ${PORT}
    restart: always
    ports:
      - "${PORT}:${PORT}"
    env_file:
      - .env
```

```bash
$ docker-compose up -d
```
## Environment Variables

| Variable Name           | Description                                                                                             | Required | Default  |
| ----------------------- | ------------------------------------------------------------------------------------------------------- | -------- | -------- |
| ENVIRONMENT             | Specifies the environment name. If the environment name is given as `dev`, `Swagger` operates actively. | NO       | dev      |
| CORS                    | Website endpoints can be defined for Cors safety.                                                       | NO       | *        |
| PORT                    | It is determined which port will be deploy.                                                             | NO       | 3000     |
| GLOBAL_PREFIX           | Allows to add additional pathname to the service end.                                                   | NO       | -        |
| BODY_SIZE_LIMIT         | Specifies the maximum size of the data that will come from the body during the request.                 | NO       | 5mb      |
| API_KEY                 | It allows to add an api key control to the service for security during service use.                     | NO       | -        |

## Request Examples

### HTML to PDF

The parameters that can be sent in the body are in the table below.

| Key       | Description                                                                            | Required | Type            | Defult      |
| --------- | -------------------------------------------------------------------------------------- | -------- | --------------- | ----------- |
| fileName  | Created PDF file represents its name.                                                  | YES      | string          | -           |
| type      | Determines the type of transformation of the incoming data.                            | YES      | enum(HTML, URL) | -           |
| html      | HTML string to be converted to PDF is sent in format.                                  | NO       | string          | -           |
| url       | The HTML response that comes with the request for GET is converted to PDF.             | NO       | string          | -           |
| format    | Specifies the PDF page size.                                                           | NO       | enum(letter, legal, tabloid, ledger, a0, a1, a2, a3, a4, a5, a6)          | a4          |

REQ
```json
// POST {{endpoint}}/{{GLOBAL_PREFIX}}/html-to-pdf
{
    "url": "https://google.com.tr",
    "type": "url",
    "fileName": "hello-word",
    "format": "a3",
}
```

```json
// POST {{endpoint}}/{{GLOBAL_PREFIX}}/html-to-pdf
{
    "html": "<h1>Hello Word</h1>",
    "type": "html",
    "fileName": "hello-word",
    "format": "a2",
}
```
## License

Export Service is [MIT licensed](LICENSE).
