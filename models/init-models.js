var DataTypes = require("sequelize").DataTypes;
var _actor = require("./actor");
var _actor_movie = require("./actor_movie");
var _booking = require("./booking");
var _cinema = require("./cinema");
var _cinema_movie = require("./cinema_movie");
var _director = require("./director");
var _director_movie = require("./director_movie");
var _movie = require("./movie");
var _news = require("./news");
var _news_type = require("./news_type");
var _payment = require("./payment");
var _seat = require("./seat");
var _showtime = require("./showtime");
var _users = require("./users");

function initModels(sequelize) {
  var actor = _actor(sequelize, DataTypes);
  var actor_movie = _actor_movie(sequelize, DataTypes);
  var booking = _booking(sequelize, DataTypes);
  var cinema = _cinema(sequelize, DataTypes);
  var cinema_movie = _cinema_movie(sequelize, DataTypes);
  var director = _director(sequelize, DataTypes);
  var director_movie = _director_movie(sequelize, DataTypes);
  var movie = _movie(sequelize, DataTypes);
  var news = _news(sequelize, DataTypes);
  var news_type = _news_type(sequelize, DataTypes);
  var payment = _payment(sequelize, DataTypes);
  var seat = _seat(sequelize, DataTypes);
  var showtime = _showtime(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  actor.belongsToMany(movie, { as: 'movie_id_movies', through: actor_movie, foreignKey: "actor_id", otherKey: "movie_id" });
  director.belongsToMany(movie, { as: 'movie_id_movie_director_movies', through: director_movie, foreignKey: "director_id", otherKey: "movie_id" });
  movie.belongsToMany(actor, { as: 'actor_id_actors', through: actor_movie, foreignKey: "movie_id", otherKey: "actor_id" });
  movie.belongsToMany(director, { as: 'director_id_directors', through: director_movie, foreignKey: "movie_id", otherKey: "director_id" });
  actor_movie.belongsTo(actor, { as: "actor", foreignKey: "actor_id"});
  actor.hasMany(actor_movie, { as: "actor_movies", foreignKey: "actor_id"});
  booking.belongsTo(cinema, { as: "cinema", foreignKey: "cinema_id"});
  cinema.hasMany(booking, { as: "bookings", foreignKey: "cinema_id"});
  cinema_movie.belongsTo(cinema, { as: "cinema", foreignKey: "cinema_id"});
  cinema.hasMany(cinema_movie, { as: "cinema_movies", foreignKey: "cinema_id"});
  payment.belongsTo(cinema, { as: "cinema", foreignKey: "cinema_id"});
  cinema.hasMany(payment, { as: "payments", foreignKey: "cinema_id"});
  director_movie.belongsTo(director, { as: "director", foreignKey: "director_id"});
  director.hasMany(director_movie, { as: "director_movies", foreignKey: "director_id"});
  actor_movie.belongsTo(movie, { as: "movie", foreignKey: "movie_id"});
  movie.hasMany(actor_movie, { as: "actor_movies", foreignKey: "movie_id"});
  booking.belongsTo(movie, { as: "movie", foreignKey: "movie_id"});
  movie.hasMany(booking, { as: "bookings", foreignKey: "movie_id"});
  cinema_movie.belongsTo(movie, { as: "movie", foreignKey: "movie_id"});
  movie.hasMany(cinema_movie, { as: "cinema_movies", foreignKey: "movie_id"});
  director_movie.belongsTo(movie, { as: "movie", foreignKey: "movie_id"});
  movie.hasMany(director_movie, { as: "director_movies", foreignKey: "movie_id"});
  payment.belongsTo(movie, { as: "movie", foreignKey: "movie_id"});
  movie.hasMany(payment, { as: "payments", foreignKey: "movie_id"});
  news.belongsTo(news_type, { as: "type", foreignKey: "type_id"});
  news_type.hasMany(news, { as: "newss", foreignKey: "type_id"});
  booking.belongsTo(seat, { as: "seat", foreignKey: "seat_id"});
  seat.hasMany(booking, { as: "bookings", foreignKey: "seat_id"});
  booking.belongsTo(showtime, { as: "showtime", foreignKey: "showtime_id"});
  showtime.hasMany(booking, { as: "bookings", foreignKey: "showtime_id"});
  cinema_movie.belongsTo(showtime, { as: "showtime", foreignKey: "showtime_id"});
  showtime.hasMany(cinema_movie, { as: "cinema_movies", foreignKey: "showtime_id"});
  seat.belongsTo(showtime, { as: "showtime", foreignKey: "showtime_id"});
  showtime.hasMany(seat, { as: "seats", foreignKey: "showtime_id"});
  booking.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(booking, { as: "bookings", foreignKey: "user_id"});
  news.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(news, { as: "newss", foreignKey: "user_id"});
  payment.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(payment, { as: "payments", foreignKey: "user_id"});

  return {
    actor,
    actor_movie,
    booking,
    cinema,
    cinema_movie,
    director,
    director_movie,
    movie,
    news,
    news_type,
    payment,
    seat,
    showtime,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
