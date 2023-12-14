import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection  from '../../config/DbConfig.js'
import ICompany from '.././Interface/ICompany.js';

class CompanyModel extends Model<ICompany> { 
  public Id!: number;
  public CompanyName!: string;
}

CompanyModel.init({
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      CompanyName: {
        type: DataTypes.STRING,
      }
    },
    {
      sequelize: sequelizeConnection,
      tableName: 'Companies',
      freezeTableName: true,
    }
)



export default CompanyModel;