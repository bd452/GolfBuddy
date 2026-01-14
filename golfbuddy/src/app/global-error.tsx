"use client";

/**
 * Global Error Boundary
 * Handles errors that occur in the root layout.
 * Must be a client component.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-zinc-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-zinc-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-zinc-600 mb-6">
              {error.message || "An unexpected error occurred"}
            </p>
            <button
              onClick={reset}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
