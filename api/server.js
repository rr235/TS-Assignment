var express = require('express')
var app = express()
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var users = [{ username: "foo", password: "Something1" }];

app.get('/', function (req, res, next) {
    res.send('Server is up and running.')
});


app.listen(3000, function () {
    console.log('listening at 3000.');
})


app.post('/register', function (req, res) {
    users.push(req);
    res.send({ status: true, message: 'User registered successfully' });
})

app.post('/login', function (req, res) {
    var data  = req.body;
    var filtered = users.filter(function(val) {
        return val.username === data.username && val.password === data.password;
        });

    if (filtered.length === 1)
        res.send({ status: true, message: 'User Login Successful' });
    else
    res.send({ status: false, message: 'Invalid Username or Password' });
})
