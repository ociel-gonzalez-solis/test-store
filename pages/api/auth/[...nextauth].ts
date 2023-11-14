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
            clientId    : process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        // ...add more providers here
        Credentials({
            name: 'custom-login',
            credentials: {
                email   : {label: 'Correo:', type: 'email', placeholder: 'Tu correo@google.com'},
                password: { label: 'Secreto:', type: 'password', placeholder: 'Secreto' },
            },
            async authorize(credentials){
                console.log({credentials});

                // return {_id: '123', name: 'Juan', email: 'juan@google.com', role: 'admin'};

                return await dbUsers.checkUserEmailPassword(
                    credentials!.email, credentials!.password
                )
            }
        })
    ], 
    
    // jwt() {
    //     return null;
    // },

    callbacks: {
        async jwt({token, account, user}) {
            console.log({ token, account, user });

            if(account){
                token.accessToken = account.access_token;

                switch(account.type){
                    case 'oauth':
                        // TODO: Crear usuarioso verificar que existan en la bd
                    break;

                    case 'credentials':
                        token.user = user;
                    break;
                }
            }

            return token;
        },
        async session({ session, token, user }){
            console.log({session, token, user });

            session.accessToken = token.accessToken as any;
            session.user        = token.user as any;

            return session;
        }
    }
}

export default NextAuth(authOptions)