var _ = require('underscore');

var pointInPolygon = function(point, polygon) {
    var x = point[0],
        y = point[1],
        inside = false;

    for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        var xi = polygon[i][0], yi = polygon[i][1];
        var xj = polygon[j][0], yj = polygon[j][1];

        var intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

var pointInCountry = function(point, country) {
    if (country && country.bounds) {
        var bounds = country.bounds;

        if (point[0] < bounds[0][0] || point[0] > bounds[1][0] || point[1] < bounds[0][1] || point[1] > bounds[1][1])
            return false;
    }

    if (country.geometry.type === 'Polygon') {
        return _.every(country.geometry.coordinates, function (ring, i) {
            if (i === 0)
                return pointInPolygon(point, ring);

            return !pointInPolygon(point, ring);
        });
    }
    else if (country.geometry.type === 'MultiPolygon') {
        return _.some(country.geometry.coordinates, function (polygon) {
            return _.every(polygon, function (ring, i) {
                if (i === 0)
                    return pointInPolygon(point, ring);

                return !pointInPolygon(point, ring);
            });
        });
    }

    return false;
};

module.exports = {
    pointInPolygon: pointInPolygon,
    pointInCountry: pointInCountry
};
