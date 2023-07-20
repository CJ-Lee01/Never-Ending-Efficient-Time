export function containsObject(obj: any, list: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) {
  var x;
  for (x in list) {
    if (list.hasOwnProperty(x) && list[x] === obj) {
      return true;
    }
  }

  return false;
}

export function toDateTimeLocalHTMLString(day: Date): string {
  const resultDate = new Date(day.valueOf() - day.getTimezoneOffset() * 60 * 1000)
  return resultDate.toISOString().slice(0, 16)
}