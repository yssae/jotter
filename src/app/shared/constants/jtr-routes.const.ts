export const app_base_URL="http://localhost:4200/";

export const JTROUTES = {
  LOGIN: '/auth',
  LOGOUT: '/user/logout',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/auth/forgot-password/:id',
  RESET_PASSWORD: '/auth/reset-password/:id',
  USER_DASHBOARD : '/user',
  NOTEBOOKS_LIST: '/user/notebooks/list',
  NOTEBOOK: '/user/notebooks/notebook/',
  ALL_NOTES: '/user/notes',
  FAVORITES: '/user/favorites',
}
