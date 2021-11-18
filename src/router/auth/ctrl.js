const database = require("../../lib/database");
const authentication = require("../../lib/authentication");
const error_handler = require("../../lib/error-handler");

// GET /auth/sign_in
const signInForm = async (req, res, next) => {
    try {
        const {user} = req.session;

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
        const {displayName} = req.body;

        if (!username || !password) throw new Error('BAD_REQUEST');

        const [sql_getpw] = "SELECT id, username, displayName, password, isActive, isStaff FROM user WHERE username = ?;";
        const get_pw = database.runQuery(sql_getpw, [username]);
        if (!get_pw) throw new Error('UNAUTHORIZED');

        const verify = authentication.verifyPassword(sql_getpw['password'], get_pw);
        if(!verify) throw new Error('UNAUTHORIZED');

        req.session.user = {
            id: parseInt(sql_getpw['id']),
            username: username,
            displayName: displayName,
            isActive: parseInt(sql_getpw['isActive']),
            isStaff: parseInt(sql_getpw['isStaff']),
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
            else res.send('Destroy Completed\n');
        });
        res.redirect('/');
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