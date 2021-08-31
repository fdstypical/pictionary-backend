import User from './User';
import Room from './Room';

// initializations
User.init();
Room.init();

// associations
Room.hasMany(User);
// User.belongsTo(Room);

export { User, Room };
