// app/blog/page.js (Server Component by default)

import React from "react";
import client from "../lib/contentful"; // Adjust the import path as necessary
import BlogPostList from "../components/BlogPostList";
import styles from "../styles/articles.module.css";

export default async function BlogPage() {
  // Fetch data from Contentful securely on the server
  try {
    const entries = await client.getEntries({
      content_type: "articles", // Ensure this matches your Contentful content type ID
      order: "-sys.createdAt",
    });

    return (
      <div className={styles.container}>
        <BlogPostList posts={entries.items} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    return <div>Error loading articles.</div>;
  }
}
