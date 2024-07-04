const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.serverPort || 3030;

const hireServer = async () => {
    app.use(bodyParser.json());
    require('./src/routes/api')(app);
    app.use((req, res) => {
        res.status(404).send('404: Page not found 🧐');
    });
    app.listen(port, () => {
        console.log(`🚀 Backend Server is serving at http://localhost:${port} 😋`);
    });

};

module.exports = { hireServer }