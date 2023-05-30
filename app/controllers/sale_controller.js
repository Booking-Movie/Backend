
const { now } = require('moment');
const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
const models = initModels(sequelize)


const getAllSaleBookingDay = async (req, res) => {
    const data = new Date()
    console.log("🚀 ~ file: sale_controller.js ~ line 10 ~ getAllSale ~ data", data)
    try {
        const querySql = `#graphql
        # select count(*) as total_booking, sum(amount) as total_price from payment where date(timetamp) = CURDATE()
        select count(*) as total_booking, sum(p.amount) as total_price, c.name_cinema, m.name_movie, m.image_movie 
        from payment as p 
        join movie as m on p.movie_id = m.id
        join cinema as c on p.cinema_id = c.id where date(timetamp) = CURDATE() group by c.name_cinema;
        `;
        const [results] = await sequelize.query(querySql)
        if (results) {
            res.status(200).json(results);
        }
    } catch (err) {
        console.log(err)
    }
}

const searchSaleStartDateAndEndDate = async (req, res) => {
    const { start_date, end_date } = req.body
    const arrStart = start_date.split("-") || ''
    const arrEnd = end_date.split("-") || ''
    const moth = arrStart[arrStart.length - 2]
    const dayStart = arrStart[arrStart.length - 1]
    const dayEnd = arrEnd[arrEnd.length - 1]
    try {
        const querySql = `#graphql
        select count(*) as total_booking, sum(p.amount) as total_price, c.name_cinema, m.name_movie, m.image_movie from payment as p 
        join movie as m on p.movie_id = m.id
        join cinema as c on p.cinema_id = c.id WHERE MONTH(timetamp) = ${moth} 
        AND (DAY(timetamp) BETWEEN ${dayStart} AND ${dayEnd}) group by c.name_cinema
        `;
        const [results] = await sequelize.query(querySql)
        if (results) {
            res.status(200).json(results);
        }
    } catch (err) {
        console.log(err)
    }
}

const getAllSaleCinemaDay = async (req, res) => {
    const data = new Date()
    try {
        const querySql = `#graphql
        select sum(p.amount) as total_sale_cinema, c.name_cinema from cinema as c
        join payment as p on c.id = p.cinema_id where date(timetamp) = CURDATE() group by c.name_cinema order by total_sale_cinema desc;
        `;
        const [results] = await sequelize.query(querySql)
        if (results) {
            res.status(200).json(results);
        }
    } catch (err) {
        console.log(err)
    }
}

const getAllTopMovieBooking = async (req, res) => {
    try {
        const querySql = `#graphql
        select sum(p.amount) as total_sale_movie, m.name_movie,  m.image_movie from movie as m 
        join payment as p on m.id = p.movie_id where date(timetamp) = CURDATE() group 
        by m.name_movie order by total_sale_movie desc limit 10;
        `;
        const [results] = await sequelize.query(querySql)
        if (results) {
            res.status(200).json(results);
        }
    } catch (err) {
        console.log(err)
    }
}


const getAllSaleMovie = async (req, res) => {
    try {
        const querySql = `#graphql
        select count(*) as total_booking, sum(p.amount) as total_price, m.name_movie as name_cinema, m.image_movie from 
        payment as p 
        join movie as m on p.movie_id = m.id where date(timetamp) = CURDATE() group by m.name_movie limit 10;
        `;
        const [results] = await sequelize.query(querySql)
        if (results) {
            res.status(200).json(results);
        }
    } catch (err) {
        console.log(err)
    }
}

const searchSaleMovieStartDateAndEndDate = async (req, res) => {
    const { start_date, end_date } = req.body
    const arrStart = start_date.split("-") || ''
    const arrEnd = end_date.split("-") || ''
    const moth = arrStart[arrStart.length - 2]
    const dayStart = arrStart[arrStart.length - 1]
    const dayEnd = arrEnd[arrEnd.length - 1]
    try {
        const querySql = `#graphql
        select count(*) as total_booking, sum(p.amount) as total_price, m.name_movie as name_cinema, m.image_movie from 
        payment as p 
        join movie as m on p.movie_id = m.id WHERE MONTH(timetamp) = ${moth} 
        AND (DAY(timetamp) BETWEEN ${dayStart} AND ${dayEnd}) group by m.name_movie
        `;
        const [results] = await sequelize.query(querySql)
        if (results) {
            res.status(200).json(results);
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getAllSaleBookingDay,
    searchSaleStartDateAndEndDate,
    getAllSaleCinemaDay,
    getAllTopMovieBooking,
    getAllSaleMovie,
    searchSaleMovieStartDateAndEndDate
}