
# CLI App using MySQL and Sequelize

Simple CLI app allowing CRUD ops on a db.

## Basic commands

### Adding stuff...

Adding movies by title:

> node src/app.js --add --title="Fargo"

Adding actors by name:

> node src/app.js --add --actor="Steve Buscemi"

Creating a link between a movie and an actor:
Note: This will also create Movie and Actor entries if they do not already exist in the db.

> node src/app.js --add --actor="Steve Buscemi" --title="Fargo"

### Fetching stuff...

List all movies:

> node src/app.js --list --getMovies

List all movies featuring an Actor:

> node src/app.js --list --getMovies --actor="Bill Murray"

List all actors:

> node src/app.js --list --getActors

List all actors featured in a Movie:

> node src/app.js --list --getActors --title="Lost In Translation"

### Update an entry...

Replace the info in an entry without deleting it from the db.
Change Actor's name:

> node src/app.js --update --actor="Tom Hnaks" --new="Tom Hanks"

Change Movie title:

> node src/app.js --update --title="Apocalypse, Now" --new="Full Metal Jacket"

### Delete an entry...

Delete an Actor and their associated Credits:

> node src/app.js --remove --actor="John Goodman"

Delete a movie and all Credit associations:

> node src/app.js --remove --title="The Big Lebowski"