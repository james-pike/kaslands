// src/components/utils/turso.ts
import type { RequestEventBase } from '@builder.io/qwik-city';
import { createClient, type Client } from '@libsql/client';

interface EnvGetter {
  get: (key: string) => string | undefined;
}

export function tursoClient(options: RequestEventBase | { env: EnvGetter }): Client {
  const env = 'env' in options ? options.env : options; // Handle both RequestEventBase and { env }
  const url = env.get('PRIVATE_TURSO_DATABASE_URL')?.trim();
  if (url === undefined) {
    throw new Error('PRIVATE_TURSO_DATABASE_URL is not defined');
  }

  const authToken = env.get('PRIVATE_TURSO_AUTH_TOKEN')?.trim();
  if (authToken === undefined && !url.includes('file:')) {
    throw new Error('PRIVATE_TURSO_AUTH_TOKEN is not defined');
  }

  return createClient({
    url,
    authToken,
  });
}