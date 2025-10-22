import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { MdMailOutline, MdLockOutline } from 'react-icons/md';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';
import useAuthStore from '../stores/useAuthStore';
import { useState } from 'react';
import axios from 'axios';
import axiosClient from '../axios-config/axiosClient';

const schema = z.object({
  username: z.string().min(1, 'username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

interface LoginRespone {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

type FormFields = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const onSubmit: SubmitHandler<FormFields> = async data => {
    try {
      const response = await axiosClient.post<LoginRespone>(
        '/auth/login',
        data,
      );
      const { accessToken, refreshToken, ...userData } = response.data;
      useAuthStore.getState().login(userData, accessToken, refreshToken);
      navigate('/todo');
    } catch (error) {
      console.error('Login failed:', error);
      if (axios.isAxiosError(error) && error.response) {
        setError('root', {
          message: 'Email or password is wrong. Please try again. ',
        });
      } else {
        setError('root', {
          message: 'Please try again',
        });
      }
    }
  };
  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="flex items-center justify-center bg-[rgba(255,255,255,0.7)] rounded-md w-lg flex-col">
      <div className="mt-4 p-4 text-3xl">
        <p>Login</p>
      </div>
      <form
        action=""
        className="flex flex-col w-full h-full p-6 gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="username" className="flex flex-col gap-2 relative">
          UserName
          <MdMailOutline className="absolute top-9 left-3.5" />
          <input
            {...register('username')}
            id="username"
            type="text"
            placeholder="Input your username"
            autoComplete="username"
            className="border-black border rounded-full p-2 pl-9"
          />
          {errors.username && (
            <div className="text-red-500">{errors.username.message}</div>
          )}
        </label>
        <label htmlFor="password" className="flex flex-col gap-2 relative">
          Password
          <MdLockOutline className="absolute top-9 left-3.5" />
          <input
            {...register('password')}
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Input your password"
            className="border-black border rounded-full p-2 pl-9"
          />
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              handleShowPassword();
            }}
            className="absolute top-9 right-4"
          >
            {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
          </button>
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </label>
        <button
          disabled={isSubmitting}
          className="border rounded-full p-2 bg-cyan-400 text-white hover:bg-cyan-600 transition-colors duration-200"
        >
          {isSubmitting ? 'Loading...' : 'Login'}
        </button>
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
      <div className="p-3 mb-2">
        <p>
          {"If you don't have an account you"}
          <Link to="/register" className="text-cyan-500 underline ml-1">
            can sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
