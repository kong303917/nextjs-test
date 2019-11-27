import * as mobx from 'mobx';

// 禁止在 action 外直接修改 state 
mobx.configure({ enforceActions: "observed"});
const { observable, action, computed, runInAction, autorun } = mobx;

const isBroswer: boolean = process.browser;

/**
 * 所以缓存这里先判断一下是否浏览器，然后再去使用浏览器 API( `sessionStorage` )；
 * 不过会有一个闪现的过程，因为实际上 `_app.txs` 是在服务端渲染的，缓存是在浏览器恢复的，
 * 有个时间差，而且会有警告，根据需求取舍吧
 */
let cache = isBroswer && window.sessionStorage.getItem('homeStore');

// 初始化数据
let initialState = {
  count: 0,
  data: {
    time: '2019-11-20'
  },
};

// 缓存数据
if (isBroswer && cache) {
  initialState = {
    ...initialState,
    ...JSON.parse(cache)
  }
}

class Home {
  @observable
  public count = initialState.count;

  @observable
  public data = initialState.data;

  @computed
  public get getTime() {
    return this.data.time;
  }

  @action
  public setCount = (_count: number) => {
    this.count = _count;
  }

  @action
  public setCountAsync = (_count: number) => {
    setTimeout(() => {
      runInAction(() => {
        this.count = _count;
      })
    }, 1000);
  }

  // public setCountFlow = flow(function *(_count: number) {
  //   yield setTimeout(() => {}, 1000);
  //   this.count = _count;
  // })
}

const homeStore = new Home();

// 数据变化后触发，数据缓存
autorun(() => {
  const obj = mobx.toJS(homeStore);
  isBroswer && window.sessionStorage.setItem('homeStore', JSON.stringify(obj));
});

export type homeStoreType = typeof homeStore;
export default homeStore;