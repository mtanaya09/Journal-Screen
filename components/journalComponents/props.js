export const JournalEntry = {
  id: Number(),
  date: {
    year: Number(),
    month: Number(),
    day: Number(),
    hour: Number(),
    minute: Number(),
  },
  title: String(),
  content: String(),
};
export const JournalFolder = {
  id: Number(),
  name: String(),
  entries: Array(JournalEntry),
};
export const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const monthsOfTheYear = [
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
];
