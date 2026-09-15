import Link from "next/link";

const previewListings = [
  { title: "Calculus Early Transcendentals", meta: "Textbooks · CS101", price: "£12" },
  { title: "Desk lamp — barely used", meta: "Electronics · Halls", price: "£8" },
  { title: "Mini fridge, collection only", meta: "Furniture · Year 1", price: "£40" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-24 pt-28 sm:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-16 h-[28rem] w-[28rem] rounded-full bg-red-700/25 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-10 h-[22rem] w-[22rem] rounded-full bg-red-950/60 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-red-600/10 blur-[90px]"
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-6 inline-flex items-center rounded-full border border-red-500/30 bg-red-950/40 px-3.5 py-1 text-xs font-medium tracking-[0.18em] text-red-300 uppercase">
          Student-only campus exchange
        </p>
        <h1 className="font-instrumentSerif text-5xl leading-[1.08] text-white sm:text-6xl md:text-7xl">
          Buy, sell, and find your people
          <span className="italic text-white/70"> — on campus.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
          ShareSpace is the university-only place to exchange textbooks and
          gear, ask course questions, and connect with mentors who have already
          sat the exam.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/register"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-red-700 px-7 text-sm font-semibold text-white transition-colors hover:bg-red-600 sm:w-auto"
          >
            Get started
          </Link>
          <Link
            href="/login"
            className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 sm:w-auto"
          >
            Sign in
          </Link>
        </div>
        <p className="mt-4 text-sm text-white/40">
          Join with your university email. No public listings.
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-16 w-full max-w-3xl">
        <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-3 shadow-[0_30px_80px_-20px_rgba(127,29,29,0.45)] backdrop-blur-md sm:p-4">
          <div className="mb-3 flex items-center justify-between px-2">
            <span className="text-xs font-medium tracking-wide text-white/50 uppercase">
              Marketplace
            </span>
            <span className="text-xs text-red-300">Campus only</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {previewListings.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-black/40 p-4"
              >
                <div className="mb-3 h-20 rounded-xl bg-gradient-to-br from-red-900/50 to-neutral-900" />
                <p className="truncate text-sm font-medium text-white">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-white/45">{item.meta}</p>
                <p className="mt-2 text-sm font-semibold text-red-400">
                  {item.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
