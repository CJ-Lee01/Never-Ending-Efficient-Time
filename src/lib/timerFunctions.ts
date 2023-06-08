export function calculateHours(totalSeconds: number) {
  return Math.floor(totalSeconds / (60 * 60));
}

export function calculateMinutes(totalSeconds: number) {
  return Math.floor((totalSeconds / 60) % 60);
}

export function calculateSeconds(totalSeconds: number) {
  return Math.floor(totalSeconds % 60);
}

export function calculateTotalSeconds(
  hours: number,
  minutes: number,
  seconds: number
) {
  return hours * 60 * 60 + minutes * 60 + seconds;
}
