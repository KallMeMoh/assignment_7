import { Router } from 'express';

const collectionRouter = Router();

collectionRouter.post('/books');

collectionRouter.post('/authors');

collectionRouter.post('/logs/capped');

collectionRouter.post('/books/index');

export default collectionRouter;
