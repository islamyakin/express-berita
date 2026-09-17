const express = require("express");
const db = require("./db");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

app.get("/", (req, res) => {
  const articles = db
    .prepare("SELECT * FROM articles ORDER BY created_at DESC")
    .all();
  res.render("index", { articles });
});

app.get("/berita/baru", (req, res) => {
  res.render("new");
});

app.post("/berita", (req, res) => {
  const { title, category, body } = req.body;
  if (!title || !category || !body) {
    return res.status(400).render("new", { error: "Semua field wajib diisi." });
  }
  const slug = `${slugify(title)}-${Date.now()}`;
  db.prepare(
    "INSERT INTO articles (slug, title, category, body) VALUES (?, ?, ?, ?)"
  ).run(slug, title, category, body);
  res.redirect(`/berita/${slug}`);
});

app.get("/berita/:slug", (req, res) => {
  const article = db
    .prepare("SELECT * FROM articles WHERE slug = ?")
    .get(req.params.slug);
  if (!article) return res.status(404).render("not-found");
  res.render("show", { article });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Berita app running on http://localhost:${PORT}`));
