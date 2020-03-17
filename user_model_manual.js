require('dotenv').config()

const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false
});

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER(10).UNSIGNED,
    primaryKey: true,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING(45)
  },
  last_name: {
    type: DataTypes.STRING(45)
  },
  email: {
    type: DataTypes.STRING(12),
    allowNull: false
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE(),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('administrator', 'contributor'),
    allowNull: false
  },
  active: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false,
  modelName: 'user'
});

User.findAll().then( (users) => { 
  users.forEach((user) => {
    console.log(user.get());
  })
    
  sequelize.close();
}, () => { 
  console.log("It does not work");
});
