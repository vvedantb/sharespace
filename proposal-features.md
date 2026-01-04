Introduction
This project aims to design, implement, and evaluate ShareSpace, a cloud-based campus-focused student ecommerce and social platform. ShareSpace enables students to list second-hand items including textbooks, lecture notes, revision packs, and electronics, which can be browsed and purchased within the campus community with arrangements for contactless or local pickup.

The platform adds a social mentorship layer where senior students, course representatives, teaching assistants, or alumni can create profiles, answer academic and student-life queries, endorse sellers, and share recommended textbooks, revision bundles, or coursework guidance.

The architecture and core design principles follow the localised, student-centric approach outlined in the ShareSpace research study, whilst extending the concept with enhanced cloud-native features including serverless computing, real-time analytics, and scalable data management using AWS infrastructure. This cloud computing focus aligns with module learning outcomes around Infrastructure-as-aService (IaaS), Platform-as-a-Service (PaaS), elasticity, and distributed cloud storage systems.

The problem and motivation
Traditional global ecommerce platforms inadequately serve the unique campus context. Students face tight budgets, short item lifecycles driven by graduation turnover, coupled with safety and verification concerns when arranging meetings with strangers for local pickup. Campus communities experience supply-demand gaps where seniors have resources incoming students need, yet global platforms do not optimise for this local exchange. Existing solutions lack academic-calendar awareness, course categorisation, and institutional identity verification.

Students also need help finding trustworthy sellers and reliable academic resources. By creating a university marketplace with identity-tied access controls and an integrated social mentorship aspect, ShareSpace addresses multiple critical needs simultaneously. The platform aims to reduce student costs significantly through affordable second-hand resources, increase transaction trust and completion rates through social ratings, and promote environmentally sustainable reuse of goods within campus boundaries.

The mentor layer addresses an underexplored social commerce dimension: combining transactional commerce with academic assistance and social endorsement may simultaneously increase purchase confidence and provide valuable peer learning support. This approach applies cloud computing technologies to solve community challenges whilst demonstrating practical implementation of distributed systems, fault tolerance, and scalable cloud architectures covered in the module curriculum.

Beneficiaries
Undergraduate and Postgraduate Students gain cheaper access to second-hand textbooks, lecture notes, and essential equipment. They benefit from faster discovery of course-relevant materials through mentor recommendations and easier peer-to-peer exchange mechanisms with reduced friction and enhanced safety.
Senior Students and Alumni gain a marketplace to submit campus items, earn supplementary income, and build reputation as helpful mentors. This mentor status serves as valuable social capital, volunteering experience, and could potentially enhance their CV through their demonstrable community leadership.
University Services and Sustainability Offices benefit from reduced campus waste and an observable reuse channel supporting institutional sustainability goals. The platform provides quantifiable metrics on circular economy impacts within the campus ecosystem.
Course Teams and Teaching Assistants gain a formal mentor channel that reduces repeated questions during lectures and tutorials, helping route students to useful resources and experienced peer mentors rather than overburdening the school/university staff.

Planned methodology and technological stack
Methodology
Requirements and Design Phase: Adapt functional and user experience decisions from the ShareSpace research, including listing workflows, category taxonomy, and moderation procedures. Extend the baseline design with mentor profile systems, endorsement badge mechanisms, and social proof displays.
MVP Implementation: Develop a responsive web application with mobile-friendly frontend incorporating core user flows: university email-based registration, item listing creation with image upload, in-app messaging, and mentor question-answer discussion threads.
Instrumentation and Experimentation: Implement comprehensive event logging capturing listing views, user messages, item saves, purchase transactions, and completion confirmations. Conduct A/B testing evaluating reputation display variations (simple star ratings vs mentor endorsements) and social proof mechanisms (mentor picks visibility). Measure outcomes including message volume and user-reported trust scores.
