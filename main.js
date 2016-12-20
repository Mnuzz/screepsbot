if (typeof define === "undefined")
    require('core.define');

var loop = define('mainloop', ['core', 'bots.CreepHarvester'], function (core, CreepHarvester) {
    var a = new CreepHarvester();
    a.foo1();
    console.log(Game.time);
    
    return {};
});

