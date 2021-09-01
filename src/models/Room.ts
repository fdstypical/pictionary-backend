import {
  Model,
  DataTypes,
  Optional,
  // HasManyGetAssociationsMixin,
  // HasManyAddAssociationMixin,
  // HasManyHasAssociationMixin,
  // HasManyCountAssociationsMixin,
} from 'sequelize';

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

  // public getUsers: HasManyGetAssociationsMixin<User>;
  // public addUser: HasManyAddAssociationMixin<User, number>;
  // public hasUser: HasManyHasAssociationMixin<User, number>;
  // public countUsers: HasManyCountAssociationsMixin;

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
