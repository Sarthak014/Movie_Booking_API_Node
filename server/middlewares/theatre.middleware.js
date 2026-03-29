import THEATRE from "../models/theatre.model"
import responseBodyStructure from "../utils/responseBodyStructure";

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
            return res.status(400).json(responseBodyStructure.errorBody(errorList, "Invalid request body"));
        }

        return next(error);
    }
}