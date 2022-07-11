var DataTypes = require("sequelize").DataTypes;
var _booking = require("./booking");
var _cinema = require("./cinema");
var _cinema_movie = require("./cinema_movie");
var _movie = require("./movie");
var _seat = require("./seat");
var _showtime = require("./showtime");
var _users = require("./users");

function initModels(sequelize) {
  var booking = _booking(sequelize, DataTypes);
  var cinema = _cinema(sequelize, DataTypes);
  var cinema_movie = _cinema_movie(sequelize, DataTypes);
  var movie = _movie(sequelize, DataTypes);
  var seat = _seat(sequelize, DataTypes);
  var showtime = _showtime(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  cinema.belongsToMany(movie, { as: 'movie_id_movies', through: cinema_movie, foreignKey: "cinema_id", otherKey: "movie_id" });
  movie.belongsToMany(cinema, { as: 'cinema_id_cinemas', through: cinema_movie, foreignKey: "movie_id", otherKey: "cinema_id" });
  cinema_movie.belongsTo(cinema, { as: "cinema", foreignKey: "cinema_id"});
  cinema.hasMany(cinema_movie, { as: "cinema_movies", foreignKey: "cinema_id"});
  showtime.belongsTo(cinema, { as: "cinema", foreignKey: "cinema_id"});
  cinema.hasMany(showtime, { as: "showtimes", foreignKey: "cinema_id"});
  cinema_movie.belongsTo(movie, { as: "movie", foreignKey: "movie_id"});
  movie.hasMany(cinema_movie, { as: "cinema_movies", foreignKey: "movie_id"});
  seat.belongsTo(showtime, { as: "showtime", foreignKey: "showtime_id"});
  showtime.hasMany(seat, { as: "seats", foreignKey: "showtime_id"});
  booking.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(booking, { as: "bookings", foreignKey: "user_id"});

  return {
    booking,
    cinema,
    cinema_movie,
    movie,
    seat,
    showtime,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
