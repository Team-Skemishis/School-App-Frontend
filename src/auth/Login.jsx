import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../services/auth';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      setLoading(true);
      const response = await userLogin({ email, password });
      console.log(response.data);

      // Navigate to the dashboard after showing the toast for 2 seconds
      setTimeout(() => {
        navigate("/system");
      }, 2000); // Wait 2 seconds before navigation

      if (response.status === 200) {
        localStorage.setItem("token", response.data.accessToken);
        // const profileResponse = await apiProfile();
        // console.log(profileResponse.data);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-[#F0F8FF] mx-auto w-full'>
      <div className="signin flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full"
        >
          <p className="text-2xl font-semibold text-[#0E345A] relative pl-10 mb-8">
            Login
            <span className="mt-[4px] absolute left-[4px] top-[5px] w-4 h-4 bg-[#0E345A] rounded-full"></span>
            <span className="mt-[5px] absolute left-0 top-0 w-6 h-6 animate-pulse bg-[#0E345A] rounded-full opacity-10"></span>
          </p>
          <div>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter your email..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-3"
            />
          </div>
          <div>
            <input
              required
              type="password"
              name="password"
              placeholder="Enter your password..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0E345A] text-white py-3 rounded-lg hover:bg-[#0e345ade] transition-colors mb-5"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <p className="text-center text-sm text-gray-600 mt-5">
            New Here?{" "}
            <Link
              className="text-blue-600 font-semibold hover:underline"
              to="/register"
            >
              SignUp
            </Link>
          </p>
        </form>
      </div>

    </div>
  )
}

export default Login