import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection  from '../../config/DbConfig.js'
import IUserRole from '.././Interface/UserRoleInterface.js';

class UserRoleModel extends Model<IUserRole> { 
  public Id!: number;
  public RoleName!: string;
}

UserRoleModel.init({
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      RoleName: {
        type: DataTypes.STRING,
      }
    },
    {
      sequelize: sequelizeConnection,
      tableName: 'UserRoles',
      freezeTableName: true,
    }
)

export default UserRoleModel;