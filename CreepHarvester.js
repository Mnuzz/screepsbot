if (typeof define === "undefined")
    require('define');

module.exports = define('CreepHarvester', ['core', 'CreepBase'], function (core, CreepBase) {
    var CreepHarvester = CreepBase.extend({
        constructor: function () {
            console.log('CreepHarvester.constructor');
        },
        
        foo2: function () {
            console.log('CreepHarvester.foo2');
        }
    });
    return CreepHarvester;
});