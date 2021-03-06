const database = require('../services/database.js');

const baseQuery =
    `select  DATABASE_NAME "database_name",
    APPLICATION_NAME "application_name",
    ENVIRONMENT "environment",
    HOST_NAME "host_name",
    DATABASE_ROLE "database_role",
    DC_LOCATION "dc_location"
  from DBA_REPORTS.MV_PRD_APEX_SUMMARY_REP`;

async function find(context) {
    let query = baseQuery;
    const binds = {};

    if (context.searchKey) {
        binds.SEARCHVALUE = context.searchValue;
        query += `\nwhere ${context.searchKey.toUpperCase()} = :SEARCHVALUE`;
    }

    const result = await database.simpleExecute(query, binds);

    return result. rows;
}

module.exports.find = find;