import { Model, DataTypes, Optional } from 'sequelize';
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
}

User.init(
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

export default User;
