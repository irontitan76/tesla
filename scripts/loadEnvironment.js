/*
  Loading environment variables from an .env file during the npm install
  process in an Nx workspace can be a bit tricky since npm install does not
  inherently support scripting hooks like preinstall scripts in a
  straightforward way.

  For the production environment, the environment variables should already
  be injected.
*/
if (process.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env.local' });
  console.log('Loaded environment configuration');
}
