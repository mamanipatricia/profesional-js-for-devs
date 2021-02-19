console.log("**************** Iterators and generator ****************");
/*
 *  Introduction to iteration
 *  The iterator pattern
 * Generators
 */
console.log("************* INTRODUCTION TO ITERATION *************");

for (let i = 1; i <= 10; ++i) {
  console.log(i);
}

let collection = ["foo", "bar", "baz"];

for (let index = 0; index < collection.length; ++index) {
  console.log(collection[index]);
}

console.log("----------------- FOREACH -----------------");
let collection1 = ["foo", "bar", "baz"];
collection1.forEach((item) => console.log(item));
// foo
// bar
// baz

console.log("************* THE ITERATOR PATTERN *************");
//* “iterable” and can implement a formal Iterable interface and consumed by an Iterator.
//* Arrays have finite countable elements In-order traversal visits each index in increasing index order
let arr = [3, 1, 4];

//* Sets have finite countable elements In-order traversal visits each value in insertion order
let set = new Set().add(3).add(1).add(4);

//* Each iterator is associated with an iterable,

console.log("************* The Iterable Protocol *************");
//* Many built-in types implement the Iterable interface:
/*
 * STRINGS
 * ARRAYS
 * MAPS
 * SETS
 * THE arguments Object
 * Some DOM collection types like NodeList
 */

let num = 1;
let obj = {};

//* These types do not have iterator factories
console.log("num[Symbol.iterator]:: ", num[Symbol.iterator]); //undefined
console.log("obj[Symbol.iterator]:: ", obj[Symbol.iterator]); //undefined

let str = "abc";
let arr1 = ["a", "b", "c"];
let map = new Map().set("a", 1).set("b", 2).set("c", 3);
let set1 = new Set().add("a").add("b").add("c");
// let els = document.querySelectorAll("div");

//* These types all have iterator factories
console.log(str[Symbol.iterator]); // f values() { [native code] }
console.log(arr1[Symbol.iterator]); // f values() { [native code] }
console.log(map[Symbol.iterator]); // f values() { [native code] }
console.log(set1[Symbol.iterator]); // f values() { [native code] }
// console.log(els[Symbol.iterator]); // f values() { [native code] }

//* Invoking the factory function produces an Iterator
console.log(str[Symbol.iterator]()); // StringIterator {}
console.log(arr[Symbol.iterator]()); // ArrayIterator {}
console.log(map[Symbol.iterator]()); // MapIterator {}
console.log(set[Symbol.iterator]()); // SetIterator {}
// console.log(els[Symbol.iterator]()); // ArrayIterator {}

/*
 * for...of loop
 * Array destructuring
 * The spread operator
 * Array.from()
 * Set construction
 * Map construction
 * Promise.all() , which expects an iterable of promises
 * Promise.race() , which expects an iterable of promises
 * The yield* operator, used in generators
 */

let a = ["foo", "bar", "baz"];
//* for ...of loops
for (let el of a) {
  console.log("el:: ", el);
}

//* Array destructuring
let [a1, b1, c1] = a;
console.log("~~~~> ", a1, b1, c1); // foo, bar, baz

//* spread operator
let arr2 = [...a];
console.log("arr2:: ", arr2);

//* Array.from
let arr3 = Array.from(a);
console.log("arr3:: ", arr3);

//* Set constructor
let setC = new Set(a);
console.log("setC:: ", setC);

//* Map constructor
let pairs = a.map((x, i) => [x, i]);
console.log("pairs:: ", pairs); // [['foo', 0], ['bar', 1], ['baz', 2]]
let mapC = new Map(pairs);
console.log("mapC:: ", mapC); // Map(3) { 'foo'=>0, 'bar'=>1, 'baz'=>2 }

//* An object still implements the Iterable interface if a parent class up the prototype chain implements the interface:

class FooArray extends Array {}

let fooArr = new FooArray("foo", "bar", "baz");

for (let el of fooArr) {
  console.log("el:: ", el);
}

