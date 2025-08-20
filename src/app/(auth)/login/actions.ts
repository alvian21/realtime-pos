'use server';

import { INITIAL_STATE_LOGIN_FORM } from "@/constants/auth-constant";
import { AuthFormState } from "@/types/auth";
import { loginSchemaForm } from "@/validations/auth-validation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerApi } from "@/lib/axios.server";

export async function login(prevState: AuthFormState, formData: FormData | null) {

  if (!formData) {
    return INITIAL_STATE_LOGIN_FORM;
  }

  const validateFields = loginSchemaForm.safeParse({
    email: formData.get('email'),
    password: formData.get('password')
  });

  if (!validateFields.success) {
    return {
      status: 'error',
      errors: {
        ...validateFields.error.flatten().fieldErrors,
        _form: []
      }
    };
  }
  try {

    const api = await createServerApi();

    const response = await api.post("/auth/login", {
      email: validateFields.data.email,
      password: validateFields.data.password,
    });

    const { access_token } = response.data.data;

    if (access_token) {
      const cookiesStore = await cookies();
      cookiesStore.set("access_token", access_token, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
      });
    }

  } catch (error: any) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [error.response?.data?.message || "Login gagal"],
      },
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
