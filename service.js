var express = require('express');
var _ = require('underscore');

var countries = require('./countries');
var util = require('./util');

var app = express();
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    var lat = req.query.lat;
    var lon = req.query.lon;
    var geometry = req.query.geometry || false;

    var country = _.find(countries, function (country) { return util.pointInCountry([lon, lat], country); });

    if (_.isUndefined(country))
        return res.json(404, { error: 'Could not reverse geocode country code for the requested location' });

    if (geometry)
        res.json(country);
    else
        res.json({ countryCode: country.countryCode });
});

app.listen(port);
