import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello world!!!' });
});

routes.get('/teste', async (req, res) => {
  const user = await User.create({
    name: 'Lucas',
    email: 'lucasdasilva165@gmail.com',
    password_hash: '123456',
  });

  return res.json(user);
});

export default routes;
