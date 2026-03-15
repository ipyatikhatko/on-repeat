'use server';

import { cookies } from 'next/headers';

/**
 * Gets the authentication cookie header for server-side API requests.
 * Use this helper to forward cookies when making authenticated API calls from server components.
 *
 * @returns The Cookie header string with authentication cookies
 *
 * @example
 * ```ts
 * const authHeaders = getAuthHeaders();
 * const { data } = await client.GET('/feed/posts/{post_id}', {
 *   params: { path: { post_id: '123' } },
 *   headers: authHeaders
 * });
 * ```
 */
export async function getAuthHeaders() {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
}
