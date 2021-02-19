// ************* Collection Reference Types *************
console.log("************* Collection Reference Types *************");

/*
 * ➤➤ Working with objects
 * ➤➤ Working with arrays and typed arrays
 * ➤➤ Working with Map, WeakMap, Set, and WeakSet types
 */

// ********* THE OBJECT TYPE *********
//*  two ways to explicitly create an instance of Object.

console.log("********* THE OBJECT TYPE *********");

//  new operator with the Object constructor
let person = new Object();
person.name = "Nicholas";
person.age = 29;
console.log("person:: ", person);

// same as Object()
// let person = {}; // same as new Object()

// Object literal notation
let person1 = {
  name: "Pat",
  age: 26,
  5: true, // numeric property names are automatically converted to strings.
};

console.log("person1:: ", person1);
// ! When defining an object via object literal notation, the Object constructor is never actually called.

// alert(person["name"]); // "Nicholas"
// alert(person.name); // "Nicholas"
console.log('person["name"]:: ', person["name"]);
console.log("person.name:: ", person.name);

//* main advantage of bracket notation - allows you to use variables for property access
let propertyName = "name";
console.log("person[propertyName]:: ", person[propertyName]);

person["first name"] = "Patricia";
console.log("person:: ", person);

// ************** THE ARRAY TYPE **************

//* ----------- Creating Arrays -----------
console.log("----------- Creating Arrays -----------");
// * Array constructor
let col = new Array(); // Array(2) creates an array with 2 items
let colors = new Array("red", "blue", "green"); // Array(length)

let cl = ["red", "blue", "green"]; // Creates an array with three strings
let names = []; // Creates an empty array
let val = [1, 2]; // Creates an array with 2 items - [1,2,]

console.log("arrays:: ", cl);
console.log("arrays:: ", names);
console.log("arrays:: ", val);

/*
 * The Array constructor also has two additional static methods to create arrays

 * from() - is used for converting array-like constructs into an array instance
 * of() - used to convert a collection of arguments into an array instance.
 */

//* Array.from()

//* Strings will be broken up into an array of single characters
console.log("Array.from:: ", Array.from("Matt"));
console.log("Array.from:: ", Array.from(""));

//* Sets and Maps can be converted into a new array instance using from()

const m = new Map().set(1, 2).set(3, 4);
const s = new Set().add(1).add(2).add(3).add(4);

console.log("m:: ", m);
console.log("s:: ", s);

//********** Array.from() performs a shallow copy of an existing array **********
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1);

console.log("a1:: ", a1);
console.log("a2:: ", a2);
console.log("a1===a2 :: ", a1 == a2);

// Any iterable object can be used
const iter = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
  },
};

console.log("Array.from(iter):: ", Array.from(iter));

// the arguments objects can now easily be casted into an array
function getArgsArray() {
  return Array.from(arguments);
}

console.log("getArgsArray:: ", getArgsArray("p", "a", "t", "t", "y")); // don't get it

// from() will happily use a custom object with required properties
const arrayLikeObject = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  length: 4,
};
console.log("Array.from:: ", Array.from(arrayLikeObject));

console.log(
  "arrrrray::: ",
  Array.from({
    0: "a1",
    7: "b1",
    2: "c1",
    3: "d1",
    length: 3,
  })
);

//* third optional
const a10 = [1, 2, 3, 4];
const a20 = Array.from(a10, (x) => x ** 2);
const a30 = Array.from(
  a10,
  function (x) {
    return x ** this.exponent;
  },
  { exponent: 2 }
);

console.log("a20:: ", a20); // [1, 4, 9, 16]
console.log("a30:: ", a30); // [1, 4, 9, 16]

// ********* Array.of() *********
console.log("Array.of:: ", Array.of(1, 2, 3, 4));
console.log("Array.of-objects:: ", Array.of(arrayLikeObject));
console.log("Array.of:: ", Array.of(undefined)); // [undefined]

//* --------------- Array Holes ---------------
console.log("--------------- Array Holes ---------------");

const options = [, , , , ,]; // creates an array with 5 items
console.log("options.length:: ", options.length); // 5
console.log("options:: ", options); // [, , , , ,];

// example
const opt = [1, , , , 5];
for (const option of opt) {
  console.log("option:: ", option === undefined); // false true true true false
}

// Array
const a = Array.from([, , ,]); // Array of 3 holes created with ES6's Array.from()
for (const val of a) {
  console.log("val===undefined:: ", val === undefined);
}

// spread operator
console.log("Array.of-spread-operator:: ", Array.of(...[, , ,])); // [undefined, undefined, undefined]

for (const [index, value] of opt.entries()) {
  console.log("value", value);
}

// examples
const opts = [1, , , , 5];
//* map() will skip the holes entirely
console.log(
  "options.map:: ",
  opts.map(() => 6) // [6, undefined, undefined, undefined, 6]
);
//* join() treats holes as empty strings
console.log("options.join:: ", opts.join("-")); // "1----5"

// !  avoid using array holes in your code. Prefer to use an explicit undefined in place of a hole.

// ******************** Indexing into Arrays ********************
//* To get and set array values, you use square brackets and provide the zero-based numeric index */
console.log("******************** Indexing into Arrays ********************");
let cols = ["red", "blue", "green"];
console.log("cols[0]:: ", cols[0]);
cols[2] = "black";
cols[3] = "brown";
cols[33] = "brown";

console.log("cols:: ", cols);

// creates an empty array
let namess = [];
console.log("namess:: ", namess.length);

let colores = ["rojo", "azul", "verde"];
colores.length = 2; // the length to 2 removes the last item
console.log("colores[2]:: ", colores[2]);

let c = ["red", "blue", "green"];
c.length = 4;
console.log("c[3]:: ", c[3]); // undefined - Position 3 does not exist in the array

// * the length property can also be helpful in adding items to the end of an array,
let cc = ["red", "blue", "green"];
cc[cc.length] = "black";
cc[cc.length] = "brown";
console.log("cc:: ", cc);

let clrs = ["red", "blue", "green"]; // creates an array with three strings
clrs[99] = "black"; // add a color (position 99)
console.log("length-with-undefined-positions:: ", clrs.length); // 100
// ! Arrays can contain a maximum of 4,294,967,295 items

// ********************* Detecting Arrays *********************
console.log("********************* Detecting Arrays *********************");
// * instanceof
// ! The one problem with instanceof is that it assumes a single global execution context.
if (clrs instanceof Array) {
  // do sth on the array
  console.log("is an array... - instanceof");
}
// !  determine if a given value is an array regardless of the global execution context in which it was created
if (Array.isArray(clrs)) {
  // do sth on the array
  console.log("is an array...Array.isArray");
}

