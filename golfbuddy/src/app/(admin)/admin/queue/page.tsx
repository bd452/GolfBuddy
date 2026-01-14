/**
 * Admin Queue page
 * Route: /admin/queue
 * Shows orders filtered by status for coach review
 */
export default function AdminQueuePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Review Queue</h1>
      
      {/* Status Filters */}
      <div className="flex gap-2 mb-6">
        <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium">
          Awaiting Videos
        </button>
        <button className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-md text-sm font-medium hover:bg-zinc-300 dark:hover:bg-zinc-700">
          In Review
        </button>
        <button className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-md text-sm font-medium hover:bg-zinc-300 dark:hover:bg-zinc-700">
          Delivered
        </button>
      </div>
      
      {/* Empty State */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-8 text-center">
        <p className="text-zinc-600 dark:text-zinc-400">
          No orders in this queue.
        </p>
      </div>
      
      {/* Order List (placeholder) */}
      {/*
      <div className="space-y-4">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Order #12345</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Swing Analysis - John Doe</p>
              <p className="text-xs text-zinc-500 mt-1">Submitted Jan 10, 2026</p>
            </div>
            <a 
              href="/admin/orders/12345" 
              className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
            >
              Review
            </a>
          </div>
        </div>
      </div>
      */}
    </div>
  );
}
