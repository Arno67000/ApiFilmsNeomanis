const express = require('express');

const movieRouter = require('./routes/movieRouter')

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
    next();
});

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api/movies', movieRouter);


module.exports = app;