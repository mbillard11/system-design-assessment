const PEXELS_API_KEY = "mxlMopJRMc4JxxkVeEjKzd7h3htttPwOW7FlZOUftLzOc6igaKYtDNlG";


interface PexelsVideo {
    id: number; // Pexels ID is a number
    url: string; // URL on Pexels.com
    image: string; // Thumbnail URL
    user: {
        id: number;
        name: string; // Creator's name
        url: string;
    };
    video_files: Array<{
        id: number;
        quality: string;
        file_type: string;
        width: number;
        height: number;
        fps: number;
        link: string; // Direct video file URL
        size: number;
    }>;
    video_pictures: Array<{ // Alternative thumbnail pictures
        id: number;
        nr: number;
        picture: string;
    }>;
}

interface PexelsApiResponse {
    page: number;
    per_page: number;
    videos: PexelsVideo[]; // Array of Pexels video objects
    total_results: number;
    next_page?: string; // Optional next page URL
    url?: string; // Optional current URL
}

export async function getVideos() {
    const response = await fetch("https://api.pexels.com/videos/popular?per_page=16", {
        method: "GET",
        headers: {
            "Authorization": PEXELS_API_KEY
        }
    });
    
    const pexelsData = await response.json() as PexelsApiResponse;

    const videos = pexelsData.videos.map((pexelsVideo: PexelsVideo) => ({
             id: pexelsVideo.id.toString(),
             title: pexelsVideo.user?.name ? `Video by ${pexelsVideo.user.name}` : `Video ${pexelsVideo.id}`,
             thumbnailUrl: pexelsVideo.image,
        }));

    return videos;
}

export async function getVideo(videoid: string) {
    const response = await fetch("https://api.pexels.com/videos/videos/" + videoid, {
        method: "GET",
        headers: {
            "Authorization": PEXELS_API_KEY
        }
    });
    
    const video = await response.json() as PexelsVideo;
    return video;
}