const m = [
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

export default function formatDateString(dateString: string) {
  const arr = dateString.split("T");
  const [year, month, day] = arr[0].split("-");
  const str = `${day} ${m[parseInt(month)]} ${year} at ${arr[1]}`;
  return str;
}
