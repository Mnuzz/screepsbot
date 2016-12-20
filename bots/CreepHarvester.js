if (typeof define === "undefined")
    require('core.define');

module.exports = define('bots.CreepHarvester', ['core', 'bots.CreepBase'], function (core, CreepBase) {
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