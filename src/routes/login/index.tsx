import { component$ } from '@builder.io/qwik';
import { Form, routeAction$, routeLoader$, z, zod$ } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';

export const useLoginAction = routeAction$(
  async (values, { cookie, redirect }) => {
    const { username, password } = values;

    if (username === 'kaslands' && password === '2026kaslands') {
      // Set auth cookie
      cookie.set('auth', 'authenticated', {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      throw redirect(303, '/');
    }

    return {
      success: false,
      error: 'Invalid username or password',
    };
  },
  zod$({
    username: z.string(),
    password: z.string(),
  })
);

export default component$(() => {
  const action = useLoginAction();

  return (
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div class="max-w-md w-full mx-4">
        <div class="bg-black/80 rounded-xl border-2 border-pink-500/20 p-8 shadow-2xl">
          <h1 class="neon-text text-4xl text-center mb-8">Kaslands</h1>

          <Form action={action} class="space-y-6">
            <div>
              <label for="username" class="block text-white/90 mb-2 text-sm">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                class="w-full px-4 py-3 bg-gray-900/50 border-2 border-pink-500/30 rounded-lg text-white focus:outline-none focus:border-pink-500/60 transition-colors"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label for="password" class="block text-white/90 mb-2 text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                class="w-full px-4 py-3 bg-gray-900/50 border-2 border-pink-500/30 rounded-lg text-white focus:outline-none focus:border-pink-500/60 transition-colors"
                placeholder="Enter password"
              />
            </div>

            {action.value?.error && (
              <div class="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                {action.value.error}
              </div>
            )}

            <button
              type="submit"
              class="w-full bg-pink-600/60 hover:bg-pink-600/80 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              Login
            </button>
          </Form>
        </div>
      </div>

      <style>
        {`
          @keyframes neon-flicker {
            0%, 100% {
              text-shadow:
                0 0 10px rgba(255, 255, 255, 0.8),
                0 0 20px rgba(255, 255, 255, 0.6),
                0 0 30px rgba(255, 182, 193, 0.8),
                0 0 40px rgba(255, 182, 193, 0.6);
            }
            50% {
              text-shadow:
                0 0 12px rgba(255, 255, 255, 0.85),
                0 0 22px rgba(255, 255, 255, 0.65),
                0 0 32px rgba(255, 182, 193, 0.85),
                0 0 42px rgba(255, 182, 193, 0.65);
            }
          }

          .neon-text {
            font-family: 'Orbitron', sans-serif;
            font-weight: 900;
            letter-spacing: 0.1em;
            color: transparent;
            -webkit-text-stroke: 2px rgba(255, 255, 255, 0.8);
            text-stroke: 2px rgba(255, 255, 255, 0.8);
            text-shadow:
              0 0 10px rgba(255, 255, 255, 0.8),
              0 0 20px rgba(255, 255, 255, 0.6),
              0 0 30px rgba(255, 182, 193, 0.8),
              0 0 40px rgba(255, 182, 193, 0.6);
            animation: neon-flicker 2s infinite alternate;
          }
        `}
      </style>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Login - Kaslands',
};
