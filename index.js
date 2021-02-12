// 'use strict'
/* JavaScript in HTML
WHAT’S IN THIS CHAPTER?
➤➤ Using the <script> element
➤➤ Comparing inline and external scripts
➤➤ Examining how document modes affect JavaScript
➤➤ Preparing for JavaScript-disabled experiences

1. async
2. charset
3. crossorigin
4. defer
5. integrity
*/

// DATA TYPES
// ***** 1. The typeof Operator *****
let messages = "some string";
console.log(typeof messages);
console.log(typeof messages);
console.log(typeof 95);

// *****  2. The Undefined Type *****
let message1;
console.log(message1 == undefined);
let message2 = undefined;
console.log(message2 == undefined);

let message3;
console.log(message3);
// console.log(age);

let message4;
console.log(typeof message4);
// console.log(typeof age);

// ***** 3. The Null Type *****

// When defining a variable that is meant to later hold an object

/*The Null type is the second data type that has only one value: the special value null. Logically, a
null value is an empty object pointer, which is why typeof returns "object" when it’s passed a
null value in the following example: */

let car = null;
console.log("car: ", typeof car);
// "object"

if (car != null) {
  console.log("do something with car");
}
/*The value undefined is a derivative of null, so ECMA-262 defines them to be superficially equal
as follows:*/
console.log(null == undefined);
// Even though null and undefined are related, they have very different uses.
let message;
if (message) {
  console.log("This block will not execute");
}
if (!message) {
  console.log("This block will execute");
}
// if (age) {
//   console.log(" This will throw an error");
// }

// ***** 5. The Boolean Type *****
let messageHW = "Hello world";
let messageAsBoolean = Boolean(messageHW);
console.log("boolean:: ", messageAsBoolean);

console.log("boolean-number:", Boolean(Infinity));
console.log("boolean-number:", Boolean(0));
console.log("boolean-number:", Boolean(NaN));

console.log("boolean-object:", Boolean({}));
console.log("boolean-object:", Boolean(null));
// !! page 87 UNDEFINED = n/a
console.log("boolean-undefined", Boolean());
console.log("boolean-undefined", Boolean(undefined));

/* These conversions are important to understand because flow-control statements, such as the if state-
ment, automatically perform this Boolean conversion  */

let message5 = "Hello world!";
if (message5) {
  console.log("Value is true");
}

// ***** 6. The Number Type *****
let intNum = 55;

// OCTAL - 0...(0-7)
let octalNum1 = 070;
console.log("octal1", octalNum1);
let octalNum2 = 077;
console.log("octal1", octalNum2);

// HEXADECIMAL - 0x...(0-9, A-F)
let hexNum1 = 0xa;
console.log("hexa-num", hexNum1);
let hexNum2 = 0x1f;
console.log("hexa-num", hexNum2);

/* NOTE: Numbers created using octal or hexadecimal format are treated as decimal numbers in all arithmetic
operations
- It is possible to have value os +0 and -0 AND also considered equivalent */

// 7. Floating-Point Values
let floatNum1 = 1.1;
let floatNum2 = 0.1;
let floatNum3 = 0.1; // .1 valid, but not number
console.log("float-number", floatNum1, floatNum2, floatNum3);

/*  floating-point values uses twice as much memory as storing integer values,
 */

let floatNumber4 = 1; // missing digit after decimal - interpreted as integer 1
let floatNumber5 = 10.0; // whole number - interpreted as integer 10
console.log("float-number-convert", floatNumber4, floatNumber5);

let floatNumber6 = 3.125e7;
console.log("float-number-e-notation", floatNumber6);

// very small numbers - never test for specific floating-point values.
/* NO CUMPLE CON ESTOS DATOS, ERROR EN JS!
let a = 0.15,
  b = 0.15;
*/
let a = 0.1,
  b = 0.2;
if (a + b == 0.3) {
  //avoid
  console.log("you got 0.3");
}
// INFINITY
let result = Number.MIN_VALUE + Number.MAX_VALUE; // TRUE
// let result = Number.MAX_VALUE + Number.MAX_VALUE; // FALSE
console.log("isFinite: ", isFinite(result));

// 7. NaN
/* special numeric value called NaN, short for Not a Number
1. any operation involving NaN always returns NaN
2. NaN is not equal to any value, including NaN
dividing a number by 0 returns NaN
 */
console.log("********** nan **********");
console.log("NaN == NaN:: ", NaN == NaN);

// ***** isNaN function *****

console.log("NaN:: ", isNaN(NaN));
console.log("number:: ", isNaN(10));
console.log("string~number:: ", isNaN("10"));
console.log("string:: ", isNaN("blue"));
console.log("boolean::", isNaN(true));

//  isNaN() can be applied to objects
/* the object’s valueOf() method is first called to determine if the returned
value can be converted into a number. If not, the toString() method is called
and its returned value is tested as well */
console.log("********** nan **********");

// *****  8. Number Conversions *****
/* three functions to convert nonnumeric values into numbers:
1. Number() = can be used on any data type
2. parseInt() = are used specifically for converting strings to numbers
3. parseFloat() = are used specifically for converting strings to numbers

➤➤ When applied to Boolean values, true and false get converted into 1 and 0, respectively.
➤➤ When applied to numbers, the value is simply passed through and returned.
➤➤ When applied to null, Number() returns 0.
➤➤ When applied to undefined, Number() returns NaN.
➤➤ When applied to strings, the following rules are applied:
    - it is always converted to a decimal number, so Number("1") becomes 1,
    Number("123") becomes 123, and Number("011") becomes 11
    - If the string contains a valid floating-point format, such as "1.1" , it is converted into
the appropriate floating-point numeric value
    - If the string contains a valid hexadecimal format, such as "0xf" , it is converted into
an integer that matches the hexadecimal value.
    - If the string is empty (contains no characters), it is converted to 0
    - If the string contains anything other than these previous formats, it is converted into NaN.
➤➤ When applied to objects, the valueOf() method is called and the returned value is converted
based on the previously described rules. If that conversion results in NaN , the toString()
method is called and the rules for converting strings are applied.
*/
let num1 = Number("Hello World");
let num2 = Number("");
let num3 = Number("000011");
let num4 = Number(true);
console.log("EXAMPLES Of Numbers", num1, num2, num3, num4);

// parseInt()
let num10 = parseInt("1234blue");
let num20 = parseInt("");
let num30 = parseInt("0xA");
let num40 = parseInt(22.5);
let num50 = parseInt("70");
let num60 = parseInt("0xf");
console.log("ParseInt:: ", num10, num20, num30, num40, num50, num60);

// provides a second argument - passing RADIX in hexadecimal
let num11 = parseInt("0xAF", 16);
let num22 = parseInt("AF", 16);
let num33 = parseInt("AF"); // NaN
console.log("num11, num22 - THE SAME ", num11, num22, num33);

