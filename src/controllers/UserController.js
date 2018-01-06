const users = require('../models/users');

module.exports = {
    getUserById(req, res, next) {
        console.log(req.params);
        const user = users.find(user => user.id == req.params.id);
        res.json(user);
    }
}