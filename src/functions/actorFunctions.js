// const { where } = require('sequelize/types');
const { sequelize } = require('../db/connection');
const { Actor } = require('../tables/tables');
const { Movie } = require('../tables/tables');

exports.addActor = async(obj) => {
    try {
        if (await Actor.findOne( {where: obj} )) {
            console.log('actor in db!')
            return;
        } else {
            await Actor.create(obj);
        }
    } catch (error) {
        console.error("add actor error", error);
    }
}

exports.linkMovieAndActor = async(movieTitle, actorName) => {
    try {
        let star = await Actor.findOne({ where: { actorName: actorName } });
        let film = await Movie.findOne({ where: { title: movieTitle } });

        await film.addActors(star)
    } catch (error) {
        console.error("linking error", error);
    }
}

exports.listActors = async(movieTitle=null) => {
    try {
        if (movieTitle == null) {
            return await Actor.findAll({
                attributes: ['actorName']
            });
        } else {
            let response = await sequelize.query(`SELECT actorName from Actors JOIN Credits ON Credits.ActorId = Actors.id JOIN Movies ON Movies.id = Credits.MovieId WHERE Movies.title = \'${movieTitle}\'`);
            return response[0];
        }  
    } catch (error) {
        console.error("fetch error", error);
    }
}

exports.updateActor = async(obj) => {
    try { 
        return await Actor.update( { actorName : obj.new}, {
            where: { actorName: obj.actor }
        })
    } catch (error) {
        console.error("update actor error", error);
    }
}

exports.removeActor = async(obj) => {
    try {
        await Actor.destroy({
            where: { actorName: obj }
        })
    } catch (error) {
        console.log(error);
    }
}