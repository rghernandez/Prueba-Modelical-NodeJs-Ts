# Prueba-Modelical-NodeJs-Ts
This is a simple Node.js API project built with Express.js and TypeScript.

## Installation
### Clone the repository:
`git clone https://github.com/rghernandez/Prueba-Modelical-NodeJs-Ts`
### Install dependencies:
`npm install`

## Usage
### Building the project
To compile TypeScript files to JavaScript, run:
`npm run build`
### Starting the server
To start the server, use the following command:
`npm start`
The API server will start at http://localhost:3000 by default. You can modify the port and other configurations in index.js or .env file.

## Development mode
During development, you can use the following command to run the server with hot-reloading (using ts-node-dev):
`npm run dev` 

## Linting
Lint your TypeScript files using:


`npm run lint`
## Testing
Run tests using Jest:
`npm test <name of the test you want to check>`

## Dependencies used 
- Express: Web framework for Node.js.
- Cors: Cross-Origin Resource Sharing middleware for Express.
- Zod: TypeScript-first schema declaration and validation library.

## Development Dependencies
- Jest: Testing Framework.
- Supertest: SuperAgent driven library for testing HTTP servers.
- ts-jest: TypeScript preprocessor for Jest.
- ts-node-dev: Ts-node for development with faster startup and restart.
- ts-standard: Linter (and formatter) for TypeScript.
