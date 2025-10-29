import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex h-1/2 w-1/2 flex-col items-center justify-center bg-white text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Oops! Page Not Found.</p>
      <p className="mt-2 text-gray-500">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 rounded bg-blue-500 px-4 py-2 text-black transition-colors hover:bg-blue-600"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
