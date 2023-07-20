'use client'

import { Module, SemesterData } from "./NUSMod_ModuleTypes";
import { eventInformation } from "../types";
import { convertTimeStringToTimeObject, convertWeeksToDateArray } from "./NUSMods_DateFunctions";
import { getStartDate, academicYearInfo, convertAcadYearStringToArray, semStringBuilder } from "./AcademicCalendar";

export interface moduleTimetableInformation {
  semester: number;
  moduleCode: string;
  classes: { type: string, slot: string }[];
}

const lessonType: Map<string, string> = new Map([
  ["LEC", "Lecture"],
  ["TUT", "Tutorial"],
  ["LAB", "Laboratory"],
  ["REC", "Recitation"],
  ["SEC", "Sectional Teaching"],
])

const NUSMODS_API = "https://api.nusmods.com/v2";

const NOT_NUSMODS_ERROR = "The URL you provided is not an NUSMods URL.";
const NOT_CORRECT_PATHNAME = "The URL you provided is not a sharing NUSMods URL.";
const INVALID_URL = "The URL you provided is not a valid URL."
const INVALID_SLOT = "-1";

export function NUSModsURLparser(url: string): { data: moduleTimetableInformation[], error: string | null } {
  //example URL: "https://nusmods.com/timetable/sem-2/share?ALS1010=LEC:2&CS2030S=LAB:14H,REC:20,LEC:1&CS2040S=TUT:06,REC:15,LEC:1&DTK1234=TUT:E36&GEA1000=TUT:D23&IS1128=LEC:1&MA2001=TUT:17,LEC:2"
  let address: URL | null = null;
  try {
    address = new URL(url) //the constructor checks if the URL is valid. If not, it throws an error.
  } catch (error) {
    return { data: [], error: INVALID_URL }
  }
  if (address.hostname != "nusmods.com") {
    return { data: [], error: NOT_NUSMODS_ERROR };
  }

  const pathName = address.pathname.split("/")
  //if it is not in the /timetable/{semester}/share format, then it is not acceptable.
  if (pathName.length != 4) {
    return { data: [], error: NOT_CORRECT_PATHNAME };
  }

  if (pathName[1] != "timetable" || pathName[3] != "share") {
    return { data: [], error: NOT_CORRECT_PATHNAME };
  }

  const parameters = address.searchParams;
  const semesterNum = semesterStringParser(pathName[2])
  const moduleDataList: moduleTimetableInformation[] = [];
  let parserError = '';
  parameters.forEach((classes: string, moduleName: string) => {
    //sample classes: "LEC:01,TUT:01,REC:01,LAB:04"
    if (!classes) {
      moduleDataList.push({
        semester: semesterNum,
        moduleCode: moduleName,
        classes: []
      })
      return
    }
    const classArray = classes.split(",").map((classInfo: string) => {
      //sample classInfo: "LEC:01"
      const temp = classInfo.split(":");
      if (temp.length != 2) {
        //I know the operation is inefficient. Optimizations can be done later.
        parserError += `unknown class info: ${temp} for module ${moduleName}. \n`;
        return {
          type: `unknown class info: ${temp}`, slot: INVALID_SLOT
        };
      }
      if (lessonType.get(temp[0])) {
        return {
          type: lessonType.get(temp[0]) ?? "", slot: temp[1]
        };
      }
      parserError += `unknown class type: ${temp[0]} with slot ${temp[1]} for module ${moduleName}. \n`
      return {
        type: `unknown class type: ${temp[0]} for module ${moduleName}`, slot: INVALID_SLOT
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

function semesterStringParser(semString: string): number {
  const strArr = semString.split('-');
  if (strArr[0] === "sem") {
    return parseInt(strArr[1]);
  }
  return strArr[1].length + 2;
}

async function eventParser({ data, error }: { data: moduleTimetableInformation[], error: string | null }, acadYear: academicYearInfo): Promise<{
  events: eventInformation[], error: string | null
}> {
  if (error) {
    return { events: [], error: error };
  }
  const eventList: eventInformation[] = [];
  const promiseArr: Promise<void>[] = [];
  data.forEach(timetableInfo => promiseArr.push(addClassesToList(timetableInfo, acadYear, eventList)));
  await Promise.all(promiseArr)
  return { events: eventList, error: null };
}

async function addClassesToList(moduleClassInfo: moduleTimetableInformation, acadYear: academicYearInfo, inputList: eventInformation[]): Promise<void> {
  const modTimetableList = await getModuleInformation(moduleClassInfo, acadYear)
  for (const item of modTimetableList) {
    inputList.push(item)
  }
}

export async function getModuleInformation(moduleClassInfo: moduleTimetableInformation, acadYear: academicYearInfo): Promise<eventInformation[]> {
  //moduleCode is in all CAPS.
  //technically we can do a check to see if module is valid for possible performance improvements but there is no need for now.
  //acadYear is in the format of a pair e.g. [2019, 2020]
  const semStartDate = getStartDate(acadYear, moduleClassInfo.semester)
  const acadYearString = `${acadYear.year1}-${acadYear.year2}`;
  const response = await fetch(`${NUSMODS_API}/${acadYearString}/modules/${moduleClassInfo.moduleCode}.json`);
  const modData: Module = await response.json();
  const modTitle = `${moduleClassInfo.moduleCode} ${modData["title"]}`
  const classData = modData['semesterData']
    .find((elem: SemesterData) => {
      return elem['semester'] == moduleClassInfo.semester
    })
  const classArray = classData?.timetable.filter((elem) => {
    return moduleClassInfo.classes.find(lesson => lesson.slot == elem['classNo'] && lesson.type == elem['lessonType'])
  })
    .flatMap(elem => convertWeeksToDateArray(elem.weeks, semStartDate, elem.day)
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
          start_time: startDateTime,
          end_time: endDateTime,
          sem_data: semStringBuilder(acadYear, moduleClassInfo.semester)
        }
      }))

  classData?.examDate
    ? classArray?.push({
      event_name: `${modTitle} Finals`,
      event_description: `${modTitle} Finals`,
      start_time: new Date(classData.examDate),
      end_time: new Date(
        new Date(classData.examDate).valueOf() + (classData?.examDuration ?? 0) * 60 * 1000),
      sem_data: semStringBuilder(acadYear, moduleClassInfo.semester)
    })
    : 0;
  return classArray ?? [];
}

export default async function NUSModsURLToEventList(url: string, acadYearString: string): Promise<{ events: eventInformation[], error: string | null }> {
  const moduleClassInfo = NUSModsURLparser(url);
  const acadYear = convertAcadYearStringToArray(acadYearString)
  if (moduleClassInfo.error || acadYear.error || !acadYear.result) {
    return { events: [], error: moduleClassInfo.error + acadYear.error };
  }
  const eventList = eventParser(moduleClassInfo, acadYear.result);
  return eventList
}