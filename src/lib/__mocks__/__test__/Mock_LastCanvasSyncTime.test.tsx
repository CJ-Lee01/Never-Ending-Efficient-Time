import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'
import { FC, useEffect, useState } from "react";

import { getLastCanvasAccess, setLastCanvasAccess } from "@/lib/CRUD_LastCanvasSyncTime";

jest.mock("../../CRUD_LastCanvasSyncTime")

const dateNow = new Date()
const defaultCanvasSyncDate = new Date("2023-02-02");
const noCanvasSyncDate = new Date(0);

const DateComponent: FC = () => {
  const [date, setDate] = useState<Date>(dateNow)

  useEffect(() => {
    getLastCanvasAccess(setDate)
  }, [])

  const display = () => {
    if (date.valueOf() == defaultCanvasSyncDate.valueOf()) {
      return <div>Date: {date.toISOString()}</div>
    }
    if (date.valueOf() == noCanvasSyncDate.valueOf()) {
      return <div>Never accessed Canvas</div>
    }
    return <div>Waiting</div>
  }

  return display()
}

describe("Mock", () => {
  describe("Get and render Canvas Sync Date", () => {
    it("Renders a date if there is one", async () => {
      const { unmount, findByText } = render(<DateComponent />)
      const dateElem = await findByText(/Date:/)
      expect(dateElem).toHaveTextContent(`Date: ${defaultCanvasSyncDate.toISOString()}`)
    })
    it("Shows there there is no Canvas Sync if there is none", async () => {
      const { unmount, findByText } = render(<DateComponent />)
      const dateElem = await findByText("Never accessed Canvas").catch(error => null)
      expect(dateElem).not.toBe(null)
    })
  })
})