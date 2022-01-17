import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { router } from './routes';

import path from 'path';

const port = process.env.PORT || 3333;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(router);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(port, () => {
  console.log('starting service🚀');
});

// CHOKIDAR_USEPOLLING=true
