
import React from 'react';
import { Link } from 'react-router';

export default function ErrorPage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center ">
      <h1 className="text-6xl font-bold color-text">Oops!</h1>
      <p className="text-2xl mt-4 font-medium text-gray-700">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="text-lg mt-2 text-gray-500">
        The page you are looking for doesn't exist or there was an issue.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block px-6 py-3 text-lg font-semibold text-white glassy-bg"
      >
        Go Back to Home
      </Link>
    </div>
  );
}
