const db = require("./db");

const INTERVAL_MS = Number(process.env.INTERVAL_MS) || 10_000;

function run() {
  const { n } = db.prepare("SELECT COUNT(*) AS n FROM articles").get();
  console.log(`[scheduler ${new Date().toISOString()}] total artikel: ${n}`);
}

console.log(`[scheduler] jalan tiap ${INTERVAL_MS / 1000} detik, Ctrl+C untuk berhenti`);
run();
setInterval(run, INTERVAL_MS);
