'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { z } from 'zod';

import axios from '../../utils/axios';
import { PATH_API, PATH_DASHBOARD } from '../../routes/paths';

const FormState = z.object({
  username: z.string().min(6),
  password: z.string().min(8),
});

export async function authenticate(
  _prevState: string | null | undefined,
  formData: FormData
): Promise<string | undefined> {
  const validatedFields = FormState.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return 'Invalid credentials';
  }

  const { username, password } = validatedFields.data;

  let isAuthenticate = false;
  try {
    const response = await axios.post<{ username: string; access_token: string }>(
      PATH_API.auth.login,
      {
        username,
        password,
      }
    );

    const { status, data } = response;

    if (status === 201 && !!data) {
      const cookieStore = cookies();

      cookieStore.set('accessToken', data.access_token);
      cookieStore.set('username', data.username);

      isAuthenticate = true;
    }
  } catch (error) {
    console.error('error => ', error);

    return error ? JSON.stringify(error) : 'Failed to sign in';
  } finally {
    if (isAuthenticate) {
      redirect(PATH_DASHBOARD.todo);
    }
  }
}
