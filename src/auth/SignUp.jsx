import React, { useState } from 'react'
import { userSignUp } from '../services/auth';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
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
      const password = formData.get("password");
      const role = formData.get("role");

      // passing payload to the API...
      const payload = {
        firstName,
        lastName,
        email,
        password,
        role
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
      <div className="signin flex justify-center items-center h-screen bg-contain">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full">
          <p className="text-2xl font-semibold text-[#0E345A] relative pl-10 mb-8">
            Sign Up bro!
            <span className="mt-[4px] absolute left-[4px] top-[5px] w-4 h-4 bg-[#0E345A] rounded-full"></span>
            <span className="mt-[5px] absolute left-0 top-0 w-6 h-6 animate-pulse                   bg-[#0E345A] rounded-full opacity-10"></span>
          </p>
          <div className='space-y-2'>
            <div>
              <input type="text" name="firstName" required id="firstName" placeholder='Enter your first name...' className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-1" />
            </div>
            <div>
              <input type="text" name="lastName" required id="lastName" placeholder='Enter your last name...' className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-1" />
            </div>
            <div>
              <input type="email" name="email" id="email" required placeholder='Enter a email...' className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-1" />
            </div>
            <div>
              <input type="password" name="password" required id="password" placeholder='Enter a secure password...' className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 mb-1" />
            </div>
            <div>
              <select name="role" id="role" required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-1">
                <option value="" disabled defaultValue={"Select your role..."}>Select your role...</option>
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-[#0E345A] text-white py-3 rounded-lg hover:bg-[#0e345ade] transition-colors my-5">
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-5">
            Already have an account?{" "}/
            <Link
              className="text-blue-600 font-semibold hover:underline"
              to="/login"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp