const run = require("./worker");

const INTERVAL_MS = Number(process.env.INTERVAL_MS) || 10_000;

console.log(`[scheduler] jalan tiap ${INTERVAL_MS / 1000} detik, Ctrl+C untuk berhenti`);
run();
setInterval(run, INTERVAL_MS);
