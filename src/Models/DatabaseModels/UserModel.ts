import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection  from '../../config/DbConfig.js'
import UserInserface from '.././Interface/UserInterface.js';

class UserModel extends Model<UserInserface> { 
  public Id!: number;
  public Email!: string;
  public Password!: string;
  public Firstname!: string;
  public Lastname!: string;
  public IsActive!: boolean;
}

UserModel.init({
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Email: {
        type: DataTypes.STRING,
      },
      Password: {
        type: DataTypes.STRING,
      },
      Firstname: {
        type: DataTypes.STRING,
      },
      Lastname: {
        type: DataTypes.STRING,
      },
      IsActive: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize: sequelizeConnection,
      tableName: 'Users',
      freezeTableName: true,
    }
)

export default UserModel;