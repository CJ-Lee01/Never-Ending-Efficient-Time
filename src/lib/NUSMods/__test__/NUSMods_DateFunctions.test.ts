import { convertWeeksToDateArray, convertTimeStringToTimeObject } from "../NUSMods_DateFunctions";

describe("Converts the NUSMods API time string to custom date object", () => {
  expect(convertTimeStringToTimeObject("2359"))
    .toEqual<{
      hour: number, minute: number
    }>({
      hour: 23, minute: 59
    })
})

describe("Converts the week data into dates", () => {
  it("Rejects invalid day of the week", () => {
    const output = convertWeeksToDateArray([], new Date(), 1, "Not Monday");
    expect(output).toEqual([])
  })
})