'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import axios from '../../utils/axios';
import { PATH_API, PATH_DASHBOARD } from '../../routes/paths';

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
  isSuccess: boolean;
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
      revalidatePath(PATH_DASHBOARD.todo);

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

type TodoList = {
  created_at: string;
  created_by: {
    id: string;
    username: string;
  };
  description: string;
  id: string;
  title: string;
  updated_at: string;
};

export async function getTodoList(): Promise<TodoList[]> {
  try {
    const { data } = await axios.get<{ isSuccess: boolean; data: TodoList[] }>(
      PATH_API.todo.getTodoByUser
    );

    revalidatePath(PATH_DASHBOARD.todo);

    return data.data;
  } catch (error) {
    console.error('Failed to fetch todo list:', error, getTodoList.name);

    throw new Error('Failed to fetch todo list');
  }
}

export async function deleteTodo(todoId: string): Promise<boolean> {
  let isSuccess = false;
  try {
    const { data } = await axios.delete<{ isSuccess: boolean }>(PATH_API.todo.delete(todoId));

    isSuccess = data.isSuccess;

    return data.isSuccess;
  } catch (error) {
    console.error('Failed to delete todo item:', error, deleteTodo.name);

    throw new Error('Failed to delete todo item');
  } finally {
    if (isSuccess) {
      revalidatePath(`/(dashboard)${PATH_DASHBOARD.todo}`, 'page');
    }
  }
}

export type TodoItem = {
  created_at: string;
  created_by: {
    id: string;
    username: string;
  };
  description: string;
  id: string;
  title: string;
  updated_at: string;
};

export async function getTodoById(todoId: string): Promise<TodoItem> {
  try {
    const { data } = await axios.get<{ isSuccess: boolean; data: TodoItem }>(
      PATH_API.todo.getTodoById(todoId)
    );

    return data.data;
  } catch (error) {
    console.error('Failed to get todo item:', error, getTodoById.name);

    throw new Error('Failed to get todo item');
  }
}

export async function updateTodo(todoId: string, formData: FormData) {
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
    const { data } = await axios.patch<{
      isSuccess: boolean;
      data: Pick<TodoItem, 'title' | 'description'>;
    }>(PATH_API.todo.update(todoId), { title, description });

    if (data.isSuccess) {
      revalidatePath(PATH_DASHBOARD.todo);

      return {
        message: 'Updated todo',
      };
    }

    throw new Error(JSON.stringify(validatedFields.data));
  } catch (error) {
    console.error('Failed to update todo item:', error, getTodoById.name);

    return {
      message: 'Failed to Update Todo',
      error: JSON.stringify(error),
    };
  }
}
