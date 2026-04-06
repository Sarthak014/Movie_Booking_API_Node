// Services
import TheatreService from "../services/theatre.service";

// Utils
import responseBodyTemplate from "../utils/responseBodyTemplate";
import { validateObjectID } from "../utils/validateObjectID";

const createTheatre = async (req, res) => {
    try {
        const response = await TheatreService.createTheatre(req.body);

        if (response.error) {
            const { error, statusCode } = response;
            return res.status(statusCode).json(responseBodyTemplate.errorBody(error), response.message);
        }

        return res.status(201).json(responseBodyTemplate.successBody(response.data, response.message))
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json(responseBodyTemplate.errorBody(error, error.name || "Something went wrong."));
    }
}

const featchTheatres = async (req, res) => {
    try {
        const query = {};
        const queryKeys = Object.keys(req.query);

        queryKeys.forEach(key => {
            query[key.toLowerCase()] = req.query[key];
        });

        const response = await TheatreService.fetchTheatres(query);

        if (response.error) {
            return res.status(response.statusCode).json(responseBodyTemplate.errorBody(response.error));
        }

        return res.status(200).json(responseBodyTemplate.successBody(response));
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json(responseBodyTemplate.errorBody(error));
    }
}

const fetchTheatreByID = async (req, res) => {
    try {
        const theatreID = req.params.id;

        if (!validateObjectID(theatreID)) {
            return res.status(400).json(responseBodyTemplate.errorBody({}, "Invalid Movie ID"));
        }

        const response = await TheatreService.fetchTheatreByID(theatreID);

        if (response.error) {
            return res.status(404).json(responseBodyTemplate.errorBody({}, response.error));
        }

        return res.status(200).json(responseBodyTemplate.successBody(response.data));
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json(responseBodyTemplate.errorBody(error));
    }
}

const deleteTheatreByID = async (req, res) => {
    try {
        if (!validateObjectID(req.params.id)) {
            return res.status(400).json({
                success: false,
                error: {},
                data: {},
                message: "Invalid Movie ID"
            });
        }

        const { success, message, ...resData} = await TheatreService.deleteTheatreByID(req.params.id);
        const isSuccess = Boolean(success);
        const statusCode = isSuccess ? 200 : 404;
        const response = isSuccess ? responseBodyTemplate.successBody(resData, message) : responseBodyTemplate.errorBody(resData, message);
        
        return res.status(statusCode).json(response);
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json(responseBodyTemplate.errorBody(error));
    }
}

const updateTheatreByID = async (req, res) => {
    try {
        if (!validateObjectID(req.params.id)) {
            return res.status(400).json({
                success: false,
                error: {},
                data: {},
                message: "Invalid Movie ID"
            });
        }

        const response = await TheatreService.updateTheatreDetails(req.params.id, req.body);

        if (response.error) {
            const { error, statusCode } = response;
            return res.status(statusCode).json(responseBodyTemplate.errorBody(error));
        }
        
        return res.status(201).json(responseBodyTemplate.successBody(response.data, response.message));
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json(responseBodyTemplate.errorBody(error, error.name || "Something went wrong while updating the movie details."));
    }
}

export default {
    createTheatre,
    featchTheatres,
    fetchTheatreByID,
    deleteTheatreByID,
    updateTheatreByID
};
