import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { theme } from '../theme';
import styles from './layout.module.css';

export const metadata = {
  title: 'Whenever',
  description: 'Set up a meeting in seconds.',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>

      <body className={styles.body}>
        <Header />
        <MantineProvider theme={theme}>
          <main className={styles.main}>{children}</main>
        </MantineProvider>
        <Footer />
      </body>
    </html>
  );
}
