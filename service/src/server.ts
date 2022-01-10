import express from 'express';
import cors from 'cors';

import { router } from './routes';

import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333, () => {
  console.log('starting service🚀');
});
