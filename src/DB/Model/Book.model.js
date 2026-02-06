import { db } from '../connection';

// exciplicit
export const BookModel = await db.createCollection('book');
