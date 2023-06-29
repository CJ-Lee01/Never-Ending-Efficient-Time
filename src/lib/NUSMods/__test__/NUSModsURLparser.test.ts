import { NUSModsURLparser, moduleTimetableInformation } from "../NUSModsURLparser";

describe("Ensures valid input is valid", () => {
  it("Modules with lectures and lessons are valid (Sem 1)", () => {
    const urlString = "https://nusmods.com/timetable/sem-1/share?CS2100=LEC:2,TUT:02,LAB:12,REC:1";
    const output = NUSModsURLparser(urlString);
    expect(output.error).toBe(null);
    expect(output.data).toEqual([{
      semester: 1,
      moduleCode: "CS2100",
      classes: [
        { type: "Lecture", slot: "2" },
        { type: "Tutorial", slot: "02" },
        { type: "Laboratory", slot: "12" },
        { type: "Recitation", slot: "1" }
      ]
    }])
  })

  it("Special Term 1 timetable for BMA5102", () => {
    const urlString = "https://nusmods.com/timetable/st-i/share?BMA5102=SEC:P1";
    const output = NUSModsURLparser(urlString);
    expect(output.error).toBe(null);
    expect(output.data).toEqual<moduleTimetableInformation[]>([
      {
        semester: 3,
        moduleCode: "BMA5102",
        classes: [
          { type: "Sectional Teaching", slot: "P1" }
        ]
      }
    ])
  })

  it("Special Term 2 timetable for CS1010E", () => {
    const urlString = "https://nusmods.com/timetable/st-ii/share?CS1010E=TUT:04,SEC:1";
    const output = NUSModsURLparser(urlString);
    expect(output.error).toBe(null);
    expect(output.data).toEqual<moduleTimetableInformation[]>([
      {
        semester: 3,
        moduleCode: "CS1010E",
        classes: [
          { type: "Tutorial", slot: "04" },
          { type: "Sectional Teaching", slot: "1" }
        ]
      }
    ])
  })
})
