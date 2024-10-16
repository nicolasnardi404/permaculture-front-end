// app/components/BlogPostModal.js (Client Component)
"use client";

import styles from "../styles/articles.module.css";

export default function BlogPostModal({ post, closeModal }) {
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
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>{post.fields.title}</h2>
        <div>{getContentText(post.fields.articleContent)}</div>
        <button onClick={closeModal} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
}
