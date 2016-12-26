var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var path = require('path');
var httpStatus = require('http-status-codes');

app.use(bodyParser.json());
app.use(express.static(__dirname));

var users = [{ email: "foo", password: "Something1" }];

app.listen(3000, function () {
    console.log('Server is up and running. Listening at 3000!!!');
})

app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.post('/api/register', function (req, res) {
    try {
        console.log(req.body);
        users.push(req.body);
        res.status(httpStatus.OK).send({ message: 'User registered successfully' });
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
    }
})

app.post('/api/login', function (req, res) {
    try {
        var data = req.body;
        var filtered = users.filter(function (val) {
            return val.email === data.username && val.password === data.password;
        });

        if (filtered.length === 1)
            res.status(httpStatus.OK).send({ message: 'User Login Successful' });
        else
            res.status(httpStatus.UNAUTHORIZED).send({ message: 'Invalid Username or Password' });
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
    }
})
