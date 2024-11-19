import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react';
import { userLogin } from '../services/auth';
import { setAuthToken, setUserRole } from '../services/config';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role");

    try {
      setLoading(true);
      const loginResponse = await userLogin({ email, password, role });
      console.log('Login Response:', loginResponse);

      if (loginResponse.status === 200) {
        const { accessToken } = loginResponse.data;

        // Store token
        setAuthToken(accessToken);

        // Store role from the form
        const selectedRole = role.toLowerCase();
        console.log('Selected Role:', selectedRole);

        // Store role
        setUserRole(selectedRole);

        // Navigate based on selected role
        switch (selectedRole) {
          case 'admin':
            navigate("/admin/dashboard");
            break;
          case 'teacher':
            navigate("/teacher/dashboard");
            break;
          case 'student':
            navigate("/student/dashboard");
            break;
          default:
            setError('Invalid user role');
            navigate("/");
        }
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError(error.response?.data?.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="signup flex justify-center items-center h-screen bg-[#F0F8FF] signupPage">
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-sm text-black dark:text-gray-200 w-full h-full items-center justify-center flex flex-col"
        >
          <section className='space-y-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md'>
            <p className="text-2xl font-semibold text-[#0E345A] dark:text-gray-200 relative pl-10 mb-8">
              Login
              <span className="mt-[4px] absolute left-[4px] top-[5px] w-4 h-4 bg-[#0E345A] dark:bg-gray-200 rounded-full"></span>
              <span className="mt-[5px] absolute left-0 top-0 w-6 h-6 animate-pulse bg-[#0E345A] dark:bg-gray-200 rounded-full opacity-10"></span>
            </p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                {error}
              </div>
            )}
            <div>
              <select
                name="role"
                id="role"
                required
                className="w-full p-3 border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-blue-600 
                  bg-white text-gray-900
                  dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 
                  dark:focus:ring-blue-500 dark:placeholder-gray-400"
              >
                <option value="" disabled defaultValue={true}>Select your role...</option>
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>
            <div>
              <input
                required
                type="email"
                name="email"
                placeholder="Enter your email..."
                className="w-full p-3 border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-blue-600 
                  bg-white text-gray-900
                  dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 
                  dark:focus:ring-blue-500 dark:placeholder-gray-400"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter a your password..."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <button
              type="submit"
              className={`w-full bg-[#0E345A] text-white py-3 rounded-lg mb-5 transition-colors ${loading ? "cursor-wait" : "hover:bg-[#0e345ade] cursor-pointer"
                }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-5">
              New Here?{" "}
              <Link
                className="text-blue-600 font-semibold hover:underline dark:text-blue-400"
                to="/register"
              >
                SignUp
              </Link>
            </p>
          </section>
        </form>
      </div>
    </div>
  )
}

export default Login;