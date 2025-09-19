import { DataTypes } from "sequelize";
import sequelize from '../database/index.js';
import Poll from "./Poll.js";

const Option = sequelize.define('Option', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'options'
});

Option.belongsTo(Poll, { foreignKey: 'pollId' });
Poll.hasMany(Option, { foreignKey: 'pollId' });

export default Option;
