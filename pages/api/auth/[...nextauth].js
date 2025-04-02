import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabase } from '../../../lib/supabase';
import bcrypt from 'bcryptjs';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', credentials.email)
          .single();

        if (error || !data) return null;

        const isValid = await bcrypt.compare(credentials.password, data.password);
        if (!isValid) return null;

        return { id: data.id, email: data.email, role: data.role };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
