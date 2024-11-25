import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react';
import { userLogin } from '../services/auth';
import { setAuthToken, setUserRole } from '../services/config';
import illustration from '../assets/images/loginIllustration.png'
import logo from '../assets/images/eSukuu.png'
import teacherAvatar from '../assets/images/teacherAvatar.png'
import studentAvatar from '../assets/images/studentAvatar.png'
import adminAvatar from '../assets/images/adminAvatar.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingModal from '../components/ModalLoading';


const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("")

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!selectedRole) {
      setError("Please select a role...");
      toast.error("Please select a role...");
      return;
    }

    try {
      setLoading(true);
      const loginResponse = await userLogin({ email, password, role: selectedRole });
      console.log('Login Response:', loginResponse);

      if (loginResponse.status === 200) {
        const { accessToken } = loginResponse.data;

        // Store token
        setAuthToken(accessToken);

        // storing role too...
        setUserRole(selectedRole);
        console.log('Selected Role:', selectedRole);

        // Show success toast
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Add a small delay before navigation
        setTimeout(() => {
          switch (selectedRole.toLowerCase()) {
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
              toast.error('Invalid user role');
              navigate("/");
          }
        }, 1000); // 1 second delay
      }
    } catch (error) {
      console.error('Login Error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred during login';
      setError(errorMessage);
      // Show error toast
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    };

  };

  return (
    <div className="signup flex justify-center items-center h-screen bg-white dark:bg-gray-800  lg:px-20">
      <LoadingModal isLoading={loading} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-sm dark:bg-gray-800 text-black dark:text-gray-200 w-full h-full items-center justify-center flex flex-col"
      >
        <div className='items-center justify-between flex flex-col bg-white dark:bg-gray-800 rounded-2xl'>
          <section className='flex gap-5'>
            <div className='w-1/2 p-6 items-center justify-center hidden sm:flex flex-col  rounded-2xl my-auto'>
              <img src={illustration} alt="Login illustration" className="w-80" />
              <h2 className='text-2xl font-semibold mb-3 text-gray-800 font-josefinSans text-center dark:text-gray-200'>Welcome Back to a Smarter School Management System!</h2>
              <p className='font-montserrat text-justify'>Access your personalized dashboard and continue where you left off. Whether you&apos;re an <span className='font-semibold italic text-theme-color'>admin</span> overseeing operations, a <span className='font-semibold italic text-theme-color'>teacher</span> managing lessons, or a <span className='font-semibold italic text-theme-color'>student</span> staying on top of your studies, our platform is here to keep things seamless and efficient. <br /> Let&apos;s get started!</p>
            </div>
            <div className='w-[345px] md:w-1/2  md:px-16 dark:bg-gray-800 rounded-2xl flex flex-col space-y-4 my-auto mx-auto'>
              <Link to="/" className='cursor-pointer'>
                <img src={logo} alt="eSukuuLogo" className="w-40" />
              </Link>
              <p className="text-2xl font-semibold text-[#0E345A] dark:text-gray-200 relative mb-8">
                Login
              </p>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                  {error}
                </div>
              )}
              <section className='space-y-3 sm:space-y-5 bg-white dark:bg-gray-800 rounded-2xl'>
                <p className="text-lg font-semibold  text-center">I am</p>

                <div className='flex justify-center gap-3 sm:gap-6'>
                  <button type='button' onClick={() => handleRoleSelection("admin")} className={`flex flex-col items-center p-2 border rounded-2xl text-xs sm:text-base ${selectedRole === "admin" ? "border-theme-color font-semibold" : "border-gray-300 dark:border-gray-600 text-gray-300"}`}>
                    <div className=" w-12 h-12 rounded-full flex items-center justify-center">

                      <img src={adminAvatar} alt="Login illustration" className="w-8 md:w-12" />
                    </div>
                    Admin
                  </button>
                  <button type='button' onClick={() => handleRoleSelection("teacher")} className={`flex flex-col items-center p-2 border rounded-2xl text-xs sm:text-base ${selectedRole === "teacher" ? "border-theme-color font-semibold" : "border-gray-300 dark:border-gray-600 text-gray-300"}`}>
                    <div className=" w-12 h-12 rounded-full flex items-center justify-center">

                      <img src={teacherAvatar} alt="Login illustration" className="w-8 md:w-12" />
                    </div>
                    Teacher
                  </button>
                  <button type='button' onClick={() => handleRoleSelection("student")} className={`flex flex-col items-center p-2 border rounded-2xl text-xs sm:text-base ${selectedRole === "student" ? "border-theme-color font-semibold" : "border-gray-300 dark:border-gray-600 text-gray-300"}`}>
                    <div className=" w-12 h-12 rounded-full flex items-center justify-center">

                      <img src={studentAvatar} alt="Login illustration" className="w-8 md:w-12" />
                    </div>
                    Student
                  </button>
                </div>
                {/* <div>
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
                </div> */}
                <div>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Enter your email"
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
                    autoComplete="current-password"
                    placeholder="Enter your password"
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
            </div>
          </section>
        </div>
      </form>
    </div>
  )
}

export default Login;