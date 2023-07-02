import { convertWeeksToDateArray, convertTimeStringToTimeObject, addDate } from "../NUSMods_DateFunctions";

describe("Addes number of days to date", () => {
  it("Adds days but the result is the same month", () => {
    const startDate = new Date(2022, 5, 20);
    const addTenDays = addDate(startDate, 10);
    expect(addTenDays).toEqual(new Date(2022, 5, 30))
  })

  it("Add days but the result is different month", () => {
    const startDate = new Date(2022, 5, 20);
    const addElevenDays = addDate(startDate, 11);
    expect(addElevenDays).toEqual(new Date(2022, 6, 1))
  })

  it("Add days but result is different year", () => {
    const startDate = new Date(2022, 5, 20);
    const add364Days = addDate(startDate, 364);
    expect(add364Days).toEqual(new Date(2023, 5, 19))
  })
})

describe("Converts the NUSMods API time string to custom date object", () => {
  it("Converts the string in 24hr format XXXX successfully", () => {
    expect(convertTimeStringToTimeObject("2359"))
      .toEqual<{
        hour: number, minute: number
      }>({
        hour: 23, minute: 59
      })
  })
})

describe("Converts the week data into dates", () => {
  it("Rejects invalid day of the week", () => {
    const output = convertWeeksToDateArray([], new Date(), "Not Monday");
    expect(output).toEqual([])
  })

  it("Takes a date and an array of week numbers, returning an array of dates", () => {
    const startDate = new Date(2023, 5, 26);
    const weeks = [1, 2, 3, 4, 5];
    const output = convertWeeksToDateArray(weeks, startDate, "Tuesday");
    const expected = [
      new Date(2023, 5, 27),
      new Date(2023, 6, 4),
      new Date(2023, 6, 11),
      new Date(2023, 6, 18),
      new Date(2023, 6, 25),
    ]
    expect(output).toEqual(expected);

  })

  it("Takes start and end date and returns an array of dates.", () => {
    const startDate = new Date(2023, 5, 26);
    const courseStart = '2023-05-31';
    const courseEnd = '2023-06-28';
    const courseStartDate = new Date(courseStart);
    const weeks = { start: courseStart, end: courseEnd };
    const output = convertWeeksToDateArray(weeks, startDate, "Wednesday");
    const expected = [
      new Date('2023-05-31'),
      new Date('2023-06-07'),
      new Date('2023-06-14'),
      new Date('2023-06-21'),
      new Date('2023-06-28'),
    ];
    expect(output).toEqual(expected);
  })

  it("Takes start and end date with week array.", () => {
    const startDate = new Date(2023, 5, 26);
    const courseStart = '2023-05-31';
    const courseEnd = '2023-06-28';
    const courseStartDate = new Date(courseStart);
    const weeks = { start: courseStart, end: courseEnd, weeks: [1, 2, 5] };
    const output = convertWeeksToDateArray(weeks, startDate, "Wednesday");
    const expected = [
      new Date('2023-05-31'),
      new Date('2023-06-07'),
      new Date('2023-06-28'),
    ];
    expect(output).toEqual(expected);
  })

  it("Takes start and end date with week interval.", () => {
    const startDate = new Date(2023, 5, 26);
    const courseStart = '2023-05-31';
    const courseEnd = '2023-06-28';
    const courseStartDate = new Date(courseStart);
    const weeks = { start: courseStart, end: courseEnd, weekInterval: 2 };
    const output = convertWeeksToDateArray(weeks, startDate, "Wednesday");
    const expected = [
      new Date('2023-05-31'),
      new Date('2023-06-14'),
      new Date('2023-06-28'),
    ];
    expect(output).toEqual(expected);
  })
})