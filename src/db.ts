import { MongoClient, Db } from 'mongodb';

import  config  from 'config';
import mongoose from 'mongoose';

// const mongoURI = config.get('db.MONGO_URI')
const uri = 'mongodb://admin:123@127.0.0.1:27017/user-info';
const client = new MongoClient(uri);

let db: Db;

export async function connectToDB() {
  
  // try {

    mongoose
  .connect(uri!, {
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  });

  //   await client.connect();
  //   db = client.db();
  //   console.log('Connected to MongoDB');
  // } catch (err) {
  //   console.error('Error connecting to MongoDB:', err);
  //   process.exit(1);
  // }

}
export function getDB(): Db {
  return db;
}
