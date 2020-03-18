const MongoClient = require('mongodb').MongoClient;
const express = require('express');

app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

MongoClient.connect('mongodb://localhost', (err, client) => {
    if (err) return console.log(err);

    var db = client.db('blogdbNodejs');

    app.listen(3000, () => {
        console.log('listening on port 3000');
    });

    app.post('/quotes', (req, res) => { 
        db.collection('quotes').insertOne(req.body, (err, result) => {
            if (err) return console.log(err);

            console.log('saved to database');
            res.redirect('/');
        });
    });

    app.get('/', (req, res) => {
        var cursor = db.collection('quotes').find().toArray((err, results) => { res.send(results[0]);});
    });
});