/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    };
    return config;
  },
  reactCompiler: true,
};

export default nextConfig;
