import React from 'react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__title}>Whenever</div>
      <div className={styles.header__tagline}>Schedule a meeting in seconds.</div>
    </header>
  );
}
