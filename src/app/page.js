"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { saveAs } from "file-saver";
import { usePathname, useRouter } from "next/navigation";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hey I am cyber planta and I love to talk about permaculture, mushrooms, and witches.",
      sender: "bot",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const messagesEndRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [hasChatStarted, setChatStarted] = useState(false);

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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/chat`, {
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
    setIsGenerating(true);
    try {
      const conversation = messages.map((msg) => msg.text).join(" ");
      const response = await fetch("http://localhost:8000/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: conversation }),
      });
      const data = await response.json();
      if (data.image_data) {
        setGeneratedImage(data.image_data);
      } else {
        console.error("Error generating image:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadImage = () => {
    if (generatedImage) {
      // Convert base64 to Blob
      const byteString = atob(generatedImage.split(",")[1]);
      const mimeString = generatedImage
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });

      // Save the Blob as a file
      saveAs(blob, "generated-image.png");
    }
  };

  const isConversationEmpty = messages.length === 0;

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasChatStarted) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    const handleRouteChange = () => {
      if (
        hasChatStarted &&
        !window.confirm(
          "Are you sure you want to leave? All data will be lost."
        )
      ) {
        window.history.pushState(null, "", pathname);
        throw "Route change aborted.";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handleRouteChange);

    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = (...args) => {
      if (
        !hasChatStarted ||
        window.confirm("Are you sure you want to leave? All data will be lost.")
      ) {
        originalPush(...args);
      }
    };

    router.replace = (...args) => {
      if (
        !hasChatStarted ||
        window.confirm("Are you sure you want to leave? All data will be lost.")
      ) {
        originalReplace(...args);
      }
    };

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handleRouteChange);
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [pathname, router, hasChatStarted]);

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
      {!isConversationEmpty && (
        <button
          onClick={handleGenerateImage}
          className={styles.generateButton}
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate Image"}
        </button>
      )}
      {isGenerating && (
        <p className={styles.loadingMessage}>
          Generating image... This may take a moment.
        </p>
      )}
      {generatedImage && (
        <div className={styles.imageContainer}>
          <img
            src={generatedImage}
            alt="Generated Image"
            className={styles.generatedImage}
          />
          <button
            onClick={handleDownloadImage}
            className={styles.downloadButton}
          >
            Download Image
          </button>
        </div>
      )}
    </div>
  );
}
