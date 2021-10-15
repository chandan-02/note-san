/** @type {import('next').NextConfig} */
module.exports = {
  env:{
    API_BASE_URL : 'http://localhost:3000'
  },
  webpack: (config) => {
    config.experiments = { topLevelAwait: true };
    return config;
  },
  reactStrictMode: true,
}
