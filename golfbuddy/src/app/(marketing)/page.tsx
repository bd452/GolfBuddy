/**
 * Home page - public landing page
 * Route: /
 */
export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
          Premium Golf Coaching, Delivered Online
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
          Get personalized video analysis and actionable drills from an
          experienced coach. Improve your game without expensive in-person
          lessons.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/services"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
          >
            Get Started
          </a>
          <a
            href="/how-it-works"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            How It Works
          </a>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 dark:text-green-400 font-bold">
                1
              </span>
            </div>
            <h3 className="font-semibold mb-2">Choose Your Focus</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Select swing, short game, or putting and describe what you want to
              improve.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 dark:text-green-400 font-bold">
                2
              </span>
            </div>
            <h3 className="font-semibold mb-2">Upload Your Videos</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Record and upload specific shots following our simple filming
              guide.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 dark:text-green-400 font-bold">
                3
              </span>
            </div>
            <h3 className="font-semibold mb-2">Get Expert Analysis</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Receive a detailed video response with personalized drills within
              48 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Coach Section */}
      <section className="py-16 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Your Coach</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Former All-Conference Division I golfer at UC San Diego and Cal Poly
            with years of coaching and competitive playing experience. Learned
            from some of the world&apos;s top swing, short game, and putting
            coaches while competing at the highest levels.
          </p>
        </div>
      </section>
    </div>
  );
}
