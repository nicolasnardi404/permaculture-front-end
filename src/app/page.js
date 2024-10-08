"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css"; // Update this line

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.response, sender: "bot" }]);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Error occurred. Please try again.", sender: "bot" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    setIsLoading(true);
    try {
      const conversation = messages.map((msg) => msg.text).join(" ");
      const response = await fetch("http://localhost:8000/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: conversation }),
      });
      const data = await response.json();
      if (data.image_path) {
        setGeneratedImage(`http://localhost:8000/${data.image_path}`);
      } else {
        console.error("Error generating image:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        <div className={styles.messagesContainer}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.message} ${styles[msg.sender]}`}
            >
              <div className={styles.messageContent}>{msg.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className={styles.input}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={styles.sendButton}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
      <button
        onClick={handleGenerateImage}
        disabled={isLoading || messages.length === 0}
        className={styles.generateButton}
      >
        Generate Image
      </button>
      {generatedImage && (
        <div className={styles.imageContainer}>
          <Image
            src={generatedImage}
            alt="Generated Image"
            width={500}
            height={500}
          />
        </div>
      )}
    </div>
  );
}
