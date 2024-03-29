import express from 'express';
import cors from 'cors';
import { Router } from 'express';
import dotenv from 'dotenv';
import syncDb from './Startup/DbStartup.js';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import Swagger from './config/Swagger.js'
import router from './Routes/RoutesProvider.js';
import { Request, Response } from 'express';

dotenv.config();

if (parseInt(process.env.SQL_SYNC_DATA) === 1) {
  syncDb.synchronizeDatabase();
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(Swagger.options)));

const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`Listening on port ${port} in ${process.env.ENVIRONMENT}`)
);

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
})