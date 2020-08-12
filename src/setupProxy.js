const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:6600',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    }
  }));

  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }))

};
