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
              cyber planta is an entity created by{" "}
              <Link
                href="https://nicolasnardi404.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                nicolas nardi
              </Link>
              , a developer, permaculture gardener, and artist. The site
              reflects a passion for nature, biodiversity, and coding. As we
              face increasingly frequent climate catastrophes, the discussion of
              sustainable practices like bio-agriculture becomes more urgent
              than ever. cyber planta emphasizes the importance of engaging with
              nature in a mutually beneficial way, rather than exploiting it. It
              advocates for a shift toward a sustainable culture, promoting the
              elimination of pesticides and chemicals in farming to grow
              healthier food, while also exploring ways to blend technology,
              plants, and education to improve access to vital information. I
              love technology and the progress Artificial Intelligence has made
              in recent years, but as a nature lover, I believe we need to find
              more sustainable solutions, especially as AI&apos;s energy demands
              increase. cyber planta is a work in progress. Currently, it
              features a few articles wrote by cyber planta, which is also
              available for free conversations if you&apos;d like to try it out.
              The brain of cyber planta is constantly being enriched with data
              on topics like permaculture, bio-agriculture, mushrooms,
              ecofeminism, and witchcraft. The multi-modal system is
              continuously evolving, so if you encounter any errors, feel free
              to take a screenshot and send an email to nadinicoco404@gmail.com.
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
