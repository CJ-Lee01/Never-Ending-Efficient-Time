import { isNumberArray, isWeekRange } from "../NUSMod_ModuleTypes";

describe("Is number array?", () => {
  it("[1, 2, 3, 4] is", () => {
    expect(isNumberArray([1, 2, 3, 4])).toBeTruthy();
  })

  it("[1, 2, 5] is", () => {
    expect(isNumberArray([1, 2, 5])).toBeTruthy();
  })

  it("['a', 'b', 'c'] isn't", () => {
    expect(isNumberArray(['a', 'b', 'c'])).toBeFalsy();
  })

  it("1 isn't", () => {
    expect(isNumberArray(1)).toBeFalsy();
  })
})

describe("Is week range?", () => {
  it("{start: '2023-04-31', end: '2023-05-28'} is", () => {
    expect(isWeekRange({
      start: '2023-04-31',
      end: '2023-05-28'
    }))
      .toBeTruthy();
  })

  it("{start: '2023-04-31', end: '2023-05-28', weeks: [1, 2, 5]} is", () => {
    expect(isWeekRange({
      start: '2023-05-31',
      end: '2023-06-28',
      weeks: [1, 2, 5],
    }))
      .toBeTruthy()
  })

  it("{start: '2023-04-31', end: '2023-05-28', weekInterval: 2} is", () => {
    expect(isWeekRange({
      start: '2023-04-31',
      end: '2023-05-28',
      weekInterval: 2
    }))
      .toBeTruthy()
  })
})