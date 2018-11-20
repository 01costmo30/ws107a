var obj = {
    on:function (f, a, b) {
        f(a, b)
        return this
    }
}

f1 = function(z, w) { console.log(z*w) }
f2 = function(x, y) { console.log(x+y) }


obj.on(f1, 3, 5).on(f2, 17, 128)