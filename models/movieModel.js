const { doQuery, doQueryParams, doPostQuery } = require('../handlers/queryHandlers');

async function findAllMovies() {
    let query = 'SELECT DISTINCT title, author FROM movies';
    let data = await doQuery(query);
    return data;
};

async function findTop100(year) {
    if(year) {
        let query = "SELECT year, title, author, SUM(rented) as rented FROM `movies` WHERE year = ? GROUP BY title ORDER BY rented DESC LIMIT 100"
        let data = await doQueryParams(query,[year]);
        return data;

    } else {
        let query = "SELECT title, author, SUM(rented) as rented FROM `movies` GROUP BY title ORDER BY rented DESC LIMIT 100";
        let data = await doQuery(query) 
        return data;
    };
};

async function findTopRented(year) {
    if(year) {
        let query = "SELECT year, title, author, SUM(rented) as rented FROM `movies` WHERE year = ? GROUP BY title ORDER BY rented DESC LIMIT 1"
        let data = await doQueryParams(query,[year]);
        return data;

    } else {
        let query = "SELECT title, author, SUM(rented) as rented FROM `movies` GROUP BY title ORDER BY rented DESC LIMIT 1";
        let data = await doQuery(query); 
        return data;
    };
};

async function findMoviesByFirstLetters(letters) {
    let query = "SELECT DISTINCT title, author, editor, indices FROM `movies` WHERE indices LIKE '%"+letters+"'";
    let data = await doQuery(query);
    return data;
};

async function postMovie(array) {   
    let query = "INSERT INTO movies VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)";
    let newMovie = await doPostQuery(query, array);
    return newMovie;
}

module.exports = {
    findAllMovies,
    findTopRented,
    findTop100,
    findMoviesByFirstLetters,
    postMovie
}
