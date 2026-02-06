import { config } from 'dotenv';
import { resolve } from 'path';

export const NODE_ENV = process.env.NODE_ENV ?? 'development';
const envPath = {
  development: '.env.development',
  production: '.env.production',
};

config({
  path: resolve(`./config/${envPath[NODE_ENV]}`),
});

export const PORT = process.env['PORT'] || 3000;

export const MONGO_URI = process.env['MONGO_URI'];
export const DB_NAME = process.env['DB_NAME'];
