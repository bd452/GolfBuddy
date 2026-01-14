/**
 * Client Dashboard page
 * Route: /dashboard
 * Shows list of orders and their statuses
 */
export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Your Orders</h1>
        <a 
          href="/services" 
          className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
        >
          New Analysis
        </a>
      </div>
      
      {/* Empty State */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-8 text-center">
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          You don&apos;t have any orders yet.
        </p>
        <a 
          href="/services" 
          className="text-green-600 hover:text-green-700 font-medium"
        >
          Get your first analysis →
        </a>
      </div>
      
      {/* Order List (placeholder for when orders exist) */}
      {/* 
      <div className="space-y-4">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Swing Analysis</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Submitted Jan 10, 2026</p>
            </div>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
              In Review
            </span>
          </div>
        </div>
      </div>
      */}
    </div>
  );
}
