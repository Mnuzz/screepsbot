if (typeof define === "undefined")
    require('define');

var loop = define('mainloop', ['core', 'CreepHarvester'], function (core, CreepHarvester) {
    var a = new CreepHarvester();
    a.foo1();
    console.log(Game.time);
    
    return {};
});

