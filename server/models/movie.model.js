import mongoose from "mongoose";

// Schema: Define the structure for movie resource
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
    },
    casts: {
        type: [String],
        required: true,
    },
    trailerURI: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
        default: "English",
    },
    releaseDate: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    releaseStatus: {
        type: String,
        required: true,
        default: "RELEASED",
    }
}, {timestamps: true});

const MOVIE = mongoose.model('MOVIE', movieSchema);

export default MOVIE;
