import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import TaskController from './app/controllers/TaskController';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello world!!!' });
});

routes.post('/user', UserController.store);

routes.post('/session', SessionController.store);

// Todas as rotas a partir deste ponto vao usar o middleware de autenticação
routes.use(authMiddleware);

routes.put('/user', UserController.update);

routes.get('/tasks', TaskController.index);
routes.post('/task', TaskController.store);
routes.put('/task/:id', TaskController.update);
routes.delete('/task/:id', TaskController.delete);

export default routes;
