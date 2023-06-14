import axios from "axios";

/**
 * Uploads an image file to the server and returns the corresponding key.
 * @param file - The image file to upload.
 * @returns A Promise that resolves to the key of the uploaded image.
 * @throws {Error} If the file is invalid or an error occurs during the upload process.
 */
export const uploadImage = async (file: File, date: Date): Promise<any> => {
  try {
    if (!file || file.name === "") {
      throw new Error("Invalid file");
    }
    try {
      const { data } = await axios.post(`/api/media`, {
        fileType: file.type,
        fileName: file.name,
        uploadDate: date,
      });
      const { s3UploadUrl, key } = JSON.parse(data);
      await axios.put(s3UploadUrl, file);
      return key;
    } catch (error: any) {
      throw new Error(error);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
