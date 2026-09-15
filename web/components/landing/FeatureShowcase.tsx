const features = [
  {
    id: "marketplace",
    eyebrow: "Marketplace",
    title: "Textbooks and halls furniture, without the Facebook group.",
    description:
      "List items with photos, condition, price, and course codes. Browse by category, save what you want, message the seller, and mark it sold when it goes.",
    points: [
      "Filters for category, price, and course code",
      "Saved listings and transaction history",
      "Seller ratings after a sale",
    ],
    visual: "marketplace",
  },
  {
    id: "mentors",
    eyebrow: "Mentors",
    title: "Ask someone who has already sat the exam.",
    description:
      "Year 3+ students and alumni apply to mentor. Browse approved profiles by expertise, endorse people who helped, and see who is actually answering questions.",
    points: [
      "Admin-reviewed mentor applications",
      "Endorsements and a public leaderboard",
      "Student and alumni mentor types",
    ],
    visual: "mentors",
  },
  {
    id: "questions",
    eyebrow: "Q&A",
    title: "Campus questions, answered by people you can trust.",
    description:
      "Post academic, student-life, and textbook threads with a course code. Verified mentors can reply, helpful answers get marked, and trending questions surface from the last week.",
    points: [
      "Categories for courses, halls, and textbooks",
      "Best-answer marking and view counts",
      "Mentor replies called out in the thread",
    ],
    visual: "questions",
  },
] as const;

function MarketplaceVisual() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[
        { title: "Linear Algebra notes", price: "£4", tag: "Notes" },
        { title: "IKEA chair", price: "£15", tag: "Furniture" },
        { title: "USB-C hub", price: "£9", tag: "Electronics" },
        { title: "Year 1 hoodie", price: "£6", tag: "Clothing" },
      ].map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-white/10 bg-black/40 p-3"
        >
          <div className="mb-3 aspect-[4/3] rounded-xl bg-gradient-to-br from-red-900/40 via-neutral-900 to-black" />
          <p className="truncate text-sm text-white">{item.title}</p>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-xs text-white/40">{item.tag}</span>
            <span className="text-sm font-medium text-red-400">{item.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function MentorsVisual() {
  const mentors = [
    {
      initials: "AM",
      name: "Aisha Mensah",
      course: "Computer Science · Year 3",
      tags: "Algorithms · First-year advice",
      endorsements: 24,
    },
    {
      initials: "JL",
      name: "James Liu",
      course: "Alumni · Mechanical Eng",
      tags: "Internships · Final year project",
      endorsements: 41,
    },
    {
      initials: "PR",
      name: "Priya Raman",
      course: "Economics · Year 4",
      tags: "Econometrics · Course choice",
      endorsements: 18,
    },
  ];

  return (
    <div className="space-y-3">
      {mentors.map((mentor) => (
        <div
          key={mentor.name}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-4"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-800 text-sm font-medium text-white">
            {mentor.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {mentor.name}
            </p>
            <p className="truncate text-xs text-white/45">{mentor.course}</p>
            <p className="mt-1 truncate text-xs text-white/35">{mentor.tags}</p>
          </div>
          <span className="shrink-0 text-xs text-red-300">
            {mentor.endorsements} endorsements
          </span>
        </div>
      ))}
    </div>
  );
}

function QuestionsVisual() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
        <p className="text-xs tracking-wide text-red-300 uppercase">
          Academic · CS210
        </p>
        <p className="mt-2 text-base text-white">
          Worth taking compilers if I already did languages?
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-white/45">
          Second year, average so far. Heard the coursework is brutal — is it
          actually useful for internships?
        </p>
      </div>
      <div className="rounded-2xl border border-red-500/20 bg-red-950/30 p-5">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-red-700 px-2 py-0.5 text-[10px] font-medium tracking-wide text-white uppercase">
            Mentor answer
          </span>
          <span className="text-xs text-white/40">Best answer</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-white/75">
          Take it if you like systems. The project looks painful on paper, but
          interviewers actually ask about it. Skip if you are stacking three
          other heavy modules.
        </p>
      </div>
    </div>
  );
}

function Visual({ type }: { type: (typeof features)[number]["visual"] }) {
  if (type === "marketplace") return <MarketplaceVisual />;
  if (type === "mentors") return <MentorsVisual />;
  return <QuestionsVisual />;
}

export function FeatureShowcase() {
  return (
    <section className="relative px-5 py-24 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-28">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            id={feature.id}
            className={`grid scroll-mt-24 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
              index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-red-400 uppercase">
                {feature.eyebrow}
              </p>
              <h2 className="font-instrumentSerif mt-3 text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
                {feature.title}
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/55">
                {feature.description}
              </p>
              <ul className="mt-6 space-y-2">
                {feature.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-white/70"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
              <Visual type={feature.visual} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
