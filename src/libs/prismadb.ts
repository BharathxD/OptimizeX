import { PrismaClient } from "@prisma/client";

/**
 * Implementing a Singleton Prisma Client
 */

declare global {
    var prisma: PrismaClient | undefined;
}

// Create a new Prisma client if it doesn't exist already
const client = global.prisma || new PrismaClient();

/**
 * Initialize the Prisma client.
 * 
 * If the `prisma` global variable is not defined, create a new PrismaClient instance.
 * This is useful for maintaining a single instance of the Prisma client across the application.
 * 
 * If the environment is not in production, assign the Prisma client to the `prisma` global variable.
 * This is done to support NextJS Fast-Refresh, which may create multiple instances of the Prisma client during development.
 * By resetting the `prisma` global variable on each module reload, we ensure that the latest Prisma client instance is used.
 * 
 * Note: `global` is a constant reference to the global object, and hot reloading only affects the code modules that are being updated, not the global object itself.
 */
if (process.env.NODE_ENV !== "production") global.prisma = client;

export default client;
