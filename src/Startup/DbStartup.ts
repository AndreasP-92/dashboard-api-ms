import { Sequelize } from 'sequelize';
import UserModel from '../Models/DatabaseModels/UserModel.js';
import LogModel from '../Models/DatabaseModels/LogModel.js';

async function synchronizeDatabase() {
  try {  

    const isDev = process.env.NODE_ENV === 'dev'

    // Sync the database
    await UserModel.sync({ alter: true });
    await LogModel.sync({ alter: true }); 
    
    console.log('Database synchronization complete.');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

export default {
  synchronizeDatabase
}

// Call the function to synchronize the database
