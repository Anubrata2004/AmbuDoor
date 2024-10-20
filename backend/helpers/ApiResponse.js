// helpers/ApiResponse.js
function ApiResponse(success, message, data = null) {
    return { success, message, data };
}

module.exports = ApiResponse;
