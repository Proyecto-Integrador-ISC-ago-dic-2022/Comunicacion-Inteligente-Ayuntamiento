import { config } from './model.mjs';
import { Sequelize, Model, DataTypes, QueryTypes} from 'sequelize';


const sequelize = new Sequelize(config.database, config.username, '', {
    host: config.host,
    dialect: config.dialect
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
/*const interacciones = 
const inter = await interacciones.findAll();
console.log(inter.every(inter => inter instanceof interacciones));
console.log("All:", JSON.stringify(inter, null, 2));*/

const results = await sequelize.query("SELECT * FROM interacciones;", {type: QueryTypes.SELECT});
console.log(results)

