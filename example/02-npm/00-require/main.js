const _ = require('lodash')

var r = _.chunk(['a', 'b', 'c', 'd'], 2);
var a = _.isEmpty(null);

console.log('r=', r,'a=', a)
