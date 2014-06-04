var shapefile = require('shapefile');
var util = require('./util');

var reader = shapefile.reader('data/ne_10m_admin_0_countries.shp');

var countries = [];

reader.readHeader(function (err, header) {
    if (err)
        return console.error(err);

    reader.readRecord(function (err, record) {
        function recordCallback (err, record) {
            if (err)
                return console.error(err);
            else if (record ===  shapefile.end)
                return console.log('Loaded ' + countries.length + ' countries');

            if (record && record.properties && record.properties.ISO_A2 && record.properties.ISO_A2 !== '-99') {
                countries.push({
                    countryCode: record.properties.ISO_A2,
                    geometry: record.geometry,
                    bounds: util.bounds(record)
                });
            }

            reader.readRecord(recordCallback);
        }

        recordCallback(err, record);
    });
});

module.exports = countries;
