import axios from "axios";

export const uploadImage = async (file: File): Promise<string> => {
    if (!file || file.name === "") {
        throw new Error("Invalid file");
    }
    const fileType = encodeURIComponent(file.type);
    try {
        const { data } = await axios.get(`/api/media?fileType=${fileType}`);
        const { s3UploadUrl, key } = JSON.parse(data);
        await axios.put(s3UploadUrl, file);
        return key;
    } catch (error: any) {
        throw new Error(error);
    }
};