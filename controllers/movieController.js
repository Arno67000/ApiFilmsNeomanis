const Movie = require('../models/movieModel');

//@desc Get a list of all movies
//@route GET/api/movies 
async function getMovieList(req, res) {
    try {
        const movies = await Movie.findAllMovies(); 

        if(movies.length > 0) {
            res.status(200).json(movies);

        } else {
            res.status(500).json({error: 'DATABASE CONNECTION LOST'});
        }; 

    } catch (error) {
        res.status(400).json({ message: error });
    };
};

//@desc Get a list with the top 100 rented movies of all time OR by a specific year
//@ routes  GET/api/movies/top100 AND GET/api/movies/top100/:year
async function getTopRentedList(req, res) {
    try {
        let movies; 
        if(req.params.year && parseInt(req.params.year) > 2010 && parseInt(req.params.year) < 2021) {
            const year = parseInt(req.params.year);
            movies = await Movie.findTop100(year);

        } else if(req.params.year) {
            throw ('Year was not found ! Please enter a year between 2011 and 2020');

        } else {
            movies = await Movie.findTop100();
        };

        if(movies) {
            res.status(200).json(movies); 

        } else {
            res.status(500).json({error: 'DATABASE ERROR'});

        };    

    } catch (error) {
        res.status(404).json({ message: error });
    };
};

//@desc Get the top rented movie of all time OR by a specific year
//@ routes  GET/api/movies/toprented AND GET/api/movies/toprented/:year
async function getTopRented(req, res) {
    try {
        let movies; 
        if(req.params.year && parseInt(req.params.year) > 2010 && parseInt(req.params.year) < 2021) {
            const year = parseInt(req.params.year);
            movies = await Movie.findTopRented(year);

        } else if(req.params.year) {
            throw ('Year was not found ! Please enter a year between 2011 and 2020');

        } else {
            movies = await Movie.findTopRented();
        };

        if(movies) {
            res.status(200).json(movies); 

        } else {
            res.status(500).json({error: 'DATABASE ERROR'});

        };    

    } catch (error) {
        res.status(404).json({ message: error });
    };
};


//@desc Get the author of the top rented movie of all time OR by a specific year
//@ routes  GET/api/movies/topauthor AND GET/api/movies/topauthor/:year
async function getAuthor(req,res) {
    try {
        let movie; 
        if(req.params.year && parseInt(req.params.year) > 2010 && parseInt(req.params.year) < 2021) {
            const year = parseInt(req.params.year);
            movie = await Movie.findTopRented(year);

        } else if(req.params.year) {
            throw ('Year was not found ! Please enter a year between 2011 and 2020');

        } else {
            movie = await Movie.findTopRented();
        };

        if(movie) {
            res.status(200).json({ 'Top Author' : movie[0].author }); 

        } else {
            res.status(500).json({error: 'DATABASE ERROR'});

        };    

    } catch (error) {
        res.status(404).json({ message: error });
    };
};

//@desc Get a list with the movies by entering the 4 first letters
//@ routes  GET/api/movies/:4_First_Letters
async function getMoviesByFirstLetters(req,res) {
    try {
        if(req.params.partialTitle && req.params.partialTitle.length > 0 && req.params.partialTitle.length < 5) {
            let letters = req.params.partialTitle.toUpperCase();
            console.log('Searching for : '+letters);
            const movies = await Movie.findMoviesByFirstLetters(letters); 

            if(movies) {
                res.status(200).json(movies);

            } else {
                res.status(404).json({ message: `No matching movie for the letters selected : ${letters}` });
            };            

        } else {
            res.status(404).json({ message: 'NOT FOUND !'});
        };
        
    } catch (error) {
        res.status(404).json({ message: error });
    };
};


//@desc Add a new movie into database (must provide JSON with {title: , author:, year: })
//@route   POST/api/movies
async function postNewMovie(req,res) {
    try {
        if(req.body.title && req.body.year && req.body.author) {

             let newMovieObj = {
                ... req.body,
                rented : req.body.rented? req.body.rented : 0,
                editor : req.body.editor? req.body.editor : '-',
                indices : req.body.indices? req.body.indices : req.body.title.substr(0,4).toUpperCase(),
                bib : req.body.bib? req.body.bib : 'CABANIS',
                rating : req.body.rating? req.body.rating : '-',
                cat_1 : req.body.cat_1? req.body.cat_1 : '-',
                cat_2 : req.body.cat_2? req.body.cat_2 : 'DVDFIC'
             };   

            let array = [newMovieObj.year,newMovieObj.rented,newMovieObj.title,newMovieObj.author,newMovieObj.editor,newMovieObj.indices,newMovieObj.bib,newMovieObj.rating,newMovieObj.cat_1,newMovieObj.cat_2];
            const newMovie = await Movie.postMovie(array); 

            if(newMovie) {
                res.status(201).json({ newMovie , newMovieObj }); 
    
            } else {
                res.status(500).json({error: 'DATABASE ERROR'});
    
            }; 

        } else {
            res.status(404).json({ message: 'Sorry but you need to specify at least the title, author and year to add a movie.'});

        };
    } catch (error) {
        res.status(400).json({ message: error });
    };
};

module.exports = {
    getMovieList,
    getTopRentedList,
    getTopRented,
    getAuthor,
    getMoviesByFirstLetters,
    postNewMovie
}