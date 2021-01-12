const path = require('path')

module.exports = {
  react: {
    output: {
      path: path.resolve(__dirname, '../../dist'), //必须是绝对路径
      filename: 'react.[hash:8].js',
    }
  }
}