const AqiRepository = require('../repository/aqi.repository');

class AqiService {
    
    async getAllData(){
        const data = await AqiRepository.getAllData();
        if (data.Items)
            return data.Items;
        return data;
    }
}

module.exports = new AqiService();