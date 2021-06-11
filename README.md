Test backend : Api NodeJs/Express/MySQL(mysql2/promise);

After creating a new database for the project, I ran `npm run setDB` to run the script file to neatly (ANAP!! :AsNeatlyAsPossible) insert the content of the csv file into a new table;

I provided a .env.example file for the env-variables.

Server runs on env.APP_PORT or 3000;

To connect to the API : 
`npm run dev` or `npm run start`.

@routes:

GET:
`/api/movies` => list of all the movies
`/api/movies/top100` => list of the 100 topRented movies of all time + add (`/:year`) a year to get the top100 for a specific year
`/api/movies/toprented` => THE most rented movie of all time + add (`/:year`) a year to get most rented movie for a specific year
`/api/movies/topauthor` => THE AUTHOR of the most rented movie of all time + add (`/:year`) a year to get the author of the year
`/api/movies/:4_First_Letters` => list the movies by entering the 4 first letters

POST:
`/api/movies` => Add a new movie into database (must provide JSON with at least {title: , author:, year: })

results in JSON.

Time to wrap the project as it is : ~ 4h30.