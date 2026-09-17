const path = require("node:path");
const Database = require("better-sqlite3");

const db = new Database(path.join(__dirname, "berita.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

if (db.prepare("SELECT COUNT(*) AS n FROM articles").get().n === 0) {
  const seed = db.prepare(
    "INSERT INTO articles (slug, title, category, body) VALUES (?, ?, ?, ?)"
  );
  const categories = ["Nasional", "Ekonomi", "Teknologi", "Olahraga", "Hiburan"];
  const paragraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  ].join("\n\n");

  const insertMany = db.transaction(() => {
    for (let i = 1; i <= 8; i++) {
      seed.run(
        `berita-lorem-ipsum-${i}`,
        `Berita Lorem Ipsum ke-${i}: Dolor Sit Amet Consectetur`,
        categories[i % categories.length],
        paragraphs
      );
    }
  });
  insertMany();
}

module.exports = db;
