const database = require('../../lib/database');

const readArticle = async (req, res, next) => {
    try{
        user = req.session.user;
        id = req.params.articleId;

        const sql = "SELECT id, title, content, author, createdAt, lastUpdated FROM articles WHERE id=? AND isDeleted=0;";
        article = await database.runQuery(sql, [id]);

        console.log(article.createdAt);

        res.render('./articles/details.pug', { user, article })
    } catch(err){
        next(err);
    }
};

const writeArticleForm = async (req, res, next) => {
    try {
        user = req.session.user;
        res.render('./articles/compose.pug', { user })
    } catch (err) {
        next(err);
    }
};

const writeArticle = async (req, res, next) => {
    try {
        const title = req.body.title.trim();
        const content = req.body.content.trim();

        if(!title || !content) throw new Error("BAD_REQUEST");

        const user = req.session.user;
        const sql = "INSERT INTO articles (title, content, author) VALUES (?, ?, ?);";
        const result = await database.runQuery(sql, [title, content, user.id]);

        articleId = result.insertId;
        res.redirect(`/article/${articleId}`);

    } catch (err) {
        next(err);
    }
};

const editArticleForm = async (req, res, next) => {
    try {
        
    } catch (err) {
        next(err);
    }
};

const editArticle = async (req, res, next) => {
    try {

    } catch (err) {
        next(err);
    }
};

const deleteArticle = async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
};

module.exports = {
    readArticle,
    writeArticleForm,
    writeArticle,
    editArticleForm,
    editArticle,
    deleteArticle,
}