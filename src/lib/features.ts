import { featureDescription } from "./types";

const featuresList: featureDescription[] = [
    {
        heading: "Timer",
        icon: "/images/stopwatch.png",
        description: "The Timer enables effective time management through the use of various features such as the Pomodoro Timer."
    },
    {
        heading: "Calendar and Schedule",
        icon: "/images/calendar.png",
        description: "This provides a convenient and easy way for users to view and manage their timetables and tasks."
    },
    {
        heading: "Todo List",
        icon: "/images/to-do-list.png",
        description: "This allows users to easily keep track of their tasks and deadlines."
    },
    {
        heading: "NUS Mods Syncing",
        icon: "/images/NUSMods.png",
        description: "Integration of the NUSMods schedule allows for convenient planning using the NUS lesson timetable."
    },
    {
        heading: "Canvas Syncing",
        icon: "/images/canvas1-logo.png",
        description: "Integration of Canvas API allows for integration of tasks, assignments and deadlines into the to-do lists and calendars."
    }
];

export default featuresList;