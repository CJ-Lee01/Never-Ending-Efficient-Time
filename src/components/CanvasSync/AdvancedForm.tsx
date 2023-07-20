import { canvasSyncQuery } from "@/lib/types"
import { ChangeEvent, Dispatch, SetStateAction } from "react"
import InputFormFields from "../FormsUI/InputFormFields";
import { Alert, AlertIcon, Checkbox } from '@chakra-ui/react'
import getCanvasAccessDate from "./CanvasAccessDateFunction";


function AdvancedCanvasForm({ canvasAccessDate, formSetter }: { canvasAccessDate: Date, formSetter: Dispatch<SetStateAction<canvasSyncQuery>> }) {
  const tokenChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    formSetter(query => {
      return {
        ...query,
        canvasToken: event.target.value
      }
    })
  };

  const dateChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    formSetter(query => {
      return {
        ...query,
        startDateInfo: event.target.value
      }
    })
  };

  const includeCompletedAssignmentsChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    formSetter(query => {
      return {
        ...query,
        includeCompletedAssignments: !query.includeCompletedAssignments
      }
    })
  };

  const includeConcludedCoursesChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    formSetter(query => {
      return {
        ...query,
        includeConcludedCourses: !query.includeConcludedCourses
      }
    })
  };

  return <>
    <InputFormFields
      changeHandler={tokenChangeHandler}>
      Canvas Access Token
    </InputFormFields>
    <InputFormFields
      changeHandler={dateChangeHandler}
      type="datetime-local"
      value={getCanvasAccessDate(canvasAccessDate)}>
      Start date
    </InputFormFields>
    <Checkbox
      onChange={includeCompletedAssignmentsChangeHandler}
    >
      Include Completed Assignments?
    </Checkbox>
    <Checkbox
      onChange={includeConcludedCoursesChangeHandler}
    >
      Include concluded courses?
    </Checkbox>
    <Alert status='warning'>
      <AlertIcon />
      Using this setting may cause duplicate announcements and assignments. Use the default form to avoid such errors.
    </Alert>
  </>
}

export default AdvancedCanvasForm