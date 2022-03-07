const { Movie, Actor } = require('../tables/tables');
const {sequelize} = require('../db/connection')

exports.addMovie = async(movieObj) => {
    try {
        if (await Movie.findOne( {where: movieObj} )) {
            console.log("Movie in db!")
            return;
        } else {
            return await Movie.create(movieObj);
        }
    } catch (error) {
        console.error("add movie error", error);
    }
};

exports.listMovies = async(actorName) => {
    try {
        if (actorName == null) {
            return await Movie.findAll({
                attributes: ['title']
            });
        } else {
            let response = await sequelize.query(`SELECT title from Movies JOIN Credits ON Credits.MovieId = Movies.id JOIN Actors ON Actors.id = Credits.ActorId WHERE Actors.actorName = \'${actorName}\'`);
            if (response[0].length === 0) {
                return `No movies starring ${actorName}`
            } else {
                return response[0];
            }
        }
    } catch (error) {
        console.log(error);
    }
};

exports.updateMovie = async(filterObj) => {
    try {
        await Movie.update( { title : filterObj.new}, {
            where: { title: filterObj.title }
        })
        
        
    } catch (error) {
        console.log(error);
    }
};

exports.removeMovie = async(filterObj) => {
    try {
        await Movie.destroy({
            where: { title: filterObj }
        })
    } catch (error) {
        console.log(error);
    }
}