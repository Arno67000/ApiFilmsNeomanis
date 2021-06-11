const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController');

router.post('/', movieController.postNewMovie);

router.get('/', movieController.getMovieList);
router.get('/top100', movieController.getTopRentedList);
router.get('/top100/:year', movieController.getTopRentedList);
router.get('/toprented', movieController.getTopRented);
router.get('/toprented/:year', movieController.getTopRented);
router.get('/topauthor', movieController.getAuthor);
router.get('/topauthor/:year', movieController.getAuthor);
router.get('/:partialTitle', movieController.getMoviesByFirstLetters);

module.exports = router;