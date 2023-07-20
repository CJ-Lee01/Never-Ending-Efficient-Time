import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import { FC, useEffect, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { addTask, addBulkTasks, editTask, removeTask, getTasks } from "@/lib/CRUD_Tasks";
import tasks from "../DefaultTaskList";
import { TasksInformation } from "@/lib/types";

jest.mock("../../CRUD_Tasks")

const TaskComponent: FC = () => {
  const [tasks, setTasks] = useState<{
    data: TasksInformation[],
    error: null | PostgrestError,
  }>({
    data: [],
    error: null
  })

  useEffect(() => {
    getTasks(setTasks)
  }, [])

  const display = () => {
    if (tasks.data.length == 0) {
      return <div>No tasks</div>
    }
    if (tasks.error) {
      return <div>Error: {tasks.error.message}</div>
    }
    return <div>
      {tasks.data.map(task => <div key={task.id}>
        Title: {task.title}
      </div>)}
    </div>
  }
  return display()
}

describe("Mock", () => {
  describe("Add Tasks", () => {
    it("Adds tasks successfully", async () => {
      const result = await addTask(tasks[0])
      expect(result).toEqual( {
        data: null,
        error: null
      })
    })
  })
  describe("Add multiple tasks", () => {
    it("Adds multiple tasks successfully", async () => {
      const result = await addBulkTasks(tasks)
      expect(result).toEqual( {
        data: null,
        error: null
      })
    })
  })
  describe("Remove Task", () => {
    it("Successfully removes tasks with valid user_id", async () => {
      const task: TasksInformation = tasks[0]
      task.user_id = "1"
      const result = await removeTask(task)
      expect(result).toBe(null)
    })
    it("Returns error if task user_id is empty string", async () => {
      const task: TasksInformation = tasks[0]
      task.user_id = ""
      const result = await removeTask(task)
      expect(result).toEqual({
        message: "No user ID",
        details: "No user ID associated with event",
        hint: "IDK",
        code: "Test code"
      })
    })
    it("Returns error if task user_id is not defined", async () => {
      const task: TasksInformation = tasks[0]
      task.user_id = undefined
      const result = await removeTask(task)
      expect(result).toEqual({
        message: "No user ID",
        details: "No user ID associated with event",
        hint: "IDK",
        code: "Test code"
      })
    })
  })
  describe("Edit Task", () => {
    it("Edits successfully if task has valid user_id", async () => {
      const task: TasksInformation = tasks[0]
      task.user_id = "1"
      const result = await editTask(task)
      expect(result).toEqual({
        data: null,
        error: null
      })
    })
    it("Returns error if task user_id is empty string", async () => {
      const task: TasksInformation = tasks[0]
      task.user_id = ""
      const result = await editTask(task)
      expect(result).toEqual({
        data: null,
        error: {
          message: "No user ID",
          details: "No user ID associated with event",
          hint: "IDK",
          code: "Test code"
        }
      })
    })
    it("Returns error if task user_id is not defined", async () => {
      const task: TasksInformation = tasks[0]
      task.user_id = undefined
      const result = await editTask(task)
      expect(result).toEqual({
        data: null,
        error: {
          message: "No user ID",
          details: "No user ID associated with event",
          hint: "IDK",
          code: "Test code"
        }
      })
    })
  })
  describe("Get tasks", () => {
    it("Gets and sets tasks", async () => {
      const { findAllByText } = render(<TaskComponent />)
      const htmlArray = await findAllByText(/Title:/)
      htmlArray.forEach((elem, index) => {
        const expectedText = `Title: ${tasks[index].title}`
        expect(elem).toHaveTextContent(expectedText)
      })
    })
  })
})