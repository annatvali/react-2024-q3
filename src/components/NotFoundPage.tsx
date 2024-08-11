import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">404 - Not Found</h1>
        <p className="mt-4 text-lg text-gray-700">
          The page you are looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-lg text-blue-500 hover:text-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
