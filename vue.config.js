module.exports = {
  devServer:{
    host:'localhost',
    port:8080,
    proxy:{
      '/web':{
        target:'http://127.0.0.1:8081',
        changeOrigin:true,
        pathRewrite:{
          '/web':''
        }
      }
    }
  },
  // publicPath:'/app',
  // outputDir:'dist',
  // indexPath:'index2.html',
  // lintOnSave:false,
  productionSourceMap:true,
  chainWebpack:(config)=>{
    config.plugins.delete('prefetch');
  }
}