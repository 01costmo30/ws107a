function chunk(a, n) {
    const chu = [];
    for (i=0; i<a.length;i+=n) {
        chu.push(a.slice(i, i+n));
    }
    return chu;
};
module.exports = chunk;