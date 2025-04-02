import { getCsrfToken } from 'next-auth/react';

export default function Login({ csrfToken }) {
  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border shadow rounded">
      <h1 className="text-xl font-bold mb-4">🔐 Login</h1>
      <form method="post" action="/api/auth/callback/credentials" className="space-y-4">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-black text-white p-2 rounded">
          Sign in
        </button>
      </form>
    </div>
  );
}

Login.getInitialProps = async (context) => {
  return {
    csrfToken: await getCsrfToken(context),
  };
};
