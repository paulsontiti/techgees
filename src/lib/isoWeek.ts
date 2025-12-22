export function getISOWeek(date = new Date()) {
  const d = new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ));

  // ISO: Monday = 1, Sunday = 7
  const day = d.getUTCDay() || 7;

  // Move date to nearest Thursday
  d.setUTCDate(d.getUTCDate() + 4 - day);

  // First day of the year
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

  // Calculate week number
  const weekNumber = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  );

  return weekNumber;
}


export function startOfISOWeek(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay() || 7; // Sunday = 7
  d.setDate(d.getDate() - day + 1);
  d.setHours(0, 0, 0, 0);
  return d;
}
export function endOfISOWeek(date = new Date()) {
  const d = startOfISOWeek(date);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
}
