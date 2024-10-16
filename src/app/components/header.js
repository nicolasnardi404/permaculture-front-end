"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image
          className={styles.logo}
          src="/logo-full.png"
          alt="CYBER_PLANTA Logo"
          width={120}
          height={120}
        />
        <h1 className={styles.title}>CYBER PLANTA</h1>
      </div>
      <button className={styles.menuButton} onClick={toggleMenu}>
        ☰ menu
      </button>
      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
        <Link href="/" className={styles.navLink} onClick={closeMenu}>
          chat
        </Link>
        <Link href="/articles" className={styles.navLink} onClick={closeMenu}>
          blog
        </Link>
        <Link href="/about" className={styles.navLink} onClick={closeMenu}>
          about
        </Link>
      </nav>
    </header>
  );
};

export default Header;
