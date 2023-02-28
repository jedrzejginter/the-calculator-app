const path = require('path');

module.exports = {
  reactStrictMode: true,
  transpilePackages: ['core'],
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
};
