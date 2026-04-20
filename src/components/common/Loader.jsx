// src/components/common/Loader.jsx
import React from 'react';

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-amber-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
      {message && <p className="mt-4 text-gray-600 text-sm">{message}</p>}
    </div>
  );
};

export default Loader;