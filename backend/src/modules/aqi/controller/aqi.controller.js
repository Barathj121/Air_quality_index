const AqiService = require('../service/aqi.service');

class AqiController {
    
    async getAllData(req, res){
        const data = await AqiService.getAllData();
        res.json(data);
    }
}

module.exports = new AqiController();