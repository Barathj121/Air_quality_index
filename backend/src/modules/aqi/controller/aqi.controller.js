const AqiService = require('../service/aqi.service');
const CONSTANTS = require('../../../helpers/constants');
class AqiController {
    async getData(req, res){
        console.log("🎈 GetData API Invoked 🪄");
        const data = await AqiService.getAllData();
        const max_records = req.query.max || CONSTANTS.COMMON.MAX_RECORDS;
        let response = {
            message: "",
            data: [],
        };
        let status_code = CONSTANTS.STATUS_CODE.INTERNAL_SERVER_ERROR

        if (max_records < 1){
            response.message = "Invalid max records";
            status_code = CONSTANTS.STATUS_CODE.BAD_REQUEST
        }
        else{
            if (!data || data.length === 0){
                response.message = "No data found";
                status_code = CONSTANTS.STATUS_CODE.NOT_FOUND
            }
            else{
                response.message = "Recent "+max_records+" record(s) fetched successfully";
                response.data = data.slice(0, max_records);
                status_code = CONSTANTS.STATUS_CODE.SUCCESS
            }
        }
        return res.status(status_code).send(response);
    }

    async getLatestRecord(req, res){
        console.log("🎈 GetLatestRecord API Invoked 🪄");
        const data = await AqiService.getLatestRecord();
        let response = {
            message: "",
            data: {},
        };
        let status_code = CONSTANTS.STATUS_CODE.INTERNAL_SERVER_ERROR

        if (!data){
            response.message = "No data found";
            status_code = CONSTANTS.STATUS_CODE.NOT_FOUND
        }
        else{
            response.message = "Latest record fetched successfully";
            response.data = data;
            status_code = CONSTANTS.STATUS_CODE.SUCCESS
        }
        return res.status(status_code).send(response);
    }

    async getLast1WeekData_byHourAvg(req, res){
        console.log("🎈 GetLast1WeekData_byHourAvg API Invoked 🪄");
        return res.send("🚧 API Under Construction 🚧");
        const data = await AqiService.getLast1WeekData_byAvg();
        let response = {
            message: "",
            data: {},
        };
        let status_code = CONSTANTS.STATUS_CODE.INTERNAL_SERVER_ERROR

        if (!data){
            response.message = "No data found";
            status_code = CONSTANTS.STATUS_CODE.NOT_FOUND
        }
        else{
            response.message = "Last 1 week data segergated by hour and averaged fetched successfully";
            response.data = data;
            status_code = CONSTANTS.STATUS_CODE.SUCCESS
        }
        return res.status(status_code).send(response);
    }

    async getLast1WeekData_byHour(req, res){
        console.log("🎈 GetLast1WeekData_byHour API Invoked 🪄");
        const data = await AqiService.getLast1WeekData();
        let response = {
            message: "",
            data: {},
        };
        let status_code = CONSTANTS.STATUS_CODE.INTERNAL_SERVER_ERROR
        // if data is empty json object
        if (!data || Object.keys(data).length === 0){
            response.message = "No data found";
            status_code = CONSTANTS.STATUS_CODE.NOT_FOUND
        }
        else{
            response.message = "Last 1 week data segergated by hour fetched successfully";
            response.data = data;
            status_code = CONSTANTS.STATUS_CODE.SUCCESS
        }
        return res.status(status_code).send(response);
    }
}



module.exports = new AqiController();