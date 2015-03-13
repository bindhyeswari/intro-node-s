var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Contact = mongoose.model('contact', {
    name: String,
    email: String,
    location: String
});

/* Mapped directly to /contacts */

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.headers.accept.indexOf('text/html') !== -1) {
        res.render('contacts');
    } else {
        Contact.find({}, function(err, results) {
            if (err) res.status(500).json({message: 'something broke!'});
            else res.status(200).json(results);
        })
    }
});

router.post('/', function (req, res) {
    // req.body
    console.log(req.body);
    var contact = new Contact(req.body);
    contact.save(function (err, result) {
        if (err) res.status(500).json({message: 'something broke!'});
        else res.status(200).json(result);
    });
});

module.exports = router;
