const path = require('path')

export default {
  extraBabelPlugins: [
    ["import", { "libraryName": "antd-mobile", "libraryDirectory": "es", "style": "css" }]
  ],
  define: {
    'process.env':{},
    'process.env.NODE_ENV': process.env.NODE_ENV,
    'process.env.API_ENV': process.env.API_ENV,
  },
  hash: true,
  manifest: {},
  html: {
    "template": "./src/index.ejs"
  }
}
