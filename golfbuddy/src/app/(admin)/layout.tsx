/**
 * Admin layout - wraps coach/admin pages
 * Includes admin navigation (queue, orders)
 */
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-zinc-900 text-white min-h-screen">
        <div className="p-4 border-b border-zinc-800">
          <Link href="/" className="font-bold text-xl text-green-500">
            GolfBuddy
          </Link>
          <p className="text-xs text-zinc-400 mt-1">Admin Console</p>
        </div>
        <nav className="p-4 space-y-2">
          <a
            href="/admin/queue"
            className="block px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors"
          >
            Queue
          </a>
          <Link
            href="/admin/orders"
            className="block px-3 py-2 rounded-md hover:bg-zinc-800 transition-colors"
          >
            All Orders
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 flex items-center justify-end">
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Coach
            </span>
            <a
              href="/sign-in"
              className="text-sm text-red-600 hover:text-red-700"
            >
              Sign Out
            </a>
          </div>
        </header>
        <main className="flex-1 bg-zinc-50 dark:bg-zinc-950 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
