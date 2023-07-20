import { ProfileType } from "@/lib/types";
import { PostgrestError } from "@supabase/supabase-js";
import { FC, useState, useEffect } from "react";
import { getProfile, updateSettings, updateName, updateAvatar, getOldFilePath } from "../../CRUD_Profile"
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
  describe("Updating username", () => {
    it("Accepts valid usernames", async () => {
      const error = await updateName("John")
      expect(error).toBe(null)
    })
    it("Rejects empty username", async () => {
      const error = await updateName("")
      expect(error).toEqual({
        message: "Invalid username",
        details: "Invalid username w details",
        hint: "Give a username",
        code: "Test code"
      })
    })
  })
  describe("Getting old file path", () => {
    it("Returns old file path", async () => {
      const filePath = await getOldFilePath()
      expect(filePath).toBe("https://ftildovxenjyztgzfvla.supabase.co/storage/v1/object/public/avatars/avatars/30f651bb-b647-455a-84b9-42923c2d8064/1689557673915_avatar.png")
    })
  })
  describe("Update Avatar", () => {
    it("Rejects empty filename", async () => {
      const file = new File([], "", {
        type: "image/jpeg"
      })
      const result = await updateAvatar(file)
      expect(result).toEqual({
        message: "Invalid filename",
        details: "Invalid filename w details",
        hint: "Give a filename",
        code: "Test code"
      })      
    })
    it("Rejects wrong file types", async () => {
      const file = new File([], "Test File", {
        type: "application/pdf"
      })
      const result = await updateAvatar(file)
      expect(result).toEqual({
        message: "Invalid file type",
        details: "Invalid file type w details",
        hint: "Give a file type",
        code: "Test code"
      })  
    })
    it("Accept jpeg/jpg files with name", async () => {
      const file = new File([], "Test File", {
        type: "image/jpeg"
      })
      const result = await updateAvatar(file)
      expect(result).toEqual(null)  
    })
    it("Accept png files with name", async () => {
      const file = new File([], "Test File", {
        type: "image/png"
      })
      const result = await updateAvatar(file)
      expect(result).toEqual(null)  
    })
  })
  //No test cases required for updateSettings as the mock function does nothing.
})