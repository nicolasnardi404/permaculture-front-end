import React from "react";
import client from "../lib/contentful"; // Adjust the import path as necessary
import styles from "../styles/videos.module.css";

export default async function VideosPage() {
  try {
    const entries = await client.getEntries({
      content_type: "videos", // Ensure this matches your Contentful content type ID for videos
      order: "-sys.createdAt",
    });

    console.log("Fetched entries:", entries);

    return (
      <div className={styles.container}>
        {entries.items.map((video) => {
          console.log("Rendering video:", video);
          // Extract the video ID from the YouTube URL
          const videoId = video.fields.link.split("v=")[1];
          return (
            <div key={video.sys.id} className={styles.videoItem}>
              <h1 className={styles.title}>{video.fields.title}</h1>
              <iframe
                className={styles.video}
                src={`https://www.youtube.com/embed/${videoId}`}
                title={video.fields.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          );
        })}
      </div>
    );
  } catch (error) {
    console.error("Error fetching videos from Contentful:", error);
    return <div>Error loading videos.</div>;
  }
}
