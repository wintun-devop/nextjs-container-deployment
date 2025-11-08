import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { AuthOptions } from 'next-auth';

import { verifyToken,decodeToken } from '@/app/utils/jwt';



export const authOptions:AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const Url = process.env.LOGIN_API as string;
                try {
                    const response = await fetch(Url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ username: credentials?.username, password: credentials?.password }),
                        cache: 'no-store',
                    });
                    if (response.status == 200 && response.ok) {
                        const res = await response.json();
                        const r = res.result.AuthenticationResult.AccessToken;
                        const a = decodeToken(r);
                        return {
                            id: a.payload.sub,
                            username: a.payload.username,
                            access_token:res.result.AuthenticationResult.AccessToken
                        };
                    } else {
                        const errorResponse = await response.json();
                        throw new Error(errorResponse.message || 'Invalid credentials');
                    }
                } catch (e) {
                    console.error('Authorization Error:', e);
                    throw new Error('Authorization failed');
                };
            },
        })
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user: any }) {
            if (user) {
                token.id = user.id,
                token.username=user.username,
                token.access_token = user.access_token
            }
            return token;
        },
        async session({ session, token }: { session: any, token: any }) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    username:token.username as string,
                    access_token:token.access_token as string
                };
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    pages: {
        signIn: '/auth/login',
    },
    debug: process.env.NODE_ENV === 'development',
}
