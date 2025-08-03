'use client';

import Link from 'next/link';
import { FaArrowLeft, FaLifeRing } from 'react-icons/fa';

export default function NotFound() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-gray-50 px-6 py-24 lg:px-8">
      <div className="text-center max-w-lg">

        {/* Status Code */}
        <p className="text-sm font-medium text-red-500">Error 404</p>

        {/* Main Heading */}
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>

        {/* Description */}
        <p className="mt-4 text-base text-gray-600">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow hover:bg-primary-dark transition"
          >
            <FaArrowLeft className="h-4 w-4" />
            Go back home
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary transition"
          >
            <FaLifeRing className="h-4 w-4" />
            Contact support
          </Link>
        </div>
      </div>
    </main>
  );
}
