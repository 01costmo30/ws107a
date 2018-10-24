function compact(a) { //Creates an array with all falsey values removed. The values false, null, 0, "", undefined, and NaN are falsey.
    const chu = [];
    for (i=0; i<a.length;i++) {
        if (a[i]) {
            chu.push(a[i]);
        }
        
    }
    return chu;
};
module.exports = compact;