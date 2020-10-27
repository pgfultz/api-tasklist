import jwt from 'jsonwebtoken';
import { promisify } from 'util'; // Transformar em async await

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não existe! ' });
  }

  // Descartando a palavra bearer quem vem junto e pegando so o token
  const [, token] = authHeader.split(' ');

  try {
    const decoder = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoder.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido! ' });
  }
};
