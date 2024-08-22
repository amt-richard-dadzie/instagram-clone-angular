/* eslint-disable @typescript-eslint/no-require-imports */

const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
  const targetPathProd = './src/environments/environment.ts';
  const targetPathDev = './src/environments/environment.development.ts';

  // Load node modules
  require('dotenv').config({
    path: 'src/environments/.env',
  });

  const envConfigFileProd = `export const environment = {
  AUTH_API_BASEURL: ${process.env['AUTH_API_BASEURL']}
  APN:${process.env['APN']}
  apiUrl: ${process.env['apiUrl']}
  rapidApiKey: ${process.env['rapidApiKey']}
  rapidApiHostName: ${process.env['rapidApiHostName']}
};`;

  writeFile(targetPathDev, envConfigFileProd, () => {
    console.log('I am on development');
  });

  writeFile(targetPathProd, envConfigFileProd, () => {
    console.log('I am on production');
  });
};

setEnv();
