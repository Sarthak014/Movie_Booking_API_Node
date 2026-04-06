// Models
import THEATRE from "../models/theatre.model"

// CONSTANTS
import { VALID_THEATRE_QUERY_KEYS } from "../constants/query.constant";

// UTILS
import responseBodyTemplate from "../utils/responseBodyTemplate";

export const ValidateTheatreRequestBody = async (req, res, next) => {
    try {
        const theatreBody = new THEATRE(req.body);
        await theatreBody.validate();

        return next();
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errorList = Object.values(error.errors).map(e => ({
                field: e.path,
                message: e.message,
            }));
            return res.status(400).json(responseBodyTemplate.errorBody(errorList, "Invalid request body"));
        }

        return res.status(500).json(responseBodyTemplate.errorBody(error));
    }
}

export const ValidateTheatreQuery = async (req, res, next) => {
    try {
        const queryKeys = Object.keys(req.query);

        if (queryKeys.length === 0) return next();

        const invalidKeys = queryKeys.filter(
            (key) => !VALID_THEATRE_QUERY_KEYS.includes(key)
        );;
        
        if (invalidKeys.length > 0) {
            return res.status(400).json(responseBodyTemplate.errorBody({
                message: `Invalid query parameter(s): ${invalidKeys.join(", ")}`
            }, "Invalid Query Parameters"));
        }

        return next();
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json(responseBodyTemplate.errorBody(error));
    }
}
