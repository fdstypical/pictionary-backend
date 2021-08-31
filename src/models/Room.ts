import {
  Model,
  DataTypes,
  Optional,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
} from 'sequelize';
import db from '../../db';

import User from './User';

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

  public getUsers: HasManyGetAssociationsMixin<User>;
  public addUser: HasManyAddAssociationMixin<User, number>;
  public hasUser: HasManyHasAssociationMixin<User, number>;
  public countUsers: HasManyCountAssociationsMixin;
}

Room.init(
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
Room.hasMany(User);

export default Room;
