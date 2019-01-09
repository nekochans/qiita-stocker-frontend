# qiita-stocker-frontend

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

### Run your end-to-end tests
```
yarn run test:e2e
```

### Set the environment variables

##### 1.Create an .env file
##### 2.Add the environment variables
```
VUE_APP_API_URL_BASE=http://127.0.0.1:8000
VUE_APP_STAGE=local

VUE_APP_QIITA_CLIENT_ID=XXXX        // Your client ID
VUE_APP_QIITA_CLIENT_SECRET=XXXX    // Your client secret
VUE_APP_QIITA_REDIRECT_URI=http://localhost:8080/login
```

`.env` can be generated with npm script.

For example, to generate .env for the local environment, execute the following script.

`yarn run generateDotenv:local`

### deploy to S3

AWS credentials must be set with the following profile name.

Please check that `~/.aws/credentials` is in the following state.

```
[qiita-stocker-dev]
aws_access_key_id = Your client ID
aws_secret_access_key = Your client secret

[qiita-stocker-prod]
aws_access_key_id = Your client ID
aws_secret_access_key = Your client secret
```

For example, to deploy to a staging environment run the following script.

`yarn run deploy:stg`
