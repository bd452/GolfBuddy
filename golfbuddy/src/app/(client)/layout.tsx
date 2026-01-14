/**
 * Client layout - wraps authenticated client pages
 * Includes client navigation (dashboard, orders)
 */
import Link from "next/link";

// Client pages require auth, so they must be dynamically rendered
export const dynamic = "force-dynamic";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Client Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="font-bold text-xl text-green-600">
              GolfBuddy
            </Link>
            <div className="flex items-center gap-6">
              <a href="/dashboard" className="text-sm hover:text-green-600">
                Dashboard
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Welcome back
            </span>
            <a
              href="/sign-in"
              className="text-sm text-red-600 hover:text-red-700"
            >
              Sign Out
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1 bg-zinc-50 dark:bg-zinc-950">{children}</main>
    </div>
  );
}
