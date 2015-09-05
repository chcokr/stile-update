var attachStilrUpdater = require('../index');

var expect = require('chai').expect;
var stilr = require('stilr');

describe('attachStilrUpdater', function () {

  it('adds a listener on stilr\'s "update" event', function (done) {
    var specialColorCode = '#fa92fa';
    stilr.clear();
    attachStilrUpdater({
      onNew: function (prefixedCSS) {
        expect(prefixedCSS).to.have.string(specialColorCode);
        done();
      }
    });
    stilr.create({x: {color: specialColorCode}});
    stilr.off('update');
  });

  it('vendor-prefixes rules', function (done) {
    stilr.clear();
    attachStilrUpdater({
      onNew: function (prefixedCSS) {
        expect(prefixedCSS).to.have.string('webkit');
        done();
      }
    });
    stilr.create({x: {alignItems: 'center'}});
    stilr.off('update');
  });

  it('adds only previously unobserved rules', function (done) {
    var specialColorCode1 = '#a9face';
    var specialColorCode2 = '#a9facd';
    stilr.clear();
    var isFirst = true;
    attachStilrUpdater({
      onNew: function (prefixedCSS) {
        if (isFirst) {
          isFirst = false;
          return;
        }
        expect(prefixedCSS).to.have.string(specialColorCode2)
          .and.not.have.string(specialColorCode1);
        done();
      }
    });
    stilr.create({x: {color: specialColorCode1}});
    stilr.create({x: {color: specialColorCode2}});
    stilr.off('update');
  });

  it('does not add anything when there are no new rules', function (done) {
    var specialColorCode = '#ec02fd';
    stilr.clear();
    var isFirst = true;
    attachStilrUpdater({
      onNew: function (prefixedCSS) {
        if (isFirst) {
          isFirst = false;
          return;
        }
      }
    });
    stilr.create({x: {color: specialColorCode}});
    stilr.create({x: {color: specialColorCode}});
    setTimeout(done, 500);
    stilr.off('update');
  });

});
