/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    API_BASE_URL: process.env.API_ENV == 'PRODUCTION' ? 'https://note-san.vercel.app' : 'http://localhost:3000',
    GIT_ACCESS_TOKEN: "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",
    HEROKU_POSTGRES_INSTANCE: "postgresql-crystalline-62055",
    HEROKU_API_KEY: "68f6cbbd-f1a9-4bd1-8b17-0589b9714dd5",
    Google_clientSecret: "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",
    Google_clientId:
      "950205729731-01h4qkbah0cav5unct0pm3k44j2cdcuc.apps.googleusercontent.com",
    Git_clientId: "88775cbe68c434e9dea5",
    NEXTAUTH_URL: process.env.API_ENV == 'PRODUCTION' ? 'https://note-san.vercel.app' : 'http://localhost:3000',
    DB_URL:
      "postgres://pjdytbpvljrdds:db1aa9916950d06a872fe01e73c6e48201e7ba7e69e8bcd98d0682be8f4a6ee2@ec2-44-198-29-193.compute-1.amazonaws.com:5432/d3mhq0t5ijt2v1",
  },
  webpack: (config) => {
    config.experiments = { topLevelAwait: true };
    return config;
  },
  reactStrictMode: true,
};
