import { Router } from 'express';
import * as moviesController from '../controllers/movies.controller';

const router = Router();

router.get('/', moviesController.getAllMovies);
router.get('/by-year', moviesController.getMoviesByYear); // now using query param
router.get('/by-genre', moviesController.getMoviesByGenre); // now using query param
router.get('/:imdbId', moviesController.getMovieById);

export default router;
