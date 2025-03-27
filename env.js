const z = require('zod');
const packageJSON = require('./package.json');
const path = require('path');
const APP_ENV = process.env.APP_ENV ?? 'development';
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`);

require('dotenv').config({
    path: envPath,
  });

  
const NAME = 'listicle-app'; // app name
const SCHEME = 'listicle-app'; // app scheme
const OWNER = 'thuohuynh';

const client = z.object({
    APP_ENV: z.enum(['development', 'staging', 'production']),
    NAME: z.string(),
    SCHEME: z.string(),
    VERSION: z.string(),
    OWNER: z.string(),

    // ADD YOUR CLIENT ENV VARS HERE
    API_URL: z.string(),
  });

const _clientEnv = {
    APP_ENV,
    NAME: NAME,
    SCHEME: SCHEME,
    VERSION: packageJSON.version,
    OWNER: OWNER,

    // ADD YOUR ENV VARS HERE TOO
    API_URL: process.env.API_URL,
};

const _env = {
    ..._clientEnv,
};
  

const parsed = client.safeParse(_env);

if (parsed.success === false) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors,
  
      `\n❌ Missing variables in .env.${APP_ENV} file, Make sure all required variables are defined in the .env.${APP_ENV} file.`,
      `\n💡 Tip: If you recently updated the .env.${APP_ENV} file and the error still persists, try restarting the server with the -c flag to clear the cache.`
    );
    throw new Error(
      'Invalid environment variables, Check terminal for more details '
    );
  }
  
  const Env = parsed.data;
  const ClientEnv = client.parse(_clientEnv);
  module.exports = {
    Env,
    ClientEnv,
  };
  