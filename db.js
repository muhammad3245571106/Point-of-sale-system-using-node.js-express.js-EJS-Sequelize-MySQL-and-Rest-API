const Sequelize = require("sequelize")
const sequelize = new Sequelize(
    'PointOfSaleSystem',
    'root',
    '',
     {
       host: 'localhost',
       dialect: 'mysql'
     }
   );
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db
