const AqiController = require('../modules/aqi/controller/aqi.controller');

module.exports = async (app) => {
    app.get('/api/test', (req, res) => {
        res.send('Vanakkam 🙏🏽 Backend Server is up and running 🚀')
    });

    app.get('/api/aqi', AqiController.getAllData);
};

