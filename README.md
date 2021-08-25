## Pictionary

##### Draw and guess

Team play application, built with Node, Express, and Typescript.

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`

To Start Server:

`npm start`

To Visit App:

`localhost:3000`

### Start postgres db

`docker run -d --name postgres -e POSTGRES_HOST_AUTH_METHOD=trust -p 5432:5432 postgres:12-alpine` \*- start postgres db localy on 5432.
