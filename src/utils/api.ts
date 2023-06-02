import axios from "axios";

export const uploadImage = async (files: File[]): Promise<string | undefined> => {
    if (!files || files.length === 0) {
        throw new Error("Invalid file");
    }
    try {
        const { data } = await axios.get(`/api/media`);
        const { s3UploadUrl, fullUrls } = data;
        await axios.put(s3UploadUrl, files);
        return fullUrls;
    } catch (error: any) {
        console.error("Failed to upload file to S3:", error);
    }
}