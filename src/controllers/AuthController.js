const jwt = require('jsonwebtoken');
const users = require('../models/users');
const { AUTH_SECRET_KEY } = process.env;

module.exports = {
    auth(req, res, next) {
        const user = users.find(user => user.username === req.body.username && user.password === req.body.password);
        console.log('user', user)
        if(!user) {
            return next({ status: 404, message: "bad credentials"});
        }
        const token = jwt.sign(user, AUTH_SECRET_KEY, { expiresIn: '2h' });
        res.json({ token });
    },
    verify(req, res, next) {
        try {
            jwt.verify(req.headers['x-token'], AUTH_SECRET_KEY);
            next();
        } catch (error) {
            next({ status: 401, message: 'Unauthorized!' })
        }
        
    }
}