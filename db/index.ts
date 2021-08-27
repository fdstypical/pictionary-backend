import { Sequelize, Dialect } from 'sequelize';
import { config } from '../configs';

export class Database {
  private static _instance: Database;
  private readonly dialect: Dialect = 'postgres';
  public db: Sequelize;

  private constructor(private readonly _config = config) {
    const { DB_NAME, DB_USER, DB_PASSWORD, HOST, DB_PORT } = this._config;

    this.db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: HOST,
      port: DB_PORT,
      dialect: this.dialect,
      query: { raw: true },
    });
  }

  public static get Instance(): Database {
    return this._instance || (this._instance = new this());
  }

  public init(): Promise<void> {
    return this.db.authenticate();
  }

  public migrate(opt?: object): Promise<Sequelize> {
    return this.db.sync(opt);
  }
}

const db = Database.Instance;
export default db;