console.log("************* The Iterator Protocol *************");
/*
 * Iterator API uses a next()method to advance through the iterable.
 * Each successive time next() is invoked, it will return an IteratorResult object containing the next value in the iterator. The current position the iterator is at cannot be known without invoking the next() method.
 * - done -> Boolean indicating if next() can be invoked again to retrieve more values
 * - value -> which will contain the next value in the iterable or undefined if done is true
 * The done:true state is termed “exhaustion.""
 */

//* Iterator factory
console.log("a[Symbol.iterator]:: ", a[Symbol.iterator]);

//* Iterator
let iter = a[Symbol.iterator]();
console.log("iter:: ", iter);

//* performing iteration
console.log("iter.next:: ", iter.next());
console.log("iter.next:: ", iter.next());
console.log("iter.next:: ", iter.next());
console.log("iter.next:: ", iter.next());

let aa = ["foo"];
let itera = aa[Symbol.iterator]();

console.log("itera.next():: ", itera.next());
console.log("itera.next():: ", itera.next());
console.log("itera.next():: ", itera.next());
console.log("itera.next():: ", itera.next());

let arrT = ["foo", "bar"];
let iter1T = arrT[Symbol.iterator]();
let iter2T = arrT[Symbol.iterator]();

console.log(iter1T.next()); // { done: false, value: 'foo' }
console.log(iter2T.next()); // { done: false, value: 'foo' }
console.log(iter2T.next()); // { done: false, value: 'bar' }
console.log(iter1T.next()); // { done: false, value: 'bar' }

//* If the iterable is mutated during iteration, the iterator will incorporate the changes
let r = ["foo", "bar"];
let it = r[Symbol.iterator]();

console.log("it.next():: ", it.next());

// * insert value in the middle of array
r.splice(1, 0, "bar");

console.log("it.next():: ", it.next());
console.log("it.next():: ", it.next());
console.log("it.next():: ", it.next());

// ! The following example compares an explicit iterator implementation and a native iterator implementation:

//* This class implements the Iterable interface. Invoking the default iterator factory will return an iterator object that implements the Iterator interface.

class Foo {
  [Symbol.iterator]() {
    return {
      next() {
        return { done: false, value: "foo" };
      },
    };
  }
}
let f = new Foo();

//* Logs an object which implements the Iterator interface
console.log(f[Symbol.iterator]()); // { next: f() {} }
// The Array type implements the Iterable interface.
// Invoking the default iterator of an Array type
// will create an instance of ArrayIterator.
let ab = new Array();
// Logs an instance of ArrayIterator
console.log(ab[Symbol.iterator]()); // Array Iterator {}

console.log("**************** Custom Iterator Definition **************** ");

class Counter {
  // Counter instance should iterate <limit> times
  constructor(limit) {
    this.count = 1;
    this.limit = limit;
  }
  next() {
    if (this.count <= this.limit) {
      return { done: false, value: this.count++ };
    } else {
      return { done: true, value: undefined };
    }
  }
  [Symbol.iterator]() {
    return this;
  }
}

let counter = new Counter(3);
for (let i of counter) {
  console.log(i);
}
// 1
// 2
// 3

// * Because every iterator also implements the Iterable interface, they can be used everywhere an iterable is expected, such as a for...of loop:
let arr11 = [3, 1, 4];
let iter11 = arr[Symbol.iterator]();
for (let item of arr11) {
  console.log("--> ", item);
}
// 3
// 1
// 4
for (let item of iter11) {
  console.log("~~~> ", item);
}
// 3
// 1

console.log("******* Early Termination of Iterators *******");
console.log("************** GENERATORS **************");
/*
 * ability to pause and resume code execution inside a single function block
 * he ability to define custom iterators and implement coroutines
 */
console.log("------------ Generator Basics ------------");
//! Generators take the form of a function, and the generator designation is performed with an asterisk. Anywhere a function definition is valid, a generator function definition is also valid:
//* generator function declaration
function* generatorFn() {}

//* generator function expression
let generatorFn1 = function* () {};

