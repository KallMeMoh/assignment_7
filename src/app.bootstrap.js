import express from 'express';
import { NODE_ENV, PORT } from '../config/config.service.js';
import { connectDB } from './DB/connection.js';

import logRouter from './Modules/log/log.controller.js';
import collectionRouter from './Modules/collection/collection.controller.js';
import bookRouter from './Modules/book/book.controller.js';

export default async function bootstrap() {
  const app = express();

  await connectDB();

  app.use(express.json());

  app.use('/logs', logRouter);
  app.use('/books', bookRouter);
  app.use('/collection', collectionRouter);

  app.use((err, req, res, next) => {
    console.error({ err });
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}
