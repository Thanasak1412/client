function path(root: string, sublink: string): string {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

export const PATH_AUTH = {
  login: path(ROOTS_AUTH, '/login'),
};

export const PATH_DASHBOARD = {
  todo: path(ROOTS_DASHBOARD, '/todos'),
};

export const PATH_API = {
  todo: {
    getTodoByUser: '/todo',
    getTodoById: (todoId: string) => path('/todo', `/${todoId}`),
    create: '/todo',
    delete: (todoId: string) => path('/todo', `/${todoId}`),
    update: (todoId: string) => path('/todo', `/${todoId}`),
  },
  auth: {
    login: path(ROOTS_AUTH, '/login'),
  },
};
