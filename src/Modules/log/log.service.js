import { ObjectId } from 'mongodb';
import { db } from '../../DB/connection.js';

export const insertLogDocument = async (req, res, next) => {
  const body = req.body;

  if (!body || !body.book_id || !body.action)
    return res.status(400).json({ errMsg: 'Malformed body data' });

  const { book_id, action } = body;

  try {
    const doc = await db
      .collection('logs')
      .insertOne({ book_id: ObjectId(book_id), action });

    return res.status(200).json(doc);
  } catch (err) {
    next(err);
  }
};
