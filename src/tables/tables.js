const { DataTypes } = require("sequelize");

const { sequelize } = require("../db/connection");

const Movie = sequelize.define('Movie', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

const Actor = sequelize.define('Actor', {
    actorName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
});

const Credit = sequelize.define('Credits', {
    creditsId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    timestamps: false
});


Actor.belongsToMany(Movie, {
    through: Credit
});

Movie.belongsToMany(Actor, {
    through: Credit
});


// THIS IS HOW YOU ADD THE KEYS TO THE CREDITS JUNCTION TABLE
// const x = async() => {
//     console.log("promised...");
//     let bill = await Actor.findOne({where: {actorName:"Bill Murray"}});
//     console.log(bill)
//     let lost = await Movie.findOne({ where: { title: "Lost In Translation" } });
//     console.log(lost)
    

//     lost.setActors(bill)
// }

// x();


module.exports = { Movie, Actor, Credit };