import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Intro from './intro'

export const siteTitle = 'Hello';

export default function Layout({ children, home }) {
  return (
    <div className="w-full mx-auto justify-between">
      <header className={styles.header}>
        {home ? (
          <>
            <Intro></Intro>
          </>
        ) : (
          <>
            <Intro></Intro>
          </>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
}