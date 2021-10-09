import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import DB_URL from '../../../helper/heroku_dburl';

export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: process.env.Git_clientId,
            clientSecret: process.env.Git_clientSecret
        }),
        Providers.Google({
            clientId: process.env.Google_clientId,
            clientSecret: process.env.Google_clientSecret,
            authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
        })
    ],
    database: {
        type: "postgres",
        url: DB_URL,
        ssl: {
            rejectUnauthorized: false
        },
        synchronize:true
    }
});