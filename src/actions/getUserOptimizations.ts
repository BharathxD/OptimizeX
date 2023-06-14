"use server";

import formatDate from "@/utils/formatDate";
import getCurrentUser from "./getCurrentUser";
import prisma from "@/libs/prismadb";
import { SafeUserOptimizations } from "@/types/Optimizations";
import { utcToZonedTime } from "date-fns-tz";

/**
 * This function retrieves and formats a user's optimized images from a database, checking for
 * expiration and adding additional properties.
 * @returns The function `getUserOptimizations` returns a Promise that resolves to an array of
 * `SafeUserOptimizations` objects or `null`.
 */
const getUserOptimizations = async (): Promise<SafeUserOptimizations[] | null> => {
  try {
    // Get the current user
    const currentUser = await getCurrentUser();

    // Return null if current user is not found
    if (!currentUser) return null;

    // Retrieve user optimizations from the database
    const getUserOptimizations = await prisma.optimizedImage.findMany({
      where: {
        id: {
          in: currentUser.optimizedImages,
        },
      },
    });

    // Format the optimizations and add additional properties
    const formattedOptimizations = getUserOptimizations.map((optimization) => {
      // Convert dates to IST timezone
      const currentDateToIST = utcToZonedTime(new Date(), "IST");
      const expiryDateToIST = utcToZonedTime(optimization.expiresAt, "IST");

      // Check if the optimization has expired
      const isExpired = expiryDateToIST.getTime() <= currentDateToIST.getTime();

      // Format and modify the optimization object
      return {
        ...optimization,
        extension: optimization.extension.replace("image/", ""),
        expired: isExpired,
        createdAt: formatDate(optimization.createdAt),
      };
    });

    // Reverse the order of optimizations and return
    return formattedOptimizations.reverse();
  } catch (error: any) {
    // Rethrow the error if any exception occurs
    throw new Error(error);
  }
};

export default getUserOptimizations;
