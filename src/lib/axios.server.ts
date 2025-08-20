// lib/axios.server.ts
import axios from "axios";
import { cookies } from "next/headers";

export async function createServerApi() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
}