// parseInt examples
let n1 = parseInt("10", 2); // 2 - parsed as binary
let n2 = parseInt("10", 8); // 8 - parsed as octal
let n3 = parseInt("10", 10); // 10 - parsed as decimal
let n4 = parseInt("10", 16); // 16 - parsed as hexadecimal
console.log("example-parseInt:: ", n1, n2, n3, n4);

// parseFloat() - Hexadecimal numbers always become 0.  Because parseFloat() parses
// only decimal values, there is no radix mode
let nm1 = parseFloat("1234blue");
let nm2 = parseFloat("0xA");
let nm3 = parseFloat("22.5");
let nm4 = parseFloat("22.34.5");
let nm5 = parseFloat("0908.5");
let nm6 = parseFloat("3.125e7");
console.log("parse-float:: ", nm1, nm2, nm3, nm4, nm5, nm6);

// The String Type - Strings can be delineated by either double quotes ("), single quotes ('), or backticks (`)
/*
  \n new line
  \t tab
  \b backspace
  \r carriage return
  \f form feed
  \\ backlash
  \' Single quote '
  \" Double quote "
  \` backtick
  \xnn n is a hexadecimal digit 0-F
  \unnn  n is a hexadecimal digit 0-F
*/
let firstName = "John";
let lastName = "Jacob";
let randomName = `uuhjhkjhdjor`;
let ex1 = "He said, 'hey.'";
let ex2 = 'He said, "hey."';
let ex3 = `He said, \`hey.\``;
let ex4 = "\x41";
let ex5 = "\u03a3";
let text = "This is the letter sigma: \u03a3.";
console.log("text:: ", text);

console.log("text-length", text.length);
console.log(
  "strings:: ",
  firstName,
  lastName,
  randomName,
  "****",
  ex1,
  "--",
  ex2,
  "--",
  ex3,
  "--",
  ex4,
  "--",
  ex5
);

// The Nature of Strings
/*  are immutable in ECMAScript, meaning that once they are created, their values cannot
change */

// Converting to a String
let lang = "Java";
lang = lang + "Script";
console.log("the-nature-string:: ", lang);

// ***** converting to a string *****
/* - The toString() method is available on values that are numbers Booleans, objects, and strings. 
- each string has a toString() method that simply returns a copy of itself
-  If a value is null or undefined, this method is not available
*/
let age = 11;
let ageAsString = age.toString();
let found = true;
let foundAsString = found.toString();

let n = 10;
console.log("toString-radix:: ", n.toString()); // by default the radix is 10
console.log("toString-radix:: ", n.toString(2));
console.log("toString-radix:: ", n.toString(8));
console.log("toString-radix:: ", n.toString(10));
console.log("toString-radix:: ", n.toString(16));
console.log("converting-to-string:: ", ageAsString, foundAsString);

// ***** STRING *****
/* If you’re not sure that a value isn’t null or undefined  use the String() casting function 
➤➤ If the value has a toString() method, it is called (with no arguments) and the result
is returned.
➤➤ If the value is null, "null" is returned.
➤➤ If the value is undefined , "undefined" is returned.

*/
let value1 = 10;
let value2 = true;
let value3 = null;
let value4;

console.log("string()-with-number:: ", value1);
console.log("string()-with-number:: ", value2);
console.log("string()-with-number:: ", value3);
console.log("string()-with-number:: ", value4);

/*
NOTE: 
Because toString() isn’t available on "null" and "undefined", the String() method simply returns literal text for
those values
*/

//  ***** Template Literals *****
let myMultiLineString = "first line\nsecond line";
let myMultiLineTemplateLiteral = `first line
second line`;
console.log(myMultiLineString);
console.log(myMultiLineTemplateLiteral);
console.log(myMultiLineString === myMultiLineTemplateLiteral); // true

// template literals are especially useful when defining templates, such as HTML
let pageHTML = `
<div>
  <a href="#>
    <span>Jake</span>
  </a>
</div>`;
console.log("pageHTML:: ", pageHTML);

// This template literal has 25 spaces following the line return character
let myTemplateLiteral = `first line
                         second line`;
console.log("template-literal-spaces", myTemplateLiteral.length); // 47

// This template literal begins with a line return character
let secondTemplateLiteral = `
first line
second line`;
console.log(secondTemplateLiteral[0] === "\n"); // true

let thirdTemplateLiteral = `first line
second line`;
console.log(thirdTemplateLiteral[0]); // behaves like an array...

// ***** INterpolation *****
/** special JavaScript syntactical */

let value = 5;
let exponent = "second";
// Formerly, interpolation was accomplished as follows:
let interpolatedString =
  value + " to the " + exponent + " power is " + value * value;

// The same thing accomplished with template literals:
let interpolatedTemplateLiteral = `${value} to the ${exponent} power is ${
  value * value
}`;
console.log(interpolatedString);
// 5 to the second power is 25
console.log(interpolatedTemplateLiteral);
// 5 to the second power is 25
// !! TODO -  let foo = { toString: () => 'World' }; - understand
let foo = { toString: () => "World" };
console.log(`Hello, ${foo}!`);

// Invoking functions and methods inside interpolated expressions is allowed:
function capitalize(word) {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
}
console.log(`${capitalize("hello")}, ${capitalize("world")}!`);
// Additionally, templates can safely interpolate their previous value:
let values = "";
function append() {
  values = `${values}abc`;
  console.log(values);
}
append(); // abc
append(); // abcabc
append(); // abcabcabc

// ***** Template Literal Tag Functions *****
let aa = 6;
let bb = 9;

function simpleTag(strings, aValExpression, bValExpression, sumExpression) {
  console.log(strings);
  console.log(aValExpression);
  console.log(bValExpression);
  console.log(sumExpression);
  return "foobar";
}
let untaggedResult = `${aa} + ${bb} = ${aa + bb}`;
let taggedResult = simpleTag`${aa} + ${bb} = ${aa + bb}`;

console.log("untagged:: ", untaggedResult);
// "6 + 9 = 15"
console.log("tagged:: ", taggedResult);
// "foobar"

// using the spread operator to combine them into a single collection is usually prudent:
console.log("**********");
let aaa = 66;
let bbb = 99;
function simpleTag(strings, ...expressions) {
  console.log(strings);
  for (const expression of expressions) {
    console.log("--", expression);
  }
  return "foobar";
}

let taggedResults = simpleTag`${aaa} + ${bbb} = ${aaa + bbb}`;
// ["", " + ", " = ", ""]
// 6
// 9
// 15
console.log("tagged-result:: ", taggedResults);
// "foobar"

//  N interpolated values,
console.log("-------interpolated - zipTAg--------");
let ab = 6;
let bc = 9;
// !! todo - understand very well this section pls
function zipTag(strings, ...expressions) {
  console.log("strings-zip:: ", strings);
  console.log("strings-zip:: ", strings[1]);
  console.log("expressions-zip:: ", expressions);
  return (
    strings[0] + expressions.map((e, i) => `${e}${strings[i + 1]}`).join("")
  );
}

