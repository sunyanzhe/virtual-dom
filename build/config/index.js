const path = require('path')

module.exports = {
  react: {
    output: {
      path: path.resolve(__dirname, '../../dist'),
      filename: 'react.[hash:8].js',
    }
  },
  vue2: {
    output: {
      path: path.resolve(__dirname, '../../dist'),
      filename: 'vue2.[hash:8].js',
    }
  },
  vue3: {
    output: {
      path: path.resolve(__dirname, '../../dist'),
      filename: 'vue3.[hash:8].js',
    }
  }
}