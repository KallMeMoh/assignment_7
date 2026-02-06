import { Router } from 'express';
import { db } from '../../DB/connection.js';

const collectionRouter = Router();

collectionRouter.post('/books', async (req, res, next) => {
  try {
    await db.createCollection('books', {
      validator: {
        title: { $exists: true, $ne: '' },
      },
    });

    return res.status(200).json({ ok: 1 });
  } catch (error) {
    next(error);
  }
});

collectionRouter.post('/authors', (req, res, next) => {});

collectionRouter.post('/logs/capped', (req, res) => {});

collectionRouter.post('/books/index', (req, res) => {});

export default collectionRouter;
