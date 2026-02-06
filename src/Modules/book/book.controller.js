import { Router } from 'express';

const bookRouter = Router();

bookRouter.post('/', (req, res) => {});

bookRouter.post('/batch', (req, res) => {});

bookRouter.post('/:name', (req, res) => {});

// /books/title?title=...
bookRouter.post('/title', (req, res) => {});

// /books/year?from=1990&to=2010
bookRouter.post('/year', (req, res) => {});

// /books/genre?genre=Science
bookRouter.post('/genre', (req, res) => {});

bookRouter.post('/skip-limit', (req, res) => {});

bookRouter.post('/year-integer', (req, res) => {});

bookRouter.post('/exclude-genres', (req, res) => {});

bookRouter.post('/before-year', (req, res) => {});

bookRouter.post('/aggregate1', (req, res) => {});

bookRouter.post('/aggregate2', (req, res) => {});

bookRouter.post('/aggregate3', (req, res) => {});

bookRouter.post('/aggregate4', (req, res) => {});

export default bookRouter;
