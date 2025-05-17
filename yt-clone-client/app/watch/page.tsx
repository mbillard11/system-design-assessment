import { Suspense } from 'react';
import WatchVideoPlayer from './watch-video-player';
import { getVideo } from '@/app/api/functions';

interface WatchPageProps {
  searchParams: {
    v?: string;
  };
}

export default async function Watch( { searchParams }:  WatchPageProps ) {
  const videoId = searchParams.v;
  const video = await getVideo(videoId!); 
  console.log("Fetched video object:", video.id);
  const video_url = video.video_files[0].link

  return (
    <div>
      <h1>Video ID: {video.id}</h1> 
      <Suspense fallback={<div>Loading video player...</div>}>
        <WatchVideoPlayer videoUrl={video_url} /> 
      </Suspense> 
    </div>
  );
}