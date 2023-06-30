import { Weeks, isNumberArray, isWeekRange } from "./NUSMod_ModuleTypes";

const dayValues: Map<string, number> = new Map([
  ['Monday', 0],
  ['Tuesday', 1],
  ['Wednesday', 2],
  ['Thursday', 3],
  ['Friday', 4],
  ['Saturday', 5],
  ['Sunday', 6],
])

export function addDate(date: Date, days: number): Date {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function daysSinceStart(num: number, dayOfWeek: string): number {
  return num * 7 + (dayValues.get(dayOfWeek) ?? 0);
}

export function convertWeeksToDateArray(weeks: any, startDate: Date, day: string): Date[] {
  const offset = -1; //the NUSMods academic year information starts with week 1 for both sem 1 and 2.
  //I hate doing this but i need to set weeks to any. Otherwise typescript will complain and idk how to fix it.
  //Type checking is done in the functions and function returns empty array if it fails the checks.
  const isWeekRangeBool = isWeekRange(weeks);
  const isNumberArrayBool = isNumberArray(weeks)
  if (dayValues.get(day) == undefined) {
    //alert(`invalid day ${day}`) usually we do not have to worry abt this since it is direct from NUSMods
    return [];
  }
  if (!isNumberArrayBool && !isWeekRangeBool) {
    return [];
  }
  if (isNumberArrayBool) {
    return weeks.map((num: number) => addDate(startDate, daysSinceStart(num + offset, day)));
  }
  const newStartDate = new Date(weeks.start);
  const newEndDate = new Date(weeks.end);
  if (weeks.weeks) {
    return weeks.weeks.map((num: number) => addDate(newStartDate, (num - 1) * 7));
  }
  const weekInterval = weeks.weekInterval ?? 1;
  const dateList = []
  for (let date = newStartDate; date <= newEndDate; date = addDate(date, 7 * weekInterval)) {
    dateList.push(date);
  }
  return dateList;

}

export function convertTimeStringToTimeObject(timeString: string): {hour: number, minute: number} {
  const number = parseInt(timeString);
  const hour = Math.floor(number / 100);
  const minute = number % 100;
  return {hour: hour, minute: minute};
}