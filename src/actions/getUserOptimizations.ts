import formatDate from "@/utils/formatDate";
import getCurrentUser from "./getCurrentUser";
import prisma from "@/libs/prismadb";
import { SafeUserOptimizations } from "@/types/Optimizations";
import { format, utcToZonedTime } from "date-fns-tz";

const getUserOptimizations = async (): Promise<SafeUserOptimizations[] | null> => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) return null;

        const getUserOptimizations = await prisma.optimizedImage.findMany({
            where: {
                id: {
                    in: currentUser.optimizedImages
                }
            }
        });

        const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

        const formattedOptimizations = getUserOptimizations.map((optimization) => {
            const currentDate = utcToZonedTime(new Date().getTime(), "IST");
            const expiryDate = utcToZonedTime(optimization.expiresAt.getTime(), "IST");
            const isExpired = expiryDate <= currentDate;
            return {
                ...optimization,
                extension: optimization.extension.replace("image/", ""),
                expired: isExpired,
                createdAt: formatDate(optimization.uploadDate)
            }
        });

        return formattedOptimizations.reverse();
    } catch (error: any) {
        throw new Error(error);
    }
}

export default getUserOptimizations;