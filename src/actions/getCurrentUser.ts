import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import prisma from "@/libs/prismadb";
import { SafeUser } from "@/types/User";

export const getSession = async () => {
    return await getServerSession(authOptions);
};

const getCurrentUser = async (): Promise<SafeUser | null> => {
    try {
        const session: Session | null = await getSession();
        if (!session?.user?.email) return null;
        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email }
        });
        if (!currentUser) return null;
        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        }
    } catch (error: any) {
        throw new Error(error);
    }
}

export default getCurrentUser;