# Environment Variables

| Variable Name           | Description                                                                                             | Required | Default  |
| ----------------------- | ------------------------------------------------------------------------------------------------------- | -------- | -------- |
| ENVIRONMENT             | Specifies the environment name. If the environment name is given as `dev`, `Swagger` operates actively. | NO       | dev      |
| CORS                    | Website endpoints can be defined for Cors safety.                                                       | NO       | *        |
| PORT                    | It is determined which port will be deploy.                                                             | NO       | 3000     |
| GLOBAL_PREFIX           | Allows to add additional pathname to the service end.                                                   | NO       | -        |
| BODY_SIZE_LIMIT         | Specifies the maximum size of the data that will come from the body during the request.                 | NO       | 5mb      |
| API_KEY                 | It allows to add an api key control to the service for security during service use.                     | NO       | -        |