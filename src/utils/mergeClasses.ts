import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The function `mergeClasses` merges multiple class values into a single string using the `clsx` and
 * `twMerge` libraries in TypeScript.
 * @param {ClassValue[]} inputs - `inputs` is a rest parameter that allows the function to accept an
 * arbitrary number of arguments as an array. 
 * In this case, the arguments are of type `ClassValue`, which is a type defined by the `classnames` library.
 */
const mergeClasses = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export default mergeClasses;
