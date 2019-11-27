const path = require('path');
const cssLoaderGetLocalIdent = require('css-loader/lib/getLocalIdent.js');
// const isProd = process.env.NODE_ENV === 'production';

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => { }
}

/* 公共配置 */
let configCommon = {
  // assetPrefix: isProd ? 'https://cdn.mydomain.com' : '',
  crossOrigin: 'anonymous',
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
    getLocalIdent: (context, localIdentName, localName, options) => {
      const hz = context.resourcePath.replace(context.rootContext, '');
      // 排除 node_modules 下的样式
      if (/node_modules/.test(hz)) {
        return localName;
      }
      return cssLoaderGetLocalIdent(context, localIdentName, localName, options);
    }
  },
  distDir: 'next-build', // 构建输出目录，默认 '.next'
  generateEtags: true, // 控制缓存的 etag，默认 true
  pageExtensions: ['tsx', 'jsx', 'js', 'scss'], // pages文件夹下的文件后缀
  webpack(config){
    if(config.externals){
      // 解决 打包css报错问题
      const includes = [/antd/];
      config.externals = config.externals.map(external => {
        if (typeof external !== 'function') return external;
        return (ctx, req, cb) => {
          return includes.find(include =>
            req.startsWith('.')
              ? include.test(path.resolve(ctx, req))
              : include.test(req)
          )
            ? cb()
            : external(ctx, req, cb);
        };
      });
    }
    return config;
  }
};

module.exports = configCommon;