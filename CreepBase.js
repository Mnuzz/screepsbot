if (typeof define === "undefined")
    require('define');

module.exports = define('CreepBase', ['core'], function (core) {
    var CreepBase = core.ObjectBase.extend({
        constructor: function (foo) {
            console.log('CreepBase.constructor(' + foo + ')');
        },
        
        foo1: function () {
            console.log('CreepBase.foo1');
        }
    });
    return CreepBase;
});