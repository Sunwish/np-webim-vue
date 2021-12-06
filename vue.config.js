module.exports = {
    chainWebpack: config => {
      const imagesRule = config.module.rule('images')
      imagesRule.uses.clear();
      // 删除images的rule
      imagesRule.use('file-loader')
        .loader('url-loader')
        .options({
          name: 'imgs/[name].[ext]',
          limit: 10000,
          esModule: false
        });
    }
  }