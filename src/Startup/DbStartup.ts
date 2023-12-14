import { Sequelize } from 'sequelize';
import UserRoleModel from '../Models/DatabaseModels/UserRoleModel.js';
import CompanyModel from '../Models/DatabaseModels/CompanyModel.js';
import UserModel from '../Models/DatabaseModels/UserModel.js';
import LogModel from '../Models/DatabaseModels/LogModel.js';

async function synchronizeDatabase() {
  try {  
    const isDev = process.env.NODE_ENV === 'dev'

    // Sync the database
    await UserRoleModel.sync({ alter: true });
    await CompanyModel.sync({ alter: true });
    await UserModel.sync({ alter: true });
    await LogModel.sync({ alter: true }); 

    // Create bulk data
    if(parseInt(process.env.DEV_SQL_CREATE_TEST_DATA) === 1){
      const roles = [
        { RoleName: 'Admin' },
        { RoleName: 'User' },
      ]

      await UserRoleModel.bulkCreate(roles);

      const companies = [
        { CompanyName: 'Company 1' },
        { CompanyName: 'Company 2' },
      ]

      await CompanyModel.bulkCreate(companies);

      const users = [
        { Firstname: 'John', Lastname: 'Doe', Email: 'john.doe@example.com', Password: 'password1', UserRoleId: 1, CompanyId: 1 },
        { Firstname: 'Jane', Lastname: 'Smith', Email: 'jane.smith@example.com', Password: 'password2', UserRoleId: 2, CompanyId: 2 },
      ];

      await UserModel.bulkCreate(users);
    }

    console.log('Database synchronization complete.');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}



export default {
  synchronizeDatabase
}
