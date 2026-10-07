const db = require("./db");

function run() {
  const rows = db
    .prepare("SELECT category, COUNT(*) AS total FROM articles GROUP BY category")
    .all();
  const total = rows.reduce((sum, r) => sum + r.total, 0);
  console.log(`[worker ${new Date().toISOString()}] total artikel: ${total}`);
  console.table(rows);
  return total;
}

module.exports = run;

if (require.main === module) run();
