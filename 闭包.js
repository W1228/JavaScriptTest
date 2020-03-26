var a = function (c, d) {
  var cc = c;
  var dd = d;
  return function () {
    cc++;
    console.log(cc);
    dd++;
    console.log(dd);
  };
}
var b = a(1, 2);
b();