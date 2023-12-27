import { DataTypes, Model } from 'sequelize';
import sequelizeConnection  from '../../config/DbConfig.js'
import ILog from '.././Interface/ILog.js';

class LogModel extends Model<ILog> { 
    public id!: number;
    public shortMessage!: string;
    public fullMessage!: string;
}

LogModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        shortMessage: {
            type: DataTypes.STRING
        },
        fullMessage: {
            type: DataTypes.STRING
        }
    }, 
    {
        sequelize: sequelizeConnection,
        tableName: 'Logs',
        freezeTableName: true,
    }
 
)

export default LogModel;
