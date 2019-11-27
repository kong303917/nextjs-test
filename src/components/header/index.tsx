import Link from 'next/link';
import Head from 'next/head';
import React from 'react'; 
import styles from './header.scss';

const Header = () => {
  return (
    <div>
      <Head>
        <title>Next.js test</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      
      <Link href="/">
        <a className={styles.tag}>Home</a>
      </Link>
      <Link href="/about">
        <a className={styles.tag}>About</a>
      </Link>
      <Link href="/detail?id=123" as="/detail/123">
        <a className={styles.tag}>Detail</a>
      </Link>
    </div>
  )
};

export default Header;