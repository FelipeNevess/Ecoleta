import express from 'express';
import { router } from './routes';

const app = express();
app.use(express.json());

app.use('/items', router);

app.listen(3333, () => {
  console.log('starting service🚀');
})
