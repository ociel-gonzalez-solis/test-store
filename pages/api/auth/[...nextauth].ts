import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
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

                return {id: '123', name: 'Juan', email: 'juan@google.com', role: 'admin'};
            }
        })
    ],
    jwt: {

    },

    callbacks: {
        
    }
}

export default NextAuth(authOptions)