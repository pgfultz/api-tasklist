import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({ id, email, name });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (user.email !== email) {
      const emailExists = await User.findOne({
        where: { email },
      });

      if (emailExists) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha incorreta! ' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({ id, name, email });
  }
}

export default new UserController();
