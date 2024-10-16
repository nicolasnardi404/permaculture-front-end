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

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={styles.modal} onClick={handleBackgroundClick}>
      <div className={styles.modalContent}>
        <button onClick={closeModal} className={styles.closeButton}>
          x
        </button>
        <h2>{post.fields.title}</h2>
        <div className={styles.textContent}>
          {getContentText(post.fields.articleContent)}
        </div>
      </div>
    </div>
  );
}
