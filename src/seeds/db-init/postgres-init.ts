import { AccountEntity } from '@root/features/auth/models/userModel';
import { Sequelize } from 'sequelize';

export class PostgresInit {
  private _sequelize!: Sequelize;

  init(connection: Sequelize) {
    this._sequelize = connection;
    this._setup();
  }

  private _setup() {
    AccountEntity.initModel(this._sequelize);
   
  }
}

export default PostgresInit;
