/**
 * Auth layout - wraps authentication pages (sign-in, sign-up)
 * Minimal layout for auth flows
 */
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <Link href="/" className="font-bold text-2xl text-green-600">
            GolfBuddy
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
