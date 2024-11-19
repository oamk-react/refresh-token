# Initial project for refresh token walkthrough

This repository contains simple NodeJS/Express and React application which cam be used as basis for refreshtoken walkthrough.

## Installationp instructions

In the project directory, you can run:

### `npm i`

This will retrieve all required node modules for React project (frontend).

In the server directory, run again:

### `npm i`

This will retrieve all required node modules for Node/Express (backend).

All configuration information is hardcoded and there is no need to create environment variables etc. Backend contains .rest file which uses REST Client for Visual Studio Code extension. File can be used to test out backend endpoints

To run application, start backend by running following command on server folder.

### `npm run devStart`

To run application, start frontend by running following command on root folder.

### `npm start`

Start browser on http://localhost:3000. Demo contains simple login and homescreens. Test credentials are admin@foo.com and adm123FOO?. Home screen cannot be accessed without login. At this point code uses simple access token without expiration date.
