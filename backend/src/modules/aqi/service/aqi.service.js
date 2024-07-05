const AqiRepository = require('../repository/aqi.repository');

class AqiService {
    
    async getAllData(){
        const data = await AqiRepository.getAllData();
        if (data.Items)
            return data.Items.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        return data;
    }

    async getLatestRecord(){
        const data = await this.getAllData();
        return data[0];
    }

    async getLast1DayData(){
        const data = await this.getAllData();
        const last1DayData = data.filter((record) => {
            const recordDate = new Date(record.timestamp);
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            return recordDate >= yesterday;
        });
        return last1DayData;
    }

    async getLast1WeekData(){
        const data = await this.getAllData();
        let last1WeekData = {
            // "day 1 timestamp" : {"1AM":all_12AM to 1AM values, "2AM":all_1AM to 2AM values, ...}
        };
        const today = new Date();
        for (let i = 1; i <= 7; i++){
            const day = new Date(today);
            day.setDate(day.getDate() - i);
            last1WeekData[day.toDateString()] = {};
        }
        data.forEach((record) => {
            const recordDate = new Date(record.timestamp);
            if (recordDate >= new Date(today).setDate(today.getDate() - 7)){
                const day = recordDate.toDateString();
                const hour = recordDate.getHours();
                if (last1WeekData[day][hour]){
                    last1WeekData[day][hour].push(record);
                }
                else{
                    last1WeekData[day][hour] = [record];
                }
            }
        });
        for (let day in last1WeekData){
            if (Object.keys(last1WeekData[day]).length === 0){
                delete last1WeekData[day];
            }
        }
        return last1WeekData;
    }

    async getLast1WeekData_byAvg()
    {
        const last1WeekData = await this.getLast1WeekData();
        let last1WeekData_byAvg = {};
        // for (let day in last1WeekData){
        //     last1WeekData_byAvg[day] = {};
        //     for (let hour in last1WeekData[day]){
        //         let avg_record ={
        //                 SR: 0,
        //                 'PM2.5': 0,
        //                 timestamp: '2021-06-01T00:00:00.000Z',
        //                 Pressure: 0,
        //                 CO: 0,
        //                 WD: 0,
        //                 PM10: 0,
        //                 NO2: 0,
        //                 SNo: 0,
        //                 SO2: 0,
        //                 AQI: 0,
        //                 Temperature: 0,
        //                 Ozone: 0,
        //                 cause: 0,
        //                 Humidity: 0,
        //                 WS: 0,
        //         };
        //     }
        // }
        return last1WeekData_byAvg;
    }
}

module.exports = new AqiService();