const db = require('../db/data.js');
async function get(req, res, next) {
    try {
        const context = {};
        let selectedItem,
            value;
        for (const key in req.params) {
            selectedItem = key;
            value = req.params[key];
        }

        context.searchKey = selectedItem;
        context.searchValue = value;

        const rows = await db.find(context);

        if (selectedItem) {
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