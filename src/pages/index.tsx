import Link from 'next/link';
import /* Router, */ { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '@/components/layout';
import styles from '@/styles/index.scss';

/**
 * 首页，路由为 '/'
 * @param props 
 */
const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // 路由拦截，会影响浏览器前进后退的渲染结果
    // Router.beforePopState(({ url, as, options }: any) => {
    //   console.log('url: ', url);
    //   console.log('as: ', as);
    //   console.log('options: ', options);
      
    //   if (as === '/about') {
    //     console.log('about');
    //     return true;
    //   }
    //   return true;
    // });
  });

  return (
    <Layout>
      <h1>{router.query.title}</h1>
      <img className={styles.img} src="/static/images/4k-wallpaper-alps-cold-2283757.jpg" />
      <div className={styles.content}>
        <p>
          This is our blog post.
          Yes. We can have a <Link href="/link"><a>link</a></Link>.
          And we can have a title as well.
        </p>
        <h3>This is a title</h3>
        <p>And here's the content.</p>
      </div>
    </Layout>
  );
};

export default Home;