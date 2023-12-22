# Export Service Installation and Deployment

To customize the service, review the [environment variables](https://github.com/BrewInteractive/export-service-nestjs/blob/main/docs/environment_variables.md) document.

## Deploying With Docker Compose

By creating the `docker-compose.yml` file, it is possible to deploy the project with `docker` commands below. You can visit the [Docker Hub Repository](https://hub.docker.com/r/brewery/export-service/tags) to review the versions.

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