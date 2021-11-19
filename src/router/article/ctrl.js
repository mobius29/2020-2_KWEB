const database = require('../../lib/database');

const readArticle = async (req, res, next) => {
    try{
        const user = req.session.user;
        const id = parseInt(req.params.articleId);
        
        const sql = "SELECT articles.id AS id, title, content, author, createdAt, lastUpdated, displayName FROM users, articles WHERE articles.id=? AND articles.author=users.id AND isDeleted=0;";
        const [article] = await database.runQuery(sql, [id]);

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
        const user = req.session.user;
        const articleId = parseInt(req.params.articleId);
        
        const sql = "SELECT title, content, username FROM users, articles WHERE articles.id=? AND articles.author=users.id AND articles.isDeleted=0;";
        const [article] = await database.runQuery(sql, [articleId]);

        if(article == []) throw new Error("NOT_EXIST");


        res.render('./articles/compose.pug', {user, article});
    } catch (err) {
        next(err);
    }
};

const editArticle = async (req, res, next) => {
    try {
        const articleId = req.params.articleId;
        const title = req.body.title.trim();
        const content = req.body.content.trim();

        if(!title || !content) throw new Error("BAD_REQUEST");
        
        const sql = "UPDATE articles SET title=?, content=? WHERE id=? AND isDeleted=0;";
        database.runQuery(sql, [title, content, articleId]);

        res.redirect(`/article/${articleId}`);
    } catch (err) {
        next(err);
    }
};

const deleteArticle = async (req, res, next) => {
    try {
        const articleId = req.params.articleId;
        
        const sql = "UPDATE articles SET isDeleted=1 WHERE id=?";
        database.runQuery(sql, [articleId]);

        res.redirect(`/articles`);
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