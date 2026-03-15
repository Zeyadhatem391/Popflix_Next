import { AuthOptions } from "next-auth";
import GoogleProviders from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProviders({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                },
            },
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                login: { label: "Login", type: "text" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                const response = await fetch(
                    "https://api.themoviedb.org/api/auth/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({
                            login: credentials?.login,
                            password: credentials?.password,
                        }),
                    }
                );

                const text = await response.text();
                console.log("API RESPONSE:", text);

                let result;

                try {
                    result = JSON.parse(text);
                } catch (error) {
                    throw new Error("Server did not return JSON");
                }

                if (!response.ok || !result.success) {
                    throw new Error(result?.message || "Invalid credentials");
                }

                return {
                    id: result.data.user.id.toString(),
                    name: result.data.user.username,
                    email: result.data.user.email,
                    accessToken: result.data.token,
                };
            },
        })

    ],

    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = (user as any).accessToken;
            }
            return token;
        },

        async session({ session, token }) {
            (session as any).accessToken = token.accessToken as string;
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: "/login",
    },
};