let untaggedResulted = `${ab} + ${bc} = ${ab + bc}`;
let taggedResulted = zipTag`${ab} + ${bc} = ${ab + bc}`;
console.log("untagged-zip:: ", untaggedResulted);
// "6 + 9 = 15"
console.log("tagged-zip:: ", taggedResulted);
// "6 + 9 = 15"

// ***** Raw Strings *****

// Unicode demo
// \u00A9 is the copyright symbol
console.log(`\u00A9`);
// ©
console.log(String.raw`\u00A9`); // \u00A9

// Newline demo
console.log(`first line\nsecond line`);
// first line
// second line
console.log(String.raw`first line\nsecond line`);
// "first line\nsecond line"

// This does not work for actual newline characters: they do not
// undergo conversion from their plaintext escaped equivalents
console.log(`first linee
second linee`);
// first line
// second line
console.log(String.raw`first lineee
second lineee`);
// first line
// second line

//  The raw values are also available as a property on each element in the string piece collection inside the tag function
function printRaw(strings) {
  console.log("Actual characters:");
  for (const string of strings) {
    console.log("-*-*>> ", string);
  }
  console.log("Escaped characters;");
  for (const rawString of strings.raw) {
    console.log(rawString);
  }
}
printRaw`\u00A9${"and"}\n`;
// Actual characters:
// ©
// (newline)
// Escaped characters:
// \u00A9
// \n

// The Symbol Type
//  The purpose of a symbol is to be a guaranteed unique identifier for object properties that does not risk property collision

// ***** Basic Symbol Use *****
let sym = Symbol();
console.log("symbol::", sym);

// When invoking the function, you can provide an optional string that can be used for identifying the symbol instance when debugging

let genericSymbol = Symbol();
let otherGenericSymbol = Symbol();

let fooSymbol = Symbol("foo");
let otherFooSymbol = Symbol("foo");
console.log(genericSymbol == otherGenericSymbol);
// false
console.log(fooSymbol == otherFooSymbol);
// false

let genericSymbols = Symbol();
console.log(genericSymbols); // Symbol()
let fooSymbols = Symbol("foo");
console.log(fooSymbols);
// Symbol(foo);

let myBoolean = new Boolean();
console.log(typeof myBoolean);
// "object"
let myString = new String();
console.log(typeof myString);
// "object"
let myNumber = new Number();
console.log(typeof myNumber);
// "object"
//  let mySymbol = new Symbol();
// TypeError: Symbol is not a constructor

// Should you want to utilize an object wrapper, you can make use of the Object()function:
let mySymbol = Symbol();
let myWrappedSymbol = Object(mySymbol);
console.log(typeof myWrappedSymbol); // "object"

// ***** Using the Global Symbol Registry *****
// 'foo' is its description
let fooGlobalSymbol = Symbol.for("foo"); // creates new symbol
let otherFooGlobalSymbol = Symbol.for("foo"); // reuses existing symbol
console.log(fooGlobalSymbol === otherFooGlobalSymbol); // true

// ! symbols registry
/* Symbols defined in the global registry are totally distinct from symbols created using Symbol(), even
if they share a description
*/

let localSymbol = Symbol("foo");
let globalSymbol = Symbol.for("foo"); // Symbols defined in the global registry
console.log("comparing-symbols:: ", localSymbol === globalSymbol); // false

/* The global registry requires string keys, so anything you provide as an argument to Symbol.for()
will be converted to a string. Additionally, the key used for the registry will also be used as the symbol
description.
 */
let emptyGlobalSymbol = Symbol.for();
console.log("empty- symbol:: ", emptyGlobalSymbol); // Symbol(undefined)

/* It is possible to check against the global registry using Symbol.keyFor(), which accepts a sym-
bol and will return the global string key for that global symbol, or undefined if the symbol is not a
global symbol.
 */

// create global symbol
let s = Symbol.for("foo");
console.log("global-symbol:: ", Symbol.keyFor(s)); // foo

// create regular symbol
let s2 = Symbol("bar");
console.log("regular-symbol-with-keyFor(bad):: ", Symbol.keyFor(s2));

// Using Symbol.keyFor() with a non-symbol will throw a TypeError:
// Symbol.keyFor(123); //  TypeError: 123 is not a symbol

// ***** Using Symbols as Properties *****
/*
let s10 = Symbol('foo'),
  s20 = Symbol('bar'),
  s30 = Symbol('baz'),
  s40 = Symbol('qux');

let o = {
  [s10]: 'foo val',
}
// ! cool
// o[s20]  = 'foo val'
// also valid: o[s10]  = 'foo val'
console.log('o:: ', o)

// ** The static method Object.defineProperty() defines a new property directly on an object, or modifies an existing property on an object, and returns the object.

Object.defineProperty(o, s40, {value: 'patricia val', writable: false})
console.log('oo-patricia:: ', o)

Object.defineProperties(o, {
  [s30]: {value: 'baz val'},
  [s20]: {value: 'qux val'}
});

console.log('oooo:: ', o) */
// ! VERIFY THIS SECTION - THE CODE DOESN'T RUN AS THE BOOK
let s10 = Symbol("foo"),
  s20 = Symbol("bar"),
  s30 = Symbol("baz"),
  s40 = Symbol("qux");
let o = {
  [s10]: "foo val",
};
// Also valid:
o[s20] = "foo val";
console.log(o);
// {Symbol{foo}: foo val}
Object.defineProperty(o, s20, { value: "bar val" });
console.log(o);
// {Symbol{foo}: foo val, Symbol(bar): bar val}
Object.defineProperties(o, {
  [s30]: { value: "baz val" },
  [s40]: { value: "qux val" },
});
console.log(o);
// {Symbol{foo}: foo val, Symbol(bar): bar val,
// Symbol{baz}: baz val, Symbol(qux): qux val}

// *****   *****

let sb1 = Symbol("foo"),
  sb2 = Symbol("bar");

let obj = {
  [sb1]: "foo val",
  [sb2]: "bar val",
  baz: "baz val",
  qux: "qux val",
};

console.log("object:: ", obj);
console.log("getOwnPropertySymbols:: ", Object.getOwnPropertySymbols(o));

console.log("getOwnPropertyNames:: ", Object.getOwnPropertyNames(obj));
console.log(
  "getOwnPropertyDescriptor:: ",
  Object.getOwnPropertyDescriptors(obj)
);
console.log("ownKeys:: ", Reflect.ownKeys(obj));

// *** Symbols are not lost if directly created and used as properties. ***
let ob = {
  [Symbol("foo")]: "foo val",
  [Symbol("bar")]: "bar val",
  [Symbol("bar")]: "bar1 val",
};

console.log("\n", "ob:: ", ob);

let barSymbol = Object.getOwnPropertySymbols(ob).find((symbol) =>
  symbol.toString().match(/bar/)
);
console.log("barSymbol:: ", barSymbol);

// ***** MATCH *****
const res = "psttpat".match(/pa/) ? "si" : "no";
console.log("res::: ", res);

