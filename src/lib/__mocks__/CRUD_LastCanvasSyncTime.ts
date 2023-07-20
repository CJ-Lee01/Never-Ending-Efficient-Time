import { Dispatch, SetStateAction } from "react";
/*
getLastCanvasAccess: returns the defaultCanvasSyncDate, then the noCanvasSyncDate if it is called again.
setLastCanvasAccess: takes in an optional date, returns nothing.
*/
const defaultCanvasSyncDate = new Date("2023-02-02");
const noCanvasSyncDate = new Date(0);

const canvasSyncTimeFunctions = jest.createMockFromModule<
  typeof import("../CRUD_LastCanvasSyncTime")
>("../CRUD_LastCanvasSyncTime");

const lastCanvasAccessWrapper = () => {
  let x = true;
  return async (setState: Dispatch<SetStateAction<Date>>) => {
    // console.log(`Current Bool: ${x}`)
    setState(x ? defaultCanvasSyncDate : noCanvasSyncDate);
    x = !x;
  };
};
canvasSyncTimeFunctions.getLastCanvasAccess = lastCanvasAccessWrapper();
canvasSyncTimeFunctions.setLastCanvasAccess = async (
  date: Date = new Date()
) => {};

module.exports = canvasSyncTimeFunctions;
