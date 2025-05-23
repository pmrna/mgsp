import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, "app.db");
console.log(__filename, __dirname, dbPath);

const db = new Database(dbPath, { verbose: console.log });
db.pragma("journal_mode = WAL");

const query = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        country TEXT NOT NULL,
        region TEXT NOT NULL,
        city TEXT NOT NULL,
        zip TEXT NOT NULL,
        address TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS perfumes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        price REAL NOT NULL,
        image TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        perfume_id INTEGER NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id),
        FOREIGN KEY(perfume_id) REFERENCES perfumes(id)
    );

    CREATE TABLE IF NOT EXISTS perfume_images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        perfume_id INTEGER NOT NULL,
        path TEXT NOT NULL,
        FOREIGN KEY (perfume_id) REFERENCES perfumes(id)        
    )
`;

db.exec(query);

export default db;

// add previously purchased (history) table, location & address in user