//* Object literal method generator function
let foo1 = {
  *generatorFn() {},
};

//* class instance method generator function
class Foo1 {
  *generatorFn() {}
}

//* class static method generator function
class Bar {
  static *generatorFn() {}
}

//!  Arrow functions cannot be used as generator functions.

//* La función se considerará un generador independientemente del espacio en blanco que rodea al asterisco.

// Equivalent generator functions:
function* generatorFnA() {}
function* generatorFnB() {} // function *generatorFnB() {}
function* generatorFnC() {} // function * generatorFnC() {}
// Equivalent generator methods:
class Foo2 {
  *generatorFnD() {}
  *generatorFnE() {} // * generatorFnE() {}
}

//* Generator objects begin in a state of suspended execution
function* generatorFn() {}

const g = generatorFn();

console.log(g); // generatorFn {<suspended>}
console.log(g.next); // f next() { [native code] }

//* example
function* generatorFn() {}
let generatorObject = generatorFn();
console.log(generatorObject); // generatorFn {<suspended>}
console.log(generatorObject.next()); // { done: true, value: undefined }

//* The value property is the return value of the generator function, which defaults to undefined and can be specified via the generator function’s return value.

function* generatorFn() {
  return "foo";
}
let generatorObject1 = generatorFn();
console.log("GENERATOR:: ", generatorObject1); // generatorFn {<suspended>}
console.log("GENERATOR:: ", generatorObject1.next()); // { done: true, value: 'foo' }

//*  Generator function execution will only begin upon the initial next() invocation, as shown here:

function* generatorFn() {
  console.log("foobar");
}

// Nothing is logged yet when the generator function is initially invoked
let generatorObject2 = generatorFn();

generatorObject2.next(); // foobar

//* Generator objects implement the Iterable interface, and their default iterator is self-referential:
function* generatorFn() {}

console.log(generatorFn);
// f* generatorFn() {}
console.log(generatorFn()[Symbol.iterator]);
// f [Symbol.iterator]() {native code}

console.log(generatorFn());
// generatorFn {<suspended>}
console.log(generatorFn()[Symbol.iterator]());
// generatorFn {<suspended}

const g1 = generatorFn();
console.log(g1 === g1[Symbol.iterator]());
// true

console.log("*********** Interrupting Execution with “yield *********** ");
// * ...... No estudie

function* generatorFn() {
  yield;
}

let generatorObject4 = generatorFn();

console.log(generatorObject4.next()); // { done: false, value: undefined }
console.log(generatorObject4.next()); // { done: true, value: undefined }
/*
 * The yield keyword behaves as an intermediate function return, and the yielded value is available inside the object returned by the next() method.
 *- return by YIELD = done:false
 *- return by RETURN = done: true
 */

//* ---------------------------------------------

//* THE THROW METHOD
function* generatorFn() {
  for (const x of [1, 2, 3]) {
    yield x;
  }
}
const gg = generatorFn();
console.log(gg); // generatorFn {<suspended>}
try {
  gg.throw("foo");
} catch (e) {
  console.log(e); // foo
}
console.log(gg); // generatorFn {<closed>}

/*
 *- return by YIELD = done:false
 *- return by RETURN = done: true
 */
function* generatorFn() {
  yield "foo";
  yield "bar";
  return "baz";
}
let generatorObject0 = generatorFn();
console.log(generatorObject0.next()); // { done: false, value: 'foo' }
console.log(generatorObject0.next()); // { done: false, value: 'bar' }
console.log(generatorObject0.next()); // { done: true, value: 'baz' }

//* Execution progress within a generator function is scoped to each generator object instance. Invoking next() on one generator object does not affect any other:

function* generatorFn() {
  yield "foo";
  yield "bar";
  return "baz";
}

let generatorObject111 = generatorFn();
let generatorObject222 = generatorFn();

