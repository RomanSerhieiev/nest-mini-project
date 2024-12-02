### Summary
The following project provides REST API for Nest-mini-project

### Running LOCAL mode
1. Install all Node dependencies using:
   > npm install
2. Up docker compose container for PostgreSQL and Redis using:
   > npm start:docker:local
3. To start the application in watch mode, use the command:
   > run start:local

### Swagger
1. To open swagger use URL:
   > http://localhost:3000/docs
   
### Minio
1. To open minio use URL:
   > http://localhost:8001

### Migrations

* To apply on un-applied migrations to your database, use the command:
  > run migration:run
* To revert previously applied migration, use the command:
  > run migration:revert
* To create new empty migration, use the command:
  > run migration:create -name=MIGRATION-NAME
* To generate new migration based on the changes you've made, use the command:
  > run migration:generate -name=MIGRATION-NAME

### Formatting
* To check your code for lint issues and try fix, use the command:
  > npm run lint

### Building the application
* To build the application, use the command:
  > npm run build

### Testing
* To run tests on the application, use the command
  > npm run test
* To run test in development (watch) mode, use the command:
  > npm run test:dev
* To run test in debug mode, use the command:
  > npm run test:debug
* To run e2e tests, use the command:
  > npm run test:e2e
* To check tests coverage, use the command:
  > npm run test:cov

### Need to add:
* Rate limiting
* Add more tests
