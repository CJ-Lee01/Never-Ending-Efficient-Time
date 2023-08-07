import { addBulkAnnoucement } from "@/lib/CRUD_Announcements";
import { addBulkTasks } from "@/lib/CRUD_Tasks";
import { api_canvassyncResponse, canvasSyncQuery } from "@/lib/types";
import { Button, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import DefaultCanvasForm from "./DefaultForm";
import AdvancedCanvasForm from "./AdvancedForm";
import { setLastCanvasAccess } from "@/lib/CRUD_LastCanvasSyncTime";

type RequestInfo = string | Request

function convertCanvasOptionsToQuery(canvasOptions: canvasSyncQuery): string[][] {
  const result: string[][] = []
  for (let key in canvasOptions) {
    if (key == "canvasToken") {
      continue;
    }
    result.push([key, canvasOptions[key as keyof canvasSyncQuery]?.toString() ?? ""])
  }
  return result;
}
function CanvasForm({ startDate, openState, closer }: { startDate: Date, openState: boolean, closer: () => void }) {
  const [canvasOptions, setCanvasOptions] = useState<canvasSyncQuery>(
    {
      canvasToken: "",
      start: startDate.toISOString(),
    }
  );
  const [isDefault, toggleDefault] = useState<boolean>(true)

  const fetcher = async (url: URL | RequestInfo) => {
    const header = new Headers();
    header.append("Authorization", `Bearer ${canvasOptions.canvasToken}`);
    return fetch(url, {
      method: "GET",
      headers: header
    }).then(res => (res.json()))
  }
  const syncHandler = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canvasOptions.canvasToken) {
      alert("No Canvas Token has been entered.")
      return;
    }
    const searchParams = new URLSearchParams(convertCanvasOptionsToQuery(canvasOptions));

    const canvasData = await fetcher(`/api/canvassync?${searchParams.toString()}`) as api_canvassyncResponse;
    if (canvasData.error) {
      alert(canvasData.error)
      return;
    }
    const announcementResponse = await addBulkAnnoucement(canvasData.announcements);
    if (announcementResponse.error) {
      alert(announcementResponse.error.message);
    }
    const taskResponse = await addBulkTasks(canvasData.assignments);
    if (taskResponse.error) {
      alert(taskResponse.error.message);
    }
    isDefault && setLastCanvasAccess() 
    closer()
    window.location.reload(); //still using this to refresh the announcements, sth will be done later.
  };

  const viewFormTitle = () => `Click to view ${isDefault ? "advanced" : "default"} form.`
  const formOption = () => isDefault
    ? <DefaultCanvasForm canvasAccessDate={startDate} formSetter={setCanvasOptions} />
    : <AdvancedCanvasForm canvasAccessData={canvasOptions} formSetter={setCanvasOptions} />

  return <Modal
    closeOnOverlayClick={false}
    isOpen={openState}
    onClose={closer}
    isCentered
  >
    <ModalOverlay />
    <form onSubmit={syncHandler}>
      <ModalContent>
        <ModalHeader>Sync with Canvas</ModalHeader>
        <ModalCloseButton />
        <Stack p={4}>
          <Button onClick={() => toggleDefault(x => !x)}>{viewFormTitle()}</Button>
          {formOption()}
        </Stack>
        <ModalFooter>
          <Button
            variant="solid"
            bg="#0D74FF"
            color="white"
            _hover={{ bg: "blue.600" }}
            mr={3}
            type="submit"
          >
            Save
          </Button>
          <Button onClick={closer}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </form>
  </Modal>
}

export default CanvasForm;