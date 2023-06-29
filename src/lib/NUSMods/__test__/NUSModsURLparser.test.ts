import { NUSModsURLparser, moduleTimetableInformation } from "../NUSModsURLparser";

describe("Takes valid inputs", () => {
  it("Modules with lectures and lessons are valid (Sem 1)", () => {
    const urlString = "https://nusmods.com/timetable/sem-1/share?CS2100=LEC:2,TUT:02,LAB:12,REC:1";
    const output = NUSModsURLparser(urlString);
    expect(output.error).toBe(null);
    expect(output.data).toEqual([
      {
        semester: 1,
        moduleCode: "CS2100",
        classes: [
          { type: "Lecture", slot: "2" },
          { type: "Tutorial", slot: "02" },
          { type: "Laboratory", slot: "12" },
          { type: "Recitation", slot: "1" }
        ]
      }
    ]);
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
    ]);
  })

  it("Special Term 2 timetable for CS1010E", () => {
    const urlString = "https://nusmods.com/timetable/st-ii/share?CS1010E=TUT:04,SEC:1";
    const output = NUSModsURLparser(urlString);
    expect(output.error).toBe(null);
    expect(output.data).toEqual<moduleTimetableInformation[]>([
      {
        semester: 4,
        moduleCode: "CS1010E",
        classes: [
          { type: "Tutorial", slot: "04" },
          { type: "Sectional Teaching", slot: "1" }
        ]
      }
    ]);
  })

  it("Can take modules without lessons, like CFG1002", () => {
    const urlString = "https://nusmods.com/timetable/sem-2/share?CFG1002=";
    const output = NUSModsURLparser(urlString);
    expect(output.error).toBe(null);
    expect(output.data).toEqual<moduleTimetableInformation[]>([
      {
        semester: 2,
        moduleCode: "CFG1002",
        classes: []
      }
    ])
  })

  it("Allows for multiple modules and lessons.", () => {
    const urlString = "https://nusmods.com/timetable/sem-2/share?CFG1002=&CS1010E=TUT:19,SEC:1&IS1128=LEC:1";
    const output = NUSModsURLparser(urlString);
    expect(output.error).toBe(null);
    expect(output.data).toEqual<moduleTimetableInformation[]>([
      {
        semester: 2,
        moduleCode: "CFG1002",
        classes: []
      },
      {
        semester: 2,
        moduleCode: "CS1010E",
        classes: [
          { type: "Tutorial", slot: "19" },
          { type: "Sectional Teaching", slot: "1" }
        ]
      },
      {
        semester: 2,
        moduleCode: "IS1128",
        classes: [
          { type: "Lecture", slot: "1" }
        ]
      }
    ])
  })
})

describe("Rejects Invalid URLs", () => {
  it("Does not allow invalid URLs like 12345", () => {
    const urlString = "12345";
    const output = NUSModsURLparser("12345");
    expect(output.data).toEqual([]);
    expect(output.error).toBe("The URL you provided is not a valid URL.");
  })

  it("Does not allow non-NUSMods URLs like https://www.youtube.com/", () => {
    const urlString = "https://www.youtube.com/"
    const output = NUSModsURLparser(urlString);
    expect(output.error).toBe("The URL you provided is not an NUSMods URL.");
  })

  it("Does not allow non-timetable-sharing urls.", () => {
    const urlString = "https://nusmods.com/";
    const output = NUSModsURLparser(urlString);
    expect(output.data).toEqual([]);
    expect(output.error).toBe("The URL you provided is not a sharing NUSMods URL.");
  })

  it("Does not allow timetable links without sharing data", () => {
    const urlString = "https://nusmods.com/timetable/sem-2/";
    const output = NUSModsURLparser(urlString);
    expect(output.data).toEqual([]);
    expect(output.error).toBe("The URL you provided is not a sharing NUSMods URL.");
  })

  it("Does not allow invalid lesson types.", () => {
    const urlString = "https://nusmods.com/timetable/sem-1/share?CS2100=LEC:2,TUT:02,LAB:12,ROLL:1";
    const output = NUSModsURLparser(urlString);
    expect(output.data).toEqual([]);
    expect(output.error).toBeTruthy(); //The error msg may change over time for such things. Just need an error msg there.
  })
})