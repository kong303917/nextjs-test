import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { homeStoreType } from '@/store/home';
import { Button, Row } from 'antd';
import Layout from '@/components/layout';
import styles from '@/styles/detail.scss';

function Detail(props: any) {
  const router = useRouter();
  const homeStore: homeStoreType = props.homeStore;

  return (
    <Layout>
      <Head>
        <title>Detail</title>
      </Head>
      <p className={styles.detail}>This is the detail page!</p>
      id: { router.query.id }
      <Row>
        count: { homeStore.count }
      </Row>
      <Button 
        onClick={() => homeStore.setCount(homeStore.count+1)}
      >count++</Button>
      <Button 
        onClick={() => homeStore.setCountAsync(homeStore.count+1)}
      >countAsync++</Button>
    </Layout>
  );
}

Detail.getInitialProps = async function(context: any) {
  /**
   * 在当前路由刷新的话，context.req 为真，服务端才有 req/res，在命令行打印 'broswer'；
   * 如果是其他路由跳转过来没有刷新页面的话，context.req 为假，在浏览器控制台打印,
   * 此时 document.title 是 跳转之前的页面 title；
   */
  console.log('render-type: ', context.req ? 'server' : 'broswer');

  return {
    data: 'detail'
  };
}

const DetailWithMobx = inject('homeStore')(
  observer(Detail)
);

export default DetailWithMobx;