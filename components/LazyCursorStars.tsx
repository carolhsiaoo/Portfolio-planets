'use client'

import dynamic from 'next/dynamic';

const CursorStars = dynamic(() => import('./CursorStars'), { ssr: false });

export default function LazyCursorStars() {
  return <CursorStars />;
}
