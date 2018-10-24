const _ = require('../index.js');
console.log(_.chunk(['a','b','c','d','e','f','g'], 4));
console.log(_.compact(['a','', 1, false,'e','f','g', 0, null, 3, NaN, 5]));