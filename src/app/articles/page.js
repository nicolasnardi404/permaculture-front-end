"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "contentful";
import Link from "next/link";
import Header from "../components/header";
import styles from "../styles/articles.module.css";

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      <main className={styles.container}>
        <h2 className={styles.pageTitle}>Blog Posts</h2>
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
                <Link
                  href={`/blog/${post.sys.id}`}
                  className={styles.readMoreLink}
                >
                  Read more
                </Link>
              </article>
            );
          })}
        </div>
      </main>
    </>
  );
}
