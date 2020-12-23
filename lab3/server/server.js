const cors = require('cors')
const fetch = require('node-fetch');
const express = require('express')
const bodyParser = require('body-parser')

const port = 8081
const server = express()
const api_key = '52f8f9af79e0664f928042deb0e2b888'

const pg = require('pg');

const config = {
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'postgresweb',
    port: 5432
};

const client = new pg.Client(config);
client.connect();


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(cors())
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
    res.setHeader('Accept-Charset', 'utf-8')
    next();
});

server.options('*', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS, POST');
    res.send('ok');
});

server.get('/weather/city', (req, res) => {
    let city = req.query.q;
    city = encodeURI(city);
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric' + '&appid=' + api_key;
    fetch(url).then(function (resp) {
        if (resp.status === 200) {
            return resp.json()
        } else {
            return 404
        }
    }).then(function (data) {
        res.send(data)
    })
})

server.get('/weather/coordinates', (req, res) => {
    let lat = req.query.lat;
    let lon = req.query.lon;
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric' + '&appid=' + api_key;
    fetch(url)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            res.send(data)
        })
})

server.get('/favourites', (req, res) => {
    const query = 'SELECT * FROM \"fav_cities\"';
    client.query(query)
        .then(data => {
            let cities_data = data.rows;
            let cities = []
            for (let i = 0; i < cities_data.length; i++) {
                cities.push(cities_data[i].fav_city_name)
            }
            res.send({cities});
        })
        .catch(err => {
            res.sendStatus(503);
        });
})

server.post('/favourites', (req, res) => {
    let fav_city_name = req.body.name;
    let textType = typeof fav_city_name;

    res.setHeader('Content-Type', `text/${textType}; charset=UTF-8`)

    let query = "INSERT INTO \"fav_cities\" (fav_city_name) VALUES ('" + fav_city_name + "')";
    client.query(query)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(err => {
            res.sendStatus(400);
        });
})

server.delete('/favourites', (req, res) => {
    let fav_city_name = req.body.name;
    let query = 'DELETE FROM \"fav_cities\" WHERE fav_city_name=\'' + fav_city_name + '\'';
    console.log(query)
    client
        .query(query)
        .then(result => {
            res.sendStatus(200);
        })
        .catch(err => {
            res.sendStatus(400);
            throw err;
        });
});

server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})