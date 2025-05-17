'use client';

import { useSearchParams } from 'next/navigation';

interface WatchVideoPlayerProps {
  videoUrl: string;
}

export default function WatchVideoPlayer({ videoUrl }: WatchVideoPlayerProps ) {
  const searchParams = useSearchParams();
  const videoId = searchParams.get('v');

  if (!videoId) {
    return <p>No video specified.</p>;
  }

  return (
    <div>
      <video controls src={videoUrl} style={{ maxWidth: '100%' }}/>
    </div>
  );
}