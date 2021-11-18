const app = require("../app");

// GET /
const indexPage = async (req, res, next) => {
    try {
        res.render('index.pug');
    } catch (err) {
        next(err);
    }
};

module.exports = {
    indexPage
};