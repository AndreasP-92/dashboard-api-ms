import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection  from '../../config/DbConfig.js'
import UserInserface from '.././Interface/UserInterface.js';
import CompanyModel from './CompanyModel.js';
import UserRoleModel from './UserRoleModel.js';

class UserModel extends Model<UserInserface> { 
  public Id!: number;
  public Email!: string;
  public Password!: string;
  public Firstname!: string;
  public Lastname!: string;
  public IsActive!: boolean;
  public UserRoleId!: Number;
  public CompanyId!: Number;
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
      UserRoleId: {
        type: DataTypes.INTEGER,
      },
      CompanyId: {
        type: DataTypes.INTEGER,
      }
    },
    {
      sequelize: sequelizeConnection,
      tableName: 'Users',
      freezeTableName: true,
    }
)

UserModel.belongsTo(CompanyModel, {foreignKey: 'CompanyId', targetKey: 'Id'});
UserModel.belongsTo(UserRoleModel, {foreignKey: 'UserRoleId', targetKey: 'Id'});

export default UserModel;