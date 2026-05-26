export const successResponse = (res, message, data = null, statusCode = 200) => {
    return res.status(statusCode).json({
        status: "success",
        message,
        data,
        timestamp: new Date().toISOString()
    });
};

export const errorResponse = (res, message, error = null, statusCode = 500) => {
    return res.status(statusCode).json({
        status: "error",
        message: message || "An unexpected error occurred",
        data: error ? (error.message || error) : null,
        timestamp: new Date().toISOString()
    });
};
