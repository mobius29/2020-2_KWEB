const database = require('../lib/database');

// GET /
const indexPage = async (req, res, next) => {
    try {
        user = req.session.user;
        res.render('index.pug', { user } );
    } catch (err) {
        next(err);
    }
};

const latestArticles = async (req, res, next) => {
    try {
        res.redirect('/articles/page/1');
    } catch(err){
        next(err);
    }
};

const listArticles = async (req, res, next) => {
    try {
        const user = req.session.user;
        const page = parseInt(req.params.page);
        hasPrev = true;
        hasNext = true;
        if(page <= 0) throw new Error("BAD_REQUEST");
        if(page == 1) hasPrev = false;

        const limit_prev = (page - 1) * 10;

        const sql = "SELECT articles.id AS id, title, displayName, lastUpdated, createdAt FROM users, articles WHERE articles.author=users.id AND articles.isDeleted=0 ORDER BY articles.lastUpdated DESC LIMIT ?,10;";
        const articles = await database.runQuery(sql, [limit_prev]);
        const nextPage = await database.runQuery(sql, [page * 10]);
        
        if(nextPage.length === 0) hasNext = false;
        res.render('./articles/index.pug', {user, articles, page, hasPrev, hasNext});
    } catch(err){
        next(err);
    }
};

module.exports = {
    indexPage,
    latestArticles,
    listArticles,
};