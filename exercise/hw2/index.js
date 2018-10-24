// <<<<<<< HEAD
module.exports = {
    chunk: require('./lib/chunk'),
    compact: require('./lib/compact')
}
/*
=======
function chunk (list, n) {
  const clist = []
  for (let i = 0; i < list.length; i += n) {
    clist.push(list.slice(i, i + n))
  }
  return clist
}

const ccclodash3 = {}
ccclodash3.chunk = chunk
ccclodash3.concat = concat
module.exports = ccclodash3
*/
// console.log("chunk(['a', 'b', 'c', 'd'], 2) =", chunk(['a', 'b', 'c', 'd'], 2))

// >>>>>>> bbb244c6bd90e3bb3b007439970544d7e4ba1266
