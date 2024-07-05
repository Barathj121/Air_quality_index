const AqiController = require('../modules/aqi/controller/aqi.controller');

module.exports = async (app) => {
    app.get('/api/test', (req, res) => {
        res.send('Vanakkam 🙏🏽 Backend Server is up and running 🚀')
    });
    app.get('/api/aqi', AqiController.getData);
    app.get('/api/aqi/latest', AqiController.getLatestRecord);
    app.get('/api/aqi/week-hour-avg', AqiController.getLast1WeekData_byHourAvg);
    app.get('/api/aqi/week-hour', AqiController.getLast1WeekData_byHour);
};

