"use server";

import { authOptions } from "@/libs/auth";
import database from "@/libs/prismadb";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";

import { SafeUser } from "@/types/User";

/**
 * This function exports an asynchronous function that retrieves a server session using authentication
 * options.
 * @returns The `getSession` function is returning a promise that resolves to the result of calling the
 * `getServerSession` function with the `authOptions` parameter. The `await` keyword is used to wait
 * for the promise to resolve before returning its result.
 */
export const getSession = async () => await getServerSession(authOptions);

/**
 * `getCurrentUser` is a function that retrieves the current user's information from the database,
 * by using their email address stored in the session.
 * @returns A Promise that resolves to a `SafeUser` object with modified date properties.
 * If the session or user email is missing, it returns null.
 * If the currentUser is not found in the database, it also returns null.
 */
const getCurrentUser = async (): Promise<SafeUser | null> => {
  try {
    // Retrieve thaae session
    const session: Session | null = await getSession();

    // Check if the session or user email is missing, return null if true
    if (!session?.user?.email) return null;

    // Retrieve the currentUser from the database using the email from the session
    const currentUser = await database.user.findUnique({
      where: { email: session.user.email },
    });

    // Return null if currentUser is not found in the database
    if (!currentUser) return null;

    // Format and return the currentUser object with modified date properties
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toLocaleString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    // Rethrow the error if any exception occurs
    throw new Error(error);
  }
};

export default getCurrentUser;
