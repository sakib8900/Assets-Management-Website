import React from 'react';
import errorImage from "../../../src/assets/error/error.jpeg"
const Error = () => {
    return (
        <div
            className="h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${errorImage})` }}
          >
            <div className="text-center p-8 bg-white bg-opacity-75 rounded-lg shadow-lg max-w-lg mx-auto">
              <h1 className="text-4xl font-bold text-blue-600 mb-4">
                Oops! Page Not Found
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                The page you're looking for doesn't exist.
              </p>
              <a
                href="/"
                className="mt-6 inline-block text-blue-500 hover:underline text-lg"
              >
                Go Back to Home
              </a>
            </div>
          </div>
    );
};

export default Error;