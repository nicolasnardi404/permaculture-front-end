import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/header.module.css";

const Header = () => {
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
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          chat
        </Link>
        <Link href="/articles" className={styles.navLink}>
          blog
        </Link>
        <Link href="/about" className={styles.navLink}>
          about
        </Link>
      </nav>
    </header>
  );
};

export default Header;
