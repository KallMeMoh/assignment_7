import { MongoClient } from 'mongodb';
import { MONGO_URI } from '../../config/config.service';

const client = new MongoClient(MONGO_URI);

export const db = client.db('assignment_7');

// export const
