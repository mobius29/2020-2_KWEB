const app = require("../app");

// GET /
const indexPage = async (req, res, next) => {
    try {
        res.render('index.pug');
    } catch (err) {
        next(err);
    }
};

const latestArticles = async (req, res, next) => {
    try {
        res.redirect('/articles');
    } catch(err){
        next(err);
    }
};

const listArticles = async (req, res, next) => {
    try {

    } catch(err){
        next(err);
    }
};

module.exports = {
    indexPage,
    latestArticles,
    listArticles,
};