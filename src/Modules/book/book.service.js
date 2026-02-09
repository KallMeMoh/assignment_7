import { db } from '../../DB/connection.js';

export const insertBookService = async (req, res, next) => {
  const body = req.body;

  if (!body || !body.title || !body.author || !body.genres || !body.year)
    return res.status(400).json({ errMsg: 'Malformed body data' });

  const { title, author, genres, year } = body;

  try {
    const result = await db
      .collection('books')
      .insertOne({ title, author, genres, year });

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const bulkInsertBookService = async (req, res, next) => {
  const body = req.body;

  if (!body || !body.books)
    return res.status(400).json({ errMsg: 'Malformed body data' });

  const { books } = body;

  try {
    const result = await db.collection('books').insertMany(books);

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateBookService = async (req, res, next) => {
  try {
    const { acknowledged, matchedCount, modifiedCount } = await db
      .collection('books')
      .updateOne({ title: req.params.name }, { $set: { year: 2022 } });

    return res.status(200).json({ acknowledged, matchedCount, modifiedCount });
  } catch (err) {
    next(err);
  }
};

export const findBookByTitleService = async (req, res, next) => {
  if (!req.query.title)
    return res.status(400).json({ errMsg: 'Malformed query data' });

  try {
    const result = await db
      .collection('books')
      .findOne({ title: req.query.title });

    if (!result) return res.status(404).json({ errMsg: 'Book not found' });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const findBookByYearService = async (req, res, next) => {
  if (!req.query.from || !req.query.to)
    return res.status(400).json({ errMsg: 'Malformed query data' });

  try {
    console.log(req.query);
    const result = await db
      .collection('books')
      .find({
        year: { $gte: parseInt(req.query.from), $lte: parseInt(req.query.to) },
      })
      .toArray();

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const findBookByGenreService = async (req, res, next) => {
  if (!req.query.genre)
    return res.status(400).json({ errMsg: 'Malformed query data' });

  try {
    const result = await db
      .collection('books')
      .find({ genres: { $in: [req.query.genre] } })
      .toArray();

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const skipLimitService = async (req, res, next) => {
  try {
    const result = await db
      .collection('books')
      .find()
      .skip(2)
      .limit(3)
      .sort({ year: 1 })
      .toArray();

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const yearIntegerService = async (req, res, next) => {
  try {
    const result = await db
      .collection('books')
      .find({ year: { $type: 'number' } })
      .toArray();
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const excludeGenreService = async (req, res, next) => {
  try {
    const result = await db
      .collection('books')
      .find({ genres: { $nin: ['Horror', 'SciFi'] } })
      .toArray();
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const beforeYearService = async (req, res, next) => {
  if (!req.query.year)
    return res.status(400).json({ errMsg: 'Malformed query data' });

  try {
    const result = await db
      .collection('books')
      .find({ year: { $lt: parseInt(req.query.year) } })
      .toArray();
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const firstAggregateService = async (req, res, next) => {
  try {
    const result = await db
      .collection('books')
      .aggregate([{ $match: { year: { $gt: 2000 } } }, { $sort: { year: -1 } }])
      .toArray();
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const secondAggregateService = async (req, res, next) => {
  try {
    const result = await db
      .collection('books')
      .aggregate([
        { $match: { year: { $gt: 2000 } } },
        { $project: { _id: 0, title: 1, author: 1, year: 1 } },
      ])
      .toArray();
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const thirdAggregateService = async (req, res, next) => {
  try {
    const result = await db
      .collection('books')
      .aggregate([
        { $project: { _id: 0, title: 1, genres: 1 } },
        { $unwind: '$genres' },
      ])
      .toArray();
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const fourthAggregateService = async (req, res, next) => {
  try {
    const result = await db
      .collection('logs')
      .aggregate([
        {
          $lookup: {
            from: 'books',
            localField: 'book_id',
            foreignField: '_id',
            as: 'book_details',
          },
        },
        {
          $project: {
            _id: 0,
            action: 1,
            'book_details.title': 1,
            'book_details.author': 1,
            'book_details.year': 1,
          },
        },
      ])
      .toArray();
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
