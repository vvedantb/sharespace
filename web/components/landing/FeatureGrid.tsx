import {
  IconAward,
  IconLeaf,
  IconMessage,
  IconShieldCheck,
} from "@tabler/icons-react";

const capabilities = [
  {
    icon: IconShieldCheck,
    title: "University email only",
    body: "Registration is limited to .ac.uk, .edu, and other university domains. Listings stay inside campus.",
  },
  {
    icon: IconMessage,
    title: "Direct messages",
    body: "Talk to sellers and buyers in-thread. Conversations, read state, and history live on the item.",
  },
  {
    icon: IconLeaf,
    title: "Reuse you can measure",
    body: "Every sale estimates money kept on campus and CO₂ avoided by not buying new — shown on your dashboard.",
  },
  {
    icon: IconAward,
    title: "Points and badges",
    body: "Earn points for listings, sales, questions, and helpful answers. Badges show up on your profile.",
  },
];

export function FeatureGrid() {
  return (
    <section id="campus" className="scroll-mt-24 px-5 py-8 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-red-400 uppercase">
            Built for campus
          </p>
          <h2 className="font-instrumentSerif mt-3 text-3xl text-white sm:text-4xl md:text-5xl">
            A closed loop, not another public marketplace.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-950/80 text-red-300">
                <item.icon className="h-5 w-5" stroke={1.6} />
              </div>
              <h3 className="mt-4 text-base font-medium text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
