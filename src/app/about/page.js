"use client";

import React from "react";
import Link from "next/link";
import styles from "../styles/about.module.css";

export default function Bio() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <section className={styles.bioContent}>
            <p>
              Cyber Planta is an entity created by{" "}
              <Link
                href="https://nicolasnardi404.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nicolas Nardi
              </Link>
              , a developer, permaculture gardener, and artist. The site
              reflects a deep passion for nature, biodiversity, and coding. As
              we face increasingly frequent climate catastrophes, the discussion
              around sustainable practices like bio-agriculture becomes more
              urgent than ever. Cyber Planta emphasizes the importance of
              engaging with nature in a mutually beneficial way, advocating for
              a shift toward sustainable practices. This includes promoting the
              elimination of pesticides and chemicals in farming to grow
              healthier food, while also exploring how technology, plants, and
              education can come together to improve access to vital
              information. The advancements in technology, particularly
              Artificial Intelligence, have been remarkable in recent years.
              However, as we look toward the future, it becomes increasingly
              important to explore sustainable solutions, especially as
              AI&apos;s energy demands continue to grow. Cyber Planta is a work
              in progress, currently featuring several articles generated by the
              system. Cyber Planta is available for conversations in the chat,
              with the option to generate images that illustrate your
              conversation. Our video section explores the possibilities of AI
              as a content generator, aiming to raise awareness about
              biodiversity and sustainability. The videos are fully created
              using AI, from generating avatars and lip-syncing to producing
              images and content.The brain of Cyber Planta is constantly being
              enriched with data on topics like permaculture, bio-agriculture,
              mushrooms, ecofeminism, and witches history. The system is
              continuously evolving, so if you encounter any errors, feel free
              to take a screenshot and email them to nicolasnardi404@gmail.com.
            </p>
          </section>
        </main>
        <footer className={styles.footer}>
          <Link href="/" className={styles.backLink}>
            back to chat
          </Link>
        </footer>
      </div>
    </div>
  );
}
