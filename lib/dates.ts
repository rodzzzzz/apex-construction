const CENTRAL_OFFSET_MS = -5 * 60 * 60 * 1000;

const WEEKDAYS_LONG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

const WEEKDAYS_SHORT = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const;

const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function centralNow() {
  return new Date(Date.now() + CENTRAL_OFFSET_MS);
}

export function austinToday() {
  return centralNow().toISOString().slice(0, 10);
}

export function austinHour() {
  return centralNow().getUTCHours();
}

export function staffGreeting(hour = austinHour()) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function austinDayRange() {
  const today = austinToday();
  const start = new Date(`${today}T00:00:00-05:00`);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start: start.toISOString(), end: end.toISOString(), today };
}

export function formatAustinDay(iso: string) {
  const central = new Date(new Date(iso).getTime() + CENTRAL_OFFSET_MS);
  const weekday = central.getUTCDay();
  const month = central.getUTCMonth();
  const day = central.getUTCDate();
  return `${WEEKDAYS_SHORT[weekday]} ${MONTHS_SHORT[month]} ${day}`;
}

export function formatClockTime(time: string) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time.trim());
  if (!match) return time;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

export function formatStaffDate() {
  const today = austinToday();
  const [year, month, day] = today.split("-").map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return `${WEEKDAYS_LONG[weekday]}, ${MONTHS_LONG[month - 1]} ${day}`;
}
