import MOVIE from "../models/movie.model"
import responseBodyStructure from "../utils/responseBodyStructure";

export const validateMovieRequestBody = async (req, res, next) => {
    try {
        const doc = new MOVIE(req.body);
        await doc.validate();

        return next();
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errorList = Object.values(error.errors).map(e => ({
                field: e.path,
                message: e.message,
            }));

            return res.status(400).json(responseBodyStructure.errorBody(errorList, "Invalid request body"));
        }

        return next(error);
    }
}

export const validationNameQuery = async (req, res, next) => {
    try {
        const keys = Object.keys(req.query);

        // If no query, or only name query is present then next
        if (keys.length === 0 || (keys[0] === 'name' && keys.length === 1)) {
            return next();
        }

        return res.status(400).json(responseBodyStructure.errorBody({'name': `Required "name" query params or no query`}, "Invalid query parameters."));
    } catch (error) {
        return next(error);
    }
}
