const db = require('../../../helpers/database');

class ForecastRepository {
    constructor(){
        this.tableName = "forecast";
    }

    async getAllData(){
        const params = {
            TableName: this.tableName
        };
        return await db.scan(params).promise();
    }
}

module.exports = new ForecastRepository();