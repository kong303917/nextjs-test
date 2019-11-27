import { NextComponentType } from "next";
import { Router } from 'next/router';
import App, { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'mobx-react';
import store from '../store';

interface Props {
  Component: NextComponentType,
  pageProps: AppProps,
  router: Router
}

/**
 * App 
 */
class myApp extends App<Props> {

  public constructor(props: Props) {
    super(props);
  }
  
  public componentDidUpdate() {
    console.log('router: ', this.props.router);
  }
  
  public componentDidMount() {
    console.log('router: ', this.props.router);
  }

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Provider {...store}>
          <Component {...pageProps} />
        </Provider>
      </React.Fragment>
    );
  }
}

export default myApp;