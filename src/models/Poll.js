import { DataTypes } from 'sequelize';
import sequelize from '../database/index.js';

const Poll = sequelize.define('Poll', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
}, {
  tableName: "polls"
});

export default Poll;
