import { db } from '../../DB/connection.js';

export const createExplicitBooksCollection = async (req, res, next) => {
  try {
    await db.createCollection('books', {
      validator: {
        $and: [{ title: { $exists: true } }, { title: { $ne: '' } }],
      },
    });

    return res.status(200).json({ ok: 1 });
  } catch (error) {
    next(error);
  }
};

export const createImplicitAuthorsCollection = async (req, res, next) => {
  const body = req.body;

  if (!body || !body.name || !body.nationality)
    return res.status(400).json({ errMsg: 'Malformed body data' });

  const { name, nationality } = body;

  try {
    const doc = await db.collection('authors').insertOne({ name, nationality });

    return res.status(200).json(doc);
  } catch (err) {
    next(err);
  }
};

export const createCappedLogsCollection = async (req, res, next) => {
  try {
    await db.createCollection('logs', {
      capped: true,
      size: 1024 * 1024,
    });
    return res.status(200).json({ ok: 1 });
  } catch (err) {
    next(err);
  }
};

export const indexBooksCollection = async (req, res, next) => {
  try {
    const result = await db.collection('books').createIndex({ title: 1 });
    return res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};
