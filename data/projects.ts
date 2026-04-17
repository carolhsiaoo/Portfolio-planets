export interface ProjectData {
  // Card fields (used by ProjectsTable)
  name: string;
  slug: string;
  type: string;
  role: string;
  year: string;
  image: string;
  video?: string;
  videoMobile?: string;
  link?: string;

  // Hero section
  company?: string;
  tagline?: string;
  tags?: string[];
  workflow?: string[];
  techStack?: string[];
  timeline?: string;

  // TL;DR
  heroSummary?: {
    problem: string;
    solution: string;
    results: string;
  };

  // Challenge
  challenge?: {
    description: string;
    image?: string;
  };

  // Solution
  solutionSection?: {
    description: string;
    image?: string;
  };

  // Process timeline
  process?: {
    steps: { label: string; description?: string }[];
    image?: string;
  };

  // Design + Research + Build (discovery sub-section)
  discovery?: {
    insights: { title: string; description: string }[];
    hmwStatement?: string;
    description?: string;
    image?: string;
  };

  // Design + Research + Build (system sub-section)
  system?: {
    userFlow?: string;
    userFlowImage?: string;
    designSystem?: string;
    designSystemImages?: { src: string; caption: string }[];
    accessibilityNotes?: string[];
  };

  // Design + Research + Build (build sub-section)
  build?: {
    comparisons?: { figma: string; code: string; caption: string }[];
    codeSnippets?: { code: string; language: string; caption: string }[];
    aiWorkflow?: string;
    features?: string[];
    challenges?: { problem: string; solution: string }[];
  };

  // Results
  validation?: {
    metrics?: { label: string; value: string; description?: string }[];
    affinityDiagram?: string;
    iterations?: { before: string; after: string; caption: string }[];
    marketingResults?: string[];
    demoVideo?: string;
    liveUrl?: string;
    githubUrl?: string;
  };

  // Reflections & Next Steps
  reflection?: {
    learnings?: string[];
    nextSteps?: string[];
  };
}

