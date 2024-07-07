const ForecastRepository = require('../repository/forecast.repository');
const Utils = require('../../../helpers/utils');
const CONSTANTS = require('../../../helpers/constants');

class ForecastService {

    async getAllData(){
        const data = await ForecastRepository.getAllData();
        if (data.Items)
            return data.Items.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        return data;
    }


    async getLast3DayData(){
        const data = await this.getAllData();
        const last3DayData = data.slice(0,CONSTANTS.COMMON.FORECAST_DATA_RANGE)
        if (last3DayData.length === 0){
            return last3DayData;
        }
        const date = Utils.getDate(last3DayData[last3DayData.length-1].timestamp);
        date.setTime(date.getTime() - (CONSTANTS.COMMON.DATA_DIFF_TIME_IN_MIN * 60 * 1000));
        const formattedDate = Utils.getFormattedDate(date);
        const toData = {
            predictedAt: formattedDate,
            data: last3DayData
        }
        return toData;
    } 
}

module.exports = new ForecastService();