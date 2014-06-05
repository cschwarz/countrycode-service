var countries = require('../countries.js');

var expect = require('chai').expect;

describe('countries', function () {
    describe('#lookup', function () {
        it('should return a result', function (done) {
            countries.lookup(16, 48, function (err, country) {
                expect(err).to.be.null;
                expect(country).to.exist;
                expect(country.countryCode).to.equal('AT');
                expect(country.geometry).to.exist;
                expect(country.bounds).to.exist;
                expect(country.bounds.length).to.equal(2);
                expect(country.bounds[0].length).to.equal(2);
                expect(country.bounds[1].length).to.equal(2);
                expect(country.bounds[0][0]).to.exist;
                expect(country.bounds[0][1]).to.exist;
                expect(country.bounds[1][0]).to.exist;
                expect(country.bounds[1][1]).to.exist;

                done();
            });
        });
        it('should return a result', function (done) {
            countries.lookup(-77, 39, function (err, country) {
                expect(err).to.be.null;
                expect(country).to.exist;
                expect(country.countryCode).to.equal('US');
                expect(country.geometry).to.exist;
                expect(country.bounds).to.exist;
                expect(country.bounds.length).to.equal(2);
                expect(country.bounds[0].length).to.equal(2);
                expect(country.bounds[1].length).to.equal(2);
                expect(country.bounds[0][0]).to.exist;
                expect(country.bounds[0][1]).to.exist;
                expect(country.bounds[1][0]).to.exist;
                expect(country.bounds[1][1]).to.exist;

                done();
            });
        });
    });
});
