import axios from "axios";

/**
 * Uploads an image file to the server and returns the corresponding key.
 * @param file - The image file to upload.
 * @returns A Promise that resolves to the key of the uploaded image.
 * @throws {Error} If the file is invalid or an error occurs during the upload process.
*/
export const uploadImage = async (file: File): Promise<string> => {
    try {
        if (!file || file.name === "") {
            throw new Error("Invalid file");
        }
        const fileType = encodeURIComponent(file.type);
        const fileName = encodeURIComponent(file.name);

        try {
            const { data } = await axios.get(`/api/media?fileType=${fileType}&fileName=${fileName}`);
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

