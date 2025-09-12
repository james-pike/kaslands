// src/routes/api/webhook/index.ts

export const onGet = async () => {
  return new Response(JSON.stringify({ message: 'GET request OK' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const onPost = async ({ request }: any) => {
  const data = await request.json();
  return new Response(JSON.stringify({ message: 'POST request OK', data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
