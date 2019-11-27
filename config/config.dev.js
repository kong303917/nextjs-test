  /* development 配置 */
let configDev = {
  onDemandEntries: { // development 特性，SSR-caching有另外的设置
    // 服务器将页面保存在缓冲区中的时间(ms)
    maxInactiveAge: 25 * 1000,
    // 同时保存的页面数量
    pagesBufferLength: 2
  }
};

module.exports = configDev;