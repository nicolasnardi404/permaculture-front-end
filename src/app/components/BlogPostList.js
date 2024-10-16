// app/components/BlogPostList.js (Client Component)
"use client";

import { useState } from "react";
import styles from "../styles/articles.module.css";
import BlogPostModal from "./BlogPostModal";

export default function BlogPostList({ posts }) {
  const [selectedPost, setSelectedPost] = useState(null);

  const openModal = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const getContentText = (articleContent) => {
    if (!articleContent || !articleContent.content) return "";
    return articleContent.content
      .map((item) => {
        if (item.nodeType === "paragraph") {
          return item.content.map((content) => content.value).join("");
        }
        return "";
      })
      .join("\n");
  };

  return (
    <>
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

      {selectedPost && (
        <BlogPostModal post={selectedPost} closeModal={closeModal} />
      )}
    </>
  );
}
