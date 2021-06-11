const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();

//CONNECTION TO MySQL DATABASE
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_BASE,
    flags: ['+LOCAL_FILES']
});

db.connect(function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('MySQL DATABASE connected !')
    };  
});

// CREATING A CLEAN TABLE
db.query('DROP TABLE IF EXISTS movies', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('Table droped !');
    };
});

db.query(`CREATE TABLE movies (
            year INT(4), 
            rented INT(20), 
            title VARCHAR(50), 
            author VARCHAR(50), 
            editor VARCHAR(50), 
            indices VARCHAR(50), 
            bib VARCHAR(50), 
            rating VARCHAR(50), 
            cat_1 VARCHAR(50), 
            cat_2 VARCHAR(50))`,function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('Table created !');
    };
});

//LOADING DATA FROM CSV FILE
db.query({
    sql:`LOAD DATA LOCAL INFILE 'top-500-most-rented-movies.csv' INTO TABLE movies 
            FIELDS TERMINATED BY ';' 
            ENCLOSED BY '"' 
            ESCAPED BY '"' 
            LINES TERMINATED BY '\n' 
            IGNORE 1 LINES`,
    infileStreamFactory: () => fs.createReadStream('./script/top-500-most-rented-movies.csv')
}, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('CSV Loaded !');
    };
});

//DELETING LINES BADLY FORMATTED
db.query('DELETE FROM movies WHERE editor="-" AND rating="CABANIS"', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('Bad fields deleted !');
    };
});

//LOADING WITH RIGHT PATTERN: ONLY THE LINES DELETED
db.query({
    sql:`LOAD DATA LOCAL INFILE 'top-500-most-rented-movies.csv' INTO TABLE movies 
            FIELDS TERMINATED BY ';' 
            ENCLOSED BY '"' 
            ESCAPED BY '"' 
            LINES TERMINATED BY '\n' 
            IGNORE 4001 LINES 
            (year,rented,title,author,cat_2,editor,indices,bib,rating,cat_1)`,
    infileStreamFactory: () => fs.createReadStream('./script/top-500-most-rented-movies.csv')
}, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('CSV-End Loaded !');
    };
});

//UPDATING FIELD cat_2 to 'DVDFIC'
db.query('UPDATE movies SET cat_2="DVDFIC" WHERE cat_2="-"', function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('cat_2 filled !');
    };
});

