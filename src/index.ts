import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from './config';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => console.log(error));
