import styles from "./page.module.css";
import Image from 'next/image';
import Link from 'next/link';
import { getVideos } from './api/functions';


export default async function Home() {
  const videos = await getVideos();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {
          videos.map((video) => (
            <Link href={`/watch?v=${video.id}`} key={video.id}>
            <div className={styles.videoItem}>
              <Image src={video.thumbnailUrl} alt='video' width={360} height={240} className={styles.thumbnail}/>
              <div className={styles.videoTitle}>
                 <h3>{video.title}</h3>
              </div>
            </div>
            </Link>
          ))
        }
      </main>
    </div>
  )
}