const numberString = "12345".match(/23/) ? "yes" : "no";
console.log("number-string-match::: ", numberString);

// ***** Well-Known Symbols *****
// * @@iterator refers to Symbol.iterator. *

// *** Symbol.asyncIterator ***
/* A method that returns the default AsyncIterator for an object. Called by the semantics of the for-await-of statement” */
console.log("******************* async-iterator *******************");
class Foo {
  async *[Symbol.asyncIterator]() {}
}

let f = new Foo();

console.log("symbol.Iterator:: ", f[Symbol.asyncIterator]());

/*  the object produced by the Symbol.asyncIterator function should sequentially pro-
duce Promise instances via its next() method.  */
class Emitter {
  constructor(max) {
    this.max = max;
    this.asyncIdx = 0;
  }

  // this line is same as [Symbol.asyncIterator]: async function*() {
  async *[Symbol.asyncIterator]() {
    while (this.asyncIdx < this.max) {
      yield new Promise((resolve) => resolve(this.asyncIdx++));
    }
  }
}
async function asyncCount() {
  let emitter = new Emitter(5);

  for await (const x of emitter) {
    console.log("x::", x);
  }
}

asyncCount();

// ***** Symbol.hasInstance *****
/* The instanceof operator provides a way of determining if an object instance has a prototype in its prototype chain  */
console.log("************** instanceof ***************");
// FUNCTION
function Fooo() {}
let ff = new Fooo();
console.log("instanceof function:: ", ff instanceof Fooo); // true
// CLASS
class Bar2 {}
let b2 = new Bar2();
console.log("instanceof class:: ", b2 instanceof Bar2);

/* The Symbol.hasInstance keys a function which performs the same behavior but with the
operands reversed:
 */

function Foo1() {}
let f1 = new Foo();
console.log("Symbol.hasInstance-in-functions:: ", Foo1[Symbol.hasInstance](f1));

class Bar1 {}
let bb2 = new Bar1();
console.log("Symbol.hasInstance-in-class:: ", Bar1[Symbol.hasInstance](bb2));

// it is possible to redefine the function on an inherited class as a static method
class Bar3 {}
class Baz extends Bar3 {
  static [Symbol.hasInstance]() {
    return false;
  }
}

let bExtend = new Baz();
console.log("extends-symbol-hasInstance", Bar3[Symbol.hasInstance]());
console.log("bExtend:: ", bExtend instanceof Bar3);
console.log("Baz - bExtend:: ", Baz[Symbol.hasInstance](b));
console.log("b-instanceof-baz", b instanceof Baz);

// *****  Symbol.isConcatSpreadable *****
/*  The value of Symbol.isConcatSpreadable allows you to override this behavior.
 */
// *** NOTE: mdn: The Symbol.isConcatSpreadable well-known symbol is used to configure if an object should be flattened to its array elements when using the Array.prototype.concat() method. */

let initial = ["foo"];
let arr = ["bar"];
console.log("Symbol.isConcatSpreadable", arr[Symbol.isConcatSpreadable]);
console.log("concat:: ", initial.concat(arr));
arr[Symbol.isConcatSpreadable] = false;
console.log("Symbol.isConcatSpreadable] = false::: ", initial.concat(arr));

let arrayLikeObject = { length: 1, 0: "baz" };
console.log(
  "Symbol.isConcatSpreadable-object",
  arrayLikeObject[Symbol.isConcatSpreadable]
);
console.log("initial", initial.concat(arrayLikeObject));
arrayLikeObject[Symbol.isConcatSpreadable] = true;
console.log(
  "initial.concat-isConcatSpreadable-true:: ",
  initial.concat(arrayLikeObject)
);

// sets
let otherObject = new Set().add("qux");
console.log(
  "isConcatSpreadable-SET:: ",
  otherObject[Symbol.isConcatSpreadable]
);
console.log("concat-SET:: ", initial.concat(otherObject));
otherObject[Symbol.isConcatSpreadable] = true;
console.log("initial.concat(otherObject)::: ", initial.concat(otherObject));

// *** Symbol.iterator ****
// * “A method that returns the default Iterator for an object. Called by the semantics of the for-of statement”
//  this symbol is used as a property for “A method that returns the default Iterator for an object.
class FooIterator {
  *[Symbol.iterator]() {}
}

let fIterator = new FooIterator();

console.log("Symbol.iterator:: ", fIterator[Symbol.iterator]);

class EmitterIterator {
  constructor(max) {
    this.max = max;
    this.idx = 0;
  }
  *[Symbol.iterator]() {
    while (this.idx < this.max) {
      yield this.idx++;
    }
  }
}
function count() {
  let emitter = new EmitterIterator(5);
  for (const x of emitter) {
    console.log("Emitter-iterator:: ", x);
  }
}
count();

// *** Symbol.match ***
// * The String.prototype.match() method will use the function keyed by Symbol.match to evaluate the expression

console.log(
  "RegExp.prototype[Symbol.match]:: ",
  RegExp.prototype[Symbol.match]
);
console.log("match:: ", "foobar".match(/bar/));

// it is possible to pass something other than a regular expression instance to the match() method by defining a Symbol.match function to supplant the behavior

class FooMatcher {
  static [Symbol.match](target) {
    return target.includes("foo");
  }
}

console.log("[Symbol.match](target):: ", "foobar".match(FooMatcher)); // true
console.log("[Symbol.match](target):: ", "barbaz".match(FooMatcher)); // false

class StringMatcher {
  constructor(str) {
    this.str = str;
  }
  [Symbol.match](target) {
    return target.includes(this.str);
  }
}
console.log(
  "match(new StringMatcher:: ",
  "foobar".match(new StringMatcher("foo"))
); // true
console.log(
  "match(new StringMatcher:: ",
  "barbaz".match(new StringMatcher("qux"))
); //false

// ***** Symbol.replace *****
console.log("REgExp.prototype:: ", RegExp.prototype[Symbol.replace]);

console.log("replace:: ", "foobarbaz".replace(/bar/, "qux"));

/* This function has two parameters, the string instance upon which
replace() is invoked and the replacement string. The return value is unrestricted:
 */
class FooReplacer {
  static [Symbol.replace](target, replacement) {
    return target.split("foo").join(replacement);
  }
}
console.log("Symbol.replace:: ", "barfoobaz".replace(FooReplacer, "qux"));

class StringReplacer {
  constructor(str) {
    this.str = str;
  }
  [Symbol.replace](target, replacement) {
    return target.split(this.str).join(replacement);
  }
}

console.log(
  "replace(new StringReplacer:: ",
  "barfoobaz".replace(new StringReplacer("foo"), "qux")
);

// ***** Symbol.search *****
/* “A regular expression method that returns the index within a string that matches the regular expression. Called by the String.prototype.search() method”
 */
console.log("RegExp.prototype:: ", RegExp.prototype[Symbol.search]);
console.log("search:: ", "foobar".search(/bar/));

/*  it is possible to pass something other than a regular expression instance to the search() method by defining a Symbol.search function to supplant the behavior that would otherwise be exhibited by the regular expression */

