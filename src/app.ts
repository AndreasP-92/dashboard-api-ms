import express from 'express';
import cors from 'cors';
import { Router } from 'express';
import dotenv from 'dotenv';
import syncDb from './Startup/DbStartup.js';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import Swagger from './config/Swagger.js'
import router from './Routes/RoutesProvider.js';

dotenv.config();

if(process.env.ENVIRONMENT == "dev"){
  // syncDb.synchronizeDatabase();
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(Swagger.options)));

const port = process.env.PORT || 3002;

app.listen(port, () =>
  console.log(`Listening on port ${port} in ${process.env.ENVIRONMENT}`)
);