console.log("++++++ ", generatorObject111.next()); // { done: false, value: 'foo' }
console.log("++++++ ", generatorObject222.next()); // { done: false, value: 'foo' }
console.log("++++++ ", generatorObject222.next()); // { done: false, value: 'bar' }
console.log("++++++ ", generatorObject111.next()); // { done: false, value: 'bar' }

// ! The yield keyword can only be used inside a generator function; anywhere else will throw an error.

// valid
function* validGeneratorFn() {
  yield;
}
// invalid
function* invalidGeneratorFnA() {
  function a() {
    yield;
  }
}
// invalid
function* invalidGeneratorFnB() {
  const b = () => {
    yield;
  };
}
// invalid
function* invalidGeneratorFnC() {
  (() => {
    yield;
  })();
}

console.log("******** Using a Generator Object as an Iterable ********");
function* generatorFn() {
  yield 1;
  yield 2;
  yield 3;
}
for (const x of generatorFn()) {
  console.log(x);
}
//1
//2
//3

//* define an iterable, which will produce an iterator that executes a specific number of times.

function* nTimes(n) {
  // falsy n -> 0
  while (n--) {
    yield;
  }
}

for (let _ of nTimes(3)) {
  console.log("foo");
}
// foo
// foo
// foo
//* The single generator function parameter controls the number of loop iterations. When n reaches 0, the while condition will become falsy, the loop will exit, and the generator function will return.

// ! INTERESTING - ESTUDIAR MAS

console.log("************** Using “yield” for Input and Output **************");
//* , el valor proporcionado a la primera invocación de next () no se usa, ya que este next () se usa para comenzar la ejecución de la función del generador:

function* generatorFn(initial) {
  console.log(initial);
  console.log(yield);
  console.log(yield);
}
let generatorObjectTT = generatorFn("foo");
generatorObjectTT.next("bar"); // foo
generatorObjectTT.next("baz"); // baz
generatorObjectTT.next("qux"); // qux

// *--------
function* generadorFnn() {
  return yield "foo";
}

let generatorObjectt = generadorFnn();

console.log("generatorObjectt.next():: ", generatorObjectt.next());
console.log("generatorObjectt.next(bar):: ", generatorObjectt.next("bar"));

//* Suppose you wanted to define a generator function that would iterate a configurable number of times and produce the index of iteration.

function* nTimes(n) {
  for (let i = 0; i < n; ++i) {
    yield i;
  }
}
for (let x of nTimes(3)) {
  console.log(x);
}
// 0
// 1
// 2
//*  Alternately, the following has a slightly less verbose while loop implementation:
function* nTimes(n) {
  let i = 0;
  while (n--) {
    yield i++;
  }
}
for (let x of nTimes(3)) {
  console.log(x);
}
// 0
// 1
// 2

//* ranges or populating arrays:
function* range(start, end) {
  let i = start;
  while (end > start) {
    yield start++;
  }
}
for (const x of range(4, 7)) {
  console.log(x);
}
// 4
// 5
// 6
function* zeroes(n) {
  while (n--) {
    yield 0;
  }
}
console.log(Array.from(zeroes(8)));
// [0, 0, 0, 0, 0, 0, 0, 0]

console.log("*************** Yielding an Iterable ***************");

/*
* Es posible aumentar el comportamiento del rendimiento para hacer que se repita a través de un iterable y produzca su contenido uno a la vez. Esto se puede hacer usando un asterisco

*/

// generatorFn is equivalent to:
/*
function* generatorFn() {
  for (const x of [1, 2, 3]) {
    yield x;
  }
}
*/
// generatorFn is equivalent to thus
function* generatorFn() {
  yield* [1, 2, 3];
}

let generatorObjectAsterisk = generatorFn();
for (const x of generatorFn()) {
  console.log(x);
}
// 1
// 2
// 3

// * For iterators produced from a generator function, this value will take the form of whatever value is returned from the generator function:

function* innerGeneratorFn() {
  yield "foo";
  return "bar";
}

function* outerGeneratorFn(genObj) {
  console.log("iter value:", yield* innerGeneratorFn());
}

