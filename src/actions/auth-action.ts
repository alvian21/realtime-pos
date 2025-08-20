'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerApi } from '@/lib/axios.server';

export async function signOut() {
  const cookiesStore = await cookies();
  try {
    cookiesStore.delete('access_token');
    revalidatePath('/', 'layout');
  } catch (error) {
    console.error('Error signing out:', error);
  }
  redirect('/login');
}

export async function authMe() {
  const api = await createServerApi();
  const res = await api.get("/auth/me");
  return res.data.data;
}

export async function authPermissions() {
  const api = await createServerApi();
  const res = await api.get("/auth/permissions");
  return res.data.data;
}