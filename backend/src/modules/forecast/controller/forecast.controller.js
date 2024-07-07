const ForecastService = require('../service/forecast.service');
const CONSTANTS = require('../../../helpers/constants');

class ForecastController {
    async getForecastData(req, res){
        console.log(`🎈 GetForecastData API Invoked 🪄  at ${(new Date()).toUTCString()}`)
        const data = await ForecastService.getLast3DayData();
        let response = {
            message: "",
            data: {},
        };
        let status_code = CONSTANTS.STATUS_CODE.INTERNAL_SERVER_ERROR
        if (!data || data.length === 0){
            response.message = "No data found";
            status_code = CONSTANTS.STATUS_CODE.NOT_FOUND
        }
        else{
            response.message = "Recent forecast data fetched successfully";
            response.data = data;
            status_code = CONSTANTS.STATUS_CODE.SUCCESS
        }
        return res.status(status_code).send(response);
    }
}

module.exports = new ForecastController();