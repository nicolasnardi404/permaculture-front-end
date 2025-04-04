"use client";

import React from "react";
import Link from "next/link";
// import Image from "next/image";
import styles from "./page.module.css";
// import { saveAs } from "file-saver";
// import { usePathname, useRouter } from "next/navigation";
// import Captcha from "./components/Captcha";

export default function Home() {
  // const [input, setInput] = useState("");
  // const [messages, setMessages] = useState([
  //   {
  //     text: "Hey I am cyber planta and I love to talk about permaculture, mushrooms, and witches.",
  //     sender: "bot",
  //   },
  // ]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [generatedImage, setGeneratedImage] = useState(null);
  // const messagesEndRef = useRef(null);
  // const [isGenerating, setIsGenerating] = useState(false);
  // const pathname = usePathname();
  // const router = useRouter();
  // const [hasChatStarted, setHasChatStarted] = useState(false);
  // const [captchaToken, setCaptchaToken] = useState(null);
  // const [sessionId, setSessionId] = useState(null);
  // const [clientId, setClientId] = useState(null);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(scrollToBottom, [messages]);

  // useEffect(() => {
  //   // Generate or retrieve client ID when component mounts
  //   const storedClientId = localStorage.getItem("clientId");
  //   if (storedClientId) {
  //     setClientId(storedClientId);
  //   } else {
  //     const newClientId = crypto.randomUUID(); // Built-in UUID generator
  //     localStorage.setItem("clientId", newClientId);
  //     setClientId(newClientId);
  //   }
  // }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!input.trim() || !captchaToken || !clientId) return;

  //   setIsLoading(true);
  //   setMessages((prev) => [...prev, { text: input, sender: "user" }]);
  //   setInput("");
  //   setHasChatStarted(true);

  //   try {
  //     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  //     const response = await fetch(`${apiUrl}/chat`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         message: input,
  //         session_id: sessionId,
  //         client_id: clientId,
  //       }),
  //     });
  //     const data = await response.json();
  //     setSessionId(data.session_id); // Store session ID for subsequent requests
  //     setMessages((prev) => [...prev, { text: data.response, sender: "bot" }]);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setMessages((prev) => [
  //       ...prev,
  //       { text: "Error occurred. Please try again.", sender: "bot" },
  //     ]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleGenerateImage = async () => {
  //   setIsGenerating(true);
  //   try {
  //     const conversation = messages.map((msg) => msg.text).join(" ");
  //     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  //     const response = await fetch(`${apiUrl}/generate-image`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ message: conversation }),
  //     });
  //     const data = await response.json();
  //     if (data.image_data) {
  //       setGeneratedImage(data.image_data);
  //     } else {
  //       console.error("Error generating image:", data.error);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //     setIsGenerating(false);
  //   }
  // };

  // const handleDownloadImage = () => {
  //   if (generatedImage) {
  //     // Convert base64 to Blob
  //     const byteString = atob(generatedImage.split(",")[1]);
  //     const mimeString = generatedImage
  //       .split(",")[0]
  //       .split(":")[1]
  //       .split(";")[0];
  //     const ab = new ArrayBuffer(byteString.length);
  //     const ia = new Uint8Array(ab);
  //     for (let i = 0; i < byteString.length; i++) {
  //       ia[i] = byteString.charCodeAt(i);
  //     }
  //     const blob = new Blob([ab], { type: mimeString });

  //     // Save the Blob as a file
  //     saveAs(blob, "generated-image.png");
  //   }
  // };

  // const isConversationEmpty = messages.length === 0;

  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     if (hasChatStarted) {
  //       e.preventDefault();
  //       e.returnValue = "";
  //     }
  //   };

  //   const handleRouteChange = () => {
  //     if (
  //       hasChatStarted &&
  //       !window.confirm(
  //         "Are you sure you want to leave? All data will be lost."
  //       )
  //     ) {
  //       window.history.pushState(null, "", pathname);
  //       throw "Route change aborted.";
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   window.addEventListener("popstate", handleRouteChange);

  //   const originalPush = router.push;
  //   const originalReplace = router.replace;

  //   router.push = (...args) => {
  //     if (
  //       !hasChatStarted ||
  //       window.confirm("Are you sure you want to leave? All data will be lost.")
  //     ) {
  //       originalPush(...args);
  //     }
  //   };

  //   router.replace = (...args) => {
  //     if (
  //       !hasChatStarted ||
  //       window.confirm("Are you sure you want to leave? All data will be lost.")
  //     ) {
  //       originalReplace(...args);
  //     }
  //   };

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //     window.removeEventListener("popstate", handleRouteChange);
  //     router.push = originalPush;
  //     router.replace = originalReplace;
  //   };
  // }, [pathname, router, hasChatStarted]);

  // const handleCaptchaVerify = (token) => {
  //   console.log("Captcha verified with token:", token);
  //   setCaptchaToken(token);
  // };

  // // Add this useEffect to monitor captchaToken changes
  // useEffect(() => {
  //   console.log("CaptchaToken state changed:", captchaToken);
  // }, [captchaToken]);

  return (
    <div className={styles.container}>
      <div className={styles.noticeContainer}>
        <h1>🌿 Cyber Planta Chat</h1>
        <div className={styles.notice}>
          <p>This chat service is no longer available.</p>
          <p>You can explore the complete project and its code on GitHub:</p>
          <a
            href="https://github.com/nicolasnardi404/permaculture-chatbot"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            View Project on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
