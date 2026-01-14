/**
 * 404 Not Found page
 * Displayed when a route doesn't exist
 */

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-green-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          Page not found
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
