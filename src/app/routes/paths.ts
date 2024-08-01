function path(root: string, sublink: string): string {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

export const PATH_AUTH = {
  login: path(ROOTS_AUTH, '/login'),
};

export const PATH_DASHBOARD = {
  todo: path(ROOTS_DASHBOARD, '/todo'),
};

export const PATH_API = {
  todo: {
    create: '/todo',
  },
};
