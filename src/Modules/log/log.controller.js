import { Router } from 'express';
import { insertLogDocument } from './log.service.js';

const logRouter = Router();

logRouter.post('/', insertLogDocument);

export default logRouter;
