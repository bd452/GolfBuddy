/**
 * Marketing layout - wraps all public-facing pages
 * Includes header/footer navigation for marketing pages
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header will be added here */}
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="font-bold text-xl">GolfBuddy</div>
          <div className="flex items-center gap-6">
            <a href="/services" className="text-sm hover:text-green-600">
              Services
            </a>
            <a href="/pricing" className="text-sm hover:text-green-600">
              Pricing
            </a>
            <a href="/how-it-works" className="text-sm hover:text-green-600">
              How it Works
            </a>
            <a href="/about" className="text-sm hover:text-green-600">
              About
            </a>
            <a
              href="/sign-in"
              className="text-sm font-medium text-green-600 hover:text-green-700"
            >
              Sign In
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer will be added here */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
          © {new Date().getFullYear()} GolfBuddy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
