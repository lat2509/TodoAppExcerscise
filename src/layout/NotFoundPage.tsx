import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-5xl font-bold text-gray-800 md:text-6xl lg:text-8xl">
          404
        </h1>
        <p className="mt-4 text-lg text-gray-600 md:text-xl">
          Oops! Page Not Found.
        </p>
        <p className="mt-2 text-base text-gray-500">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded bg-blue-500 px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-blue-600 focus:ring focus:outline-none"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
