import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve paths to the database files
const dbPath = path.resolve(__dirname, '../../db/movies.db');
const ratingsPath = path.resolve(__dirname, '../../db/ratings.db');

// Initialize the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Failed to connect to movies.db:', err.message);
  } else {
    console.log('Connected to movies.db');

    // Attach the ratings.db
    db.exec(`ATTACH DATABASE '${ratingsPath}' AS ratingsDb`, (attachErr) => {
      if (attachErr) {
        console.error('Failed to attach ratings.db:', attachErr.message);
      } else {
        console.log('Attached ratings.db as ratingsDb');
      }
    });
  }
});

export default db;
