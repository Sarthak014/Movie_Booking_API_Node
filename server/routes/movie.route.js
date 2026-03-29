import e from "express";
import MovieController from '../controllers/movie.controller.js';
import { validateMovieRequestBody, validationNameQuery } from "../middlewares/movie.middleware.js";

const router = e.Router();

router.post('/create', validateMovieRequestBody, MovieController.createMovie);

router.delete('/:id', MovieController.deleteMovieByID);

router.get('/:id', MovieController.fetchMovieByID);

router.put('/:id', MovieController.updateMovieByID);

router.patch('/:id', MovieController.updateMovieByID);

router.get('/', validationNameQuery, MovieController.fetchAllMovies);

export default router;
