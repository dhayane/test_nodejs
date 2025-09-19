import { DataTypes } from "sequelize";
import sequelize from "../database/index.js";
import Option from './Option.js';

const Vote = sequelize.define('Vote', {
  voterName: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'votes'
});

Vote.belongsTo(Option, { foreignKey: 'optionId' });
Option.hasMany(Vote, { foreignKey: 'optionId' });

export default Vote;
