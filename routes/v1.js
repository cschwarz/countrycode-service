var express = require('express');
var _ = require('underscore');

var countries = require('../countries');
var util = require('../util');

var router = express.Router();

router.get('/', function(req, res) {
    var lat = req.query.lat;
    var lon = req.query.lon;
    var geometry = req.query.geometry || false;

    countries.search(lon, lat, function (err, country) {
        if (_.isUndefined(country))
            return res.json({ error: 'Could not reverse geocode country code for the requested location' });

        if (geometry)
            res.json(country);
        else
            res.json({ countryCode: country.countryCode });
    });
});

module.exports = router;
