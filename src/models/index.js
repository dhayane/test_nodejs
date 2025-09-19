import Poll from './Poll.js';
import Option from './Option.js';
import Vote from './Vote.js';

Option.belongsTo(Poll, { foreignKey: 'pollId' });
Poll.hasMany(Option, { foreignKey: 'pollId' });

Vote.belongsTo(Option, { foreignKey: 'optionId' });
Option.hasMany(Vote, { foreignKey: 'optionId' });

export {
  Poll,
  Option,
  Vote
};
