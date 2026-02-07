import { Router } from 'express';
import {
  createCappedLogsCollection,
  createExplicitBooksCollection,
  createImplicitAuthorsCollection,
  indexBooksCollection,
} from './collection.service.js';

const collectionRouter = Router();

collectionRouter.post('/books', createExplicitBooksCollection);

collectionRouter.post('/authors', createImplicitAuthorsCollection);

collectionRouter.post('/logs/capped', createCappedLogsCollection);

collectionRouter.post('/books/index', indexBooksCollection);

export default collectionRouter;
