const Sequelize = require('sequelize');

//Sequelize
const sequelize = new Sequelize('postgres://postgres:pass@localhost:5432/codegig');

//Test DB
sequelize
    .authenticate()
    .then(()=>console.log('DB connected'))
    .catch((err)=> console.log(err));


module.exports = sequelize;
