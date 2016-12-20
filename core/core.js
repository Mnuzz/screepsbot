if (typeof define === "undefined")
    require('core.define');

var result = define('core', ['core.preload'], function (preload) {
    var core = {};
    
    //Merge parent modules to produce core
    Object.assign(core, preload);
    return core;
});

module.exports = result;


