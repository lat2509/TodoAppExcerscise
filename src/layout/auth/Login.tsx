import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { MdMailOutline, MdLockOutline } from 'react-icons/md';
import { IoEyeSharp } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';
import useAuthStore from '../../stores/useAuthStore';
import { useState } from 'react';
import { loginApi } from '../../api/authApi';
import axios from 'axios';

const schema = z.object({
  username: z.string().min(1, 'username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

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
      const response = await loginApi(data.username, data.password);
      const { accessToken, refreshToken, user } = response.data.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      useAuthStore.getState().login(user);
      navigate('/todo');
    } catch (error: unknown) {
      console.error('Login failed:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setError('root', {
            message: 'Invalid username or password.',
          });
        } else {
          setError('root', {
            message: 'An unexpected error occurred.',
          });
        }
      }
    }
  };
  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="flex w-5/6 flex-col items-center justify-center rounded-md bg-[rgba(255,255,255,0.7)] md:w-lg">
      <div className="mt-4 p-4 text-3xl">
        <p>Login</p>
      </div>
      <form
        action=""
        className="flex h-full w-full flex-col gap-5 p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="username" className="relative flex flex-col gap-2">
          UserName
          <MdMailOutline className="absolute top-9 left-3.5" />
          <input
            {...register('username')}
            id="username"
            type="text"
            placeholder="Input your username"
            autoComplete="username"
            className="rounded-full border border-black p-2 pl-9"
          />
          <div className="h-2 text-red-500">{errors.username?.message}</div>
        </label>
        <label htmlFor="password" className="relative flex flex-col gap-2">
          Password
          <MdLockOutline className="absolute top-9 left-3.5" />
          <input
            {...register('password')}
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Input your password"
            className="rounded-full border border-black p-2 pl-9"
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
          <div className="h-2 text-red-500">{errors.password?.message}</div>
        </label>
        <button
          disabled={isSubmitting}
          className="rounded-full border bg-cyan-400 p-2 text-white transition-colors duration-200 hover:bg-cyan-600"
        >
          {isSubmitting ? 'Loading...' : 'Login'}
        </button>
        <div className="h-3 text-red-500">{errors.root?.message}</div>
      </form>
      <div className="mb-2 p-3">
        <p>
          {"If you don't have an account you"}
          <Link to="/register" className="ml-1 text-cyan-500 underline">
            can sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
