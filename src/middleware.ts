import { RequestHandler } from '@builder.io/qwik-city';

export const onRequest: RequestHandler = async ({ cookie, url, redirect }) => {
  // Allow access to login page
  if (url.pathname === '/login') {
    return;
  }

  // Check if user is authenticated
  const authCookie = cookie.get('auth');

  if (!authCookie || authCookie.value !== 'authenticated') {
    throw redirect(303, '/login');
  }
};
