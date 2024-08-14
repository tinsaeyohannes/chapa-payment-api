import dotenv from 'dotenv';
dotenv.config();

import * as http from 'http';
import app from './app';

const server = http.createServer(app);

const Port = process.env.PORT;

const main = async () => {
  try {
    server.listen(Port, () => {
      console.log(`Server listening at http://localhost:${Port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

main();
