import {
  Model,
  DataTypes,
  Optional,
  Association,
  BelongsToGetAssociationMixin,
  BelongsToManyAddAssociationMixin,
} from 'sequelize';

import { Room } from './index';
import db from '../../db';

export interface UserAttrs {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface UserCreationAttrs extends Optional<UserAttrs, 'id'> {}

class User extends Model<UserAttrs, UserCreationAttrs> implements UserAttrs {
  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  public getRoom: BelongsToGetAssociationMixin<Room>;
  public setRoom: BelongsToManyAddAssociationMixin<Room, number>;

  public static associations: {
    room: Association<User, Room>;
  };

  public static init() {
    return super.init.call(
      this,
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'users',
        sequelize: db.db,
      },
    );
  }
}

export default User;
