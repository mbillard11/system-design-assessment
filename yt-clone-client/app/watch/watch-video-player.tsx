'use client';

import { useSearchParams } from 'next/navigation';
import styles from './watch-video-player.module.css';

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
    <div className={styles.playerContainer}>
      <video className={styles.videoElement} controls src={videoUrl}/>
    </div>
  );
}