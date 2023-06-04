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
        const formattedOptimizations = getUserOptimizations.map((optimization) => {
            return {
                ...optimization,
                createdAt: formatDate(optimization.createdAt)
            }
        })
        return formattedOptimizations;
    } catch (error: any) {
        throw new Error(error);
    }
}

export default getUserOptimizations;