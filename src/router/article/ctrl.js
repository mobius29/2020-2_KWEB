const readArticle = async (req, res, next) => {
    try{
        user = req.session.user;

        id = req.params.articleId;
        res.render('/articles/details.pug', { user }, { article })
    } catch(err){
        next(err);
    }
};

const writeArticleForm = async (req, res, next) => {
    try {
        user = req.session.user;
        res.render('/articles/compose.pug', { user })
    } catch (err) {
        next(err);
    }
};

const writeArticle = async (req, res, next) => {
    try {

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