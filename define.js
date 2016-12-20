DEBUG_ENABLED = false;

log = function (name, msg) {
    if (DEBUG_ENABLED)
        console.log('[' + name + '] ' + msg);
};

require1 = function (currname,name) {
    log(currname, 'require(' + name + ')');
    return require(name);
}

//Set up the define AMD style, as intellisense in Visual Studio handles this well.
if (typeof define === "undefined") {
    define = function (name, deps, callback) {
        deps2 = new Array(deps.length);
        for (var i = 0; i < deps.length; i++) {
                log(name, 'deps ' + deps[i] + ' ' + (i+1) + ' of ' + deps.length)
            try {
                var req2 = require1(name, deps[i]);
                if (typeof req2 === 'undefined')
                    req2 = require1(name, deps[i]); //call the screeps require - Should return ObjectBase: Base when calling core.preload from core
                deps2[i] = req2; 
            }
            catch (e) {
                log(name, 'exception caught: ' + e.toString());
            }
        }

        //Since the outer code is being called anyway, no extra overhead to call the inner callback, 
        //as that code would have always been called if not for this pattern
        log(name, 'calling callback for ' + name);
        var result = callback.apply(null, deps2); //Set up and export the module
        log(name, 'define callback result = ' + Object.keys(result));
        return result;
    };
}

module.exports = {}