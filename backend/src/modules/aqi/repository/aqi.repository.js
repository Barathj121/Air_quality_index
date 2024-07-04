const db = require('../../../helpers/database');

class AqiRepository {
    constructor(){
        this.tableName = "AQI";
    }

    async getAllData(){
        const params = {
            TableName: this.tableName
        };
        return await db.scan(params).promise();
    }
}

module.exports = new AqiRepository();