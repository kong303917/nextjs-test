import React from 'react';
import styles from '@/styles/_error.scss';

const Error = () => {
  return (
    <section className={styles['_error-wrapper']}>
      <div className={styles.title}>404</div>
      <div className={styles.content}>Not Found!</div>
    </section>
  );
}

export default Error;