/** @type {import('next').NextConfig} */
module.exports = {
  env:{
    API_BASE_URL : 'https://note-san.vercel.app/'
  },
  webpack: (config) => {
    config.experiments = { topLevelAwait: true };
    return config;
  },
  reactStrictMode: true,
}
