import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Task from '../app/models/Task';

const models = [User, Task];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Conexao do db com models
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      // Verificando se tem associações. Casso tenha carrega elas tbm
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
