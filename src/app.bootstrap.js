import express from 'express';
import { NODE_ENV, PORT } from '../config/config.service.js';

export default async function bootstrap() {
  const app = express();

  app.use(express.json());

  app.use('{/*dummy}', (req, res) => {
    return res.status(404).json({ message: 'Page not found' });
  });

  app.use((err, req, res, next) => {
    const status = err.cause?.status ?? 500;
    return res.status(status).json({
      message: err.message ?? 'Something went wrong',
      stack: NODE_ENV === 'development' ? err.stack : undefined,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}
