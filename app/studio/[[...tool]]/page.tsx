"use client";

import dynamic from "next/dynamic";

// Sanity Studio touches `window` during module init, so skip the server
// render entirely and only mount it in the browser
const Studio = dynamic(() => import("./Studio"), { ssr: false });

export default function StudioPage() {
  return <Studio />;
}
