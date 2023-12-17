import React from 'react';
import styles from './Header.module.css';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.header__title}>Whenever</div>
        <div className={styles.header__tagline}>Schedule a meeting in seconds.</div>
      </Link>
    </header>
  );
}
