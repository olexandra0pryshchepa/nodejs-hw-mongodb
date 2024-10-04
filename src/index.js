require('dotenv').config();
const setupServer = require('./server');
const initMongoConnection = require('./db/initMongoConnection');

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();

