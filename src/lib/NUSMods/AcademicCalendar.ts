import { stringify } from "querystring";

type startDate = [number, number, number];

type academicCalendarMapInfo = { "start": startDate }[]

export interface academicYearInfo {
  year1: number;
  year2: number;
}

const academicCalendar = new Map<string, academicCalendarMapInfo>([
  ["2014/2015", [
    { "start": [2014, 8, 11] },
    { "start": [2015, 1, 12] }
  ]],
  ["2015/2016", [
    { "start": [2015, 8, 10] },
    { "start": [2016, 1, 11] }
  ]],
  ["2016/2017", [
    { "start": [2016, 8, 8] },
    { "start": [2017, 1, 9] }
  ]],
  ["2017/2018", [
    { "start": [2017, 8, 14] },
    { "start": [2018, 1, 15] }
  ]
  ],
  ["2018/2019",
    [
      { "start": [2018, 8, 13] },
      { "start": [2019, 1, 14] }
    ]
  ],
  ["2019/2020",
    [
      { "start": [2019, 8, 12] },
      { "start": [2020, 1, 13] },
      { "start": [2020, 5, 11] },
      { "start": [2020, 6, 22] }
    ]
  ],
  ["2020/2021",
    [
      { "start": [2020, 8, 10] },
      { "start": [2021, 1, 11] },
      { "start": [2021, 5, 10] },
      { "start": [2021, 6, 21] }
    ]
  ],
  ["2021/2022",
    [
      { "start": [2021, 8, 9] },
      { "start": [2022, 1, 10] },
      { "start": [2022, 5, 9] },
      { "start": [2022, 6, 20] }
    ]
  ],
  ["2022/2023",
    [
      { "start": [2022, 8, 8] },
      { "start": [2023, 1, 9] },
      { "start": [2023, 5, 8] },
      { "start": [2023, 6, 19] }
    ]
  ],
  ["2023/2024",
    [
      { "start": [2023, 8, 7] },
      { "start": [2024, 1, 15] },
      { "start": [2024, 5, 13] },
      { "start": [2024, 6, 24] }
    ]
  ]
])

const semesterString = new Map<number, string>( //The default semData string.
  [
    [1, "sem 1"],
    [2, "sem 2"],
    [3, "st 1"],
    [4, "st 2"]
  ]
)

export function semStringBuilder(acadYear: academicYearInfo, semNum: number) {
  return semesterString.get(semNum)
    ? `AY ${acadYear.year1}/${acadYear.year2} ${semesterString.get(semNum)}`
    : ""
}

export const getacademicYearList: () => string[] = () => {
  const arr: string[] = [];
  const acadCalIterator = academicCalendar.keys();
  for (let year = acadCalIterator.next().value; year != undefined; year = acadCalIterator.next().value) {
    arr.push(year)
  }
  arr.sort();
  return arr;
}

const defaultStart = { start: [0, 1, 0] };

export function getStartDate(acadYear: academicYearInfo, semester: number) {
  const yearInfo = academicCalendar.get(`${acadYear.year1}/${acadYear.year2}`);
  const dateStart = (yearInfo ? yearInfo[semester - 1] : defaultStart) ?? defaultStart;
  const dateArray = dateStart.start;
  return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]); //-1 due to month data for js Date starting from 0 instead of 1.
}

export function convertAcadYearStringToArray(acadYearString: string): { result: academicYearInfo | null, error: string } {
  const arr = acadYearString.split('/').map(x => parseInt(x));
  if (arr.length != 2) {
    return { result: null, error: "Invalid Year" };
  }
  for (const num of arr) {
    if (Number.isNaN(num)) {
      return { result: null, error: "Invalid Year" };
    }
  }
  return {
    result: { year1: arr[0], year2: arr[1] },
    error: ""
  };

}

export const currentAcademicYear: () => string = () => "2022/2023";