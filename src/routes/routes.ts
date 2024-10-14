import { authRoutes } from '@root/features/auth/auth.routes';
import { Application } from 'express';

const BASE_PATH = '/api';

export default (app: Application) => {
  const routes = () => {
    app.use(`${BASE_PATH}/auth`, authRoutes);
  };
  routes();
};