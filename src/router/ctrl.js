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