import { uploadBytes } from "firebase/storage";
import { StorageReference, UploadResult } from "@firebase/storage";

export const pushFileToStorage = async (
  storageRef: StorageReference,
  file: File,
): Promise<UploadResult | undefined> => {
  console.log("fileUpload pushFileToStorage attempt");
  try {
    const snapshot = await uploadBytes(storageRef, file);
    console.log("fileUpload pushFileToStorage success", snapshot);
    return snapshot;
  } catch (error: any) {
    console.log("fileUpload pushFileToStorage error", error);
    throw new Error(error);
  }
};
