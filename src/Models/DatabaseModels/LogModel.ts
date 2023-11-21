import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection  from '../../config/DbConfig.js'

interface MailAttributes {
  id: number;
  from: string;
  to: string;
  subject: string;
  body: string;
  body2: string;
  sent: boolean;
  date: Date;
}

class MailModel extends Model<MailAttributes> { 
  public id!: number;
  public from!: string;
  public to!: string;
  public subject!: string;
  public body!: string;
  public body2!: string;
  public sent!: boolean;
  public date!: Date;

}

MailModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      from: {
        type: DataTypes.STRING,
      },
      to: {
        type: DataTypes.STRING,
      },
      subject: {
        type: DataTypes.STRING,
      },
      body: {
        type: DataTypes.STRING,
      },
      body2: {
        type: DataTypes.STRING,
      },
      sent: {
        type: DataTypes.BOOLEAN,
      },
      date: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize: sequelizeConnection,
      tableName: 'Mails',
      freezeTableName: true,
    }
)

export default MailModel;