import { URL } from "url";
import { eventInformation } from "./types";

interface moduleTimetableInformation {
  semester?: string
  moduleCode: string,
  classes: { type: string, slot: string }[]
}

const NOT_NUSMODS_ERROR = "The URL you provided is not an NUSMods URL.";
const NOT_CORRECT_PATHNAME = "The URL you provided is not a sharing NUSMods URL";

function NUSModsURLparser(url: string): { data: moduleTimetableInformation[], error: string | null } {
  //example URL
  const example = "https://nusmods.com/timetable/sem-2/share?ALS1010=LEC:2&CS2030S=LAB:14H,REC:20,LEC:1&CS2040S=TUT:06,REC:15,LEC:1&DTK1234=TUT:E36&GEA1000=TUT:D23&IS1128=LEC:1&MA2001=TUT:17,LEC:2"
  const address = new URL(example)
  if (address.hostname != "nusmods.com") {
    return { data: [], error: NOT_NUSMODS_ERROR };
  }

  const pathName = address.pathname.split("/")

  if (pathName.length != 3) {
    return { data: [], error: NOT_NUSMODS_ERROR };
  }

  if (pathName[0] != "timetable" && pathName[2] != "share") {
    return { data: [], error: NOT_NUSMODS_ERROR };
  }

  const parameters = address.searchParams
  const moduleDataList: moduleTimetableInformation[] = []
  parameters.forEach((classes: string, moduleName: string) => {
    const classArray = classes.split(",").map((classInfo: string) => {
      const temp = classInfo.split(":")
      return {
        type: temp[0], slot: temp[1]
      }
    });
    moduleDataList.push({moduleCode: moduleName, classes: classArray})
  })
  return { data: moduleDataList, error: null }
}

function parserToEvent(classes: moduleTimetableInformation[], error: string | null): {
  events: eventInformation[], error: string | null
} {
  if (!error) {
    return { events: [], error: null }
  }
  return { events: [], error: null }
}

export default NUSModsURLparser;