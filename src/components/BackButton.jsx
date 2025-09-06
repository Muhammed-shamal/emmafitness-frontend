'use client'; // if you're in an app directory

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <button
        onClick={() => router.back()}
        className="flex items-center text-red-600 hover:text-red-800 transition-colors duration-200 mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back
      </button>
    </div>
  );
}
