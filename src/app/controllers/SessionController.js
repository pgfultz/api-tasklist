import jwt from 'jsonwebtoken';
import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const userExists = await User.findOne({
      where: { email },
    });

    if (!userExists) {
      return res.status(401).json({ error: 'Usuário não encontrado!' });
    }

    // Verificar se a senha bate ou nao
    if (!(await userExists.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha incorreta! ' });
    }

    const { id, name } = userExists;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