// ********************* Iterator Methods *********************
console.log("******************** Iterator Methods *********************");

/*
 * 3 methods are exposed on the Array prototype: keys(), values(), and entries(
 *  keys() - will return an iterator of the array’s indices
 * values() will return an iterator of the array’s elements
 * entries() will return an iterator of index/value pairs
 */
const ab = ["foo", "bar", "baz", "qux"];
// because these methods return iterators, you can funnel their contents into array instances using Array.from()
const abKeys = Array.from(ab.keys());
const abValues = Array.from(ab.values());
const abEntries = Array.from(ab.entries());

console.log("abKeys:: ", abKeys);
console.log("abValues:: ", abValues);
console.log("abEntries:: ", abEntries);

for (const [idx, element] in ab.entries()) {
  console.log("idx:: ", idx);
  console.log("element:: ", element);
}

// ******************** Copy and Fill Methods ********************
console.log("******************* Copy and Fill Methods ********************");
/*
 * two methods: fill() and copyWithin() - allow for batch fill and copy inside an array.
 */
const zeroes = [0, 0, 0, 0, 0];

// fill the entire array with 5
zeroes.fill(5);
console.log("zeroes-filled-with-5:: ", zeroes); // [5,5,5,5,5]
zeroes.fill(0); // reset

// find all indices >=3 with 6
zeroes.fill(6, 3);
console.log("zeroes-indices:: ", zeroes);
zeroes.fill(0);

// fill all indices >=1 and <3 with 7
zeroes.fill(7, 1, 3);
console.log("zeroes-indices-ranges:: ", zeroes); //[0,7,7,0,0]
zeroes.fill(0); //reset

// fill all indices >=1 and < 4 with 8
// (-4 + zeroes.length = 1)
// (-1 + zeroes.length = 4)
zeroes.fill(8, -4, -1);
console.log("zeroes-negative-indices:: ", zeroes); // [0, 8, 8, 8, 0]

//* fill() silently ignores ranges that exceed the boundaries of the array, are zero length, or go backwards:
// const zeroes = [0, 0, 0, 0, 0];
zeroes.fill(0);
console.log("zeroes:: ", zeroes);

// fill with too low indices is noop
zeroes.fill(1, -10, -6);
console.log("zeroes-too-low-indices:: ", zeroes);

// Fill with too high indices is noop
zeroes.fill(1, 10, 15);
console.log("too-high-indices:: ", zeroes); // [0, 0, 0, 0, 0]

// Fill with reversed indices is noop
zeroes.fill(2, 4, 2);
console.log("reversed-indices", zeroes); // [0, 0, 0, 0, 0]

// fill with partial index overlap is best effort
zeroes.fill(4, 3, 10);
console.log("zeroes:: ", zeroes);

// * copyWithin() - instead performs an iterative shallow copy of some of the array and overwrites existing values beginning at the provided index

