const fmtFull = new Intl.DateTimeFormat("vi-VN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
});

const fmtShort = new Intl.DateTimeFormat("vi-VN", {
  day: "numeric",
  month: "numeric",
});

/** "Thứ ba, ngày 17 tháng 2 năm 2026" */
export function formatFull(d: Date): string {
  return fmtFull.format(d);
}

/** "17/2" */
export function formatDayMonth(d: Date): string {
  return fmtShort.format(d);
}
