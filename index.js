var autoprefixer = require('autoprefixer');
var stilr = require('stilr');
var postcss = require('postcss');

var prevSheetMap = null;

module.exports = function attachStilrUpdater(options) {

  options = options || {};

  stilr.on('update', function () {

    var newSheetMap = stilr.__stylesheet;

    var newRulesOnlyMap;

    if (prevSheetMap === null) {
      newRulesOnlyMap = newSheetMap;
    } else {
      newRulesOnlyMap = new stilr.Map();
      var newSheetMapIterator = newSheetMap.entries();
      while(true) {
        var next = newSheetMapIterator.next();
        if (next.done) {
          break;
        }
        var key = next.value[0];
        var val = next.value[1];
        if (!prevSheetMap.get(key)) {
          newRulesOnlyMap.set(key, val);
        }
      }
    }

    if (newRulesOnlyMap.size > 0) {
      var newRulesOnlyCSSContent =
        stilr.render({pretty: false}, newRulesOnlyMap);
      var prefixedContent =
        postcss([autoprefixer(options.autoprefixer)])
          .process(newRulesOnlyCSSContent)
          .css;

      var document = global.document || null;
      if (document) {
        // Bypassing <head>-appending when document is undefined (for testing
        // purposes)
        var styleElem = document.createElement('style');
        styleElem.textContent = prefixedContent;
        document.head.appendChild(styleElem);
      }

      if (options.onNew) {
        options.onNew(prefixedContent);
      }
    }

    prevSheetMap = new Map(newSheetMap);
    // Cloning is necessary.
    // A mere reference wouldn't work because prevSheetMap and newSheetMap would
    // always be pointing at the same thing.

  });

};