class FooSearcher {
  static [Symbol.search](target) {
    return target.indexOf("foo");
  }
}
console.log("search1:: ", "foobar".search(FooSearcher));
console.log("search2:: ", "barfoo".search(FooSearcher));
console.log("search3:: ", "barbaz".search(FooSearcher));

class StringSearcher {
  constructor(str) {
    this.str = str;
  }
  [Symbol.search](target) {
    return target.indexOf(this.str);
  }
}

console.log(
  "new StringSearcher1:: ",
  "foobar".search(new StringSearcher("foo"))
);
console.log(
  "new StringSearcher2:: ",
  "barfoo".search(new StringSearcher("foo"))
);
console.log(
  "new StringSearcher3:: ",
  "barbaz".search(new StringSearcher("qux"))
);

// **** Symbol.species ***
/* Defining a static getter method with Symbol.species allows you to override the
prototype definition for the newly created instance:
 */
class Bar5 extends Array {}
class Baz1 extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}

let bar = new Bar5();
console.log("bar instanceof-bar:: ", bar instanceof Array);
console.log("bar instanceof-bar-bar", bar instanceof Bar5);
bar = bar.concat("bar");
console.log("bar-concat-array:: ", bar instanceof Array);
console.log("bar-concat-bar:: ", bar instanceof Bar5);

let baz = new Baz1();
console.log("baz", baz instanceof Array);
console.log("baz", baz instanceof Baz1);
baz = baz.concat("baz");
console.log("object", baz instanceof Array);
console.log("baz-baz:: ", baz instanceof Baz1);

// **** Symbol.split ****
/*  splits a string at the indices that match the regular expression */
console.log("RegEx.prototype[Symbol.split:: ", RegExp.prototype[Symbol.split]);
console.log("split:: ", "foobarbaz".split(/bar/));
// copied from book

class FooSplitter {
  static [Symbol.split](target) {
    return target.split("foo");
  }
}
console.log("barfoobaz".split(FooSplitter));
// ["bar", "baz"]
class StringSplitter {
  constructor(str) {
    this.str = str;
  }
  [Symbol.split](target) {
    return target.split(this.str);
  }
}
console.log("barfoobaz".split(new StringSplitter("foo")));

// *** Symbol.toPrimitive ***

class FooPrimitive {}
let fooPrimitive = new FooPrimitive();

console.log("Symbol-primitive +:: ", 3 + fooPrimitive);
console.log("Symbol-primitive -:: ", 3 - fooPrimitive);
console.log("Symbol-primitive-string:: ", String(fooPrimitive));

// ! assigning a switch case statement to property of a constructor
class BarPrimitive {
  constructor() {
    this[Symbol.toPrimitive] = function (hint) {
      switch (hint) {
        case "number":
          return 5;
        case "string":
          return "string bar";
        case "default":
        default:
          return "default bar";
      }
    };
  }
}

let barPrimitive = new BarPrimitive();

console.log("Symbol.toPrimitive +:: ", 3 + barPrimitive);
console.log("Symbol.toPrimitive -:: ", 3 - barPrimitive);
console.log("Symbol.toPrimitive-string:: ", String(barPrimitive));

// ***** Symbol.toStringTag *****
/* Accessed by the built-in method Object.prototype.toString()” */
let setToString = new Set();

console.log("setToString:: ", setToString);
console.log("setToString.toString:: ", setToString.toString());
console.log(
  "setToString[Symbol.toStringTag]:: ",
  setToString[Symbol.toStringTag]
);

class FooSet {}
let fooSet = new FooSet();

console.log("fooSet:: ", fooSet);
console.log("fooSet.toString():: ", fooSet.toString());
console.log("fooSet[Symbol.toStringTag]:: ", fooSet[Symbol.toStringTag]);

class BarToStringTag {
  constructor() {
    this[Symbol.toStringTag] = "Barrrrrr";
  }
}
let barToStringTag = new BarToStringTag();

console.log("barToStringTag:: ", barToStringTag);
console.log("barToStringTag:: ", barToStringTag.toString());
console.log("bar[Symbol.toStringTag]:: ", barToStringTag[Symbol.toStringTag]);

// TRY WITH OTHER STRUCTURES

// ***** Symbol.unscopables *****
let objWith = { foo: "bar" };

with (objWith) {
  console.log("foo::", foo); //bar
}
objWith[Symbol.unscopables] = {
  foo: true,
};

with (objWith) {
  // it's commented because the reference error... and this was the objective of this exercise
  // console.log('fooo-with', foooo) // any value instead of foooo
}
// !  It’s not recommended to use with , so using Symbol.unscopables is also not recommended

// ***** THE OBJECT TYPE *****
// Se viene lo chido
console.log("************** OBJECTS **************");
let objeto = new Object();

// ! LEGAL, but NOT recommended
let objj = new Object();
// Each Object instance has the following properties and methods
/*
➤➤ constructor - constructor is the Object() function.
➤➤ hasOwnProperty(propertyName) —Indicates if the given property exists on the object
instance (not on the prototype). The property name must be specified as a string (for
example, o.hasOwnProperty("name") ).
➤➤ isPrototypeof(object)—Determines if the object is a prototype of another object. (Proto-
types are discussed in Chapter 5.)
➤➤ propertyIsEnumerable(propertyName) —Indicates if the given property can be enumerated
using the for-in statement (discussed later in this chapter). As with hasOwnProperty() , the
property name must be a string.
➤➤ toLocaleString() —Returns a string representation of the object that is appropriate for the
locale of execution environment.
➤➤ toString() —Returns a string representation of the object.
➤➤ valueOf() —Returns a string, number, or Boolean equivalent of the object. It often returns
the same value as toString() .
*/
console.log("************** OBJECTS **************");

// ***** OPERATORS *****
/*
 * The operators: addition, subtraction and bitwise operators to relational operator and equality operators
 * when used on objects, operators typically call the valueOf / toString() methods to retrieve a value they can work with
 */

// ***** Unary Operators *****
/* Operators that work on only one value are called unary operator */

// * Increment/Decrement
/*
- prefix versions of the operators are placed before the variable they work on
- postfix ones are placed after the variable
*/
console.log("----- Increment/Decrement -----");
// * prefix increment
let ages = 29;
++ages;
console.log("++ages-prefix:: ", ages);
// This is effectively equal to the following:
let ag = 28;
ag = ag + 1;
console.log("ag=ag+1:: ", ag);

// * prefix decrement
let ageDecrement = 20;
--ageDecrement;
console.log("ageDecrement:: ", ageDecrement);

// side effects
let edad = 29;
let anotherEdad = --edad + 2;

console.log("edad:: ", edad); // 28
console.log("anotherEdad:: ", anotherEdad); // 30

//  prefixes are evaluated from LEFT to RIGHT
let num1a = 2;
let num2a = 20;
let num3a = --num1a + num2a;
let num4a = num1a + num2a;
console.log("example1:", num3a); // 21
console.log("example2:", num4a); // 21

