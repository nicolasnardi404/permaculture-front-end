"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "contentful";
import Link from "next/link";
import Header from "../components/header";
import styles from "../styles/articles.module.css";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export default function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    async function fetchEntries() {
      try {
        const entries = await client.getEntries({
          content_type: "articles",
          order: "-sys.createdAt",
        });
        if (entries.items) setPosts(entries.items);
      } catch (error) {
        console.log("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEntries();
  }, []);

  function getContentText(articleContent) {
    if (!articleContent || !articleContent.content) return "";
    return articleContent.content
      .map((item) => {
        if (item.nodeType === "paragraph") {
          return item.content.map((content) => content.value).join("");
        }
        return "";
      })
      .join("\n");
  }

  const openModal = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      <main className={styles.container}>
        <div className={styles.blogContainer}>
          {posts.map((post) => {
            const contentText = getContentText(post.fields.articleContent);
            return (
              <article key={post.sys.id} className={styles.blogPost}>
                <h3 className={styles.postTitle}>
                  {post.fields.title || "Untitled"}
                </h3>
                <p className={styles.postExcerpt}>
                  {contentText
                    ? contentText.substring(0, 150) +
                      (contentText.length > 150 ? "..." : "")
                    : "No content available"}
                </p>
                <button
                  onClick={() => openModal(post)}
                  className={styles.readMoreButton}
                >
                  Read more
                </button>
              </article>
            );
          })}
        </div>
      </main>
      {selectedPost && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{selectedPost.fields.title}</h2>
            <div>{getContentText(selectedPost.fields.articleContent)}</div>
            <button onClick={closeModal} className={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
