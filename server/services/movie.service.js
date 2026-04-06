import MOVIE from "../models/movie.model";

// Create New Movie
const createMovie = async (data) => {
    try {
        const movie = await MOVIE.create(data);

        return {
            success: true,
            data: movie,
            message: "Successfully created the movie",
        };
    } catch (error) {
        const { name, errors } = error;
        if (name === "ValidationError") {
            let newError = {};

            Object.keys(errors).forEach(key => {
                newError[key] = errors[key].message;
            });

            return { error: newError, statusCode: 422 };
        } else {
            throw error;
        }
    }
}

// Deleting movie by ID
const deleteMovieByID = async (id) => {
    try {
        const result = await MOVIE.deleteOne({ _id: id });

        // If no movie found
        if (result.deletedCount === 0) {
            return {
                success: false,
                message: "Movie Not Found",
                error: result,
            }
        }

        return {
            success: true,
            message: "Successfully deleted the movie.",
            data: result,
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Fetch Movie Details By ID
const fetchMovieByID = async (id) => {
    const result = await MOVIE.findById(id);

    if (!result) {
        return {
            success: false,
            message: "Movie Not Found for the provided ID",
            error: result || {},
        };
    }

    return {
        success: true,
        message: "Successfully found the movie",
        data: result,
    };
}

// Completely Update the Existing Movie Details
const updateMovie = async (id, data) => {
    try {
        const movie = await MOVIE.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        return {
            success: true,
            data: movie,
            message: "Successfully updated the movie details",
        };
    } catch (error) {
        const { name, errors } = error;
        if (name === "ValidationError") {
            let newError = {};

            Object.keys(errors).forEach(key => {
                newError[key] = errors[key].message;
            });

            return { error: newError, statusCode: 422 };
        } else {
            throw error;
        }
    }
}

const fetchMovie = async (filter) => {
    const movies = await MOVIE.find(filter);

    if (!movies || !movies.length) {
        return {
            error: "Movie not found.",
            statusCode: 400,
        };
    }

    return movies;
}

export default {
    createMovie,
    deleteMovieByID,
    fetchMovieByID,
    updateMovie,
    fetchMovie
}
