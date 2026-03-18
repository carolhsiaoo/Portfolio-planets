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

  // Case study fields (used by ProjectPage)
  tagline?: string;
  techStack?: string[];
  timeline?: string;

  problem?: {
    painPoints: string[];
    goals: string[];
  };

  solution?: {
    userFlow?: string;
    designSystem?: string;
    keyScreens?: { src: string; caption: string }[];
  };

  implementation?: {
    features?: string[];
    challenges?: { problem: string; solution: string }[];
    codeSnippet?: { code: string; language: string; caption: string };
  };

  result?: {
    demoVideo?: string;
    liveUrl?: string;
    githubUrl?: string;
  };

  reflection?: {
    learnings?: string[];
    improvements?: string[];
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
    techStack: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
    timeline: "Jan 2025 – Present",
    problem: {
      painPoints: [
        "Existing budgeting apps are too granular and tedious, focusing on daily expenses rather than long-term financial health.",
        "No tool provides an intuitive, visual projection of progress toward financial independence.",
        "Manual data entry leads to low user retention and abandoned tracking habits.",
      ],
      goals: [
        "Simplify the input process to reduce friction and encourage consistent usage.",
        "Provide clear, visual future financial trend projections.",
        "Help users understand their FI (Financial Independence) timeline at a glance.",
      ],
    },
    solution: {
      userFlow:
        "Reduced the onboarding flow from 8 steps to 3 by combining income, savings rate, and target inputs into a single guided wizard. Recurring transactions are auto-categorized, eliminating repetitive manual entry.",
      designSystem:
        "Built a custom design system with a warm, approachable color palette (soft greens and neutrals) to reduce the anxiety often associated with financial tools. Components follow an 8px grid with consistent spacing tokens.",
      keyScreens: [
        { src: "/firefree-demo.mp4", caption: "Dashboard showing FI progress with projected timeline and net worth trend." },
      ],
    },
    implementation: {
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
    result: {
      demoVideo: "/firefree-demo.mp4",
      liveUrl: "https://firefree.app",
    },
    reflection: {
      learnings: [
        "Learned to prioritize 'time to first insight' — users need to see value within 30 seconds of signing up.",
        "First time implementing Firebase security rules at scale; understanding rule cascading was a steep but rewarding learning curve.",
      ],
      improvements: [
        "Would adopt a more rigorous user testing cadence from the start instead of relying on personal assumptions.",
        "Would explore server-side rendering for the initial dashboard load to improve perceived performance.",
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
    techStack: ["React Native", "TypeScript", "Expo", "SQLite"],
    timeline: "2026",
    problem: {
      painPoints: [
        "Most expense trackers overwhelm users with categories, charts, and settings before they can log a single expense.",
        "Users forget to log expenses because the process takes too many taps.",
      ],
      goals: [
        "Enable expense logging in under 3 seconds with minimal taps.",
        "Create a daily budget view that gives users an instant sense of whether they're on track.",
      ],
    },
    solution: {
      userFlow:
        "Designed a single-screen input experience — the app opens directly to a number pad with smart category suggestions. One swipe reveals the daily summary.",
      designSystem:
        "Adopted a bold, high-contrast mobile palette with large touch targets (minimum 48px). Typography uses a single weight scale to maintain clarity on small screens.",
      keyScreens: [
        { src: "/dailypay-img.png", caption: "Main expense input screen with quick-access category chips." },
      ],
    },
    implementation: {
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
    result: {
      demoVideo: "/dailypay-img.png",
      liveUrl: "https://dailypay.aburi.app",
    },
    reflection: {
      learnings: [
        "Learned the importance of haptic feedback in mobile UX — subtle vibrations on button presses significantly improved perceived responsiveness.",
        "First deep dive into local-first architecture patterns and offline sync strategies.",
      ],
      improvements: [
        "Would invest more time in accessibility testing with screen readers from the start.",
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
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    timeline: "2025",
    problem: {
      painPoints: [
        "Traditional time trackers treat all hours equally, ignoring the reality that deep work hours are more valuable than shallow ones.",
        "Teams lack visibility into when their most productive collaboration windows overlap.",
      ],
      goals: [
        "Help individuals identify and protect their peak productivity hours.",
        "Provide teams with a visual overlap of core hours across time zones.",
      ],
    },
    solution: {
      userFlow:
        "Users set their 'core hours' once during onboarding. The dashboard then visualizes how their logged time aligns with those core hours, highlighting patterns over weeks.",
      designSystem:
        "Clean, minimal interface using a monochromatic palette with a single accent color for core hour highlights. Data density is kept low to reduce cognitive load.",
      keyScreens: [
        { src: "/corehour-demo.gif", caption: "Weekly core hours heatmap showing productivity alignment." },
      ],
    },
    implementation: {
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
    result: {
      demoVideo: "/corehour-demo.gif",
      liveUrl: "https://corehour.app/",
    },
    reflection: {
      learnings: [
        "Discovered that users prefer 'passive tracking' (auto-detected patterns) over active time logging.",
        "First project using Supabase — appreciated the developer experience but learned to carefully manage row-level security policies.",
      ],
      improvements: [
        "Would add an API integration with calendar apps (Google Calendar, Outlook) for automatic core hour detection.",
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
    techStack: ["Unity", "C#", "XR Interaction Toolkit", "Meta Quest SDK"],
    timeline: "2024",
    problem: {
      painPoints: [
        "Existing AR/VR development tools have steep learning curves, making rapid prototyping difficult for designers.",
        "Testing spatial interactions requires constant build-deploy cycles to headset hardware.",
      ],
      goals: [
        "Create an intuitive set of virtual hand tools for spatial design prototyping.",
        "Reduce the iteration loop between design concept and testable AR experience.",
      ],
    },
    solution: {
      userFlow:
        "Designed a radial menu system activated by a pinch gesture, allowing users to switch between tools (measure, annotate, sculpt) without breaking flow.",
      designSystem:
        "Spatial UI components follow depth-based hierarchy — primary actions at arm's reach, secondary options recede into the background. Color coding maps to tool categories.",
      keyScreens: [
        { src: "/handytools-demo.mp4", caption: "Hand tracking interaction with virtual measurement tool in mixed reality." },
      ],
    },
    implementation: {
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
    result: {
      demoVideo: "/handytools-demo.mp4",
    },
    reflection: {
      learnings: [
        "Learned that spatial UI design requires fundamentally different mental models than 2D — depth, gaze direction, and hand fatigue all become critical factors.",
        "First experience with XR accessibility considerations (e.g., accommodating users with limited hand mobility).",
      ],
      improvements: [
        "Would conduct more user testing in actual workshop environments rather than controlled lab settings.",
        "Would explore voice commands as an alternative input method for tool switching.",
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
    techStack: ["Figma", "Protopie", "User Research", "Usability Testing"],
    timeline: "2023",
    problem: {
      painPoints: [
        "Homeowners struggle to find reliable cleaning services — existing platforms lack transparency in pricing and provider qualifications.",
        "Cleaning professionals have difficulty managing bookings and communicating schedule changes to clients.",
      ],
      goals: [
        "Design a transparent booking flow that builds trust through upfront pricing and provider profiles.",
        "Create a dual-interface system serving both homeowners and cleaning professionals.",
      ],
    },
    solution: {
      userFlow:
        "Designed a 3-step booking wizard: select service type → choose time slot (with real-time provider availability) → confirm with transparent price breakdown. No account required for first booking.",
      designSystem:
        "Friendly, approachable visual language using rounded shapes and a fresh blue-green palette. Emphasized photography of real cleaning professionals to build trust.",
      keyScreens: [
        { src: "/cleaingserviceplatform-img.png", caption: "Booking flow showing service selection with transparent pricing." },
      ],
    },
    implementation: {
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
    result: {
      demoVideo: "/cleaingserviceplatform-img.png",
    },
    reflection: {
      learnings: [
        "Learned the importance of designing for edge cases in service marketplaces — cancellations, no-shows, and refund flows are critical trust-building moments.",
        "First project leading a full design sprint process from research to validated prototype.",
      ],
      improvements: [
        "Would create a more robust design system documentation for developer handoff.",
        "Would include more quantitative data (task completion rates, error rates) alongside qualitative feedback.",
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
