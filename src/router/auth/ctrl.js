const database = require("../../lib/database");
const authentication = require("../../lib/authentication");
const error_handler = require("../../lib/error-handler");

// GET /auth/sign_in
const signInForm = async (req, res, next) => {
    try {
        const { user } = req.session;

        if(user != undefined) res.redirect('/');
        else res.render('./auth/sign-in.pug');
    } catch (err) {
        next(err);
    }
};

const signIn = async (req, res, next) => {
    try{
        const {username} = req.body;
        const {password} = req.body;

        if (!username || !password) throw new Error('BAD_REQUEST');

        const sql_getpw = "SELECT id, username, displayName, password, isActive, isStaff FROM users WHERE username = ?;";
        const [get_pw] = await database.runQuery(sql_getpw, [username]);
        if (!get_pw) throw new Error('UNAUTHORIZED');

        const verify = authentication.verifyPassword(password, get_pw['password']);
        if(!verify) throw new Error('UNAUTHORIZED');

        req.session.user = {
            id: parseInt(get_pw['id']),
            username: username,
            displayName: get_pw['displayName'],
            isActive: parseInt(get_pw['isActive']),
            isStaff: parseInt(get_pw['isStaff']),
        };

        res.redirect('/');
    } catch(err){
        next(err);
    }
};

const signUpForm = async (req, res, next) => {
    try{
        res.render('./auth/sign-up.pug');
    } catch(err){
        next(err);
    }
};

const signUp = async (req, res, next) =>{
    try{
        const {username} = req.body;
        const {password} = req.body;
        const {displayName} = req.body;

        if(!username || !password || !displayName) throw new Error('BAD_REQUEST');

        const enc_pw = await authentication.generatePassword(password);
        const sql = "INSERT INTO users (username, password, displayName) VALUES (?, ?, ?);";
        await database.runQuery(sql, [username, enc_pw, displayName]);

        res.redirect('/auth/sign_in');
    } catch (err){
        next(err);
    }
};

const signOut = async (req, res, next) => {
    try{
        req.session.destroy(err => {
            if (err) throw new Error('BAD_REQUEST');
            res.redirect('/');
        });
    } catch(err){
        next(err);
    }
};

module.exports = {
    signInForm,
    signIn,
    signUpForm,
    signUp,
    signOut,
};