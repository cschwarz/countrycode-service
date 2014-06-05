var countries = require('../countries.js');

var expect = require('chai').expect;

describe('countries', function () {
    describe('#lookup', function () {
        it('should return a result', function (done) {
            countries.lookup(16, 48, function (err, country) {
                expect(err).to.be.null;
                expect(country).to.be.not.undefined;
                expect(country.countryCode).to.equal('AT');

                done();
            });
        });
        it('should return a result', function (done) {
            countries.lookup(-77, 39, function (err, country) {
                expect(err).to.be.null;
                expect(country).to.be.not.undefined;
                expect(country.countryCode).to.equal('US');

                done();
            });
        });
    });
});
