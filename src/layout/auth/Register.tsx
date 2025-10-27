import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { MdLockOutline } from 'react-icons/md';
import { FaRegUser, FaEyeSlash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { useState } from 'react';
import registerApi from '../../services/authServices';

const schema = z
  .object({
    userName: z.string().min(1, 'UserName is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        'Password must contain at least one uppercase, one lowercase, one number, and one special character',
      ),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormFields = z.infer<typeof schema>;

const Register = () => {
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

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit: SubmitHandler<FormFields> = async data => {
    try {
      const userToRegister = {
        username: data.userName,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };
      await registerApi(userToRegister);
      navigate('/login');
    } catch (error: any) {
      console.error('Registration failed:', error);
      if (error.response?.status === 409) {
        setError('root', {
          message: "Username already exists",
        });
      }
    }
  };

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(prev => !prev);
  };

  return (
    <div className="flex w-lg flex-col items-center justify-center rounded-md bg-[rgba(255,255,255,0.7)]">
      <div className="mt-4 p-4 text-3xl">
        <p>Sign Up</p>
      </div>
      <form
        action=""
        className="flex h-full w-full flex-col gap-5 p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="userName" className="relative flex flex-col gap-2">
          UserName
          <FaRegUser className="absolute top-9 left-3.5" />
          <input
            {...register('userName')}
            id="userName"
            type="text"
            placeholder="Input your user name"
            className="rounded-full border border-black p-2 pl-9"
          />
          <div className="text-red-500 h-2">{errors.userName?.message}</div>
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
          <div className="text-red-500 h-2">{errors.password?.message}</div>
        </label>
        <label htmlFor="password" className="relative flex flex-col gap-2">
          Confirm Password
          <MdLockOutline className="absolute top-9 left-3.5" />
          <input
            {...register('confirmPassword')}
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Input your password again"
            className="rounded-full border border-black p-2 pl-9"
          />
          <button
            type="button"
            onClick={() => {
              handleShowConfirmPassword();
            }}
            className="absolute top-9 right-4"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <IoEyeSharp />}
          </button>
          <div className="text-red-500 h-2">{errors.confirmPassword?.message}</div>
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 rounded-full border bg-cyan-400 p-2 text-white transition-colors duration-200 hover:bg-cyan-600"
        >
          {isSubmitting ? 'Loading...' : 'Sign Up'}
        </button>
        <div className="text-red-500 h-3">{errors.root?.message}</div>
      </form>
      <div className="mb-2 p-3">
        <p>
          If you have an account you
          <Link to="/login" className="ml-1 text-cyan-500 underline">
            can login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
