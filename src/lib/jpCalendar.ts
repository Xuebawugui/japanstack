const holidays2025 = new Set<string>([
  "2025-01-01",
  "2025-01-13",
  "2025-02-11",
  "2025-03-20",
  "2025-04-29",
  "2025-05-03",
  "2025-05-04",
  "2025-05-05",
  "2025-07-21",
  "2025-08-11",
  "2025-09-23",
  "2025-10-13",
  "2025-11-03",
  "2025-11-23",
]);

export function isHoliday(dateISO: string) {
  return holidays2025.has(dateISO);
}

export function nextBusinessDay(dateISO: string) {
  const d = new Date(dateISO);
  for (let i = 1; i <= 14; i++) {
    const t = new Date(d.getTime());
    t.setDate(d.getDate() + i);
    const iso = t.toISOString().slice(0, 10);
    const dow = t.getDay();
    const isWeekend = dow === 0 || dow === 6;
    if (!isWeekend && !isHoliday(iso)) return iso;
  }
  return dateISO;
}