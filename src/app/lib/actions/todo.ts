'use server';

import { z } from 'zod';

import axios from '../../utils/axios';
import { PATH_API } from '../../routes/paths';

const FormSchema = z.object({
  title: z
    .string({
      required_error: 'Please enter a title',
    })
    .min(5),
  description: z
    .string({
      required_error: 'Please enter a description',
    })
    .min(10),
});

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
  };
  message?: string | null;
};

type ResponseCreateTodo = {
  isSuccess: true;
  data: {
    id: string;
    title: string;
    description: string;
    created_by: { id: string; username: string };
    created_at: string;
    updated_at: string;
  };
};

export async function createTodo(_prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing field: Failed to Create Todo',
    };
  }

  const { title, description } = validatedFields.data;

  try {
    // CALL API TO CREATE TODO
    const { data, status } = await axios.post<ResponseCreateTodo>(PATH_API.todo.create, {
      title,
      description,
    });

    if (status === 201 && data.isSuccess) {
      // revalidatePath('/dashboard/todos/');

      return {
        message: 'Created todo',
      };
    }

    throw new Error(JSON.stringify(validatedFields.data));
  } catch (error) {
    return {
      message: 'Failed to Create Todo',
      error: JSON.stringify(error),
    };
  }
}
