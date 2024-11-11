// import { clsx, type ClassValue } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

export const getBaseURL = () => {

  if (process.env.NODE_ENV == "development" )
    return "http://localhost:5173/login"
  else return "https://schoolmgtwebapp.netlify.app/login"
}