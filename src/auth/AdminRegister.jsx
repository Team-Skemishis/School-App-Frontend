import React, { useState } from 'react'
import { userSignUp } from '../services/auth';
import { Link, useNavigate } from 'react-router-dom';

const AdminRegister = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);

            // preparing form data...
            const formData = new FormData(event.target);
            const firstName = formData.get("firstName");
            const lastName = formData.get("lastName");
            const email = formData.get("email");
            const schoolName = formData.get("schoolName");
            const password = formData.get("password");
            // const role = formData.get("role");

            // passing payload to the API...
            const payload = {
                firstName,
                lastName,
                email,
                schoolName,
                password,
                role: "admin"
            }

            // calling the API to sign up...
            const response = await userSignUp(payload);
            console.log(response.data)

            // navigate to home page if signup is successful
            setTimeout(() => {
                navigate("/login");
            }, 2000) // navigate after two seconds...
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="signup flex justify-center items-center h-screen bg-[#F0F8FF] signupPage">
                <form onSubmit={handleSubmit} className="backdrop-blur-sm text-black dark:text-gray-200 w-full h-full items-center justify-center flex flex-col ">
                    <section className='space-y-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md'>
                        <p className="text-2xl font-semibold text-[#0E345A] dark:text-gray-200 relative pl-10 mb-8">
                            Sign Up as Admin
                            <span className="mt-[4px] absolute left-[4px] top-[5px] w-4 h-4 bg-[#0E345A] dark:bg-gray-200 rounded-full"></span>
                            <span className="mt-[5px] absolute left-0 top-0 w-6 h-6 animate-pulse bg-[#0E345A] dark:bg-gray-200 rounded-full opacity-10"></span>
                        </p>
                        <div>
                            <input type="text" name="firstName" required id="firstName" placeholder='Enter your first name...' className="w-full p-3 border border-gray-300 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-blue-600 
                  bg-white text-gray-900
                  dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 
                  dark:focus:ring-blue-500 dark:placeholder-gray-400" />
                        </div>
                        <div>
                            <input type="text" name="lastName" required id="lastName" placeholder='Enter your last name...' className="w-full p-3 border border-gray-300 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-blue-600 
                  bg-white text-gray-900
                  dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 
                  dark:focus:ring-blue-500 dark:placeholder-gray-400" />
                        </div>
                        <div>
                            <input type="email" name="email" id="email" required placeholder='Enter a email...' className="w-full p-3 border border-gray-300 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-blue-600 
                  bg-white text-gray-900
                  dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 
                  dark:focus:ring-blue-500 dark:placeholder-gray-400" />
                        </div>
                        <div>
                            <input type="text" name="schoolName" id="schoolName" required placeholder='Enter the name of your school...' className="w-full p-3 border border-gray-300 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-blue-600 
                  bg-white text-gray-900
                  dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 
                  dark:focus:ring-blue-500 dark:placeholder-gray-400" />
                        </div>
                        <div>
                            <input type="password" name="password" required id="password" placeholder='Enter a secure password...' className="w-full p-3 border border-gray-300 rounded-md
                  focus:outline-none focus:ring-2 focus:ring-blue-600 
                  bg-white text-gray-900
                  dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 
                  dark:focus:ring-blue-500 dark:placeholder-gray-400" />
                        </div>
                        <button type="submit" className={`w-full bg-[#0E345A] text-white py-3 rounded-lg mb-5 transition-colors ${loading ? "cursor-wait" : "hover:bg-[#0e345ade] cursor-pointer"
                            }`}
                            disabled={loading}>
                            {loading ? "Loading..." : "Sign Up"}
                        </button>

                        <p className="text-center text-sm text-gray-600 mt-5">
                            Already have an account?{" "}
                            <Link
                                className="text-blue-600 font-semibold hover:underline"
                                to="/login"
                            >
                                Login
                            </Link>
                        </p>
                    </section>
                </form>
            </div>
        </div>
    )
}

export default AdminRegister