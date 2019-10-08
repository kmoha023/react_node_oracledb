const db = require('../db/data.js');

async function get(req, res, next) {
    try {
        const context = {};

        context.host_name = req.params.host_name;

        const rows = await db.find(context);

        if (req.params.host_name) {
            if (rows.length > 0) {
                res.status(200).json(rows);
            } else {
                res.status(404).end();
            }
        } else {
            res.status(200).json(rows);
        }
    } catch (err) {
        next(err);
    }
}

module.exports.get = get;