let ints,
  reset = () => (ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
reset();

// copy the contents of ints beginning at index 0 to the values beginning at index 5.
// stops when it reaches the end of the array either in the source
// indices or the destination indices

ints.copyWithin(2);
console.log("ints-copyWithin:: ", ints);
reset();

// copy the contents of ints beginning at index 5 to the values beginning at index 0
ints.copyWithin(2, 5);
console.log("ints-copyWithin:: ", ints);
reset();

// copy the contents of ints beginning at index 0 and ending at index 3 to values
// beginning at index 4

ints.copyWithin(4, 0, 4);
console.log("ints-multiple-indices:: ", ints);
reset();

// The JS engine will perform a full copy of the range of values before inserting,
// so there is no danger of overwrite during the copy.
ints.copyWithin(6, 0, 6);
console.log("copyWithin-indices-overwrite", ints); // [0, 1, 0, 1, 2, 3, 4, 5, 8, 9]
reset();

// Support for negative indexing behaves identically to fill() in that negative
// indices are calculated relative to the end of the array
ints.copyWithin(-4, -7, -3);
console.log(ints); // [0, 1, 2, 3, 4, 5, 3, 4, 5, 6]

/*
 * fill() silently ignores ranges that exceed the boundaries of the array, are zero length, or go backwards:
 */

let integers,
  resetCopyWithin = () => (integers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

resetCopyWithin();

// Copy with too low indices is noop
integers.copyWithin(1, -15, -12);
console.log(integers); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
resetCopyWithin();

// Copy with too high indices is noop
integers.copyWithin(1, 12, 15);
console.log(integers); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
resetCopyWithin();

// Copy with reversed indices is noop
integers.copyWithin(2, 4, 2);
console.log(integers); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
resetCopyWithin();

// Copy with partial index overlap is best effort
integers.copyWithin(4, 7, 10);
console.log(integers); // [0, 1, 2, 3, 7, 8, 9, 7, 8, 9];

// *************** Conversion Methods ***************
//* all objects have toLocaleString(), toString(), and valueOf() methods. */

console.log("*************** Conversion Methods ***************");
/*
 *The toString() and valueOf() methods return the same value when called on an array. The result is a comma-separated string

 */
let clr = ["red", "blue", "green"];
console.log("clr.toString():: ", clr.toString());
console.log("clr.valueOf():: ", clr.valueOf());
console.log("clr.valueOf():: ", clr);
// ! Because alert() expects a string, it calls toString() behind the scenes to get the same result as when toString() is called directly.

//* ----------- toLocaleString() -----------

let personOne = {
  toLocaleString() {
    return "Nikolaos";
  },
  toString() {
    return "Nicholas";
  },
};
let personTwo = {
  toLocaleString() {
    return "Grigorios";
  },
  toString() {
    return "Greg";
  },
};

let people = [personOne, personTwo];
console.log(people); // Nicholas,Greg

console.log(people.toString()); // Nicholas,Greg
console.log(people.toLocaleString()); // Nikolaos,Grigorios

//! The inherited methods toLocaleString(), toString(), and valueOf() each return the array items as a comma-separated string

//* ----------- join() Method -----------
let co = ["red", "green", "blue", "yellow"];
console.log("join:: ", co.join("||"));

//! If no value or undefined is passed into the join() method, then a comma is used as the separator.  If an item in the array is null or undefined , it is represented by an empty string

// ******************** Stack Methods ********************
console.log("******************** Stack Methods ********************");

// ! LIFO
let color = new Array(); // create an array
let cnt = color.push("red", "green"); // push two items
console.log("cnt:: ", cnt); // 2
console.log("color:: ", color); // 2

cnt = color.push("black");
console.log("cnt:: ", cnt);

let item = color.pop();
console.log("item:: ", item);
console.log("color.length:: ", color.length);

//
let literalNumbers = ["one", "two", "three"];
literalNumbers.push("five");
literalNumbers[7] = "seven";
console.log("literalNumbers.length :: ", literalNumbers.length);
console.log("literalNumbers:: ", literalNumbers);

let itm = literalNumbers.pop();
console.log("literalNumbers:: ", literalNumbers);

// ******************** Queue Methods ********************
console.log("******************** Queue Methods ********************");
// ! FIFO
let song = new Array();
let counter = song.push("song1", "song2");
console.log("counter:: ", counter);

counter = song.push("song3");
console.log("counter:: ", counter);

let it = song.shift(); // get the first item
console.log("it:: ", it);
console.log("colors.length:: ", song.length);

// * By using unshift() in combination with pop(), it’s possible to emulate a queue in the opposite direction

let title = new Array();
let t = title.unshift("t1", "t2"); // push two items
console.log("t-length:: ", t); // 2
console.log("title:: ", title);

t = title.unshift("t-unshift");
console.log("t-unshift:: ", t);
console.log("t-title:: ", title);

let itms = title.pop();
console.log("itms:: ", itms);
console.log("title.length:: ", title.length);

//* ******************** Reordering Methods ********************
console.log("******************** Reordering Methods ********************");
let values = [1, 2, 3, 4, 5, 6];
values.reverse();
console.log("values-reversed:: ", values);

//* the sort() method puts the items in ascending order
//* the sort() method calls the String() casting function on every item and then compares the strings to determine the correct order */

let v = [0, 1, 5, 10, 15];
v.sort();
console.log("values-sort:: ", v);

//* SORT - A comparison function accepts two arguments
function compare(value1, value2) {
  if (value1 < value2) {
    return -1;
  } else if (value1 > value2) {
    return 1;
  } else {
    return 0;
  }
}

let valuess = [0, 1, 5, 10, 15];
valuess.sort(compare);
console.log("sort-correctly:: ", valuess); // 0,1,5,10,15

//*
function compare(value1, value2) {
  if (value1 < value2) {
    return 1;
  } else if (value1 > value2) {
    return -1;
  } else {
    return 0;
  }
}

let valuee = [0, 1, 5, 10, 15];
valuee.sort(compare);
console.log("----> ", valuee); // 15,10,5,1,0

// ! descending order if you simply switch the return values

//* he compare function can be shortened and defined as an inline arrow function

let vv = [0, 1, 5, 10, 15, 10];
vv.sort((a, b) => a - b);
console.log("vv-sorted-as-an-arrow-function:: ", vv);
console.log(
  "ordering-reversed:: ",
  vv.sort((a, b) => b - a)
);

// ******************** Manipulation Methods ********************
console.log("******************** Manipulation Methods ********************");
/*
 * When no arguments are passed in, concat() simply clones the array and returns it.
 * concat() appends each item in these arrays to the end of the result
 * If the values are not arrays, they are simply appended to the end of the resulting array
 */
console.log("------------- concat -------------");

let colors1 = ["red", "green", "blue"];
let colors2 = colors1.concat("yellow", ["black", ["brown"]]);

console.log("colors1", colors1);
console.log("colors2", colors2);

let colors10 = ["red", "green", "blue"];
let newColors = ["black", "brown"];
let moreNewColors = {
  [Symbol.isConcatSpreadable]: true,
  length: 2,
  0: "pink",
  1: "cyan",
};

newColors[Symbol.isConcatSpreadable] = false;

// Force the array to not be flattened
let colors20 = colors10.concat("yellow", newColors);

// Force the array-like object to be flattened
let colors30 = colors10.concat(moreNewColors);
console.log(colors10); // ["red", "green","blue"]
console.log(colors20); // ["red", "green", "blue", "yellow", ["black", "brown"]]
console.log(colors30); // ["red", "green", "blue", "pink, "cyan"]

console.log("------------- SLICE -------------");
//* slice() - the starting and stopping positions of the items to return

//* the method returns all items between the start position and the end position, not including the item in the end position. Keep in mind that this operation does not affect the original array in any way */

let colorsSlice = ["red", "green", "blue", "yellow", "purple"];
console.log("colorsSlice:: ", colorsSlice);

let colorsOne = colorsSlice.slice(1);
let colorsTwo = colorsSlice.slice(1, 4);

console.log("colorsOne:: ", colorsOne);
console.log("colorsTwo:: ", colorsTwo);

// !  calling slice(-2, -1) on an array with five items is the same as calling slice(3, 4) . If the end position is smaller than the start, then an empty array is returned.

console.log("------------- SPLICE -------------");

/*
 The main purpose of splice() is to insert items into the middle of an array

 * deletion - the position of the first item to delete and the number of items to delete
 * insertion - the starting position, 0 (the number of items to delete), and the item to insert.
 * replacement -  the starting position, the number of items to delete, and any number of items to insert
 */

//* deletion
console.log("------- deletion -------");

let clo = ["red", "green", "blue"];
console.log("clo:: ", clo); // green,blue

let removed = clo.splice(0, 1); // remove the first item
console.log("clo:: ", clo); // green,blue
console.log("clo-removed:: ", removed); // red - one item array

//* insertion
console.log("------- insertion -------");

removed = clo.splice(1, 0, "yellow", "orange"); // insert two items at position 1
console.log("clo:: ", clo); // green,yellow,orange,blue
console.log("insertion:: ", removed); // empty array

//* replacement
console.log("------- replacement  -------");

let cars = ["car1", "car2", "car3", "car4"];
console.log("cars:: ", cars);

removedCars = cars.splice(2, 1, "red", "purple");
console.log("replacement :: ", cars);
console.log("removedCars:: ", removedCars);

console.log("**************** Search and Location Methods ****************");
//* TWO strategies:: searching by strict equivalence, and searching with a predicate function

console.log("-------------- Strict Equivalence --------------");
// indexOf() - lastIndexOf() - includes()
// * arguments::: the item to look for and an optional index from which to start looking
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

console.log("numbers.indexOf(4) :: ", numbers.indexOf(4));
console.log("numbers.lastIndexOf(4) :: ", numbers.lastIndexOf(4));
console.log("numbers.includes(4) :: ", numbers.includes(4));

console.log("numbers.indexOf(4, 4):: ", numbers.indexOf(4, 4));
console.log("numbers.lastIndexOf(4, 4):: ", numbers.lastIndexOf(4, 4));
console.log("numbers.includes(4, 7):: ", numbers.includes(4, 7));

console.log("-------------- Predicate Search --------------");

/*
 * takes the form predicate(element, index, array)
 * find() returns the first matching element
 * and findIndex() returns the index of the first matching element
 */
const peopleList = [
  {
    name: "Matt",
    age: 27,
  },
  {
    name: "Nicholas",
    age: 29,
  },
  {
    name: "Patty",
    age: 26,
  },
];

console.log(
  "find-<28 :: ",
  peopleList.find((element, index, array) => element.age < 28)
);
console.log(
  "findIndex-<28 :: ",
  peopleList.findIndex((element, index, array) => element.age < 28)
);

const evens = [2, 4, 6];
console.log(
  "findIndex:: ",
  evens.findIndex((element, index, array) => {
    console.log("element:: ", element);
    console.log("index:: ", index);
    console.log("array:: ", array);
    console.log("****************");
    return element === 4;
  })
);
// ! Last element of array will never be inspected after match is found

console.log("-------------- Iterative Methods --------------");
/*
 * a function to run on each item and an optional scope object in which to run the function (affecting the value of this).

 * every() - Runs the given function on every item in the array and returns true if the function returns true for every item.

 * filter() - Runs the given function on every item in the array and returns an array of all items for which the function returns true.

 * forEach() - Runs the given function on every item in the array. This method has no return value.

 * map() - Runs the given function on every item in the array and returns the result of each function call in an array

 * some() - Runs the given function on every item in the array and returns true if the function returns true for any one item.

 */

console.log("------------ SOME ------------");
let numbersSome = [1, 2, 3, 4, 5, 4, 3, 2, 1];

let everyResult = numbersSome.every((item, index, array) => item > 2);
console.log("everyResult:: ", everyResult); // false

console.log("------------ EVERY ------------");
let someResult = numbersSome.some((item, index, array) => item > 2);
console.log("someResult:: ", someResult); // true

console.log("------------ FILTER ------------");
let numberFilter = [1, 2, 3, 4, 5, 4, 3, 2, 1];

let filterResult = numberFilter.filter((item, index, array) => item > 2);
console.log("filterResult", filterResult); // [3,4,5,4,3]

console.log("------------ MAP ------------");
let numberMap = [1, 2, 3, 4, 5, 4, 3, 2, 1];

let mapResult = numberMap.map((item, index, array) => item * 2);
console.log("mapResult:: ", mapResult);

console.log("------------ FOREACH ------------");

let numberForEach = [1, 2, 3, 4, 5, 4, 3, 2, 1];

numberForEach.forEach((item, index, array) => {
  console.log("FOREACH:: ", item, index);
});

console.log("-------------- Reduction Methods --------------");
/*
* iterate over all items in the array and build up a value that is ultimately returned
* The reduce() method does this starting at the first item and traveling toward the last, whereas reduceRight() starts at the last and travels toward the first.

* ARGUMENTS:
* a function to call on each item
* optional initial value

* FOUR ARGS::
* the previous value,
* the current value,
* the item’s index,
* and the array object

*/

// * EXAMPLE: adding all numbers in an array.

console.log("--------- reduce ---------");

let nn = [1, 2, 3, 4, 5, 6];
let sum = nn.reduce((prev, cur, index, array) => prev + cur, 0);

console.log("sum-reduce-method;: ", sum);

console.log("--------- reduceRight ---------");

let nnRR = [1, 2, 3, 4, 5, 6];
let sumReduceR = nnRR.reduceRight(function (prev, cur, index, array) {
  return prev + cur;
});

console.log("sumReduceR:: ", sumReduceR);

console.log("-------------- TYPED ARRAYS --------------");
//* the typed array is a construct designed for efficiently passing binary data to native libraries

console.log("--------- WebGL - Web Graphics Library ---------");
//* the graphics driver APIs expected arrays of numbers to be passed to them in a binary format, which of course is nothing like the Java­ Script array’s format in memory */

console.log("--------- Emergence of Typed Arrays ---------");
// * by Mozilla - CanvasFloat­ Array, a C-style array of floating point numbers that offered a JavaScript interface
// ! CanvasFloatArray using this type allowed the JavaScript runtime to allocate, read, and write an array that could be passed directly to and from the graphics driver API

console.log("--------- Using ArrayBuffers ---------");
/*
 * Float32Array is actually one type of “view” that allows the JavaScript runtime to access a block of allocated memory called an ArrayBuffer. The ArrayBuffer is the fundamental unit referred to by all typed arrays and views.
 */

// ! ArrayBuffer is a normal JavaScript constructor that can be used to allocate a specific number of bytes in memory.

const buf = new ArrayBuffer(16); // allocates 16 bytes of memory
console.log("object", buf.byteLength); // 16
// * An ArrayBuffer can never be resized once it is created. However, you are able to copy all or part of an existing ArrayBuffer into a new instance using SLICE()

const buf1 = new ArrayBuffer(16);
const buf2 = buf1.slice(4, 12);

console.log("buf1:: ", buf1); // <00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>
console.log("buf2:: ", buf2); // <00 00 00 00 00 00 00 00>
console.log("buf1.byteLength:: ", buf1.byteLength);
console.log("buf2.byteLength:: ", buf2.byteLength);

/*
* C++ malloc()
* When malloc() fails to allocate, it returns a null pointer. If ArrayBuffer allocation fails, it throws an error.

* A malloc() call can take advantage of virtual memory, so the maximum size of the allocation is only bounded by the addressable system memory. ArrayBuffer allocation cannot exceed Number.MAX _ SAFE _ INTEGER (2 ^ 53) bytes.

* ...

*/
console.log(Number.MAX_SAFE_INTEGER);

/* The contents of an ArrayBuffer cannot be read or written with only a reference to the buffer instance. To read or write data inside, you must do so with a view. There are different types of views, but they all refer to binary data stored in an ArrayBuffer */

console.log("--------- DataViews ---------");
//* A DataView does not assume anything about the buffer contents and is not iterable

const buff = new ArrayBuffer(16);

// DataView default to use the entire ArrayBuffer

const fullDataView = new DataView(buff);
console.log("DataView.byteOffset:: ", fullDataView.byteOffset);
console.log("DataView.byteLength:: ", fullDataView.byteLength);
console.log("DataView.buffer:: ", fullDataView.buffer === buff);

// Constructor takes an optional byte offset and byte length
// byteOffset=0 begins the view at the start of the buffer
// byteLength=8 restricts the view to the first 8 bytes

const firstHalfDataView = new DataView(buf, 0, 8);
console.log(firstHalfDataView.byteOffset); // 0
console.log(firstHalfDataView.byteLength); // 8
console.log(firstHalfDataView.buffer === buf); // true

// DataView will use the remainder of the buffer unless specified
// byteOffset=8 begins the view at the 9th byte of the buffer
// byteLength default is the remainder of the buffer
const secondHalfDataView = new DataView(buf, 8);
console.log(secondHalfDataView.byteOffset); // 8
console.log(secondHalfDataView.byteLength); // 8
console.log(secondHalfDataView.buffer === buf); // true

console.log("--------- ElementType ---------");

// Allocate two bytes of memory and declare a DataView
const bufDataView = new ArrayBuffer(2);
const view = new DataView(bufDataView);

// Demonstrate that the entire buffer is indeed all zeroes
// Check the first and second byte
console.log(view.getInt8(0)); // 0
console.log(view.getInt8(1)); // 0

// Check the entire buffer
console.log(view.getInt16(0)); // 0

// Set the entire buffer to ones
// 255 in binary is 11111111 (2^8 – 1)
view.setUint8(0, 255);

// DataView will automatically cast values to the designated ElementType
// 255 in hex is 0xFF
view.setUint8(1, 0xff);
// The buffer is now all ones, which when read as a
// two's complement signed integer should be -1
console.log(view.getInt16(0)); // -1

console.log("--------- Big-Endian and Little-Endian ---------");
// Allocate two bytes of memory and declare a DataView
const buff1 = new ArrayBuffer(2);
const view1 = new DataView(buff1);
// Fill the buffer so that the first bit and last bit are 1
view1.setUint8(0, 0x80); // Sets leftmost bit to 1
view1.setUint8(1, 0x01); // Sets rightmost bit to 1
// Buffer contents (spaced for readability):
// 0x8 0x0 0x0 0x1
// 1000 0000 0000 0001
// Read a big-endian Uint16
// 0x80 is the high byte, 0x01 is the low byte
// 0x8001 = 2^15 + 2^0 = 32768 + 1 = 32769
console.log(view1.getUint16(0)); // 32769
// Read a little-endian Uint16
// 0x01 is the high byte, 0x80 is the low byte
// 0x0180 = 2^8 + 2^7 = 256 + 128 = 384
console.log(view1.getUint16(0, true)); // 384
// Write a big-endian Uint16
view1.setUint16(0, 0x0004);
// Buffer contents (spaced for readability):
// 0x0 0x0 0x0 0x4
// 0000 0000 0000 0100

console.log(view.getUint8(0)); // 0
console.log(view.getUint8(1)); // 4
// Write a little-endian Uint16
view.setUint16(0, 0x0002, true);
// Buffer contents (spaced for readability):
// 0x0 0x2 0x0 0x0
// 0000 0010 0000 0000
console.log(view.getUint8(0)); // 2
console.log(view.getUint8(1)); // 0

console.log("**************** Corner Cases ****************");
//* A DataView will only complete a read or write if there is sufficient buffer space to do so
/*
const buff2 = new ArrayBuffer(6);
const view2 = new DataView(buff2);

// Attempt to get a value that partially extends past end of buffer
view2.getInt32(4);
// RangeError

// Attempt to get a value past the end of the buffer
view2.getInt32(8);
// RangeError

// Attempt to get a value past the end of the buffer
view2.getInt32(-1);
// RangeError

// Attempt to set a value that extends past end of buffer
view2.setInt32(4, 123);
// RangeError

 */
/*
const buf = new ArrayBuffer(1);
const view = new DataView(buf);
view.setInt8(0, 1.5);
alert(view.getInt8(0));
// 1
view.setInt8(0, [4]);
alert(view.getInt8(0));
// 4
view.setInt8(0, "f");
alert(view.getInt8(0));
// 0
view.setInt8(0, Symbol); // TypeError
 */
// *************** Typed Arrays ***************

// *************** Typed Array Behavior ***************

const ints1 = new Int16Array([1, 2, 3]);
const doubleints1 = ints1.map((x) => 2 * x);
console.log(doubleints1 instanceof Int16Array); // true

const ints2 = new Int16Array([1, 2, 3]);
for (const int of ints2) {
  console.log(int);
}
// 1
// 2
// 3
console.log(Math.max(...ints2)); // 3

console.log(" ********* Merging, Copying, and Changing Typed Arrays *********");
/*
➤➤ concat()
➤➤ pop()
➤➤ push()
➤➤ shift()
➤➤ splice()
➤➤  unshift()
*/
console.log(" ********* Underflow and Overflow *********");

console.log(" ********* THE MAP TYPE *********");
/* prior to ES6 implementing key/value in JS was by using Object */

const map = new Map();
console.log("map:: ", map);

// Initialize map with nested arrays
const m1 = new Map([
  ["key1", "val1"],
  ["key2", "val2"],
  ["key3", "val3"],
  ["key4", "val4"],
]);

console.log(m1.size); // 3

// Initialize map with custom-defined iterator
const m2 = new Map({
  [Symbol.iterator]: function* () {
    yield ["key1", "val1"];
    yield ["key2", "val2"];
    yield ["key3", "val3"];
  },
});
console.log(m2.size); // 3

// Map expects values to be key/value whether they are provided or not
const m3 = new Map([[]]);
console.log("m3-map", m3.has(undefined)); // true
console.log("m3-map", m3.get(undefined)); // undefined

/* Key/value pairs can be added after initialization with set(), queried with get() and has(), counted with the size property, and removed with delete()and clear():
 */

const mp = new Map();
console.log("--> ", mp.has("firstName")); // false
console.log("--> ", mp.get("firstName ")); // undefined
console.log("--> ", mp.size); // 0

mp.set("firstName", "Matt").set("lastName", "Frisbie");

console.log("map-with-values:: ", mp.has("firstName")); // true
console.log("map-with-values:: ", mp.get("firstName")); // Matt
console.log("map-with-values:: ", mp.size);

mp.delete("firstName"); // deletes only this key/value pair

console.log("mp-after-deleted:: ", mp); // Map { 'lastName' => 'Frisbie' }

console.log("result-map-after-deleted:: ", m.has("firstName")); // false
console.log("result-map-after-deleted:: ", m.has("lastName")); // true
console.log("result-map-after-deleted:: ", m.size); // 1

mp.clear();
console.log("mp-after-deleted:: ", mp); // {}

console.log("map-clear:: ", mp.has("firstName")); // false
console.log("map-clear:: ", mp.has("lastName")); // false
console.log("map-clear:: ", mp.size); // 0

//  set() method returns the Map instance, so it is possible to chain multiple set operations
const mm = new Map().set("key1", "value1");

mm.set("key2", "val2").set("key3", "value3");

console.log("m.size-chain-multiple-set-op:: ", mm.size);
console.log("m.size-chain-multiple-set-op:: ", mm);

// ! a Map can use any JavaScript data type as a key -  It uses the “SameValueZero” comparison operation

const mapa = new Map();

const functionKey = function () {};
const symbolKey = Symbol();
const objectKey = new Object();

mapa.set(functionKey, "functionValue");
mapa.set(symbolKey, "symbolValue");
mapa.set(objectKey, "objectValue");

console.log("mapa.get:: ", mapa.get(functionKey)); // functionValue
console.log("mapa.get:: ", mapa.get(symbolKey)); // symbolValue
console.log("mapa.get:: ", mapa.get(objectKey)); // objectValue

// SameValueZero checks mean separate instances will not collide
console.log(
  "sameValueZero:: ",
  mapa.get(function () {})
);

/* As with strict equivalence, objects and other “collection” types used for keys and values remain unchanged inside a Map when their contents or properties are altered:
 */
const mp1 = new Map();

const objKey = {},
  objVal = {},
  arrKey = [],
  arrVal = [];

mp1.set(objKey, objVal);
mp1.set(arrKey, arrVal);

objKey.foo = "foo";
objVal.bar = "bar";
arrKey.push("foo1");
arrVal.push("bar1");

console.log("mp1.get(objKey)", mp1.get(objKey)); // {bar: "bar"}
console.log("mp1.get(arrKey)", mp1.get(arrKey)); // ["bar"]

const mm1 = new Map();
const am = 0 / "", // NaN
  b = 0 / "", // NaN
  pz = +0,
  nz = -0;

console.log("a===b:: ", am === b); // false
console.log("pz===nz:: ", pz === nz); // true

mm1.set(am, "foo");
mm1.set(pz, "bar");

console.log("collision:: ", mm1.get(b)); // foo
console.log("collision:: ", mm1.get(nz)); // bar

console.log("************* Order and Iteration *************");
// ! Map instances maintain the order of key/value insertion and allow you to perform iterative operations following insertion order

const m4 = new Map([
  ["key1", "val1"],
  ["key2", "val2"],
  ["key3", "val3"],
]);

console.log("map-entries:: ", m3.entries === m4[Symbol.iterator]); //true

for (let [key, val] of m4.entries()) {
  console.log("pair:: ", key);
  console.log("pair:: ", val);
}

for (let pair of m4[Symbol.iterator]()) {
  console.log(pair);
}

//* entries() is the default iterator */
//* spread operator can be used convert a Map into an array

console.log("------- spread-operator in maps -------");
console.log("spread-opertaror-convert-mapToArray:: ", [...m4]);

// FOREACH
console.log("------- FOREACH in maps -------");
m4.forEach((val, key) => console.log(`${key} -> ${val}`));

// * keys() and values() return an iterator
console.log("------- keys() in maps -------");
for (let key of m4.keys()) {
  console.log("keys() :: ", key);
}

console.log("------- values() in maps -------");
for (let key of m4.values()) {
  console.log("values(): ", key);
}

// * the references inside the Map cannot be altered
const mm2 = new Map([["key1", "val"]]);

// string primitive as key is unaltered
for (let k of mm2.keys()) {
  k = "newK";
  mm2.set(k, "kkk");
  console.log("k:: ", k); // newK
  console.log("mm2.get:: ", mm2.get("key1")); // val1
}

console.log("mm2:: ", mm2);

const keyObj = { id: 1 };
const keyObj2 = { id: 2 };
const mmm = new Map([
  [keyObj, "vaaaaal1"],
  [keyObj2, "vaaaaal2"],
]);

console.log("mmm:: ", mmm);

// Key object property is altered, but the object still refers
// to the same value inside the map

for (let key of mmm.keys()) {
  console.log("-------------");
  console.log("key", key);
  console.log("-------------");

  key.id = "newKey-obj"; // validar esto when programming
  console.log("key:: ", key);
  console.log("m.get(keyObj):: ", mmm.get(keyObj));
}
console.log("mmm:: ", mmm);
console.log("keyObj:: ", keyObj); // the same key changed - newKey-obj
console.log("keyObj2:: ", keyObj2); // the same key changed - newKey-obj

console.log("********* Choosing Between Objects and Maps *********");

console.log("********* THE WEAKMAP TYPE *********");
/*
 * Delete Performance::
 * Workarounds for pseudo-deleting object properties include assigning undefined or null as the property value, but in many cases this is an obnoxious or unsuitable compromise
 */
const wm = new WeakMap();

const key1 = { id: 1 },
  key2 = { id: 2 },
  key3 = { id: 3 };

// Initialize WeakMap with nested arrays
const wm1 = new WeakMap([
  [key1, "val1"],
  [key2, "val2"],
  [key3, "val3"],
]);

console.log("weakMap:: ", wm1.get(key1)); // val1
console.log("weakMap:: ", wm1.get(key2)); // val2
console.log("weakMap:: ", wm1.get(key3)); // val3

//* Initialization is all-or-nothing, a single bad key will throw an error and abort the initialization
/*
const wm2 = new WeakMap([
  [key1, "val1"],
  ["BADKEY", "val2"],
  [key3, "val3"],
]);

// TypeError: Invalid value used as WeakMap key
typeof wm2;
 */
// ReferenceError: wm2 is not defined

//* Primitives can still be used with an object wrapper
// ! revisar porque no cuerre xd :(
/*
const stringKey = new String("key1");
const wm3 = new WeakMap([stringKey, "val1"]);

console.log("wm3.get(stringKey)", wm3.get(stringKey)); //"val1"
 */
// * no entendi bien
const wm2 = new WeakMap();

const keyWM1 = { id: 1 },
  keyWM2 = { id: 2 };

console.log("wm1.has(keyWM1):: ", wm2.has(keyWM1)); // false
console.log("wm1.get(keyWM1):: ", wm2.get(keyWM1)); // undefined

wm2.set(keyWM1, "Matt").set(keyWM2, "PAtricia");

console.log("wm2.has(keyWM1) :: ", wm2.has(keyWM1));
console.log("wm2.get(keyWM1) :: ", wm2.get(keyWM1));

wm2.delete(keyWM1); // delete only this key.value pair

console.log("wm2.has(keyWM1)-delete:: ", wm2.has(keyWM1));
console.log("wm2.has(keyWM2)-delete:: ", wm2.has(keyWM2));

// *  chain multiple set operations together, including on the initial declaration
const keyOne = { id: 1 },
  keyTwo = { id: 2 },
  keyThree = { id: 3 };

const wm3 = new WeakMap().set(keyOne, "valOne");

wm3.set(keyTwo, "valTwo").set(keyThree, "valThree");

console.log("wm.get(keyOne)", wm3.get(keyOne));
console.log("wm.get(keyTwo)", wm3.get(keyTwo));
console.log("wm.get(keyThree)", wm3.get(keyThree));

console.log("**************** Weak Keys ****************");

const wmKeys = new WeakMap();
wmKeys.set({}, "val");
console.log("wmKeys:: ", wmKeys);

// Consider a slightly different example:
const container = {
  key: {},
};

wmKeys.set(container.key, "val");

function removeReference() {
  container.key = null;
}
removeReference();
console.log("wmKeys-referenced:: ", wmKeys);

console.log("************* Non-Iterable Keys *************");
/* The reason that WeakMap instances restrict keys to only objects is to preserve the convention that
values can only be retrieved from a WeakMap with a reference to the key object */

// * Utility
// * Private Variables
const wMap = new WeakMap();

class User {
  constructor(id) {
    this.idProperty = Symbol("id");
    this.setId(id);
  }

  setPrivate(property, value) {
    const privateMembers = wMap.get(this) || {};
    privateMembers[property] = value;
    wMap.set(this, privateMembers);
  }
  getPrivate(property, value) {
    return wMap.get(this)[property];
  }

  setId(id) {
    this.setPrivate(this.idProperty, id);
  }

  getId() {
    return this.getPrivate(this.idProperty);
  }
}

const user = new User(123);

console.log("user.getId()", user.getId());
user.setId(456);
console.log("user.getId()", user.getId());

console.log("************ DOM Node Metadata ************");
/*
 * Because WeakMap instances do not interfere with garbage collection, they are a terrific tool for cleanup-free metadata association

 */
// * MAP
/*
const ma = new Map();
const loginButton = document.querySelector("#login");

// Associates some metadata with the node
ma.set(loginButton, { disabled: true });
*/
// * WEAK MAP
/*
 * la eliminación del nodo del DOM permitiría al recolector de basura liberar la memoria asignada inmediatamente (asumiendo que no hay otras referencias persistentes al objeto).
 */
/*
const wMap1 = new WeakMap();

const loginButton = document.querySelector("#login");

// Associates some metadata with the node
wMap1.set(loginButton, { disabled: true });
*/

console.log("******************* THE SET TYPE *******************");

// * basic API
const s1 = new Set(["set1", "set2", "set3"]);
console.log("s.size - set:: ", s1.size);

// Initialize set with custom-defined iterator
const s2 = new Set({
  [Symbol.iterator]: function* () {
    yield "val1";
    yield "val2";
    yield "val3";
  },
});

console.log("s2.size:: ", s2.size);

const ss = new Set();

console.log('ss.has("Matt"):: ', ss.has("Matt")); // false
console.log("ss.size:: ", ss.size); //0

ss.add("Matt").add("Patty");
console.log('ss.has("Patty"):: ', ss.has("Patty"));
console.log("ss.size:: ", ss.size);

ss.delete("Patty");

console.log(s.has("Matt")); // false
console.log(s.has("Frisbie")); // true
console.log(s.size); // 1

ss.clear(); //destroys all values in this Set instance

console.log('ss.has("Matt"):: ', ss.has("Matt"));
console.log('ss.has("Patty"):: ', ss.has("Patty"));
console.log("ss.size:: ", ss.size);

//* chaining multiple operations together
const se = new Set().add();

//** Like Map, a Set can contain any JavaScript data type as a value */

const s3 = new Set();
const functionVal = function () {};

const symbolVal = Symbol();
const objectVal = new Object();

s3.add(functionVal);
s3.add(symbolVal);
s3.add(objectVal);

console.log("s.has(functionVal) :: ", s3.has(functionVal)); // true
console.log("s.has(symbolVal) :: ", s3.has(symbolVal)); // true
console.log("s.has(objectVal) :: ", s3.has(objectVal)); //true

// SameValueZero checks mean separate instances will not collide
console.log(
  "s.has(function(){})",
  s.has(function () {})
); // false
// ! Las comprobaciones de SameValueZero significan que las instancias separadas no colisionarán

// * objects and other collection types used for values remain unchanged inside a set when their contents or properties are altered

const set1 = new Set();

const objVal1 = {},
  arrVal1 = [],
  objVal2 = {},
  arrVal2 = [];

set1.add(objVal1).add(arrVal1);
set1.add(objVal2).add(arrVal2);

objVal1.bar = "bar";
arrVal1.push("bar");
objVal2.pat = "pat";
arrVal2.push("pat");

console.log("set1.has(objVal1)", set1.has(objVal1));
console.log("set1.has(arrVal1)", set1.has(arrVal1));

console.log("set1:: ", set1);

// ** delete() returns a Boolean indicating if that value was present in the set.
const setDelete = new Set();

setDelete.add("foo");
console.log("s.size:: ", setDelete.size);
setDelete.add("foo");
console.log("s.size:: ", setDelete.size);

// value was  present in the set
console.log("setDelete:: ", setDelete.delete("foo"));

// value was not present in the set
console.log("setDelete:: ", setDelete.delete("foo"));

console.log("**************** Order and Iteration ****************");
//* Sets maintain the order of value insertion and allow you to perform iterative operations following insertion order

const set2 = new Set(["val1", "val2", "val3"]);

console.log("set2.values:: ", set2.values === set2[Symbol.iterator]); //true
console.log("set2.keys:: ", set2.keys === set2[Symbol.iterator]); //true
// first way
for (let value of set2.values()) {
  console.log("value:: ", value);
}
// second way
for (let key of set2.keys()) {
  console.log("key:: ", key);
}
// third
for (let value of set2[Symbol.iterator]()) {
  console.log("value:: ", value);
}

// *spread operator
const set3 = new Set(["set1", "set2", "set3", "set4"]);
console.log("spread-opertator-in-sets:: ", [...set3]);

// * entries

const set4 = new Set(["pa", "tri", "cia"]);

//* returns an array array containing a duplicate of all values
for (let pair of set4.entries()) {
  console.log("pair:: ", pair);
}

//* to use a callback convention instead of an iterator, forEach(callback, opt_thisArgs) invokes the callback for each value

const set5 = new Set(["val1", "val2", "val3"]);

set5.forEach((val, dupVal) => console.log(`${val} -> ${dupVal}`));

const set6 = new Set(["val1"]);

// String primitive as value is unaltered
for (let value of set6.values()) {
  value = "newValue";
  console.log("value:: ", value); //newValue
  console.log('s.has("val1")', set6.has("val1")); //true
}

console.log("*****set6:: ", set6);

const valorObj = { id: 1 };
const valorObj2 = { id2: 2 };

const set7 = new Set([valorObj, valorObj2]);

// value object property is altered, but the object still exists inside the set

for (let value of set7.values()) {
  value.id = "newVal";
  console.log("value:: ", value);
  console.log("set7.has(valorObj)", set7.has(valorObj));
}

console.log("valorObj:: ", valorObj);
console.log("set7:: ", set7);

console.log("******** Defining Formal Set Operations **********");
/** Many developers will have an appetite for using
Set operations. This requires manual implementation, and it can either take the form of a subclassing Set or defining a utility library.  */

console.log("***************** THE WEAKSET TYPE ***************** ");
//* Values in a WeakSet can only be of type or inherit from Object—all other attempts to set a value with a non-object will throw a TypeError.

const wSet = new WeakSet();

const v1 = { id: 1 },
  v2 = { id: 2 },
  v3 = { id: 3 };

// initialize WeakSet with nested arrays
const wSet1 = new WeakSet([v1, v2, v3]);

console.log("wSet1.has(val1):: ", wSet1.has(v1)); // true
console.log("wSet1.has(val2):: ", wSet1.has(v2)); // true
console.log("wSet1.has(val3):: ", wSet1.has(v3)); // true

//* initialization is all-or-nothing, a single bad value will throw an error and abort the initialization
/*
const wSet2 = new WeakSet([v1, "BADVAL", v3]);

typeof wSet2;
*/

// Primitives can still be used with an object wrapper
const stringValue = new String("value1-set");
const wSet3 = new WeakSet([stringValue]);
console.log("wwSet3.has(stringValue):: ", wSet3.has(stringValue)); // true

// * Values can be added after initialization with add(), queried with has(), and removed with delete()

const ws = new WeakSet();
const val1 = { id: 1 },
  val2 = { id: 2 };

console.log(ws.has(val1)); // false
ws.add(val1).add(val2);

console.log(ws.has(val1)); // true
console.log(ws.has(val2)); // true

ws.delete(val1); // deletes only this value

console.log(ws.has(val1)); // false
console.log(ws.has(val2)); // true

const val11 = { id: 1 },
  val22 = { id: 2 },
  val32 = { id: 3 };

const wsws = new WeakSet().add(val11);

wsws.add(val22).add(val32);
console.log(wsws.has(val11)); // true
console.log(wsws.has(val22)); // true
console.log(wsws.has(val32)); // true
/** The add() method returns the WeakSet instance, so it is possible to chain multiple add operations together, including on the initial declaration */
//! the same as weak

console.log("******************* WEAK KEYS ****************");
//* as soon as this line is finished executing, the object value will be free for garbage collection

const wSetKey = new WeakSet();
wSetKey.add({}); // fresh obj

// const wssss = new WeakSet();

// const container1 = {
//   val: {},
// };

// wssss.add(container1.val);

// function removeReference() {
//   container1.val = null;
// }

console.log("******************* Non-Iterable Values ****************");

console.log("------------ Utility------------ ");

// example with regular SET
/** 
const disabledElements = new Set();
const loginButton = document.querySelector("#login");

// Tags the node as "disabled" by adding it to the corresponding set
disabledElements.add(loginButton);
 */

//!Para permitir que la recolección de basura reasigne la memoria del elemento, se puede usar un WeakSet:

console.log("*********** ITERATION AND SPREAD OPERATORS*********** ");

//* FOUR native collection reference types define a default iterator
//* array, all typed arrays, map, set

let iterableThings = [
  Array.of(1, 2, 3),
  (typedArr = Int16Array.of(3, 4, 5)),
  new Map([
    [5, 6],
    [7, 8],
  ]),
  new Set([9, 10]),
];

for (const iterableThing of iterableThings) {
  for (const x of iterableThing) {
    console.log("x:: ", x);
  }
}

//* spread operator

let arr1 = [1, 2, 3, 4];
let arr2 = [...arr1];
let arr3 = arr2;

console.log("arr1", arr1);
console.log("arr2", arr2);
console.log("arr3", arr3);
console.log("arr1 === arr2:: ", arr1 === arr2);

//* A los constructores que esperan un objeto iterable simplemente se les puede pasar la instancia iterable que se clonará:

let map1 = new Map([
  [1, 2],
  [3, 4],
]);
let map2 = new Map(map1);

console.log("map1:: ", map1);
console.log("map2:: ", map2);

// It also allows for partial array construction:
let array1 = [1, 2, 3, 4, 5];
let array2 = [0, ...array1, 6, 7];
console.log("array2:: ", array2);

let ar1 = [{}, {}];
let ar2 = [...ar1];

console.log("ar1", ar1);
console.log("ar2", ar2);

ar1[0].foo = `bar`;
ar1[1].foo = `bar1`;

console.log("ar1:: ", ar1);
console.log("ar2[0]:: ", ar2[0]);

// examples
let arrOne = [1, 2, 3, 4];

// copy array into typed array
let typedArrOne = Int16Array.of(...arrOne);
let typedArrTwo = Int16Array.from(arrOne);

console.log("typedArrOne:: ", typedArrOne); // Int16Array [1, 2, 3, 4]
console.log("typedArrTwo:: ", typedArrTwo); // Int16Array [1, 2, 3, 4]

// copy array into map
let map4 = new Map(arrOne.map((x) => [x, `vaaaaaal` + x]));
console.log("map4:: ", map4);

// copy array in to set
let set = new Set(typedArrTwo);
console.log("set:: ", set);

// copy set back into array
let arr22 = [...set];
console.log("arr22:: ", arr22);

//  **************** SUMMARY ****************

/*
 * primitive values in JavaScript can be accessed as if they were objects. There are three primitive wrapper types: Boolean, Number, and String.
 * Each of the wrapper types maps to the primitive type of the same name.
* When a primitive value is accessed in read mode, a primitive wrapper object is instantiated so that it can be used to manipulate the data.
 *As soon as a statement involving a primitive value is executed, the wrapper object is destroyed.

 * two built-in objects that exist at the beginning of code execution:  Global and Math.
* The Global object isn’t accessible in most ECMAScript implementations; however, web browsers implement it as the window object. The Global object contains all global variables and functions as properties. The Math object contains properties and methods to aid in complex mathematical calculations.

 * : Map, WeakMap, Set, and WeakSet. These offer new possibilities for organizing application data as well as easier memory management.
 */
