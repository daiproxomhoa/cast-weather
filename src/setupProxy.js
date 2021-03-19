const { createProxyMiddleware } = require("http-proxy-middleware");

const router = {
  "/api/": "https://api.openweathermap.org",
};
const router2 = {
  "/api2/": "https://openweathermap.org",
};

module.exports = function (app) {
  app.use(
    createProxyMiddleware ("/api/", {
      target: "https://api.openweathermap.org",
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        "^/api/": "/",
      },
      router,
      logLevel: "debug",
    })
  );
  app.use(
    createProxyMiddleware ("/api2/", {
      target: "https://openweathermap.org",
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        "^/api2/": "/",
      },
      router: router2,
      logLevel: "debug",
    })
  );
};
