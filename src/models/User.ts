import { Model, DataTypes, Optional } from 'sequelize';
import db from '../../db';

export interface UserAttrs {
  id: number;
  name: string;
}

export interface UserCreationAttrs extends Optional<UserAttrs, 'id'> {}

class User extends Model<UserAttrs, UserCreationAttrs> implements UserAttrs {
  public id: number;
  public name: string;
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
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize: db.db,
  },
);

export default User;
