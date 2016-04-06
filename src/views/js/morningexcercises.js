var blep = [{
  x: 10,
  not_x: 11
}, {
  x: 5,
  not_x: 11
}, {
  x: 6,
  not_x: 11
}, {
  x: 7,
  not_x: 11
}];

var sum = 0;

function lekkerklonkie(x) {

  for (var i = 0; i < x.length; i++) {
    sum += x[i].x
    console.log(sum)
  }
}

lekkerklonkie(blep);


// f(5) = 5
// f(6) = 8

// here's the first few:


var f =[]
function vibonazi(n) {
  for (var i = 0; i < n; i++) {
    f.push(f[n - 2] + f[n - 3])
      console.log(f)

  }
}

vibonazi(229)
console.log(vibonazi(numbers, 5))