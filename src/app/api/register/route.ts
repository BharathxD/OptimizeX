import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import argon2 from "argon2";
import { StatusCodes } from "http-status-codes";
import { omit } from "lodash";

/**
 * This function creates a new user in a database, hashes their password, and returns a JSON response with the user's information.
 * @param {NextRequest} req - The `req` parameter is an object representing the incoming HTTP request.
 * It is of type `NextRequest`, which is a custom type defined by the Next.js framework.
 * It contains information about the request, such as the HTTP method, headers, and body.
 * @returns a JSON response with a safeUser object and a 201 status code if the user is successfully created in the database.
 * If there is an error, it will return a JSON response with an appropriate error message and status code.
 */
export async function POST(req: NextRequest) {
  try {
    // Extract name, email, and password from the request body
    const { name, email, password } = await req.json();

    // Validate params
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Invalid user information" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    // Hash the password using Argon2
    const hashedPassword = await argon2.hash(password);

    // Create a new user in the database
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name,
        hashedPassword,
      },
    });

    // Omit the hashedPassword field from the user object
    const safeUser = omit(user, "hashedPassword");

    // Return the safeUser object as a JSON response with a 201 status code
    return NextResponse.json(safeUser, {
      status: StatusCodes.CREATED,
    });
  } catch (error: unknown) {
    // Handle specific errors and return appropriate JSON responses
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: StatusCodes.CONFLICT }
      );
    }
    // Handle generic error
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
