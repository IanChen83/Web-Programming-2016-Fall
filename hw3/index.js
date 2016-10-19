/* eslint-disable prefer-arrow-callback */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('./public'));

// /
app.get('/', function(req, res){
    res.sendFile('/index.html');
});

// Router
const router = express.Router(); // eslint-disable-line new-cap

// /api/query
router.get('/query', function(req, res){
    res.json(req.query);
});

// /api/body
router.post('/body', bodyParser.urlencoded({ extended: false }));
router.post('/body', bodyParser.json());
router.post('/body', function(req, res){
    res.send(JSON.stringify(req.body));
});

// /api/users/:id
router.get('/users/:id', function(req, res, next){
    const ret = [
        {
            id: 1,
            name: 'Joe',
            age: 18,
        }, {
            id: 2,
            name: 'John',
            age: 22,
        },
    ];
    if(req.params.id === '1'){
        res.json(ret[0]);
        return;
    }else if(req.params.id === '2'){
        res.json(ret[1]);
        return;
    }

    next();
});

app.use('/api', router);

// Default 404 handler
app.use(function(req, res){
    res.status(404).send('Not found');
});

app.listen(3000, function(err){
    if (err) throw err;
});
