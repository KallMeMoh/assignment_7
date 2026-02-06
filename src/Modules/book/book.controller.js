import { Router } from 'express';

const bookRouter = Router();

bookRouter.post('/');

bookRouter.post('/batch');

bookRouter.post('/:name');

// /books/title?title=...
bookRouter.post('/title');

// /books/year?from=1990&to=2010
bookRouter.post('/year');

// /books/genre?genre=Science
bookRouter.post('/genre?genre=Science');

bookRouter.post('/skip-limit');

bookRouter.post('/year-integer');

bookRouter.post('/exclude-genres');

bookRouter.post('/before-year');

bookRouter.post('/aggregate1');

bookRouter.post('/aggregate2');

bookRouter.post('/aggregate3');

bookRouter.post('/aggregate4');

export default bookRouter;
