import express from 'express';
import cors from 'cors';
import { Router } from 'express';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Router());

const port = process.env.PORT || 3002;

app.listen(port, () =>
  console.log(`Listening on port ${port} in ${process.env.ENVIRONTMENT} mode && ${process.env.CONNECTED_DB} database mode`)
);