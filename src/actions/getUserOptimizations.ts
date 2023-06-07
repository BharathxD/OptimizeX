import formatDate from "@/utils/formatDate";
import getCurrentUser from "./getCurrentUser";
import prisma from "@/libs/prismadb";
import { SafeUserOptimizations } from "@/types/Optimizations";

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

        const formattedOptimizations = getUserOptimizations.map((optimization) => {
            const isExpired = optimization.expiresAt.getTime() < new Date().getTime();
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