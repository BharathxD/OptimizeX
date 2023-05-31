import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const mergeClasses = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export default mergeClasses;