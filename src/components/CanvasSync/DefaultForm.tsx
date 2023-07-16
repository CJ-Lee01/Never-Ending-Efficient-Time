import { canvasSyncQuery } from "@/lib/types"
import { ChangeEvent, Dispatch, SetStateAction } from "react"
import InputFormFields from "../FormsUI/InputFormFields"
import { Text } from '@chakra-ui/react'

const DefaultCanvasForm = ({ canvasAccessDate, formSetter }: { canvasAccessDate: Date, formSetter: Dispatch<SetStateAction<canvasSyncQuery>> }) => {
  const tokenChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    formSetter(query => {
      return {
        ...query,
        canvasToken: event.target.value
      }
    })
  };

  const getCanvasAccessDate = () => {
    return canvasAccessDate.valueOf() ? canvasAccessDate.toLocaleString() : "Never accessed."
  }


  return <>
    <InputFormFields changeHandler={tokenChangeHandler}>Canvas Access Token</InputFormFields>
    <Text>Date of last Canvas Access: {getCanvasAccessDate()}</Text>
  </>
}

export default DefaultCanvasForm