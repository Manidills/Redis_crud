var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/config');
var curd = require('./curd');
var app = express();

var resp = function (res, data, code, next) {
    res.status(code).json(data);
    return next();
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.listen(config.init_port);

console.log("Application is listening on port", config.init_port);

app.post('/user/add', function (req, res, next) {

    var body = req.body;

    curd.add_user(body, function (response, code) {
        resp(res, response, code, next)
    })

});
app.get('/user/:id', function (req, res, next) {
    var param = req.params;

    crud.get_user(param, function (response, code) {
        resp(res, response, code, next)
    })
});
app.put('/user/:id', function (req, res, next) {
    var id = req.params.id;
    var param = req.body;

    crud.update_user(id, param, function (response, code) {
        resp(res, response, code, next)
    })

});
app.delete('/user/:id', function (req, res, next) {
    var param = req.params;

    crud.delete_user(param, function (response, code) {
        resp(res, response, code, next)
    })
});


