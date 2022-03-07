const yargs = require('yargs');
const { sequelize } = require('./db/connection');
const { addMovie, listMovies, updateMovie, removeMovie } = require('./functions/movieFunctions');
const { addActor, linkMovieAndActor, listActors, updateActor, removeActor } = require('./functions/actorFunctions');

const app = async (yargsObj) => {
    try {

        // Sync will open a connection create any models that do not already exist...
        await sequelize.sync();

        // Adding table entries...
        if (yargsObj.add) {
            // If both movie and actor provided on command line...
            // ... try adding both to their respective tables...
            // ... and create the link between the two in the Credits table
            if (yargsObj.title && yargsObj.actor) {
                await addActor( {actorName: yargsObj.actor} );
                await addMovie( {title: yargsObj.title} );
                await linkMovieAndActor( yargsObj.title, yargsObj.actor );
                console.log(`${yargsObj.actor} is now credited as an actor in ${yargsObj.title}.`)
            } 
            // If only actor provided, add to Actors table
            else if (yargsObj.actor) {
                await addActor({ actorName: yargsObj.actor });
                console.log(`${yargsObj.actor} has been added to the actors table.`)
            }
            // If only movie provided, add to Movies table 
            else if (yargsObj.title) {
                await addMovie({ title: yargsObj.title });
                console.log(`${yargsObj.title} has been added to the movies table.`)
            }
            // console.log(JSON.stringify(await listMovies(), null, 2))
        } 

        // Listing out entries...
        else if (yargsObj.list) {

            // If a title, and a getActors prompt are given...
            // ...search all actors, and filter by movie title
            if (yargsObj.title && yargsObj.getActors) {
                console.log(`Fetching all actors from ${yargsObj.title}...`);
                console.log(await listActors(yargsObj.title));
            }
            // If only getActors prompt given, list all actors in db
            else if (yargsObj.getActors) {
                console.log("Fetching all actors from database...");
                console.log(JSON.stringify(await listActors(),null,5));
            }

            // If an actor, and a getMovies prompt are given...
            // ...search all movies, and filter by actor
            else if (yargsObj.actor && yargsObj.getMovies) {
                console.log(`Fetching all movies starring ${yargsObj.actor}...`);
                console.log(await listMovies(yargsObj.actor));
            }
            // If only getMovies prompt given, list all movies in db
            else if (yargsObj.getMovies) {
                console.log("Fetching all movies from database...");
                console.log(JSON.stringify(await listMovies(),null,5));
            }
            // If only a list prompt is given, ask user to specify 'what?'
            else {
                console.log("What do you want to list? Try adding: --getActors or --getMovie...")
            }
        
        // Change existing entries...
        } else if (yargsObj.update) {
            if (yargsObj.actor) {
                await updateActor(yargsObj);
                console.log(`SUCCESS: ${yargsObj.actor} has been updated to ${yargsObj.new}`);
            }

            else if (yargsObj.title) {
                await updateMovie(yargsObj);
                console.log(`SUCCESS: ${yargsObj.title} has been updated to ${yargsObj.new}`);
            }
        } 
        
        // Remove an existing entry...
        else if (yargsObj.remove) {
            if (yargsObj.actor) {
                await removeActor(yargsObj.actor);
                console.log('\n=========================')
                console.log(`SUCCESS: ${yargsObj.actor} has been removed.`)
            }
            else if (yargsObj.title) {
                await removeMovie(yargsObj.title);
                console.log('\n=========================')
                console.log(`SUCCESS: ${yargsObj.title} has been removed.`)
            }
        
        } else {
            console.log("Invalid Command!")
        }

        // ...now we close our connection to the db!
        await sequelize.close();
    } catch (error) {
        console.log(error);
    }
};

app(yargs.argv);