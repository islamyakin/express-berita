let count = 0;

console.log("[worker] jalan, hitung tiap 10 detik. Ctrl+C untuk berhenti");
setInterval(() => console.log(`[worker] ${++count}`), 10_000);
