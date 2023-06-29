import { getStartDate, convertAcadYearStringToArray, academicYearInfo } from "../AcademicCalendar";

describe("Converts Academic Year string in a specific format to the acadYear Format", () => {
  //Generally there is not much concern about giving the wrong input here since the input will only
  //be from a few options.
  it("Takes acadYear string of XXXX/YYYY successfully, which XXXX and YYYY are numbers", () => {
    const output = convertAcadYearStringToArray("2022/2023");
    expect(output.result).toEqual({year1: 2022, year2: 2023});
  })

  it("Returns an error if XXXX or YYYY are not numbers in XXXX/YYYY", () => {
    const output = convertAcadYearStringToArray("2022/abcd");
    expect(output.error).toEqual<string>("Invalid Year");
    expect(output.result).toBe(null);
  })

  it("Returns an error if any other invalid string is entered", () => {
    const output = convertAcadYearStringToArray("12345");
    expect(output.error).toEqual("Invalid Year");
  })
})

describe("Gets Week 1 Monday of the Academic Year correctly.", () => {
  //Generally there is not much concern about giving the wrong input here since the input will only
  //be from a few options.
  it("Returns the correct date for a valid input.", () => {
    const startDate = getStartDate({year1: 2023, year2: 2024}, 1);
    expect(startDate).toEqual(new Date(2023, 7, 7)); //8 Aug but month starts from 0.
  })

  it("Returns default zero date for invalid input", () => {
    const startDate = getStartDate({year1: 2033, year2: 2034}, 1);
    expect(startDate).toEqual(new Date(0, 0, 0));
  })
})