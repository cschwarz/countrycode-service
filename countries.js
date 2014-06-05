var shapefile = require('shapefile');
var _ = require('underscore');

var util = require('./util');

var reader = shapefile.reader('data/ne_10m_admin_0_countries.shp');

var countries = [];
var initCallbacks = [];

reader.readHeader(function (err, header) {
    if (err)
        return console.error(err);

    reader.readRecord(function (err, record) {
        function recordCallback (err, record) {
            if (err)
                return console.error(err);
            else if (record ===  shapefile.end) {
                _.each(initCallbacks, function (initCallback) { initCallback(); });
                initCallbacks = null;
            }

            if (record && record.properties && record.properties.ISO_A2 && record.properties.ISO_A2 !== '-99') {
                if (record.geometry.type === 'MultiPolygon') {
                    for (var i = 0; i < record.geometry.coordinates.length; i++) {
                        var geometry = {
                            type: 'Polygon',
                            coordinates: record.geometry.coordinates[i]
                        };
                        countries.push({
                            countryCode: record.properties.ISO_A2,
                            geometry: geometry,
                            bounds: util.bounds({ geometry: geometry })
                        });
                    }
                }
                else {
                    countries.push({
                        countryCode: record.properties.ISO_A2,
                        geometry: record.geometry,
                        bounds: util.bounds(record)
                    });
                }
            }

            reader.readRecord(recordCallback);
        }

        recordCallback(err, record);
    });
});

module.exports = {
    lookup: function (lon, lat, callback) {
        if (!initCallbacks) {
            callback(null, _.find(countries, function (country) { return util.pointInCountry([lon, lat], country); }));
        }
        else {
            initCallbacks.push(function (err) {
                if (err)
                    return callback(err);

                callback(null, _.find(countries, function (country) { return util.pointInCountry([lon, lat], country); }));
            });
        }
    }
};
