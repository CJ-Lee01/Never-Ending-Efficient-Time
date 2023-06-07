import { URL } from "url";

const NOT_NUSMODS_ERROR = "The URL you provided is not an NUSMods URL.";

function NUSModsURLparser(url: string) : {data: string[], error: string} {
  //example URL
  const example = "https://nusmods.com/timetable/sem-2/share?ALS1010=LEC:2&CS2030S=LAB:14H,REC:20,LEC:1&CS2040S=TUT:06,REC:15,LEC:1&DTK1234=TUT:E36&GEA1000=TUT:D23&IS1128=LEC:1&MA2001=TUT:17,LEC:2"
  const address = new URL(example)
  if (address.hostname != "nusmods.com") {
    return {data: [], error: NOT_NUSMODS_ERROR};
  }
  return {data: [], error: ""}
}

export default NUSModsURLparser;