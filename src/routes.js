import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello world!!!' });
});

routes.post('/user', UserController.store);

export default routes;
