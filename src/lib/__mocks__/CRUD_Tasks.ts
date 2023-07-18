import { TasksInformation } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import tasks from "./DefaultTaskList";
/*
addTask: returns { data: null, error: null }
addBulkTasks: returns { data: null, error: null }
removeTask: returns null if user_id is valid. Otherwise, returns error.
editTask: returns { data: null, error: null } if user_id is valid. Otherwise, returns error.
getTasks: sets the task list to a the task list below.
*/


const taskFunctions = jest.createMockFromModule<typeof import("../CRUD_Tasks")>("../CRUD_Tasks")

taskFunctions.addTask = async (task: TasksInformation) => {
  return {
    data: null,
    error: null
  }
}

taskFunctions.addBulkTasks = async (taskList: TasksInformation[]) => {
  return {
    data: null,
    error: null
  }
}

taskFunctions.removeTask = async (task: TasksInformation) => {
  if (!task.user_id) {
    return {
      message: "No user ID",
      details: "No user ID associated with event",
      hint: "IDK",
      code: "Test code"
    }
  }
  return null
}

taskFunctions.editTask = async (task: TasksInformation) => {
  if (!task.user_id) {
    return {
      data: null,
      error: {
        message: "No user ID",
        details: "No user ID associated with event",
        hint: "IDK",
        code: "Test code"
      }
    }
  }
  return {
    data: null,
    error: null
  }
}

taskFunctions.getTasks = async (setState: Dispatch<SetStateAction<
  {
    data: TasksInformation[],
    error: null | PostgrestError,
  }
>>) => {
  setState({
    data: tasks,
    error: null
  })
}

module.exports = taskFunctions