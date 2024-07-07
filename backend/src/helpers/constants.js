const CONSTANTS={
    COMMON:{
        MAX_RECORDS: 10,
        FORECAST_DATA_RANGE: 12,
        DATA_DIFF_TIME_IN_MIN: 15,
    },
    STATUS_CODE:{
        INTERNAL_SERVER_ERROR: 500,
        NOT_FOUND: 404,
        BAD_REQUEST: 400,
        SUCCESS: 200,
        CHANGE_SUCCESS: 201,
        DELETE_SUCCESS: 204,
    }
};

module.exports = CONSTANTS;