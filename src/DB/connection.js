import { MongoClient } from 'mongodb';
import { DB_NAME, MONGO_URI } from '../../config/config.service.js';

const client = new MongoClient(MONGO_URI);

export const db = client.db(DB_NAME);

export async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Server Successfully');
  } catch (error) {
    console.error({ error });
    process.exit(1);
  }
}