for (const x of outerGeneratorFn()) {
  console.log("value:", x);
}
// value: foo
// iter value: bar

console.log("*********** Recursive Algorithms Using yield ************");
/*
 *yield* is most useful when used in a recursive operation, where the generator can yield itself. Consider the following example:
 */
function* nTimes(n) {
  if (n > 0) {
    yield* nTimes(n - 1);
    yield n - 1;
  }
}
for (const x of nTimes(3)) {
  console.log(x);
}
// 0
// 1
// 2

console.log("***********Using a Generator as the Default Iterator***********");
/* HACE UN LOOP INFINITO
class Foo10 {
  constructor() {
    this.values = [1, 2, 3];
  }
  *[Symbol.iterator]() {
    yield* this.values;
  }
}
const f10 = new Foo();
for (const x of f10) {
  console.log(x);
}
// 1
// 2
// 3
 */
/* Here, the for...of loop invokes the default iterator—which happens to be a generator function and produces a generator object. The generator object is an iterable and therefore compatible for use in iteration.
 */

console.log("***********Early Termination of Generators***********");
/*
 * NEXT()
 * RETURN()
 * THROW
 */
function* generatorFn() {}

const gEarly = generatorFn();

console.log("--->", gEarly); // generatorFn {<suspended>}
console.log("--->", g.next); // f next() { [native code] }
console.log("--->", g.return); // f return() { [native code] }
console.log("--->", g.throw); // f throw() { [native code] }

console.log("*************** The return() Method*************** ");
function* generatorFn() {
  for (const x of [1, 2, 3]) {
    yield x;
  }
}

const gReturn = generatorFn();

console.log("gReturn:: ", gReturn); // generatorFn {<suspended>}
console.log("gReturn:: ", gReturn.return(4)); // { done: true, value: 4 }
console.log("gReturn:: ", gReturn); // generatorFn {<closed>}

/*
 * Unlike iterators, all generator objects have a return() method that forces it into a closed state that it cannot exit once reached. Subsequent invoking of next() will disclose the done:true state, but any provided return value is not stored or propagated
 */

function* generatorFn() {
  for (const x of [1, 2, 3]) {
    yield x;
  }
}

const gReturn1 = generatorFn();

console.log(gReturn1.next()); // {done: false, value: 1 }
console.log(gReturn1.return(4)); // {done: true, value: 4 }
console.log(gReturn1.next()); // {done: true, value: undefined }
console.log(gReturn1.next()); // {done: true, value: undefined }
console.log(gReturn1.next()); //{done: true, value: undefined }

/* for...of loop will sensibly ignore any values returned inside the done:true IteratorObject */
function* generatorFn() {
  for (const x of [1, 2, 3]) {
    yield x;
  }
}
const gForOf = generatorFn();
for (const x of gForOf) {
  if (x > 1) {
    gForOf.return(4);
  }
  console.log(x);
}
// 1
// 2

console.log("*************** The throw() Method*************** ");
/*
 * The throw() method will inject a provided error into the generator object at the point it is suspended. If the error is unhandled, the generator will close:
 */
function* generatorFn() {
  for (const x of [1, 2, 3]) {
    yield x;
  }
}
const gThrow = generatorFn();
console.log(gThrow); // generatorFn {<suspended>}
try {
  gThrow.throw("foo ERROR!! ");
} catch (e) {
  console.log(e); // foo
}
console.log("gThrow:: ", gThrow); // generatorFn {<closed>}

// * If, however, the error is handled inside the generator function, then it will not close and can resume execution. ....  will see it skip a value

function* generatorFn() {
  for (const x of [1, 2, 3]) {
    try {
      yield x;
    } catch (e) {}
  }
}

const gTryCatch = generatorFn();

console.log("gTryCatch:: ", gTryCatch.next()); // { done: false, value: 1}
gTryCatch.throw("foo");
console.log("gTryCatch:: ", gTryCatch.next()); // { done: false, value: 3}

// ! the generator suspends execution at a yield keyword inside a try/catch block.
