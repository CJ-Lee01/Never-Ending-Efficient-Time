import { TimerDataType } from "../types";

// export interface TimerDataType {
//     id?: number;
//     user_id?: string;
//     title: string;
//     intervals: number;
//     totalSeconds: number;
//     totalSecondsTwo?: number;
//     intervalName?: string;
//     intervalNameTwo?: string;
//   }

const timers: TimerDataType[] = [
  {
    id: 1,
    title: "title1",
    intervals: 1,
    intervalName: "test1",
    totalSeconds: 3700,
  },
  {
    id: 2,
    title: "title2",
    intervals: 1,
    intervalName: "test2",
    totalSeconds: 3600,
  },
  {
    id: 3,
    title: "intervalTest",
    intervals: 3,
    totalSeconds: 5,
    totalSecondsTwo: 3,
    intervalName: "interval1",
    intervalNameTwo: "interval2",
  },
];

export default timers;
