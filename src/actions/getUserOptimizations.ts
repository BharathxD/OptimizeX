import formatDate from "@/utils/formatDate";
import getCurrentUser from "./getCurrentUser";
import prisma from "@/libs/prismadb";

const getUserOptimizations = async () => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return null;
        }
        const getUserOptimizations = await prisma.optimizedImage.findMany({
            where: {
                id: {
                    in: currentUser.optimizedImages
                }
            }
        })
        const oneDay = 24 * 60 * 60 * 1000;
        const formattedOptimizations = getUserOptimizations.map((optimization) => {
            const isExpired = optimization.expiresAt.getTime() > new Date().getTime() + oneDay;
            return {
                ...optimization,
                extension: optimization.extension.replace("image/", ""),
                expired: isExpired,
                createdAt: formatDate(optimization.createdAt)
            }
        })
        return formattedOptimizations;
    } catch (error: any) {
        throw new Error(error);
    }
}

export default getUserOptimizations;