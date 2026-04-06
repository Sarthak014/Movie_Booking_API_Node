import e from "express";

// Middlewares
import { ValidateTheatreRequestBody, ValidateTheatreQuery } from "../middlewares/theatre.middleware";

// Controllers
import TheatreController from "../controllers/theatre.controller";

const router = e.Router();

router.post('/create', ValidateTheatreRequestBody, TheatreController.createTheatre);

router.get('/:id', TheatreController.fetchTheatreByID);

router.get('/', ValidateTheatreQuery, TheatreController.featchTheatres);

router.put('/:id', TheatreController.updateTheatreByID);

router.patch('/:id', TheatreController.updateTheatreByID);

router.delete('/:id', TheatreController.deleteTheatreByID);

export default router;
