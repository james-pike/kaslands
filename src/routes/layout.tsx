import { component$, Slot, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$, routeAction$, Form, zod$, z } from "@builder.io/qwik-city";
import { inject } from "@vercel/analytics";
import Header from "~/components/widgets/Header";
import Hero from "~/components/widgets/Hero";

import { tursoClient } from "~/lib/turso";

// Simple auth credentials (in production, use env vars)
const AUTH_USERNAME = 'kaslands';
const AUTH_PASSWORD = '2026kaslands';
const AUTH_COOKIE = 'kaslands_auth';

export const useAuthCheck = routeLoader$(async ({ cookie }) => {
  const authCookie = cookie.get(AUTH_COOKIE);
  return { isAuthenticated: authCookie?.value === 'authenticated' };
});

export const useLogin = routeAction$(
  async (data, { cookie, fail }) => {
    if (data.username === AUTH_USERNAME && data.password === AUTH_PASSWORD) {
      cookie.set(AUTH_COOKIE, 'authenticated', {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      return { success: true };
    }
    return fail(401, { message: 'Invalid credentials' });
  },
  zod$({
    username: z.string(),
    password: z.string(),
  })
);

interface Banner {
  length: number; id: number; title: string; subtitle: string; message: string; 
}

export const useBannerLoader = routeLoader$(async (event) => { 
  try { 
    const client = tursoClient(event); 
    const result = await client.execute("SELECT * FROM banners LIMIT 1"); 
    if (result.rows.length === 0) { 
      return null; 
    } 
    const row = result.rows[0]; 
    return { 
      id: Number(row.id) || 0, 
      title: String(row.title) || '', 
      subtitle: String(row.subtitle) || '', 
      message: String(row.message) || '', 
    } as Banner; 
  } catch (error) { 
    console.error("Error loading banner:", error); 
    return null; 
  } 
});

export default component$(() => {
  const auth = useAuthCheck();
  const loginAction = useLogin();

  useVisibleTask$(() => {
    inject(); // Runs only on client side
  });

  // Show login screen if not authenticated
  if (!auth.value.isAuthenticated) {
    return (
      <div class="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div class="max-w-md w-full">
          <div class="bg-gray-800/90 rounded-lg p-8 shadow-xl border border-pink-500/30">
            <div class="text-center mb-8">
              <h1 class="text-3xl font-bold text-white mb-2">Kaslands</h1>
              <p class="text-gray-400">Enter credentials to access the site</p>
            </div>

            <Form action={loginAction} class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-colors"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-colors"
                  placeholder="Enter password"
                  required
                />
              </div>

              {loginAction.value?.failed && (
                <p class="text-red-400 text-sm text-center">Invalid credentials</p>
              )}

              <button
                type="submit"
                class="w-full py-3 px-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-500 hover:to-purple-500 transition-all duration-200"
              >
                {loginAction.isRunning ? 'Checking...' : 'Enter Site'}
              </button>
            </Form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="flex flex-col pt-1 pb-1 md:pt-0 md:pb-0">

      <Hero/>
      {/* Header: order-1 on mobile, order-2 on desktop - STICKY */}
      <div class="order-1 md:order-1 sticky top-0 z-20 mt-1 md:mt-0">
        <Header />
      </div>

      {/* Hero: order-2 on mobile, order-1 on desktop */}


      {/* Main content: always comes after header/hero with order-3 */}
      <main class="mt-0 order-3">
        <div class="relative  mx-auto max-w-7xl  overflow-x-hidden">
          <Slot />
        </div>
              {/* <Footer /> */}

      </main>
    </div>
  );
});