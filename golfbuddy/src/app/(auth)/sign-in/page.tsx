/**
 * Sign In page
 * Route: /sign-in
 */
export default function SignInPage() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-800"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-800"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
        >
          Sign In
        </button>
      </form>
      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 mt-4">
        Don&apos;t have an account?{" "}
        <a href="/sign-up" className="text-green-600 hover:text-green-700 font-medium">
          Sign Up
        </a>
      </p>
    </div>
  );
}
