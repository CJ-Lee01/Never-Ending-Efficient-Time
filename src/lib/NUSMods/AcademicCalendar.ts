import { stringify } from "querystring";

type startDate = [number, number, number];

type academicCalendarMapInfo = { "start": startDate }[]

export interface academicYearInfo {
  year1: number;
  year2: number;
}

const academicCalendar = new Map([
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

const defaultStart = { start: [0, 0, 0] };

export default function getStartDate(acadYear: academicYearInfo, semester: number) {
  const yearInfo = academicCalendar.get(`${acadYear.year1}/${acadYear.year2}`);
  const dateStart = (yearInfo ? yearInfo[semester] : defaultStart) ?? defaultStart;
  const dateArray = dateStart.start;
  return new Date(dateArray[0], dateArray[1], dateArray[2]);
}

export const currentAcademicYear: () => academicYearInfo = () => { return { year1: 2022, year2: 2023 } };