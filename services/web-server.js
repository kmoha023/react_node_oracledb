const http = require('http');
const express = require('express');
const webServerConfig = require('../shared/web-server.js');
const router = require('./router.js');
const morgan = require('morgan');
const database = require('./database.js');
const cors = require('cors');

let httpServer;

function initialize() {
    return new Promise((resolve, reject) => {
        const app = express();
        httpServer = http.createServer(app);

        /*Morgan middleware for logging */
        app.use(morgan('combined'));
        // cors
        app.use(cors());
        app.use('/api', router);

        // get db query
        app.get('/', async (req, res) => {
            const result = await database.simpleExecute('select * from DBA_REPORTS.MV_PRD_APEX_SUMMARY_REP');
                console.log("Result from DB...", result.rows);
            // result.forEach((row) => {

                // const  = result.rows[0].DATABASE_NAME;
                // const  = result.rows[0].APPLICATION_NAME;
                // const DUMMY = result.rows[0].ENVIRONMENT;
                // const DUMMY = result.rows[0].HOST_NAME;
                // const DUMMY = result.rows[0].DATABASE_ROLE;
                // const DUMMY = result.rows[0].DC_LOCATION;
                // const date = result.rows[0].SYSTIMESTAMP;

            res.end(`DB user: ${JSON.stringify(result.rows)}\n`);
            // });

        });

        app.get('/', (req, res) => {
            res.end('Hello World!');
        });

        httpServer.listen(webServerConfig.port)
            .on('listening', () => {
                console.log(`Web server listening on localhost:${webServerConfig.port}`);

                resolve();
            })
            .on('error', err => {
                reject(err);
            });
    });
}

function close() {
    return new Promise((resolve, reject) => {
        httpServer.close((err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        });
    });
}

module.exports.close = close;
module.exports.initialize = initialize;