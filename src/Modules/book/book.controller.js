import { Router } from 'express';
import {
  beforeYearService,
  bulkInsertBookService,
  excludeGenreService,
  findBookByGenreService,
  findBookByTitleService,
  findBookByYearService,
  firstAggregateService,
  fourthAggregateService,
  insertBookService,
  secondAggregateService,
  skipLimitService,
  thirdAggregateService,
  updateBookService,
  yearIntegerService,
} from './book.service.js';

const bookRouter = Router();

bookRouter.post('/', insertBookService);

bookRouter.post('/batch', bulkInsertBookService);

// /books/title?title=book2
bookRouter.get('/title', findBookByTitleService);

// /books/year?from=1990&to=2010
bookRouter.get('/year', findBookByYearService);

// /books/genre?genre=Science
bookRouter.get('/genre', findBookByGenreService);

bookRouter.get('/skip-limit', skipLimitService);

bookRouter.get('/year-integer', yearIntegerService);

bookRouter.get('/exclude-genres', excludeGenreService);

bookRouter.get('/before-year', beforeYearService);

bookRouter.get('/aggregate1', firstAggregateService);

bookRouter.get('/aggregate2', secondAggregateService);

bookRouter.get('/aggregate3', thirdAggregateService);

bookRouter.get('/aggregate4', fourthAggregateService);

bookRouter.patch('/:name', updateBookService);

export default bookRouter;
