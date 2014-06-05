var shapefile = require('shapefile');
var _ = require('underscore');
var rbush = require('rbush');

var util = require('./util');

var reader = shapefile.reader('data/ne_10m_admin_0_countries.shp');

var countryTree = rbush();
var countries = [];
var initCallbacks = [];

function addCountry(record, geometry) {
    var bounds = util.bounds(geometry);

    countries.push([bounds[0][0], bounds[0][1], bounds[1][0], bounds[1][1], {
        countryCode: record.properties.ISO_A2,
        geometry: geometry,
        bounds: bounds
    }]);
}

reader.readHeader(function (err, header) {
    if (err)
        throw err;

    reader.readRecord(function (err, record) {
        function recordCallback (err, record) {
            if (err)
                throw err;
            else if (record === shapefile.end) {
                countryTree.load(countries);
                countries = [];
                _.each(initCallbacks, function (initCallback) { initCallback(); });
                initCallbacks = null;
                return;
            }

            if (record && record.properties && record.properties.ISO_A2 && record.properties.ISO_A2 !== '-99') {
                if (record.geometry.type === 'MultiPolygon') {
                    for (var i = 0; i < record.geometry.coordinates.length; i++) {
                        addCountry(record, {
                            type: 'Polygon',
                            coordinates: record.geometry.coordinates[i]
                        });
                    }
                }
                else {
                    addCountry(record, record.geometry);
                }
            }

            reader.readRecord(recordCallback);
        }

        recordCallback(err, record);
    });
});

module.exports = {
    search: function (lon, lat, callback) {
        if (!initCallbacks) {
            var country = _.find(countryTree.search([lon, lat, lon, lat]), function (country) { return util.pointInCountry([lon, lat], country[4]); });

            if (country)
                callback(null, country[4]);
            else
                callback(null);
        }
        else {
            initCallbacks.push(function () {
                var country = _.find(countryTree.search([lon, lat, lon, lat]), function (country) { return util.pointInCountry([lon, lat], country[4]); });

                if (country)
                    callback(null, country[4]);
                else
                    callback(null);
            });
        }
    }
};