export const projects: ProjectData[] = [
  {
    name: "FireFree",
    slug: "firefree",
    type: "Web & Mobile App",
    role: "Product Designer & Frontend Developer",
    year: "2025 ~ now",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=400&fit=crop",
    video: "/firefree-demo.mp4",
    videoMobile: "/firefre-demo-small.mp4",
    link: "https://firefree.app",
    tagline: "A 0-to-1 personal finance app that helps users see when they'll be financially free — not just where their money went.",
    tags: ["0 → 1", "Product Design", "Frontend Dev", "Finance", "React"],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
    timeline: "Jan 2025 — Present",

    // TL;DR — sharp, scannable, numbers where possible
    heroSummary: {
      problem: "Most budgeting apps are abandoned within 2 weeks. Users track pennies but never see when they'll reach their financial goals.",
      solution: "A goal-first finance tool with auto-categorization and a Life Goals dashboard that turns raw numbers into a visual freedom roadmap.",
      results: "Launched to first users with zero ad spend. Life Goals became the most-used feature. Users reach their first financial insight in under 30 seconds."
    },

    // Challenge — business-level framing
    challenge: {
      description: "The personal finance app market is crowded with expense trackers, yet retention is notoriously low — most users quit within two weeks. The core issue isn't a lack of features; it's that existing tools answer 'where did my money go?' when users are really asking 'when can I be free?' I needed to build a product that shifts the frame from backward-looking accounting to forward-looking motivation, while keeping the input friction low enough that people actually stick with it.",
      image: "/firefree-demo.mp4",
    },

    // Solution — strategic, not just feature list
    solutionSection: {
      description: "Instead of building another expense recorder, I designed around a single insight from user interviews: people engage with their finances when they can see a tangible milestone getting closer. The product centers on a 'Life Goals' dashboard — a visual progress bar toward retirement, a house, a sabbatical — powered by real-time compound interest projections. Expense tracking becomes a means to an end, not the end itself. Auto-categorization removes the logging friction, and the goal progress bar provides the daily motivation to keep going.",
      image: "/firefree-demo.mp4",
    },

    // Process — shows clients you have a repeatable method
    process: {
      steps: [
        { label: "Validation", description: "Competitive analysis + 8 user interviews to find the real gap" },
        { label: "UX Design", description: "Wireframes, user flows, and a goal-first information architecture" },
        { label: "Prototype & Build", description: "React + Firebase MVP with core Life Goals feature" },
        { label: "Interview & Iterate", description: "Follow-up interviews revealed Life Goals was the product's soul" },
        { label: "QA & Launch", description: "Edge-case testing, skeleton screens, and community-driven launch" },
      ],
    },

    // Design + Research + Build — trimmed to highlights
    discovery: {
      insights: [
        { title: "2-Week Drop-Off", description: "Users abandon budgeting apps within 2 weeks because logging every expense feels like homework, not empowerment." },
        { title: "Goal Anxiety", description: "Without a tangible milestone (house, retirement, sabbatical), numbers feel meaningless and savings motivation fades." },
        { title: "Input Friction Kills Data", description: "Multi-step forms cause users to skip entries, making their data unreliable and the tool useless." },
      ],
      hmwStatement: "How might we turn dry numbers into a roadmap for freedom?",
      description: "Through competitive analysis and user interviews, I found the real gap: people don't need another expense recorder — they need a goal-oriented compass. Every competitor answered 'where did my money go?' when users were actually asking 'when can I be free?'",
      image: "/firefree-demo.mp4",
    },
    system: {
      userFlow: "In MVP V2, I cut the Life Goals feature to reduce scope. During follow-up interviews, multiple users independently asked: 'Where did the retirement progress bar go?' That signal was unmistakable — Life Goals wasn't a nice-to-have, it was the product's core value. I restored it as the central dashboard element within 48 hours.",
      userFlowImage: "/firefree-demo.mp4",
      designSystem: "Built a custom design system with warm greens and neutrals to reduce the anxiety typically associated with financial tools. 8px grid, consistent spacing tokens, and large touch targets for mobile.",
      designSystemImages: [
        { src: "/firefree-demo.mp4", caption: "Dashboard with the Life Goals progress bar — the feature users refused to let go of." },
      ],
    },
    build: {
      features: [
        "Composable React hooks for compound interest and FI-date calculations, handling edge cases like 50-year projections and variable contribution rates.",
        "Skeleton screens with shimmer animations — users perceive near-instant load even during 2–3s calculation times.",
        "Firebase real-time sync for seamless cross-device usage.",
      ],
      challenges: [
        {
          problem: "After user interviews revealed Life Goals was critical, I needed to re-architect the compound interest engine that had been simplified during the V2 scope cut — fast.",
          solution: "Rebuilt the calculation engine as a composable hook with edge-case testing. Completed the full rebuild + QA in a 48-hour sprint.",
        },
        {
          problem: "Complex 5+ year financial projections caused visible loading delays, making the app feel sluggish on first load.",
          solution: "Added skeleton screens with shimmer animations for all chart views. Perceived performance went from 'slow' to 'instant' in user feedback.",
        },
      ],
    },

    // Results — specific, scannable metrics
    validation: {
      metrics: [
        { label: "Seed Users", value: "1st Cohort", description: "Acquired organically from a single community post" }, // TODO: replace with actual number
        { label: "#1 Feature", value: "Life Goals", description: "Most-used and most-requested by users" },
        { label: "Time to First Insight", value: "< 30s", description: "Users see their freedom timeline on first session" },
      ],
      marketingResults: [
        "A single screenshot of the 'retirement progress bar' posted in a personal finance community generated the entire first wave of waitlist sign-ups — no paid ads.",
        "Users began sharing their own progress bars, creating organic word-of-mouth growth.",
      ],
      demoVideo: "/firefree-demo.mp4",
      liveUrl: "https://firefree.app",
    },

    // Reflections — short, shows maturity
    reflection: {
      learnings: [
        "Never sacrifice the soul of your product for development convenience. When multiple users independently mourn a removed feature, that's your product's heartbeat.",
        "Perceived speed matters more than actual speed. Skeleton screens transformed user sentiment from 'it's slow' to 'it feels instant' — with zero backend changes.",
      ],
      nextSteps: [
        "Structured usability testing cadence with scripted interviews to replace ad-hoc conversations.",
        "Server-side rendering for the initial dashboard to further reduce time-to-first-insight.",
      ],
    },
  },
  {
    name: "DailyPay",
    slug: "dailypay",
    type: "Mobile App",
    role: "Product Designer & Frontend Developer",
    year: "2026",
    image: "/dailypay-img.png",
    link: "https://dailypay.aburi.app",
    tagline: "A mobile expense tracker designed so that logging a purchase takes fewer taps than unlocking your phone.",
    tags: ["Mobile", "Product Design", "React Native", "Local-First"],
    techStack: ["React Native", "TypeScript", "Expo", "SQLite"],
    timeline: "2026",

    heroSummary: {
      problem: "Expense trackers lose users because logging a single purchase takes too many taps. By the time you navigate, categorize, and confirm, the moment has passed.",
      solution: "A single-screen input that opens straight to a number pad with smart category suggestions — log any expense in under 3 seconds.",
      results: "Expenses logged in under 3 seconds. Fully offline — works anywhere, instantly.",
    },

    challenge: {
      description: "Expense tracking apps have a paradox: the more features they offer (charts, categories, budgets, settings), the less likely users are to do the one thing that matters — actually logging their expenses. Research showed every extra tap or screen transition is a drop-off point. The challenge was designing an app where the primary action (logging an expense) has near-zero friction, while still providing daily awareness of spending patterns.",
      image: "/dailypay-img.png",
    },

    solutionSection: {
      description: "I stripped the experience down to a single screen. The app opens directly to a number pad — no onboarding, no dashboard, no settings wall. Type the amount, tap a smart-suggested category chip, done. One swipe reveals a daily summary showing whether you're on track. Everything runs locally on SQLite, so there's zero network latency and full offline support. The result is an app that feels more like a calculator than a traditional finance tool.",
      image: "/dailypay-img.png",
    },

    process: {
      steps: [
        { label: "User Research", description: "Identified friction points in existing expense trackers through competitive analysis" },
        { label: "Interaction Design", description: "Designed single-screen input with gesture-based navigation" },
        { label: "Prototype", description: "Built interactive prototype to validate sub-3-second logging goal" },
        { label: "Development", description: "React Native + Reanimated 2 for native-thread animations" },
        { label: "Testing", description: "Performance testing to ensure 60fps across devices" },
      ],
    },

    discovery: {
      insights: [
        { title: "Every Tap Is a Drop-Off", description: "Users forget to log expenses because the process takes too many taps — each screen transition is an opportunity to abandon." },
        { title: "Category Overload", description: "Most trackers overwhelm users with options before they can log a single expense, creating decision fatigue." },
        { title: "No Daily Pulse", description: "Users lack a quick, glanceable view of whether they're on track for the day — they have to dig through charts." },
      ],
      hmwStatement: "How might we make expense logging so effortless it becomes automatic?",
      description: "The biggest barrier to consistent expense tracking isn't motivation — it's friction. Users want to track spending, but every extra tap gives them a reason not to.",
      image: "/dailypay-img.png",
    },
    system: {
      userFlow: "App opens directly to a number pad. User types amount, taps a smart-suggested category chip, and the expense is logged. One swipe reveals the daily summary. No navigation menus, no settings to configure first.",
      designSystem: "Bold, high-contrast mobile palette with minimum 48px touch targets. Single-weight type scale for clarity on small screens. Haptic feedback on every interaction.",
      designSystemImages: [
        { src: "/dailypay-img.png", caption: "Main expense input — number pad with smart category chips." },
      ],
    },
    build: {
      features: [
        "Gesture-based navigation using React Native PanResponder for fluid swipe interactions between input and summary views.",
        "Local-first architecture with SQLite — zero network latency, full offline support, instant responsiveness.",
      ],
      challenges: [
        {
          problem: "Swipe gestures caused frame drops on mid-range Android devices when simultaneously updating state and animating transitions.",
          solution: "Moved all animation logic to the native thread using Reanimated 2, decoupling UI animations from JS thread calculations. Achieved consistent 60fps across devices.",
        },
      ],
    },

    validation: {
      metrics: [
        { label: "Log Time", value: "< 3s", description: "From app open to expense logged" },
        { label: "Animations", value: "60fps", description: "Native-thread rendering, no frame drops" },
        { label: "Offline", value: "100%", description: "Fully functional without network" },
      ],
      demoVideo: "/dailypay-img.png",
      liveUrl: "https://dailypay.aburi.app",
    },

    reflection: {
      learnings: [
        "Haptic feedback is a surprisingly powerful UX tool on mobile. Subtle vibrations on button presses made the app feel significantly more responsive — with zero visual changes.",
        "Local-first architecture eliminates an entire category of UX problems (loading states, offline errors, sync conflicts) at the cost of more complex data modeling upfront.",
      ],
      nextSteps: [
        "Accessibility testing with VoiceOver and TalkBack from day one on the next project.",
      ],
    },
  },
  {
    name: "CoreHour",
    slug: "corehour",
    type: "Web App",
    role: "Product Designer & Frontend Developer",
    year: "2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    video: "/corehour-demo.gif",
    videoMobile: "/corehour-demo-small.mp4",
    link: "https://corehour.app/",
    tagline: "A time-tracking tool that shows teams when their best work hours overlap — so they stop scheduling meetings during deep focus time.",
    tags: ["Web App", "Product Design", "Real-Time", "Next.js"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    timeline: "2025",

    heroSummary: {
      problem: "Time trackers count hours but ignore quality. Teams can't see when their deep-work windows overlap, leading to meetings that fragment everyone's most productive time.",
      solution: "A lightweight tool that distinguishes core working hours from shallow time, with a visual team overlap heatmap updated in real time.",
      results: "Teams set up in under 1 minute. Core hours sync across the team in real time.",
    },

    challenge: {
      description: "Traditional time trackers treat every hour the same. But a focused 2-hour morning block is worth more than 4 hours of scattered afternoon work — and most teams have no visibility into when their members' productive windows actually overlap. The result: meetings get scheduled over deep-work time, and individuals can't protect the hours that matter most. I needed to build a tool that makes time quality visible, not just time quantity.",
      image: "/corehour-demo.gif",
    },

    solutionSection: {
      description: "CoreHour asks one question during onboarding: 'When are your core hours?' From there, a weekly heatmap visualizes how your logged time aligns with those hours, revealing patterns you can't see in a spreadsheet. For teams, a real-time overlap view shows exactly when the group's productive windows intersect — making it obvious which meeting slots protect focus and which ones destroy it. The key design decision was keeping data density low: one screen, one heatmap, one insight.",
      image: "/corehour-demo.gif",
    },

    process: {
      steps: [
        { label: "Research", description: "Interviewed remote workers and team leads about time-tracking pain points" },
        { label: "Concept", description: "Defined 'core hours' as the central product metaphor" },
        { label: "Design", description: "Low-density dashboard with heatmap as the single focal point" },
        { label: "Build", description: "Next.js + Supabase real-time subscriptions for live team sync" },
        { label: "Ship", description: "Launched with under-1-minute onboarding flow" },
      ],
    },

    discovery: {
      insights: [
        { title: "Not All Hours Are Equal", description: "Time trackers count hours but ignore quality — a focused 2-hour block outperforms 4 scattered hours." },
        { title: "Team Overlap Is Invisible", description: "Distributed teams have no way to see when productive windows overlap, so meetings get scheduled over deep-work time." },
        { title: "Passive Over Active", description: "Users prefer pattern detection over manual logging. They want insights without the effort of active tracking." },
      ],
      hmwStatement: "How might we make time quality visible — not just time quantity?",
      description: "Productivity isn't about tracking more hours. It's about understanding patterns. Users wanted a tool that reveals when they do their best work, not just how much they work.",
      image: "/corehour-demo.gif",
    },
    system: {
      userFlow: "One-time onboarding: set your core hours. The dashboard then visualizes how logged time aligns with those hours over weeks. For teams, a real-time overlap view highlights shared productive windows.",
      designSystem: "Monochromatic palette with a single accent color for core-hour highlights. Deliberately low data density — one screen, one heatmap, one clear insight per view.",
      designSystemImages: [
        { src: "/corehour-demo.gif", caption: "Weekly heatmap showing core-hour alignment and team overlap." },
      ],
    },
    build: {
      features: [
        "Interactive weekly heatmap built entirely with CSS Grid — no D3, no Chart.js, no heavy dependencies. Fast load, small bundle.",
        "Supabase real-time subscriptions for live team core-hour overlap. Changes propagate instantly across all connected clients.",
      ],
      challenges: [
        {
          problem: "Time zone calculations for distributed teams introduced subtle bugs, especially around DST transitions where UTC offsets shift mid-week.",
          solution: "Adopted the Temporal API (with polyfill) for all date/time operations, eliminating the ambiguity of legacy Date methods. Zero timezone bugs since the switch.",
        },
      ],
    },

    validation: {
      metrics: [
        { label: "Setup", value: "< 1 min", description: "One-time core hours configuration" },
        { label: "Bundle", value: "0 libs", description: "Heatmap built with pure CSS Grid" },
        { label: "Sync", value: "Real-time", description: "Live team overlap via Supabase" },
      ],
      demoVideo: "/corehour-demo.gif",
      liveUrl: "https://corehour.app/",
    },

    reflection: {
      learnings: [
        "Users strongly prefer passive pattern detection over active time logging. The less they have to do, the more they use the tool.",
        "Supabase real-time is powerful but row-level security policies need careful planning upfront — retrofitting them is painful.",
      ],
      nextSteps: [
        "Google Calendar and Outlook integration for automatic core-hour detection based on existing meeting patterns.",
      ],
    },
  },
  {
    name: "HandyTools",
    slug: "handytools",
    type: "AR/VR",
    role: "Product Designer & Developer",
    year: "2024",
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=600&h=700&fit=crop",
    video: "/handytools-demo.mp4",
    tagline: "A mixed-reality toolkit that lets designers prototype spatial interactions with their hands — no build-deploy cycle required.",
    tags: ["AR/VR", "Unity", "Hand Tracking", "Spatial Design"],
    techStack: ["Unity", "C#", "XR Interaction Toolkit", "Meta Quest SDK"],
    timeline: "2024",

    heroSummary: {
      problem: "AR/VR prototyping is painfully slow. Every design change requires a full build-deploy cycle to headset hardware, breaking the creative flow.",
      solution: "A set of virtual hand tools with a pinch-gesture radial menu that lets designers measure, annotate, and sculpt in real time — directly on the headset.",
      results: "3 spatial tools shipped. Jitter-free hand tracking. Voice commands for accessibility.",
    },

    challenge: {
      description: "Spatial computing is booming, but the design tools haven't kept up. When a designer wants to test a spatial interaction, they have to write code, build the project, deploy to a headset, put it on, test, take it off, adjust, and repeat. This cycle can take 10+ minutes per iteration — compared to seconds in 2D tools like Figma. On top of that, prolonged hand-gesture use causes physical fatigue, so the tool-switching UX itself becomes a design constraint. I needed to build something that makes spatial prototyping feel as fluid as sketching.",
      image: "/handytools-demo.mp4",
    },

    solutionSection: {
      description: "HandyTools provides three core spatial tools — measure, annotate, and sculpt — accessible through a pinch-gesture radial menu that appears at the user's hand. No controller needed. The radial menu was designed to minimize hand fatigue: one gesture opens it, a slight wrist rotation selects the tool, and a release confirms. A Kalman filter smooths hand-tracking data in real time, eliminating the jitter that makes virtual tools feel unreliable. For users with limited hand mobility, voice commands provide an alternative input path.",
      image: "/handytools-demo.mp4",
    },

    process: {
      steps: [
        { label: "Observation", description: "Watched designers struggle with existing AR/VR workflows to identify bottlenecks" },
        { label: "Spatial UX Design", description: "Designed depth-based UI hierarchy and radial menu interaction pattern" },
        { label: "Prototyping", description: "Built gesture recognition on Meta Quest Hand Tracking API" },
        { label: "Tracking R&D", description: "Implemented Kalman filter to solve hand-tracking jitter" },
        { label: "Accessibility", description: "Added voice commands and adjustable sensitivity for motor accessibility" },
      ],
    },

    discovery: {
      insights: [
        { title: "10-Minute Iteration Loop", description: "Every design change requires build → deploy → headset → test → remove → adjust. This kills creative flow." },
        { title: "Hand Fatigue Is a UX Constraint", description: "Prolonged gesture interactions cause physical fatigue — tool switching needs to be minimal-effort." },
        { title: "Spatial ≠ 2D", description: "Designers fluent in 2D tools struggle because spatial UI requires thinking about depth, gaze direction, and arm reach simultaneously." },
      ],
      hmwStatement: "How might we make spatial prototyping feel as fluid as sketching on paper?",
      description: "The biggest bottleneck wasn't the technology — it was the disconnect between thinking spatially and building spatially. Designers could envision interactions but had no fast way to test them.",
      image: "/handytools-demo.mp4",
    },
    system: {
      userFlow: "Pinch gesture opens a radial menu at the user's hand. Wrist rotation selects a tool (measure, annotate, sculpt). Release confirms. No controllers, no menus to navigate.",
      designSystem: "Spatial UI follows a depth-based hierarchy: primary actions sit at arm's reach, secondary options recede into the background. Color coding maps to tool categories for instant recognition.",
      designSystemImages: [
        { src: "/handytools-demo.mp4", caption: "Hand tracking interaction with the virtual measurement tool." },
      ],
    },
    build: {
      features: [
        "Custom gesture recognition built on Meta Quest's Hand Tracking API — pinch, rotate, and release mapped to tool selection.",
        "Physics-based tool interactions using Unity's XR Interaction Toolkit with custom grab-and-release behaviors for tactile feedback.",
      ],
      challenges: [
        {
          problem: "Raw hand-tracking data from the Quest SDK has noticeable jitter, causing virtual tools to shake and breaking the sense of physicality.",
          solution: "Implemented a Kalman filter for real-time hand position smoothing with configurable parameters — balancing responsiveness against stability. The result: tools feel solid in your hands.",
        },
      ],
    },

    validation: {
      metrics: [
        { label: "Core Tools", value: "3", description: "Measure, annotate, and sculpt" },
        { label: "Input", value: "Hands + Voice", description: "Gesture-first with voice fallback" },
        { label: "Tracking", value: "Kalman Filtered", description: "Jitter-free tool interactions" },
      ],
      demoVideo: "/handytools-demo.mp4",
    },

    reflection: {
      learnings: [
        "Spatial UI design requires fundamentally different mental models than 2D. Depth, gaze direction, and physical fatigue all become first-class design constraints.",
        "Accessibility in XR is underexplored. Adding voice commands and adjustable sensitivity opened the tool to users who couldn't rely on precise hand gestures.",
      ],
      nextSteps: [
        "Test in real workshop environments instead of controlled lab settings — the physical context changes everything.",
      ],
    },
  },
  {
    name: "Cleaning Service Platform",
    slug: "cleaning-service-platform",
    type: "Web Platform",
    role: "UI/UX Designer",
    year: "2023",
    image: "/cleaingserviceplatform-img.png",
    tagline: "A two-sided booking platform that builds trust between homeowners and cleaning professionals through transparent pricing and a 3-step booking flow.",
    tags: ["UX Design", "User Research", "Service Design", "Prototyping"],
    techStack: ["Figma", "Protopie", "User Research", "Usability Testing"],
    timeline: "2023",

    heroSummary: {
      problem: "Homeowners can't find reliable cleaners because pricing is opaque. Cleaning professionals can't manage bookings efficiently. Neither side trusts the platform.",
      solution: "A transparent 3-step booking wizard with real-time availability, serving both sides through a single app with role switching.",
      results: "Booking flow cut from 6 steps to 3. Validated with 12 user interviews and 3 rounds of usability testing.",
    },

    challenge: {
      description: "Service marketplaces have a trust problem on both sides. Homeowners are anxious about inviting strangers into their homes — and opaque pricing makes it worse. Cleaning professionals need a reliable stream of bookings but struggle with scheduling tools that don't account for their real workflow. To complicate things further, some users are both: a homeowner who occasionally cleans for others. A dual-interface approach seemed obvious, but early testing showed it confused exactly these users. The challenge was designing one unified experience that serves both sides without compromising either.",
      image: "/cleaingserviceplatform-img.png",
    },

    solutionSection: {
      description: "I designed a single app with a role-switching mechanism instead of separate entry points. The booking flow was stripped from 6 steps to 3: select service type, choose a time slot (with real-time provider availability), and confirm with a fully transparent price breakdown. No account required for the first booking — reducing the trust barrier for new users. For cleaning professionals, a mirrored dashboard shows incoming requests, schedule management, and earnings transparency. The key design decision: show pricing upfront on every screen, because hiding it was the #1 source of user distrust.",
      image: "/cleaingserviceplatform-img.png",
    },

    process: {
      steps: [
        { label: "Discovery", description: "12 user interviews across homeowners and cleaning professionals" },
        { label: "Service Blueprinting", description: "Mapped the emotional journey from booking anxiety to recurring trust" },
        { label: "Design", description: "3-step booking wizard with transparent pricing at every stage" },
        { label: "Prototyping", description: "High-fidelity Figma + Protopie interactive prototypes" },
        { label: "Usability Testing", description: "3 rounds of testing, iterating on the role-switching UX" },
      ],
    },

    discovery: {
      insights: [
        { title: "Trust Is the Product", description: "Homeowners don't just need cleaning — they need to trust the person entering their home. Opaque pricing and anonymous profiles kill that trust." },
        { title: "Scheduling Is Broken", description: "Cleaning professionals manage bookings across texts, calls, and apps. Schedule changes fall through the cracks, causing no-shows on both sides." },
        { title: "Dual Identity Problem", description: "Some users are both homeowners and occasional cleaning professionals — a dual-app approach confused them in early testing." },
      ],
      hmwStatement: "How might we build trust between homeowners and cleaning professionals through transparent, friction-free booking?",
      description: "I interviewed 12 users across both sides of the marketplace and mapped the emotional journey — from the anxiety of inviting a stranger into your home to the relief of finding a reliable recurring professional. The insight: trust isn't built by features, it's built by transparency.",
      image: "/cleaingserviceplatform-img.png",
    },
    system: {
      userFlow: "3-step booking: select service type → choose time slot (real-time provider availability) → confirm with transparent price breakdown. No account required for the first booking.",
      designSystem: "Friendly, approachable visual language using rounded shapes and a blue-green palette. Real photography of cleaning professionals instead of stock imagery to build trust.",
      designSystemImages: [
        { src: "/cleaingserviceplatform-img.png", caption: "Booking flow with transparent pricing at every stage." },
      ],
    },
    build: {
      features: [
        "High-fidelity interactive prototypes in Figma with Protopie for micro-interaction testing — simulating real booking flows for usability sessions.",
        "12 user interviews and 3 rounds of usability testing with structured scripts, iterating on the booking flow after each round.",
      ],
      challenges: [
        {
          problem: "The original dual-interface design (separate homeowner and cleaner apps) confused users who played both roles — they couldn't find their bookings.",
          solution: "Replaced dual entry points with a single-app role-switching mechanism. One tap toggles between homeowner and professional views, with shared booking history.",
        },
      ],
    },

    validation: {
      metrics: [
        { label: "Interviews", value: "12", description: "Across homeowners and cleaning professionals" },
        { label: "Usability Rounds", value: "3", description: "Iterative testing and redesign after each" },
        { label: "Booking Steps", value: "6 → 3", description: "Cut in half through iterative simplification" },
      ],
      demoVideo: "/cleaingserviceplatform-img.png",
    },

    reflection: {
      learnings: [
        "Edge cases ARE the product in service marketplaces. Cancellations, no-shows, and refund flows aren't exceptions — they're the moments where trust is built or destroyed.",
        "First time leading a full design sprint from research through validated prototype. Structured interview scripts produced far better insights than casual conversations.",
      ],
      nextSteps: [
        "Add quantitative metrics (task completion rates, error rates) alongside qualitative feedback for stronger validation.",
      ],
    },
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}
