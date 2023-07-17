import { PostgrestError } from "@supabase/supabase-js";
import { ProfileType } from "../types"
import { Dispatch, SetStateAction } from "react";

/*
getProfile: Everytime getProfile is called, the next profile is given. There are total of 4 profiles plus 1 error profile.
updateName: If username == "", returns a PostgrestError. Otherwise, returns null.
getOldFilePath: returns defaultAvatarURL.
updateAvatar: if filename == "" or filetype is wrong, returns PostgrestError. Otherwise, returns null. Unable to mock StorageError at the moment.
updateSettings: Does nothing.
*/
const path = require('path');


const defaultCreationDate = new Date("2023-01-01");
const defaultCanvasSyncDate = new Date("2023-02-02");
const noCanvasSyncDate = new Date(0);
const defaultAvatarURL = "https://ftildovxenjyztgzfvla.supabase.co/storage/v1/object/public/avatars/avatars/30f651bb-b647-455a-84b9-42923c2d8064/1689557673915_avatar.png"

const testUsers: ProfileType[] = [
  //names were randomly generated online
  {
    id: 1, //user without canvas sync and avatar
    created_at: defaultCreationDate,
    full_name: "Marjory Nick",
    avatar_url: undefined,
    last_canvas_sync: noCanvasSyncDate,
  },
  {
    id: 2, //user without avatar but has synced with Canvas
    created_at: defaultCreationDate,
    full_name: "Karol Lindsey",
    avatar_url: undefined,
    last_canvas_sync: defaultCanvasSyncDate,
  },
  {
    id: 3, //user with Avatar but no canvas sync
    created_at: defaultCreationDate,
    full_name: "Garland Julianna",
    avatar_url: defaultAvatarURL,
    last_canvas_sync: noCanvasSyncDate,
  },
  {
    id: 4, //user with Avatar and canvas sync
    created_at: defaultCreationDate,
    full_name: "James Kemp",
    avatar_url: defaultAvatarURL,
    last_canvas_sync: defaultCanvasSyncDate,
  }
];

const profileFunctions = jest.createMockFromModule<typeof import("../CRUD_Profile")>("../CRUD_Profile")
const wrapperProfileGetter = () => {
  let ptr = 0
  return async (setter: Dispatch<SetStateAction<{
    data: any;
    error: PostgrestError | null
  }>>) => {
    if (ptr == 4) {
      setter({
        data: null,
        error: {
          message: "Test error message",
          details: "Test error details",
          hint: "Test hint",
          code: "Test code"
        }
      })
      ptr = 0
    }
    else {
      setter({
        data: testUsers[ptr],
        error: null
      })
      ptr++
    }
  }
}
profileFunctions.getProfile = wrapperProfileGetter()

profileFunctions.updateName = async (username: string) => {
  if (!username) {
    return {
      message: "Invalid username",
      details: "Invalid username w details",
      hint: "Give a username",
      code: "Test code"
    }
  }
  return null
}


profileFunctions.getOldFilePath = async () => defaultAvatarURL//jest.fn(async () => defaultAvatarURL)

profileFunctions.updateAvatar = async (avatarFile: File) => {
  //I cannot replicate the StorageError so ill just exclude it.
  if (!avatarFile.name) {
    return {
      message: "Invalid filename",
      details: "Invalid filename w details",
      hint: "Give a filename",
      code: "Test code"
    }
  }
  if (avatarFile.type != "image/jpeg" && avatarFile.type == "image/png") {
    return {
      message: "Invalid file type",
      details: "Invalid file type w details",
      hint: "Give a file type",
      code: "Test code"
    }
  }
  return null
}

profileFunctions.updateSettings = jest.fn(
  async (newName: string, avatarFile: File | null, pageUpdater: () => void) => { }
)

module.exports = profileFunctions



