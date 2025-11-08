import NextAuth from 'next-auth';
import { authOptions } from '@/app/utils/authOptions';

// import { JWT } from 'next-auth/jwt';
// import CredentialsProvider from 'next-auth/providers/credentials';


/* 
const handler = NextAuth({
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
                        return {
                            id: res.result.id,
                            name: res.result.username,
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
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id as string,
                };
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/login',
    },
    debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST }; 
*/

// Export the NextAuth handler using the extracted options
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 
