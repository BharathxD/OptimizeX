import axios from "axios";

/**
 * Uploads an image file to the server and returns the corresponding key.
 * @param file - The image file to upload.
 * @param date - The upload date.
 * @returns A Promise that resolves to the key of the uploaded image.
 * @throws {Error} If the file is invalid or an error occurs during the upload process.
 */
export const uploadImage = async (file: File, date: Date): Promise<any> => {
  try {
    // Check if the file is valid
    if (!file || file.name === "") {
      throw new Error("Invalid file");
    }
    // Make a POST request to the server to get the upload URL and key
    const { data } = await axios.post(`/api/media`, {
      fileType: file.type,
      fileName: file.name,
      uploadDate: date,
    });

    // Extract the upload URL and key from the response
    const { s3UploadUrl, key } = data;

    // Upload the file to the specified S3 URL
    await axios.put(s3UploadUrl, file);

    // Return the key of the uploaded image
    return key;
  } catch (error: any) {
    // Rethrow the error if the file is invalid
    throw new Error(error);
  }
};

