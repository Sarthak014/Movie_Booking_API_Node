import THEATRE from "../models/theatre.model";

// Create New Theatre
const createTheatre = async (data) => {
    try {
        const theatre = await THEATRE.create(data);

        if (!theatre) {
            return {
                error: theatre,
                statusCode: 400,
                message: "Not able to create the theatre",
            }
        }

        return {
            success: true,
            data: theatre,
            message: "Successfully created the theatre",
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

// Fetch All list of Theatres
const fetchTheatres = async (filters = {}) => {
    try {
        const theatres = await THEATRE.find(filters);

        if (!theatres || !theatres.length) {
            return {
                error: "Theatres Not Found",
                statusCode: 400,
            }
        }

        return theatres;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Fetch Theatre via Theatre_ID
const fetchTheatreByID = async (id) => {
    try {
        const result = await THEATRE.findById(id);

        if (!result) {
            return {
                success: false,
                error: result || "Theatre not found for the provided Theatre ID."
            }
        }

        return {
            success: true,
            data: result,
        }
    } catch (error) {
        console.log("Service, Error: ", error);
        throw error;
    }
}

// Delete Theatre details via Theatre_ID
const deleteTheatreByID = async (id) => {
    try {
        const result = await THEATRE.findByIdAndDelete(id);

        // If no movie found
        if (!result) {
            return {
                success: false,
                message: "Theatre Not Found",
                error: result,
            }
        }

        return {
            success: true,
            message: "Successfully deleted the Theatre details.",
            data: result,
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Update Partial or Complete Theatre Details
const updateTheatreDetails = async (id, data) => {
    try {
        const updatedTheatre = await THEATRE.findByIdAndUpdate(id, data, { new: true, runValidators: true });

        return {
            success: true,
            data: updatedTheatre,
            message: "Successfully updated the theatre details",
        }
    } catch (error) {
        console.log("Error: ", error);
        const { name, errors } = error;
        if (name === "ValidationError") {
            let errorObj = {};

            Object.keys(errors).forEach(key => {
                errorObj[key] = errors[key].message;
            })

            return { error: errorObj, statusCode: 422 };
        } else {
            throw error;
        }
    }
}

export default {
    createTheatre,
    fetchTheatres,
    fetchTheatreByID,
    deleteTheatreByID,
    updateTheatreDetails
};
