/**
 * Admin Order Detail page
 * Route: /admin/orders/[orderId]
 * Shows order details, uploaded videos, and delivery workflow
 */
import Link from "next/link";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin/orders" className="text-sm text-zinc-500 hover:text-zinc-700">
            ← Back to Orders
          </Link>
          <h1 className="text-2xl font-bold mt-2">Order #{orderId}</h1>
        </div>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
          In Review
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Info */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
            <h2 className="font-semibold mb-4">Client Information</h2>
            <div className="space-y-2 text-sm">
              <p><span className="text-zinc-500">Name:</span> Client Name</p>
              <p><span className="text-zinc-500">Email:</span> client@example.com</p>
            </div>
          </div>

          {/* Intake Summary */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
            <h2 className="font-semibold mb-4">Intake Summary</h2>
            <div className="space-y-2 text-sm">
              <p><span className="text-zinc-500">Category:</span> Swing</p>
              <p><span className="text-zinc-500">Sub-category:</span> Off the Tee</p>
              <p><span className="text-zinc-500">Goals:</span> Distance, Accuracy</p>
              <div className="mt-4">
                <span className="text-zinc-500">Description:</span>
                <p className="mt-1 text-zinc-700 dark:text-zinc-300">
                  Client description will appear here...
                </p>
              </div>
            </div>
          </div>

          {/* Uploaded Videos */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
            <h2 className="font-semibold mb-4">Uploaded Videos</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-md flex items-center justify-center">
                <span className="text-zinc-400">Driver - Face On</span>
              </div>
              <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-md flex items-center justify-center">
                <span className="text-zinc-400">Driver - Down the Line</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
            <h2 className="font-semibold mb-4">Actions</h2>
            <div className="space-y-3">
              <button className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors">
                Upload Response
              </button>
              <button className="w-full py-2 px-4 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium rounded-md transition-colors">
                Mark as Delivered
              </button>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6">
            <h2 className="font-semibold mb-4">Internal Notes</h2>
            <textarea
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 resize-none"
              rows={4}
              placeholder="Add notes about this order..."
            />
            <button className="mt-2 text-sm text-green-600 hover:text-green-700 font-medium">
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
