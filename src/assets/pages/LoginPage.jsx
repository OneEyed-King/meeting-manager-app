import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const navigate = useNavigate();
  
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Used to reset form values
  } = useForm({
    defaultValues: {
      username: 'OneEyedKing', // Prepopulate username
      password: 'ToukaKirishima', // Prepopulate password
    },
  });

  const showToast = (message) => {
    toast.error(message, {
      position: 'bottom-center',
      autoClose: 3000,
      closeOnClick: true,
      hideProgressBar: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const onSubmit = (data) => {
    const validUserName = 'OneEyedKing';
    const validPassWord = 'ToukaKirishima';

    if (data.username === validUserName && data.password === validPassWord) {
      navigate('/dashboard');
    } else {
      showToast('Invalid Username or Password');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="bg-rose-200 opacity-75 border-rose-300 p-8 rounded-2xl shadow-lg w-96 animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 text-rose-950 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Field */}
          <div className="mb-4 text-rose-950">
            <label htmlFor="username" className="block font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-3 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
              placeholder="Enter your username"
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && (
              <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6 text-rose-950">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
              placeholder="Enter your password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-customBlueDark text-rose-950 font-semibold py-3 px-4 rounded-lg hover:bg-rose-300 transition duration-300 focus:outline-none focus:ring-4 focus:ring-customBlueLight"
          >
            Login
          </button>

          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
