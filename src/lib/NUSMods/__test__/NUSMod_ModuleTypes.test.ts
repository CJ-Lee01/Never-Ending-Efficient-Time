import { isNumberArray } from "../NUSMod_ModuleTypes";

describe("Is number array?", () => {
  it("[1, 2, 3, 4] is", () => {
    expect(isNumberArray([1, 2, 3, 4])).toBeTruthy();
  })

  it("['a', 'b', 'c'] isn't", () => {
    expect(isNumberArray(['a', 'b', 'c'])).toBeFalsy();
  })

  it("1 isn't", () => {
    expect(isNumberArray(1)).toBeFalsy();
  })
})