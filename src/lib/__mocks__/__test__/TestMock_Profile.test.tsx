import { ProfileType } from "@/lib/types";
import { PostgrestError } from "@supabase/supabase-js";
import { FC, useState, useEffect } from "react";
import { getProfile, updateSettings, updateName, updateAvatar, getOldFilePath } from "../../CRUD_Profile"
import { error } from "console";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'

jest.mock("../../CRUD_Profile")

const ProfileComponent: FC = () => {
  const [user, setUser] = useState<{
    data: ProfileType | null;
    error: null | PostgrestError;

  }>({
    data: null,
    error: null
  })

  useEffect(() => {
    getProfile(setUser);
  }, [])

  const divBuilder = () => {
    if (!user.error) {
      return !user.data
        ? <>Nothing</>
        : <>
          <div>Name: {user.data.full_name}</div>
          <div>UserID: {user.data.id}</div>
          <div>Created at: {user.data.created_at?.toISOString()}</div>
          <div>Last Canvas Sync: {user.data.last_canvas_sync.toISOString()}</div>
          <div>Avatar URL: {user.data.avatar_url}</div>
        </>
    }
    return <>
      <div>Error: {user.error.message}</div>
    </>
  }
  return divBuilder();
}

describe("Mock", () => {
  describe("Getting Profiles", () => {
    it("Test user 1 is successful", async () => {
      const { findByText } = render(<ProfileComponent />)
      const nameDiv = await findByText(/Name:/)
      expect(nameDiv).toHaveTextContent("Name: Marjory Nick")
    })
    it("Test user 2 is successful", async () => {
      const { findByText } = render(<ProfileComponent />)
      const nameDiv = await findByText(/Name:/)
      expect(nameDiv).toHaveTextContent("Name: Karol Lindsey")
    })
    it("Test user 3 is successful", async () => {
      const { findByText } = render(<ProfileComponent />)
      const nameDiv = await findByText(/Name:/)
      expect(nameDiv).toHaveTextContent("Name: Garland Julianna")
    })
    it("Test user 4 is successful", async () => {
      const { findByText } = render(<ProfileComponent />)
      const nameDiv = await findByText(/Name:/)
      expect(nameDiv).toHaveTextContent("Name: James Kemp")
    })
    it("Test user 5 is unsuccessful", async () => {
      const { findByText } = render(<ProfileComponent />)
      const errorDiv = await findByText(/Error:/)
      expect(errorDiv).toHaveTextContent("Error: Test error message")
    })
  })
})