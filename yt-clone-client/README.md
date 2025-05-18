# Vention System Design Assessment

Mitchell Billard

# Introduction

The objective of this assignment is to design a video-sharing and streaming platform, essentially a clone of Youtube. A platform like YouTube is massive as it’s developed and maintained by 1000’s of some of the world's best engineers. Thus the goal of this assessment is to provide a high level design of a smaller system that can be developed given some constraints.

# Requirements 

## Functional Requirements

* User Registration/Login (basic)  
* Video Uploading (receiving the file)  
* Video Processing (transcoding to standard formats/resolutions)  
* Video Storage (storing raw and processed files)  
* Video Metadata Storage (title, description, uploader, etc.)  
* Viewing a list of videos (React homepage)  
* Viewing a single video (streaming)

## Non-Functional Requirements

* 5 developers to build and maintain this product and system  
* A public release of this product and system in 6 months  
* On average, somewhere between 20,000 and 50,000 Daily Active Users  
* These users are mainly concentrated in Canada and Europe

## Scope

Given these constraints we will focus on designing a simple yet robust system that can provide a core set of features. The core features of our MVP should meet all the Functional Requirements listed above. Given the size of our team and timeline restrictions, there are future improvements that can be added at a later date. We will lean heavily on managed services to help alleviate the workload on our small team. It would be good to implement good separation of concerns and modularity to the system as well, so each member of the team can work on different parts at the same time. The expected DAU is moderate, thus we can use standard and reliable technologies and scale well. Having users concentrated in Canada and Europe positions us to use a CDN for video streaming performance and latency. 

# System Architecture

![Vention System Design](https://github.com/user-attachments/assets/067a16c5-472e-438a-9dd7-635f2690b71e)


## Frontend Client

The frontend application code that runs in the user's browser, handling the user interface, user interactions, displaying video lists, initiating uploads, and managing the playback experience.

## API Gateway

The core application logic layer that receives requests from the Web Client, manages user data and video metadata in the database, orchestrates the start of the upload process, and provides necessary data for the frontend. This could also include a load balancer in front to distribute traffic.

## Video Playback Service

This service retrieves video data such as the videos’s URL and metadata. This data is then used by the client to stream a video from the nearest CDN.

## Video Upload Service

The video cloud service will access the metadata storage to generate a signed URL that can then be passed back to the client. The client can use this URL to upload a video directly to the cloud object storage. This workflow bypasses the need to upload through the applications server, reducing their workload and improving the systems scalability. 

## Cloud Object Storage

Provides highly scalable and durable storage specifically for the raw video files uploaded by users.

## Video Processing Trigger

Acts as a reliable buffer to decouple the video processing task, holding requests to process new videos and allowing the processing service to pick them up asynchronously.

## Video Processing Service

This background service retrieves raw video files, transcodes them into various streaming formats and resolutions, and uploads the processed files to the CDN nodes, updating the database with the results.

## Metadata Database

Stores all the organized, structured data like user profiles, video titles, descriptions, statuses, processing information, categories, and potentially comments or likes.

## Streaming / CDN

A distributed network that caches processed video files and serves them to users from a location geographically close to them, ensuring low-latency, high-performance video streaming and reducing the load on the origin storage.

# Technology Stack

## Frontend Client

React (Next.js). Next.js provides good structure, routing, and performance features. Easy for a React developer to pick up.

## API Gateway

Node.js \+ Express. Fast to develop APIs, large community, fits well with a JavaScript/TypeScript frontend team.

## Video Playback Service

Cloud Run (GCP) running a container with Node.js. Will connect to the metadata database. Staying with the Google Cloud infrastructure simplifies the system for the small dev team. Cloud Run has automatic scaling as well. 

## Video Upload Service

Cloud Run (GCP) running a container with Node.js. Will interact with the metadata database and Cloud Object Storage. Similar benefits of being on Cloud Run as the Playback Service.

## Cloud Object Storage

Google Cloud Storage (GCS). Highly scalable, durable object storage. Supports signed URLs for direct client uploads (reduces load on API layer). Integrates well with other GCP services (Cloud Functions, Pub/Sub, Transcoder API). Addresses storage needs for varying file sizes.

## Video Processing Trigger

Cloud Functions (GCP) triggered by GCS events (Object Finalize). Serverless, automatically triggered when a raw video is uploaded. Low operational overhead.

## Video Processing Service

Cloud Run (GCP) running a container with Node.js \+ FFmpeg. Can handle longer-running tasks than Cloud Functions (useful for long videos). Scalable based on load. Use FFmpeg library/binary for transcoding (industry standard, avoid building your own). Containerization makes dependencies (like FFmpeg) easy to manage.

## Metadata Database

PostgreSQL. Excellent for structured data like user accounts and video metadata. ACID compliance is valuable. Well-understood by developers, reducing onboarding time for the 5-person team. Handles the projected 50k DAU scale comfortably on reasonably sized instances.

## Streaming / CDN

Google Cloud Storage \+ Google Cloud CDN. Serve processed video files directly from GCS using a CDN for low latency globally. Will have servers in both Canada and Europe. Cost-effective for serving large files.

# API Endpoints

These are some basic endpoints for the MVP. Features such as Liking, Comments, etc will have their own endpoints when they are developed in the future. The standard error response codes apply. 

**Base URL:** `/api`

## Videos

`GET /videos`   
Get a list of all videos for displaying on the homepage.

`GET /videos/:id`  
Retrieve video information for the watch page.

`POST /upload`   
Request a signed URL to upload a video.

## Authentication

`POST /auth/register`   
Register a new user.

`POST /auth/login`   
Log in a user and issue a token/session.

`POST /auth/logout`   
Log out user by invalidating token.

## Users

`GET /users/me`  
Get details about the currently authenticated user.

`POST /users/me`  
Update user info.

# Future Improvements

* Comments (Creating, editing, liking, replying)  
* Likes/Dislikes  
* Subscriptions (Subscribing and Subs Feed)  
* Favorites  
* Basic Search  
* Playlists  
* Watch History  
* Notifications  
* Analytics  
* Caching frequently accessed data  
* Adaptive Bitrate Streaming (multiple video resolutions)  
* Recommendation Engine  
* Illegal Content Screening

# Instructions to Run

The demo app is live here: [Youtube Clone](https://yt-clone-client-318307598992.northamerica-northeast1.run.app/)

It was containerized using Docker, and deployed using Google Cloud Run.

Alternatively, the app can be ran locally by following these steps:

```bash
# Clone repo
git clone https://github.com/mbillard11/system-design-assessment.git

# cd into directory
cd system-design-assessment/yt-clone-client

# Install dependencies
npm install

# Build production app
npm run build

# Run the app
npm start
```

# Conclusion

This proposed video streaming service implements MVP deliverables while working within the bounds of our constraints. Our design uses clear separation of concerns between systems, allowing for scalability, robustness, and minimal operational overhead for our small team and short timeline. The tech stack leverages similar technologies to improve development while accounting for the expected amount of daily users. 