// * POSTFIX - the increment or decrement doesn’t occur until after the containing statement has been evaluated.
let e = 29;
e++;
console.log("edad-postfix:: ", e);

//
let numero1 = 2;
let numero2 = 20;
let numero3 = numero1-- + numero2;
let numero4 = numero1 + numero2;
console.log("numero3:: ", numero3); // 22
console.log("numero4:: ", numero4); // 21

// rules: increment and decrement operators

let ss1 = "s2";
let ss2 = "z";
let bb1 = false;
let ff1 = 1.1;
let oo = {
  valueOf() {
    return -1;
  },
};

console.log("s1++:: ", ss1++); // value becomes numeric 3
console.log("s2++:: ", ss2++); // value becomes NaN
console.log("bb1++:: ", bb1++); // value becomes numeric 1
console.log("ff1--:: ", ff1++); // value becomes 0.10000000000000009 (due to floating-point inaccuracies)
console.log("oo--:: ", oo++); //  value becomes numeric -2
let falsee = false;
let truee = true;
console.log("true-false:: ", falsee++, truee++);

// ***** Unary Plus and Minus *****
let num = 25;
num = +num;
console.log(num); // 25

// When the unary plus is applied to a nonnumeric value
let s1Unary = "01";
let s2Unary = "1.1";
let s3Unary = "z";
let bUnary = false;
let fUnary = 1.1;
let oUnary = {
  valueOf() {
    return -1;
  },
};
console.log("unary-numeric:: ", (s1Unary = +s1Unary)); // value becomes numeric 1
console.log("unary-numeric-float:: ", (s2Unary = +s2Unary)); // value becomes numeric 1.1
console.log("unary-string:: ", (s3Unary = +s3Unary)); // value becomes NaN
console.log("unary-boolean:: ", (bUnary = +bUnary)); // value becomes numeric 0
console.log("unary-float:: ", (fUnary = +fUnary)); // no change, still 1.1
console.log("unary-object:: ", (oUnary = +oUnary)); // value becomes numeric -1

// The unary minus operator’s primary use is to negate a numeric value, such as converting 1 into –1

let nn = 25;
nn = -nn;
console.log("nn:: ", nn); //-25

// * The unary minus operator’s primary use is to negate a numeric value
let s1Minus = "01";
let s2Minus = "1.1";
let s3Minus = "z";
let bMinus = false;
let fMinus = 1.1;
let oMinus = {
  valueOf() {
    return -1;
  },
};

s1Minus = -s1Minus; // value becomes numeric -1
s2Minus = -s2Minus; // value becomes numeric -1.1
s3Minus = -s3Minus; // value becomes NaN
bMinus = -bMinus; // value becomes numeric 0
fMinus = -fMinus; // change to -1.1
oMinus = -oMinus; // value becomes numeric 1

// ***** Bitwise Operators *****
console.log("************* Bitwise Operators *************");
/* All numbers in ECMAScript are stored in IEEE–754 64-bit format, but the bitwise
operations do not work directly on the 64-bit representation. Instead, the value is converted into a 32-bit integer, then  the result is converted back into 64 bits.
-  Positive numbers are stored in true binary 16 + 0 + 0 + 2 + 0 format
- Negative numbers are also stored in binary code but in a format called two’s complement.
  - determine the binary representation of 18, every 0 must be replaced with a 1, and vice versa, Add 1 to the result.
*/
let numberA = -18;
console.log("numberA.toString(2):: ", numberA.toString(2));
// *  values NaN and Infinity both are treated as equivalent to 0 when used in bitwise operations

//  ***** Bitwise NOT *****
//! represented by a tilde (~)  returns the one’s complement of the number

let numb1 = 25; // binary 00000000000000000000000000011001
let numb2 = ~numb1; // binary 11111111111111111111111111100110
//!  it negates the number and subtracts 1   --> -26
console.log("numb2:: ", numb2); // -26

// *  The same outcome is produced with the following code
let num111 = 25;
let num222 = -num111 - 1;
console.log("num222:: ", num222);
// * bitwise operation is much faster because it works at the very lowest level of numeric representation

// *****  Bitwise AND *****
// 1  1 = 1, otherwise 0
let resultbwAnd = 25 & 3;
console.log("resultbwAnd:: ", resultbwAnd);
/** only one bit (bit 0) contains a 1 in both 25 and 3.  Because of this, every other bit of the resulting number is set to 0, making the result equal to 1.
 */
// ***** Bitwise OR *****
// * 0 0 = 0 otherwise 1 - A bitwise OR operation returns 1 if at least one bit is 1. It returns 0 only if both bits are 0.

let ress = 25 | 3;
console.log("bitwise-or:: ", ress);
// * In each number, four bits are set to 1, so these are passed through to the result. The binary code 11011 is equal to 27

// ****** Bitwise XOR *****
// * 1 1 = 0 , 0 0 = 0 otherwise 1
let resultado = 25 ^ 3;
console.log("resultado:: ", resultado);
// * Note that this is one less than when performing bitwise OR on these numbers

//  **** Left Shift *****
// * The left shift is represented by two less-than signs (<<)
//  ! shifts all bits in a number to the left by the number of positions given.
let oldValue = 2;
// let oldValue = -2;
let newValue = oldValue << 5;
console.log("Left Shift -newValue:: ", newValue);

// ***** Signed Right Shift *****
// The signed right shift is represented by two greater-than signs (>>) and shifts all bits in a 32-bit number to the right while preserving the sign (positive or negative).

let oldVal = 64; //* equal to binary 1000000
let newVal = oldVal >> 5; //* equal to binary 10 which is decimal 2
console.log("Right Shift-newVal:: ", newVal);

//  ***** Unsigned Right Shift *****
// unsigned right shift is represented by three greater-than signs (>>>) and shifts all bits in a 32-bit number to the right.

// let oldValues = 64; // equal to binary 1000000 // descomentar
//! 1. -64 ~> numero positivo de -64 de binario en decimal es 4294967232 ~> luego cunado este valor se desplaza 5 bits es 134217726.
let oldValues = -64; // equal to binary 1000000
let newValues = oldValues >>> 5; // equal to binary 10 which is decimal 2
console.log("newValues:: ", newValues);

console.log("************* Boolean Operators *************");

// **** Boolean Operators *****
/*  three Boolean operators: NOT, AND, and OR. */

// * Logical NOT - represent by an exclamation point !
//! The logical NOT operator first converts the operand to a Boolean value and then negates it

console.log("!false :: ", !false); // true
console.log('!"blue" :: ', !"blue"); // false
console.log("!0 :: ", !0);
console.log("!NaN :: ", !NaN);
console.log('!"" :: ', !"");
console.log("!12345 :: ", !12345);

