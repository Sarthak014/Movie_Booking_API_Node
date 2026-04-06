const errorBody = (error = {}, message) => ({
    error,
    body: {},
    message: message || "Something went wrong, cannot process the request.",
    success: false,
});

const successBody = (body = {}, message) => ({
    error: {},
    body,
    message: message || "Successfully processed the request",
    success: true,
});

export default { errorBody, successBody };
