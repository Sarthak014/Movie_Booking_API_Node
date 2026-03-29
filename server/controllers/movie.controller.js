// Services
import MovieServices from "../services/movie.service.js";

// Utils
import { validateObjectID } from "../utils/validateObjectID.js";
import responseBodyStructure from "../utils/responseBodyStructure.js";

const createMovie = async (req, res) => {
    try {
        const response = await MovieServices.createMovie(req.body);

        if (response.error) {
            const { error, statusCode } = response;
            return res.status(statusCode).json(responseBodyStructure.errorBody(error));
        }

        return res.status(201).json(responseBodyStructure.successBody(response.data, response.message));
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json(responseBodyStructure.errorBody(error, error.name || "Something went wrong."));
    }
}

const deleteMovieByID = async (req, res) => {
    try {
        const movieId = req.params.id;

        if (!validateObjectID(movieId)) {
            return res.status(400).json({
                success: false,
                error: {},
                data: {},
                message: "Invalid Movie ID"
            });
        }

        const { success, message, ...resData} = await MovieServices.deleteMovieByID(movieId);
        const isSuccess = Boolean(success);
        const statusCode = isSuccess ? 200 : 404;
        const response = isSuccess ? responseBodyStructure.successBody(resData, message) : responseBodyStructure.errorBody(resData, message);

        return res.status(statusCode).json(response);
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json(responseBodyStructure.errorBody(error, error.name || "Something went wrong."));
    }
}

const fetchMovieByID = async (req, res) => {
    try {
        const movieID = req.params.id;

        if (!validateObjectID(movieID)) {
            return res.status(400).json({
                success: false,
                error: {},
                data: {},
                message: "Invalid Movie ID"
            });
        }

        const { success, message, ...resData} = await MovieServices.fetchMovieByID(movieID);
        const isSuccess = Boolean(success);
        const statusCode = isSuccess ? 200 : 404;
        const response = isSuccess ? responseBodyStructure.successBody(resData, message) : responseBodyStructure.errorBody(resData, message);

        return res.status(statusCode).json(response); 
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json(responseBodyStructure.errorBody(error, error.name || `Something went wrong while fetching movie - ${req.params.id}`));
    }
}

const updateMovieByID = async (req, res) => {
    try {
        const response = await MovieServices.updateMovie(req.params.id, req.body);

        if (response.error) {
            const { error, statusCode } = response;
            return res.status(statusCode).json(responseBodyStructure.errorBody(error));
        }

        return res.status(201).json(responseBodyStructure.successBody(response.data, response.message));
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json(responseBodyStructure.errorBody(error, error.name || "Something went wrong while updating the movie details."));
    }
}

const fetchAllMovies = async (req, res) => {
    try {
        const response = await MovieServices.fetchMovie({ 'name': req.query.name });

        if (response.error) {
            const { error, statusCode } = response;
            return res.status(statusCode).json(responseBodyStructure.errorBody(error));
        }

        return res.status(200).json(response);  
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json(responseBodyStructure.errorBody(error, error.name || "Something went wrong while fetching the movie details."));
    }
}

export default {
    createMovie,
    deleteMovieByID,
    fetchMovieByID,
    updateMovieByID,
    fetchAllMovies
};
