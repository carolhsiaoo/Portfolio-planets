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

  // Module 0: Hero
  tagline?: string;
  tags?: string[];
  heroSummary?: {
    problem: string;
    solution: string;
    outcome: string;
  };
  techStack?: string[];
  timeline?: string;

  // Module 1: Discovery & Strategy
  discovery?: {
    insights: { title: string; description: string }[];
    hmwStatement?: string;
    description?: string;
    image?: string;
  };

  // Module 2: The Brain & System
  system?: {
    userFlow?: string;
    userFlowImage?: string;
    designSystem?: string;
    designSystemImages?: { src: string; caption: string }[];
    accessibilityNotes?: string[];
  };

  // Module 3: The Build: Design-to-Code
  build?: {
    comparisons?: { figma: string; code: string; caption: string }[];
    codeSnippets?: { code: string; language: string; caption: string }[];
    aiWorkflow?: string;
    features?: string[];
    challenges?: { problem: string; solution: string }[];
  };

  // Module 4: Validation & Growth
  validation?: {
    metrics?: { label: string; value: string; description?: string }[];
    affinityDiagram?: string;
    iterations?: { before: string; after: string; caption: string }[];
    marketingResults?: string[];
    demoVideo?: string;
    liveUrl?: string;
    githubUrl?: string;
  };

  // Module 5: Reflection & Next Steps
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
    role: "Product Designer & Frontend Developer (Solo Founder)",
    year: "2025 ~ now",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=400&fit=crop",
    video: "/firefree-demo.mp4",
    videoMobile: "/firefre-demo-small.mp4",
    link: "https://firefree.app",
    tagline: "An automated asset tracking tool built for those pursuing financial independence.",
    tags: ["UX Design", "Frontend Dev", "Solo Founder", "Finance"],
    heroSummary: {
      problem: "Existing budgeting apps focus on daily expenses rather than long-term financial independence, leading to tedious tracking and low retention.",
      solution: "A streamlined FI tracker with automated data entry, visual projections, and a 3-step onboarding wizard.",
      outcome: "Reduced onboarding from 8 steps to 3, enabling users to see their FI timeline within 30 seconds of signing up.",
    },
    techStack: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
    timeline: "Jan 2025 – Present",
    discovery: {
      insights: [
        { title: "Tracking Fatigue", description: "Users abandon budgeting apps within 2 weeks due to repetitive manual data entry." },
        { title: "Missing the Big Picture", description: "No existing tool provides an intuitive, visual projection of progress toward financial independence." },
        { title: "Anxiety-Inducing UX", description: "Most financial tools use aggressive red/green color schemes that increase user stress." },
      ],
      hmwStatement: "How might we help users understand their path to financial independence without the burden of daily expense tracking?",
      description: "Through competitive analysis and user interviews, I discovered that the core problem wasn't tracking — it was the lack of meaningful, forward-looking insights. Users wanted to know 'when can I retire?' not 'where did my money go today?'",
      image: "/firefree-demo.mp4",
    },
    system: {
      userFlow: "Reduced the onboarding flow from 8 steps to 3 by combining income, savings rate, and target inputs into a single guided wizard. Recurring transactions are auto-categorized, eliminating repetitive manual entry.",
      designSystem: "Built a custom design system with a warm, approachable color palette (soft greens and neutrals) to reduce the anxiety often associated with financial tools. Components follow an 8px grid with consistent spacing tokens.",
      designSystemImages: [
        { src: "/firefree-demo.mp4", caption: "Dashboard showing FI progress with projected timeline and net worth trend." },
      ],
      accessibilityNotes: [
        "Color contrast ratios meet WCAG AA standards across all text elements.",
        "All interactive elements have visible focus indicators for keyboard navigation.",
        "Chart data is also available in tabular format for screen reader users.",
      ],
    },
    build: {
      features: [
        "Custom React hooks for compound interest and FI date calculations, handling edge cases like variable contribution rates.",
        "Responsive chart components built with Recharts, optimized for both mobile touch interactions and desktop hover states.",
        "Firebase real-time sync enabling seamless cross-device usage.",
      ],
      challenges: [
        {
          problem: "Rendering large datasets (5+ years of projected monthly data) caused noticeable lag on mobile devices.",
          solution: "Implemented data downsampling for mobile viewports — showing quarterly summaries instead of monthly, with the ability to drill down on demand.",
        },
      ],
    },
    validation: {
      metrics: [
        { label: "Onboarding Steps", value: "8 → 3", description: "Reduced friction in the signup flow" },
        { label: "Time to First Insight", value: "< 30s", description: "Users see their FI timeline immediately" },
        { label: "Data Entry", value: "Auto", description: "Recurring transactions auto-categorized" },
      ],
      demoVideo: "/firefree-demo.mp4",
      liveUrl: "https://firefree.app",
    },
    reflection: {
      learnings: [
        "Learned to prioritize 'time to first insight' — users need to see value within 30 seconds of signing up.",
        "First time implementing Firebase security rules at scale; understanding rule cascading was a steep but rewarding learning curve.",
      ],
      nextSteps: [
        "Adopt a more rigorous user testing cadence instead of relying on personal assumptions.",
        "Explore server-side rendering for the initial dashboard load to improve perceived performance.",
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
    tagline: "A mobile-first daily expense tracker that turns budgeting into a simple daily habit.",
    tags: ["Mobile", "UX Design", "React Native", "Local-First"],
    heroSummary: {
      problem: "Expense trackers overwhelm users with settings and categories, and the multi-tap process makes users forget to log expenses.",
      solution: "A single-screen input experience that opens directly to a number pad with smart category suggestions.",
      outcome: "Expense logging achievable in under 3 seconds with a gesture-based, local-first architecture.",
    },
    techStack: ["React Native", "TypeScript", "Expo", "SQLite"],
    timeline: "2026",
    discovery: {
      insights: [
        { title: "Too Many Taps", description: "Users forget to log expenses because the process takes too many taps and navigations." },
        { title: "Category Overload", description: "Most trackers overwhelm users with categories, charts, and settings before they can log a single expense." },
        { title: "Daily Awareness Gap", description: "Users lack a quick, glanceable view of whether they're on track for the day." },
      ],
      hmwStatement: "How might we make expense logging so effortless that it becomes an automatic daily habit?",
      description: "User research revealed that the biggest barrier to consistent expense tracking wasn't motivation — it was friction. Every extra tap or screen transition was an opportunity for users to abandon the task.",
      image: "/dailypay-img.png",
    },
    system: {
      userFlow: "Designed a single-screen input experience — the app opens directly to a number pad with smart category suggestions. One swipe reveals the daily summary.",
      designSystem: "Adopted a bold, high-contrast mobile palette with large touch targets (minimum 48px). Typography uses a single weight scale to maintain clarity on small screens.",
      designSystemImages: [
        { src: "/dailypay-img.png", caption: "Main expense input screen with quick-access category chips." },
      ],
      accessibilityNotes: [
        "All touch targets meet the 48px minimum size requirement.",
        "High contrast ratios ensure readability in various lighting conditions.",
        "Haptic feedback provides non-visual confirmation of interactions.",
      ],
    },
    build: {
      features: [
        "Gesture-based navigation using React Native's PanResponder for fluid swipe interactions.",
        "Local-first architecture with SQLite for offline support and instant responsiveness.",
      ],
      challenges: [
        {
          problem: "Ensuring smooth 60fps animations during swipe gestures while simultaneously updating state.",
          solution: "Moved animation logic to the native thread using Reanimated 2, decoupling UI updates from JS thread calculations.",
        },
      ],
    },
    validation: {
      metrics: [
        { label: "Log Time", value: "< 3s", description: "Time to log a single expense" },
        { label: "Touch Targets", value: "48px+", description: "Minimum interactive element size" },
        { label: "Animations", value: "60fps", description: "Smooth native-thread animations" },
      ],
      demoVideo: "/dailypay-img.png",
      liveUrl: "https://dailypay.aburi.app",
    },
    reflection: {
      learnings: [
        "Learned the importance of haptic feedback in mobile UX — subtle vibrations on button presses significantly improved perceived responsiveness.",
        "First deep dive into local-first architecture patterns and offline sync strategies.",
      ],
      nextSteps: [
        "Invest more time in accessibility testing with screen readers from the start.",
      ],
    },
  },
  {
    name: "CoreHour",
    slug: "corehour",
    type: "Web",
    role: "Product Designer & Frontend Developer",
    year: "2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    video: "/corehour-demo.gif",
    videoMobile: "/corehour-demo-small.mp4",
    link: "https://corehour.app/",
    tagline: "A focused time-tracking web app designed around the concept of 'core working hours.'",
    tags: ["Web App", "UX Design", "Real-Time", "Productivity"],
    heroSummary: {
      problem: "Traditional time trackers treat all hours equally, ignoring that deep work hours are more valuable, and teams can't see when productive windows overlap.",
      solution: "A time-tracking tool that distinguishes core working hours from shallow time, with visual team overlap views.",
      outcome: "Users identify and protect peak productivity hours with an interactive weekly heatmap and real-time team sync.",
    },
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    timeline: "2025",
    discovery: {
      insights: [
        { title: "Not All Hours Equal", description: "Traditional time trackers treat all hours equally, ignoring the reality that deep work hours are more valuable than shallow ones." },
        { title: "Collaboration Blindspot", description: "Teams lack visibility into when their most productive collaboration windows overlap across time zones." },
        { title: "Passive Over Active", description: "Users prefer auto-detected patterns over active time logging — they want insights without the effort." },
      ],
      hmwStatement: "How might we help individuals and teams identify, protect, and align their most productive hours?",
      description: "Research showed that productivity isn't about tracking more — it's about understanding patterns. Users wanted a tool that reveals when they do their best work, not just how much they work.",
      image: "/corehour-demo.gif",
    },
    system: {
      userFlow: "Users set their 'core hours' once during onboarding. The dashboard then visualizes how their logged time aligns with those core hours, highlighting patterns over weeks.",
      designSystem: "Clean, minimal interface using a monochromatic palette with a single accent color for core hour highlights. Data density is kept low to reduce cognitive load.",
      designSystemImages: [
        { src: "/corehour-demo.gif", caption: "Weekly core hours heatmap showing productivity alignment." },
      ],
      accessibilityNotes: [
        "Heatmap data is also presented in a sortable table format for screen readers.",
        "Time zone indicators use both color and text labels for clarity.",
        "Keyboard navigation supported for all interactive heatmap cells.",
      ],
    },
    build: {
      features: [
        "Interactive weekly heatmap built with CSS Grid, avoiding heavy charting libraries for faster load times.",
        "Supabase real-time subscriptions for live team core-hour overlap visualization.",
      ],
      challenges: [
        {
          problem: "Time zone calculations for distributed teams introduced subtle bugs, especially around DST transitions.",
          solution: "Adopted the Temporal API (with polyfill) for all date/time operations, eliminating the ambiguity of legacy Date methods.",
        },
      ],
    },
    validation: {
      metrics: [
        { label: "Setup Time", value: "< 1 min", description: "One-time core hours configuration" },
        { label: "Charting", value: "CSS Grid", description: "No heavy libraries needed" },
        { label: "Sync", value: "Real-time", description: "Live team overlap via Supabase" },
      ],
      demoVideo: "/corehour-demo.gif",
      liveUrl: "https://corehour.app/",
    },
    reflection: {
      learnings: [
        "Discovered that users prefer 'passive tracking' (auto-detected patterns) over active time logging.",
        "First project using Supabase — appreciated the developer experience but learned to carefully manage row-level security policies.",
      ],
      nextSteps: [
        "Add an API integration with calendar apps (Google Calendar, Outlook) for automatic core hour detection.",
      ],
    },
  },
  {
    name: "HandyTools",
    slug: "handytools",
    type: "ARVR",
    role: "Designer & Developer",
    year: "2024",
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=600&h=700&fit=crop",
    video: "/handytools-demo.mp4",
    tagline: "An AR/VR toolkit that brings virtual hand tools into mixed reality workspaces.",
    tags: ["AR/VR", "Unity", "Hand Tracking", "Spatial UI"],
    heroSummary: {
      problem: "AR/VR dev tools have steep learning curves, and testing spatial interactions requires constant build-deploy cycles to headset hardware.",
      solution: "An intuitive set of virtual hand tools with a pinch-gesture radial menu for rapid spatial design prototyping.",
      outcome: "Reduced iteration loop between design concept and testable AR experience with smooth, jitter-free hand tracking.",
    },
    techStack: ["Unity", "C#", "XR Interaction Toolkit", "Meta Quest SDK"],
    timeline: "2024",
    discovery: {
      insights: [
        { title: "Steep Learning Curve", description: "Existing AR/VR development tools make rapid prototyping difficult for designers new to spatial computing." },
        { title: "Slow Iteration", description: "Testing spatial interactions requires constant build-deploy cycles to headset hardware, breaking the creative flow." },
        { title: "Hand Fatigue", description: "Prolonged hand-gesture interactions in VR cause user fatigue, requiring careful UX consideration for tool switching." },
      ],
      hmwStatement: "How might we make spatial design prototyping as fluid and intuitive as sketching on paper?",
      description: "By observing designers working with existing AR/VR tools, I identified that the biggest bottleneck wasn't the technology — it was the disconnect between thinking spatially and building spatially.",
      image: "/handytools-demo.mp4",
    },
    system: {
      userFlow: "Designed a radial menu system activated by a pinch gesture, allowing users to switch between tools (measure, annotate, sculpt) without breaking flow.",
      designSystem: "Spatial UI components follow depth-based hierarchy — primary actions at arm's reach, secondary options recede into the background. Color coding maps to tool categories.",
      designSystemImages: [
        { src: "/handytools-demo.mp4", caption: "Hand tracking interaction with virtual measurement tool in mixed reality." },
      ],
      accessibilityNotes: [
        "Voice commands available as an alternative to gesture-based tool switching.",
        "Visual indicators adapt to both light and dark environments.",
        "Tool sensitivity can be adjusted for users with limited hand mobility.",
      ],
    },
    build: {
      features: [
        "Custom hand-tracking gesture recognition system built on top of Meta Quest's Hand Tracking API.",
        "Physics-based tool interactions using Unity's XR Interaction Toolkit with custom grab and release behaviors.",
      ],
      challenges: [
        {
          problem: "Hand tracking jitter caused virtual tools to shake, breaking the illusion of physicality.",
          solution: "Implemented a Kalman filter for hand position smoothing, balancing responsiveness with stability through configurable parameters.",
        },
      ],
    },
    validation: {
      metrics: [
        { label: "Gesture Input", value: "Pinch", description: "Natural hand gesture for tool activation" },
        { label: "Tracking", value: "Smoothed", description: "Kalman filter removes hand jitter" },
        { label: "Tools", value: "3 Core", description: "Measure, annotate, and sculpt" },
      ],
      demoVideo: "/handytools-demo.mp4",
    },
    reflection: {
      learnings: [
        "Learned that spatial UI design requires fundamentally different mental models than 2D — depth, gaze direction, and hand fatigue all become critical factors.",
        "First experience with XR accessibility considerations (e.g., accommodating users with limited hand mobility).",
      ],
      nextSteps: [
        "Conduct more user testing in actual workshop environments rather than controlled lab settings.",
        "Explore voice commands as an alternative input method for tool switching.",
      ],
    },
  },
  {
    name: "Cleaning Service Platform",
    slug: "cleaning-service-platform",
    type: "Web",
    role: "UI/UX Designer",
    year: "2023",
    image: "/cleaingserviceplatform-img.png",
    tagline: "A booking platform that connects homeowners with vetted cleaning professionals.",
    tags: ["UX Design", "User Research", "Prototyping", "Service Design"],
    heroSummary: {
      problem: "Homeowners can't find reliable cleaning services due to opaque pricing, and cleaning professionals struggle with booking management.",
      solution: "A transparent 3-step booking wizard with real-time availability, serving both homeowners and professionals through a role-switching interface.",
      outcome: "Validated through 12 user interviews and 3 rounds of usability testing, achieving a streamlined dual-interface booking experience.",
    },
    techStack: ["Figma", "Protopie", "User Research", "Usability Testing"],
    timeline: "2023",
    discovery: {
      insights: [
        { title: "Trust Deficit", description: "Homeowners struggle to find reliable cleaning services — existing platforms lack transparency in pricing and provider qualifications." },
        { title: "Management Burden", description: "Cleaning professionals have difficulty managing bookings and communicating schedule changes to clients." },
        { title: "Dual Identity", description: "Some users are both homeowners and occasional cleaning professionals, needing a unified experience." },
      ],
      hmwStatement: "How might we build trust between homeowners and cleaning professionals through transparent, friction-free booking?",
      description: "Through 12 user interviews spanning both homeowners and cleaning professionals, I mapped the emotional journey of booking a cleaning service — from initial anxiety about inviting strangers into one's home to the relief of finding a reliable, recurring professional.",
      image: "/cleaingserviceplatform-img.png",
    },
    system: {
      userFlow: "Designed a 3-step booking wizard: select service type → choose time slot (with real-time provider availability) → confirm with transparent price breakdown. No account required for first booking.",
      designSystem: "Friendly, approachable visual language using rounded shapes and a fresh blue-green palette. Emphasized photography of real cleaning professionals to build trust.",
      designSystemImages: [
        { src: "/cleaingserviceplatform-img.png", caption: "Booking flow showing service selection with transparent pricing." },
      ],
      accessibilityNotes: [
        "Booking flow is fully navigable via keyboard.",
        "Price breakdowns use clear, large typography for readability.",
        "Status updates available via both visual indicators and text.",
      ],
    },
    build: {
      features: [
        "Created high-fidelity interactive prototypes in Figma with Protopie for micro-interaction testing.",
        "Conducted 12 user interviews and 3 rounds of usability testing, iterating on the booking flow based on findings.",
      ],
      challenges: [
        {
          problem: "Initial user testing revealed that the dual-interface approach confused users who were both homeowners and occasional cleaners.",
          solution: "Redesigned the navigation to use a role-switching mechanism within a single app, rather than separate entry points.",
        },
      ],
    },
    validation: {
      metrics: [
        { label: "User Interviews", value: "12", description: "Spanning homeowners and professionals" },
        { label: "Usability Rounds", value: "3", description: "Iterative testing and refinement" },
        { label: "Booking Steps", value: "3", description: "Streamlined from original 6-step flow" },
      ],
      demoVideo: "/cleaingserviceplatform-img.png",
    },
    reflection: {
      learnings: [
        "Learned the importance of designing for edge cases in service marketplaces — cancellations, no-shows, and refund flows are critical trust-building moments.",
        "First project leading a full design sprint process from research to validated prototype.",
      ],
      nextSteps: [
        "Create a more robust design system documentation for developer handoff.",
        "Include more quantitative data (task completion rates, error rates) alongside qualitative feedback.",
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
