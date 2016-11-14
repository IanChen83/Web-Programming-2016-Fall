const Router = require('express').Router;
const users = require('./users.obj').users;
const router = new Router();

function getUsers(){

}

// Write your restful api here:
router.get('/users/:id', (req, res, next) => {
    const id = +req.params.id;
    if(!id) {
        next();
        return;
    } else if(users[id - 1]) {
        res.send(JSON.stringify(users[id - 1]));
    }else{
    }
});

router.get('/users/', (req, res, next) => {
    res.json(users);
});


module.exports = router;
