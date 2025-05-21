const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Proxy middleware configuration
const apiProxy = createProxyMiddleware({
  target: 'https://demo.registry.azure-mcp.net',
  changeOrigin: true,
  // Remove the pathRewrite since we want to keep the v0 in the path
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  },
  // Add logging to debug the requests
  logLevel: 'debug'
});

// Use the proxy for all routes starting with /api
app.use('/api', apiProxy);

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});