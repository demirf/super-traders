import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from './config';
import tradeRoutes from "./routes/trade.routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

AppDataSource.initialize()
  .then(() => {
    app.use('/trades', tradeRoutes);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => console.log(error));
