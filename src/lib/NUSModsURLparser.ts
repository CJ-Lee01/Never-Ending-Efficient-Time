import { Module } from "./NUSMod_ModuleTypes";
import { eventInformation } from "./types";
import { containsObject } from "./GenericHelper";
import { convertTimeStringToTimeObject, convertWeeksToDateArray } from "./NUSMods_DateFunctions";

interface moduleTimetableInformation {
  semester: number,
  moduleCode: string,
  classes: { type: string, slot: string }[]
}

const lessonType: Map<string, string> = new Map([
  ["LEC", "Lecture"],
  ["TUT", "Tutorial"],
  ["LAB", "Laboratory"],
  ["REC", "Recitation"],
])

const NUSMODS_API = "https://api.nusmods.com/v2";

const NOT_NUSMODS_ERROR = "The URL you provided is not an NUSMods URL.";
const NOT_CORRECT_PATHNAME = "The URL you provided is not a sharing NUSMods URL";
const INVALID_SLOT = "-1";

function NUSModsURLparser(url: string): { data: moduleTimetableInformation[], error: string | null } {
  //example URL
  const example = "https://nusmods.com/timetable/sem-2/share?ALS1010=LEC:2&CS2030S=LAB:14H,REC:20,LEC:1&CS2040S=TUT:06,REC:15,LEC:1&DTK1234=TUT:E36&GEA1000=TUT:D23&IS1128=LEC:1&MA2001=TUT:17,LEC:2"
  const address = new URL(example);
  if (address.hostname != "nusmods.com") {
    return { data: [], error: NOT_NUSMODS_ERROR };
  }

  const pathName = address.pathname.split("/")
  //if it is not in the /timetable/{semester}/share format, then it is not acceptable.
  if (pathName.length != 4) {
    return { data: [], error: NOT_CORRECT_PATHNAME };
  }

  if (pathName[1] != "timetable" && pathName[3] != "share") {
    return { data: [], error: NOT_CORRECT_PATHNAME };
  }

  const parameters = address.searchParams;
  const semesterNum = parseInt(pathName[2][pathName[2].length - 1])
  const moduleDataList: moduleTimetableInformation[] = [];
  let parserError = '';
  parameters.forEach((classes: string, moduleName: string) => {
    //sample classes: "LEC:01,TUT:01,REC:01,LAB:04"
    const classArray = classes.split(",").map((classInfo: string) => {
      //sample classInfo: "LEC:01"
      const temp = classInfo.split(":");
      if (temp.length != 2) {
        parserError += `unknown class info: ${temp}. \n`;
        return {
          type: `unknown class info: ${temp}`, slot: INVALID_SLOT
        };
      }
      if (temp[0] in lessonType) {
        return {
          type: lessonType.get(temp[0]) ?? "", slot: temp[1]
        };
      }
      parserError += `unknown class type: ${temp[0]} with slot ${temp[1]}. \n`
      return {
        type: `unknown class type: ${temp[0]}`, slot: INVALID_SLOT
      };
    });
    moduleDataList.push({
      semester: semesterNum,
      moduleCode: moduleName,
      classes: classArray
    })

  })
  if (parserError) {
    return { data: [], error: `parsing error: ${parserError}` }
  }
  return { data: moduleDataList, error: null }
}

function eventParser({ data, error }: { data: moduleTimetableInformation[], error: string | null }, acadYear: number[]): {
  events: eventInformation[], error: string | null
} {
  if (error) {
    return { events: [], error: error };
  }
  const eventList: eventInformation[] = [];
  data.forEach(moduleClassInfo => addClassesToList(moduleClassInfo, acadYear, eventList));
  return {events: eventList, error: null};
}

async function addClassesToList(moduleClassInfo: moduleTimetableInformation, acadYear: number[], inputList: eventInformation[]): Promise<void> {
  inputList.concat(await getModuleInformation(moduleClassInfo, acadYear));
}

async function getModuleInformation(moduleClassInfo: moduleTimetableInformation, acadYear: number[]): Promise<eventInformation[]> {
  //moduleCode is in all CAPS.
  //acadYear is in the format of a pair e.g. [2019, 2020]
  const semStartDate = new Date(); //placeholder.
  const acadYearString = `${acadYear[0]}-${acadYear[1]}`;
  const response = await fetch(`${NUSMODS_API}/${acadYearString}/modules/${moduleClassInfo.moduleCode}`);
  if (response.status == 404) {
    return [];
  }
  const modData: Module = JSON.parse(await response.json());
  const modTitle = `${moduleClassInfo.moduleCode} ${modData["title"]}`
  const classData = modData['semesterData']
    .find((elem: { [x: string]: any; }) => elem['semester'] == moduleClassInfo.semester)
    ?.timetable.filter((elem: { [x: string]: any; }) => {
      containsObject({ type: elem.lessonType, slot: elem.classNo }, moduleClassInfo.classes)
    })
    .flatMap(elem => convertWeeksToDateArray(elem.weeks, semStartDate, moduleClassInfo.semester, elem.day)
      .map(date => {
        const startTime = convertTimeStringToTimeObject(elem.startTime);
        const endTime = convertTimeStringToTimeObject(elem.endTime);
        const startDateTime = new Date(date)
        const endDateTime = new Date(date)

        startDateTime.setHours(startTime.hour, startTime.minute);
        endDateTime.setHours(endTime.hour, endTime.minute);

        return {
          event_name: `${modTitle}: ${elem.lessonType}`,
          event_description: `${elem.lessonType} at ${elem.venue}`,
          start_time: startDateTime.toISOString(),
          end_time: endDateTime.toISOString(),
        }
      })) ?? []

  return classData;
}

export default NUSModsURLparser;