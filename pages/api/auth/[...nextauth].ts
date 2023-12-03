import { dbUsers } from "@/database";
import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"

declare module "next-auth" {
    interface Session {
        accessToken?: string;
    }
    interface User {
        id?: string
        _id: string
    }
};

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId    : process.env.GITHUB_ID! || "",
            clientSecret: process.env.GITHUB_SECRET! || "",
        }),
        // ...add more providers here
        Credentials({
            name: 'custom-login',
            credentials: {
                email: {
                    label       : "Email:",
                    type        : "email",
                    placeholder : "correo@google.com",
                    autocomplete: "off",
                },
                password: {
                    label       : "Password:",
                    type        : "password",
                    placeholder : "Password",
                    autocomplete: "off",
                },
            },
            async authorize(credentials){
                console.log({credentials});

                // return {_id: '123', name: 'Juan', email: 'juan@google.com', role: 'admin'};
                if (!credentials) return null;
                return await dbUsers.checkUserEmailPassword(
                    credentials!.email,
                    credentials!.password
                )
            }
        })
    ],

    pages: {
        signIn : "/auth/login",
        newUser: "/auth/register",
    },

    session: {
        maxAge   : 2592000,   /// 30d
        strategy : "jwt",
        updateAge: 86400,     // cada día
    },

    callbacks: {
        async jwt({token, account, user}) {
            console.log({ token, account, user });

            if(account){
                token.accessToken = account.access_token;

                switch(account.type){
                    case 'oauth':
                        token.user = await  dbUsers.oAuthToDbUser(
                            user?.email || '',
                            user?.name || ''
                        );
                    break;

                    case 'credentials':
                        token.user = user;
                    break;
                }
            }

            console.log(token, "token");
            return token;
        },
        async session({ session, token, user }){
            console.log({session, token, user });

            session.accessToken = token.accessToken as string;
            session.user        = token.user as any;

            return session;
        }
    }
}

export default NextAuth(authOptions);