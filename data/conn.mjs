import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.ATLAS_URI);

let conn;
try {
    conn = await client.connect();
    console.log('connected')
} catch (e) {
    console.error(e);
}

// we are accessing database in the mongoDB compass sample data
let db = conn.db("sample_training");

export default db;