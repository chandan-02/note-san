/** @type {import('next').NextConfig} */
module.exports = {
  env:{
    API_BASE_URL : process.env.API_ENV == 'PRODUCTION' ? 'https://note-san.vercel.app' : 'http://localhost:3000'
  },
  webpack: (config) => {
    config.experiments = { topLevelAwait: true };
    return config;
  },
  reactStrictMode: true,
}
