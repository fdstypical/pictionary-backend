import {
  Model,
  DataTypes,
  Optional,
  Association,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize';

import { User } from './index';
import db from '../../db';

export interface RoomAttrs {
  id: number;
  name: string;
}

export interface RoomCreationAttrs extends Optional<RoomAttrs, 'id'> {}

class Room extends Model<RoomAttrs, RoomCreationAttrs> implements RoomAttrs {
  public id: number;
  public name: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  public createUser: HasManyCreateAssociationMixin<User>;
  public addUser: HasManyAddAssociationMixin<User, number>;
  public hasUser: HasManyHasAssociationMixin<User, number>;
  public getUsers: HasManyGetAssociationsMixin<User>;
  public countUsers: HasManyCountAssociationsMixin;

  public static associations: {
    users: Association<Room, User>;
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
      },
      {
        tableName: 'rooms',
        sequelize: db.db,
      },
    );
  }
}

export default Room;