//** The logical NOT operator can convert a value into its Boolean equivalent. By using two NOT operators in a row, THE SAME AS Boolean() function*/
console.log("---- !! OPERATOR -----");
console.log('!!"blue" :: ', !!"blue");
console.log("!!0 :: ", !!0);
console.log("!!NaN :: ", !!NaN);
console.log('!!"" :: ', !!"");
console.log("!!12345 :: ", !!12345);

// ***** Logical AND *****
// * The logical AND operator is represented by the double ampersand &&
// * BEHAVES true and true = true otherwise false
// ! If the second operand is an object, then the object is returned only if the first operand evaluates to true.

console.log("---- LOGICAL AND -----");
let resultt = true && false;
console.log("resultt", resultt);

// *  first operand determines the result, the second operand is never evaluated
/*let foundd = true;
let resu = foundd && someUndeclaredVariable; // error occurs here
console.log(resu); // this line never executes
*/
// other example
let find = false;
let answer = find && someUndeclaredVariable; // no error
console.log(answer); // works

// ***** Logical OR *****
//* REPRESENTED by double pipe ||
// * f the first operand evaluates to true, the second operand is not evaluated
// !  If the first operand evaluates to false , then the second operand is returned.
console.log("---- LOGICAL OR -----");
let searched = true;
// let searched = false; //error - descomentar, es parte del ejercicio
let r = searched || someUndeclaredVariable; // mo error
console.log("r :: ", r); // if searched is false this nevers executes

// * use this behavior to avoid assigning a null or undefined value to a variable
// If preferredObject isn’t null, then it’s assigned to myObject; if it is null, then backupObject is assigned to myObject

// let myObject = preferredObject || backupObject; // commented intentionally

// ***** Multiplicative Operators *****
//* an empty string is treated as 0,  and the Boolean value of true is treated as 1
console.log("************* Multiplicative Operators *************");

//  ***** Multiply *****
console.log("---- Multiply -----");
let resultados = 34 * 56;
console.log("multiply:: ", resultados);
console.log("---- Divide -----");
let answer1 = 66 / 11;
console.log("divide:: ", answer1);

// ***** Modulus *****
// * represented by %
console.log("---- Modulus -----");
let rr = 26 % 5;
console.log("rr:: ", rr);

//  ***** Exponentiation Operator *****
// * ES7 ~~> Math.pow() now gets its own ** operator,
console.log("************* Exponentiation Operator *************");
console.log("---- exponentiation -----");

console.log("math.pow:: ", Math.pow(3, 2)); // 9
console.log("** :: ", 3 ** 2); // 9
console.log("math.pow-decimal ::", Math.pow(16, 0.5)); // 4
console.log("** - decimal :: ", 16 ** 0.5); // 4

let squared = 3;
squared **= 2;
console.log("squared-before:: ", squared); // 9
let sqrt = 16;
sqrt **= 0.5;
console.log("sqrt-before:: ", sqrt); // 4

// ***** Additive Operators *****
console.log("************* Exponentiation Operator *************");
// * Add
console.log("---- Add -----");

let resultss = 1 + 2;
console.log("resultss-Add:: ", resultss);

//* One of the most common mistakes in ECMAScript is
let numm1 = 5;
let numm2 = 10;
let messagee = "The sum of 5 and 10 is " + (numm1 + numm2); // just add some parentheses to perform the arithmetic calculation
// let messagee = "The sum of 5 and 10 is " + numm1 + numm2;
console.log("sum-strings:: ", messagee); // "The sum of 5 and 10 is 510"

// ***** Subtract *****
console.log("---- Subtract -----");

let re = 2 - 1;
console.log("re:: ", re);

let res1 = 5 - true;
let res2 = NaN - 1;
let res3 = 5 - 3;
let res4 = 5 - "";
let res5 = 5 - "2";
let res6 = 5 - null;
console.log("res-subtracts:: ", res1, res2, res3, res4, res5, res6);

// ***** Relational Operators *****
// *   less-than <   greater-than >   less-than-or-equal-to <=    greater-than-or-equal-to  >=
console.log("************* Relational Operators *************");

let resultUno = 5 > 3; // true
let resultDos = 5 < 3; // false
console.log("relational-operators:: ", resultUno, resultDos);

// ! Para las cadenas, cada uno de los códigos de caracteres de la primera cadena se compara numéricamente con los códigos de caracteres en una ubicación correspondiente en la segunda cadena. Una vez completada esta comparación, se devuelve un valor booleano. . El problema aquí es que los códigos de caracteres de las letras mayúsculas son todos más bajos que los códigos de caracteres de las letras minúsculas.

let resultttt = "Brick" < "alphabet"; //true
console.log("resultttt::", resultttt);
// letter B has a character code of 66 and the letter a has a character code of 97. To force a true alphabetic result, you must convert both operands into a common case
let resultCommonCase = "Brick".toLowerCase() < "alphabet".toLowerCase(); // false
console.log("resultCommonCase:: ", resultCommonCase);

//* comparing numbers that are strings
let ressu = "23" < "3"; // true
console.log("ressu:: ", ressu);
/*
- character code for "2" is 50
- character code for "3" is 51
*/
// OTHER CASE
// ! be careful in this situations
let ressu1 = "23" < 3; // true - el 23 lo convierte a number
console.log("ressu1:: ", ressu1);
//
let ressu2 = "a" < 3; // false because "a" becomes NaN
console.log("ressu2:: ", ressu2);

// ! *  any relational operation with NaN is false
let result1NaN = NaN < 3; // false
let result2NaN = NaN >= 3; // false
console.log("NaN-results:: ", result1NaN, result1NaN);

//  ***** Equality Operators *****
console.log("************* Equality Operators *************");

//*  Equal and Not Equal
/**
 - false converts to 0
 - true converts to 1
 
 null == undefined - true
 "NaN" == NaN  - false
 5 == NaN  -  false
 NaN == NaN  -  false
 NaN != NaN  -  true
 false == 0  -  true
 true == 1  -  true
 true == 2  -  false
 undefined == 0  -  false
 null == 0  -  false
 "5" == 5  -  true
 */

// ***** Identically Equal and Not Identically Equal *****
//!  The identically equal operator is represented by three equal signs (===) and returns true only if the operands are equal without conversion
console.log(
  "************** Identically Equal and Not Identically Equal **************"
);
let result1 = "55" == 55; // true - equal because of conversion
let result2 = "55" === 55; // false - not equal because different data types
console.log("identically-equal-operator:: ", result1, result2);

let result11 = "55" != 55; // false - equal because of conversion //! uses not equal
let result22 = "55" !== 55; // true - not equal because different data types //!  uses not identically equal operator
console.log("not-identically-equal-operator::", result11, result22);
// ! Keep in mind that while null == undefined is true because they are similar values, null === undefined is false because they are not the same type.
/*  it is recommended to use identically equal and not identically equal
instead. This helps to maintain data type integrity throughout your code */

// ***** Conditional Operator *****
// * Assignment Operators
// * Compound-assignment operators
/**
➤➤ Multiply/assign ( *= )
➤➤ Divide/assign ( /= )
➤➤ Modulus/assign (%=)
➤➤ Add/assign ( +=)
➤➤ Subtract/assign ( -=)

➤➤ Left shift/assign ( <<=)
➤➤ Signed right shift/assign ( >>= )
➤➤ Unsigned right shift/assign (>>>=)
 */

