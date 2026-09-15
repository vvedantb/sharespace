import Link from "next/link";

export function CtaSection() {
  return (
    <section className="px-5 py-20 sm:px-6">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-red-500/20 bg-gradient-to-br from-red-950 via-neutral-950 to-black px-8 py-16 text-center sm:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-10 top-0 h-56 w-56 rounded-full bg-red-600/25 blur-[80px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 bottom-0 h-48 w-48 rounded-full bg-red-800/20 blur-[80px]"
        />
        <div className="relative">
          <h2 className="font-instrumentSerif text-4xl text-white sm:text-5xl">
            Ready when your inbox is.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/55">
            Create an account with your university email. Marketplace, mentors,
            and Q&amp;A are waiting on the other side.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-red-700 px-7 text-sm font-semibold text-white transition-colors hover:bg-red-600 sm:w-auto"
            >
              Get started
            </Link>
            <Link
              href="/login"
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/15 px-7 text-sm font-medium text-white/85 transition-colors hover:bg-white/5 sm:w-auto"
            >
              I already have an account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
