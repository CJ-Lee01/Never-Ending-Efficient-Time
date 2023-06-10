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

function addDate(date: Date, days: number): Date {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function daysSinceStart(num: number, dayOfWeek: string): number {
  return num * 7 + (dayValues.get(dayOfWeek) ?? 0);
}

export function convertWeeksToDateArray(weeks: any, startDate: Date, semester: number, day: string): Date[] {
  const offset = semester == 2 ? -1 : 0; //as sem 2 starts with week 1 but sem 1 starts with week 0.
  //I hate doing this but i need to set weeks to any. Otherwise typescript will complain and idk how to fix it.
  //Type checking is done in the functions.
  const isWeekRangeBool = isWeekRange(weeks);
  const isNumberArrayBool = isNumberArray(weeks)
  if (!(day in dayValues)) {
    return [];
  }
  if (!isNumberArrayBool && !isWeekRangeBool) {
    return [];
  }
  if (isNumberArrayBool) {
    return weeks.map((num: number) => addDate(startDate, daysSinceStart(num + offset, day)));
  }
  const newStartDate = addDate(new Date(weeks.start), dayValues.get(day) ?? 0);
  const newEndDate = addDate(new Date(weeks.end), dayValues.get(day) ?? 0);
  if (weeks.weeks) {
    return weeks.weeks.map((num: number) => addDate(startDate, daysSinceStart(num - 1, day)));
  }
  const weekInterval = weeks.weekInterval ?? 1;
  const dateList = []
  for (let date = newStartDate; date <= newEndDate; date = addDate(date, 7 * weekInterval)) {
    dateList.push(date);
  }
  return dateList;

}