//* Comma Operator
console.log("---- Comma Operator -----");
let num110 = 1,
  num210 = 2,
  num310 = 3;
console.log("comma-operator:: ", num110, num210, num310);

//!  num is assigned the value of 0 because it is the last item in the expression
let nummmm = (5, 1, 4, 8, 0); // num becomes 0
console.log("nummmm:: ", nummmm);

// ***** STATEMENTS *****
//* flow-control statements

// ******** The if Statement ********
let ii = 0;
if (ii > 25) console.log("Greater than 25.");
// one–line statement
else {
  console.log("Less than or equal to 25."); // block statement //! best practice to use this
}

//* if chaining
if (ii > 25) {
  console.log("Greater than 25.");
} else if (ii < 0) {
  console.log("Less than 0.");
} else {
  console.log("Between 0 and 25, inclusive.");
}

// ********* The do-while Statement *********
console.log("---- Comma Operator -----");
/* do-while statement is a post-test loop */

let i1 = 0;
do {
  i1 += 2;
  console.log("i1:: ", i1);
} while (i1 < 10);

console.log("i1-do-while:: ", i1);

// ***** The while Statement *****
// The while statement is a pretest loop
let j = 0;
while (j < 10) {
  j += 2;
}
console.log("j:: ", j);

// ***** The for Statement *****
/* for (initialization; expression; post-loop-expression) statement
 */
let countFor = 10;
for (let i = 0; i < countFor; i++) {
  console.log("for:: ", i);
}

let countWhile = 10;
let k = 0;
while (k < countWhile) {
  console.log("k-while:: ", k);
  k++;
}

//! don't run this code
/*
for (;;) { // infinite loop
  doSomething();
}
*/
// * Including only the control expression effectively turns a for loop into a while loop
let cc = 10;
let l = 0;
for (; l < cc; ) {
  console.log("l:: ", l);
  l++;
}

// ***** The for-in Statement *****
//* La declaración for-in es una declaración iterativa estricta. Se utiliza para enumerar las propiedades de un objeto sin símbolos.
//  doesn’t execute the body of the loop if the variable representing the object to iterate over is null or undefined
for (const propName in Object()) {
  document.write("for-in:: ", propName);
}
// *the for-in statement is used to display all the properties of the BOM window object.

//***** The for-of Statement *****
//* La declaración for-of es una declaración iterativa estricta. Se utiliza para recorrer elementos en un objeto iterable.
for (const el of [2, 4, 6, 8]) {
  console.log("el-for-of:: ", el);
}

// !  In ES2018, the for-of statement is extended as a for-await-of loop to support async iterables which produce promises

// ***** Labeled Statements *****
//* used with nested loops
// the label start can be referenced later by using the break or continue statement
let counts = 7;
start: for (let i = 0; i < counts; i++) {
  console.log("i:: ", i);
}

// ***** The break and continue Statements *****
console.log("********** The break and continue Statements **********");
//* break statement exits the loop immediately, forcing execution to continue with the next statement after the loop
//* continue statement,  exits the loop immediately, but execution continues from the top of the loop
console.log("------- break statement -------");
let m = 0;
for (let i = 1; i < 10; i++) {
  if (i % 5 == 0) {
    break;
  }
  m++;
}
console.log("m:: ", m);
console.log("------- continue statement -------");

let nm = 0;
for (let i = 1; i < 10; i++) {
  if (i % 5 === 0) {
    continue;
  }
  nm++;
}
console.log("nm:: ", nm);

//* Both the break and continue statements can be used in conjunction with labeled statements to return to a particular location in the code.
// !  used when there are loops inside of loop
// * BREAK
let nu = 0;
outermost: for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    if (i === 5 && j == 5) {
      break outermost;
    }
    nu++;
  }
}
console.log("nu-break:: ", nu);

// * CONTINUE
let nuu = 0;
outermost: for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    if (i === 5 && j == 5) {
      continue outermost;
    }
    nuu++;
  }
}
console.log("nuu-continuue:: ", nuu);

// * The with Statement
/*
let qs = location.search.substring(1);
let hostName = location.hostname;
let url = location.href;

with (location) {
  let qs = search.substring(1);
  let hostName = hostname;
  let url = href;
}
 */
// ***** The switch Statement *****
//* The default keyword indicates what is to be done if the expression does not evaluate to one of the cases. (In effect, it is an else statement.)
let p = 25;
if (p == 25) {
  console.log("25");
} else if (p == 35) {
  console.log("35");
} else if (p == 45) {
  console.log("45");
} else {
  console.log("Other");
}

switch (p) {
  case 25:
    console.log("25");
    break;
  case 35:
    console.log("35");
    break;
  case 45:
    console.log("45");
    break;
  default:
    console.log("Other");
}
// switch statement works with all data types
switch ("hello world") {
  case "hello" + " world":
    console.log("Greeting was found.");
    break;
  case "goodbye":
    console.log("Closing was found.");
    break;
  default:
    console.log("Unexpected message was found.");
}
//* */ other example
let nume = 25;
switch (true) {
  case nume < 0:
    console.log("Less than 0.");
    break;
  case nume >= 0 && nume <= 10:
    console.log("Between 0 and 10.");
    break;
  case nume > 10 && nume <= 20:
    console.log("Between 10 and 20.");
    break;
  default:
    console.log("More than 20.");
}

//  ****** FUNCTIONS *****
console.log("********** FUNCTIONS **********");

function sayHi(name, message) {
  console.log("Hello " + name + ", " + message);
}
sayHi("Nicholas", "how are you today?");

function sum(num1, num2) {
  return num1 + num2;
}
const resulta = sum(5, 10);

function sum(num1, num2) {
  return num1 + num2;
  console.log("Hello world");
  // never executed
}
// determines the difference between two numbers
function diff(num1, num2) {
  if (num1 < num2) {
    return num2 - num1;
  } else {
    return num1 - num2;
  }
}

// functions that don’t return a value to stop function execution early
function sayHi(name, message) {
  return;
  console.log("Hello " + name + ", " + message);
  // never called
}

// ***** SUMMARY *****
/*
➤➤
➤➤
➤➤
➤➤
➤➤
➤➤
The basic data types in ECMAScript are Undefined, Null, Boolean, Number, String,
and Symbol.
Unlike other languages, there’s no separate data type for integers versus floating-point
values; the Number type represents all numbers.
There is also a complex data type, Object, that is the base type for all objects in
the language.
A strict mode places restrictions on certain error-prone parts of the language.
ECMAScript provides a lot of the basic operators available in C and other C-like languages,
including arithmetic operators, Boolean operators, relational operators, equality operators,
and assignment operators.
The language features flow-control statements borrowed heavily from other languages, such
as the if statement, the for statement, and the switch statement.

*/
