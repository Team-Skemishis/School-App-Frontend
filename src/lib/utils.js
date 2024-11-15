export const getBaseURL = () => {

  if (process.env.NODE_ENV == "development" )
    return "http://localhost:5173/login"
  else return "https://schoolmgtwebapp.netlify.app/login"
}