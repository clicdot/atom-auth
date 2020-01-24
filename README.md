# MicroService--Atom-Authentication

This boilerplate was designed to be utilized as a Lambda or Serverless starter kit for NodeJS/Express.

To get started, just type the following command in the root directory.

```javascript
$ npm install
$ npm start
```

This application was written for use as a Lambda service.

This package contains the Claudia Serverless tool for deploying and updating deployed Lambda projects.

The purpose of this is to eliminate non-project dependencies from project dependencies. As the Dev Dependencies can easily add 100mb to the package and a Lambda package must be less than 50mb compressed.

If you compress the working _**./src**_ folder, current boilerplate is less than 12mb in compressed size.

## Build for Deployment

```javascript
$ npm run build
```

## AWS Lambda

For AWS Lambda you do not need the server host and port configuration as Lambda will provide that. So 'server.js' is not needed and only used to develop locally and test locally.

To deploy to AWS

```javascript
$ npm run lambda
```

You should see something like

```json
{
  "lambda": {
    "role": "Express-Lambda-Boilerplate-executor",
    "name": "Express-Lambda-Boilerplate",
    "region": "us-east-1"
  },
  "api": {
    "id": "ppbs0st5l2",
    "url": "https://ppbs0st5l2.execute-api.us-east-1.amazonaws.com/latest"
  }
}
```

a claudia.json file will be created in the root folder.

To update to AWS

```javascript
$ npm run lambda:update
```

To pack the application to test for size

```javascript
$ npm run lambda:pack
```

Documentation on using Serverless [Claudia Get Started](https://claudiajs.com/documentation.html)

__***Note:__ _You can use Serverless or ClaudiaJS or something else._

## dB Connectors

A plugin has been created to allow easy connection to MySQL

```text
./adapter/dbconnector.js
```

#### MySQL

> Line 13: uncomment this line.

> Set The DB Parameters in the .env file

```text
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=local_db
DB_USERNAME=root
DB_PASSWORD=root
```

## Development

Development instance of app uses _nodemon_ so the code can dynamically update when code changes are detected. [NodeMon Getting Started](https://github.com/remy/nodemon).

Git commits are limited by linting the code and running successful unit tests through a pre-commit hook. Please do not override this as it is not fair to others developers that have to discover and fix linting and code errors that do not belong to them.

```javascript
$ npm start
```

Server on http://localhost:{port}/api/v1

### Linting

```javascript
$ npm run lint
```

### Unit Tests

Unit test runner is TAP ([Test Anything Protocol](http://testanything.org/)).

- [Getting started with TAP](https://www.node-tap.org/basics/)
- [TAP Website](https://www.node-tap.org/)

```javascript
$ npm test
```

#### Code Coverage

```javascript
$ npm run test:coverage
```

### Load Test with Artillery

I've packaged a simple load test to demonstrate the scalabilty of nodeJS and Fastify.

The default load test run for 1 minute ata request of 100 requests per sec. The configuration file can be found in ./test-load/root.v1.yml and looks like this:

```javascript
config:
  target: 'http://localhost:{port}'
  phases:
    - duration: 60
      arrivalRate: 100
  defaults:
    headers:
scenarios:
  - flow:
    - get:
        url: "/v1/api"

```

By adjusting the _arrivalRate_ you can change the concurrent request per second. By adjusting the duration, you can stress test for a long period.

Be warned, if you are running this locally on your laptop, the load test does take  up a lot of CPU resources.

I've turned it up to 20,000 concurrent calls per second and my laptop start to crawl but I do not get any 502 or 504 errors. It runs slower but it never fails. It takes a long time to finish but it will finish and with all 200 success codes (1.2 million calls).

Unlike PHP which starts to fail around 300-400 concurrent calls per second. It thresholds up a bit to 600ish but at a failure rate of 30%-50%, throwing 502/504 errors. Nginx doesn't fail, it just stops connecting after a while because PHP times out or is unresponsive.

```javascript
$ npm run test:load
```

### Swagger

This app will auto-generate a swagger interactive documentation based on the endpoints in the project. Its pre-configured so no need to do anything, just build the endpoints using the folder & code organization.

Swagger Document on http://localhost:3200/swagger-ui-v1

_'swagger-jsdoc'_. [Getting Started](https://www.npmjs.com/package/swagger-jsdoc)

## UAT/Stage/Production Deployment

Since this is a Lambda service, you can't mock calls to the Lambda service. You either have to use AWS Lambda as a development bed or use the local server packaged for use with

```javascript
$ npm start
```

## API Uniform Response

Each API response will have a uniform response data structure. The primary structures are

- response
- data

with sub entries as follows

```json
{
  "response": {
    "code": 200,
    "id": "46489477-4eca-4a17-8f31-2197764517b4",
    "timestamp": "2019-05-29T06:53:14.125Z",
    "function": {
      "method": "GET",
      "url": "/api/v1/",
      "ip": "127.0.0.1",
      "apiVersion": "v1"
    },
    "messages": []
  },
  "data": {
    "test": "Help - V1 - get"
  }
}
```


# TODO

- Documentation on Routing and Controllers
- Documentation on ENV usage
- Documentation on Plugin (how to & usage)
- OAuth2.0 integration that supports Client Credentials
- Finish parameterizing variables that can be set in ENV or globally
- Finish Lambda service wrapper
