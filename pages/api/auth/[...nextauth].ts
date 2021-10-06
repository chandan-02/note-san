import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
    providers:[
        Providers.GitHub({
            clientId:process.env.Git_clientId,
            clientSecret:process.env.Git_clientSecret
        }),
    ],
});