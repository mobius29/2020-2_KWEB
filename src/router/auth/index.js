const { Router } = require('express');
const authCtrl = require('./ctrl');
const router = Router();
router.get('/sign_in', authCtrl.signInForm);
router.post('/sign_in', authCtrl.signIn);
router.get('/sign_up', authCtrl.signUpForm);
router.post('/sign_up', authCtrl.signUp);
router.get('/sign_out', authCtrl.signOut);
module.exports = router;