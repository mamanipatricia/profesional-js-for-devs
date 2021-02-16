// ********* Basic Reference Types *********

/*
➤➤ Working with objects
➤➤ Understanding basic JavaScript data types
➤➤ Working with primitives and primitive wrappers
 */

//* A reference value (object) is an instance of a specific reference type */
//* ECMAScript lacks some basic constructs associated with object-oriented programming including classes and interfaces*/

//! references types are also sometimes called "OBJECT DEFINITIONS"
//* A constructor is simply a function whose purpose is to create a new object */

let now = new Date();
console.log("now:: ", now);
//* This code creates a new instance of the Date reference type and stores it in the variable now */

//* constructor being used is Date(), which creates a simple object with only the default properties and methods */

// *********** THE DATE TYPE ***********
// ! Date type stores dates as the number of milliseconds that have passed since midnight on January 1, 1970 UTC (Universal Time Code)
let someDate = new Date(Date.parse("May 233, 2019"));
console.log("someDate:: ", someDate);
let someOtherDate = new Date("October 21, 1994");
console.log("someOtherDate", someOtherDate);

// ******** Date.UTC() method *********
// January 1, 2000 at midnight GMT
let y2k = new Date(Date.UTC(2000, 0));

// May 5, 2005 at 5:55:55 PM GMT
let allFives = new Date(Date.UTC(2005, 4, 5, 17, 55, 55));
console.log("DATES-UTC-y2k:: ", y2k);
console.log("DATES-UTC-allFives:: ", allFives);

// THE SAME AS THE PREVIOUS
// January 1, 2000 at midnight in local time
let y2kk = new Date(2000, 0);
// May 5, 2005 at 5:55:55 PM local time
let allFivess = new Date(2005, 4, 5, 17, 55, 55);
console.log("y2kk, allFivess", y2kk, allFivess);
//  but this time both dates are in the local time zone as determined by the system settings

// ****** DATE NOW ******
console.log("************** Date.now **************");
// het start time
let start = Date.now();

// call a function
function doSomething() {
  return 123345 * 43213234;
}
doSomething();

// get stop time
let stop = Date.now();
result = stop - start;

console.log("result-time subtract::: ", result);

// ******** Inherited Methods ********
console.log("******** Inherited Methods ********");
//*  the Date type overrides toLocaleString(), toString(), and valueOf(), though unlike the previous types, each method returns something different */

console.log(start.toLocaleString()); // AM
console.log(stop.toString()); // GMT-0800 (Pacific Standard Time)

//* toLocaleString() and toString() are useful only for debugging purposes,not for display purposes. */
console.log("------- DATE -------");
let date1 = new Date(2019, 0, 1); // "January 1, 2019"
let date2 = new Date(2019, 1, 0); // "February 1, 2019"

console.log("dates::: ", date1 < date2); //true
console.log("dates::: ", date1 > date2); // false

// ******** Date-Formatting Methods ********
//* toDateString()

console.log("Date::: ", date1);
console.log("toDateString::: ", date1.toDateString());
console.log("toTimeString::: ", date1.toTimeString());
console.log("toLocaleDateString::: ", date1.toLocaleDateString());
console.log("toLocaleTimeString::: ", date1.toLocaleTimeString());
console.log("toUTCString::: ", date1.toUTCString());

// ****** Date/Time Component Methods ******
console.log("********* Date/Time Component Methods *********");

let otherDate = new Date();
console.log("getTime::: ", otherDate.getTime(), otherDate.valueOf());
console.log("setTime()::: ", otherDate.setTime("122"), otherDate.valueOf());
console.log("getFullYear:: ", otherDate.getFullYear());
console.log(
  "getUTCFullYear-Coordinated Universal Time :: ",
  otherDate.getUTCFullYear()
);
//! getUTCFullYear() will differ from getFullYear() it will be on evening of the 31st December if you live West of the Greenwich Meridian.
console.log("setFullYear:: ", otherDate.setFullYear(2022));
console.log("setUTCFullYear:: ", otherDate.setUTCFullYear(2022));
console.log("getMonth:: ", otherDate.getMonth());

// ******* THE REGEXP TYPE *******
//* Three supported flags represent matching modes: g = global node, i = case-sensitive mode, m = multiline mode, y = sticky mode = will only look at the string contents beginning at lastIndex */
// Unicode Transformation Format (UTF).

//* EXAMPLES
// Match all instances of "at" in a string.
let pattern1 = /at/g;

// Match the first instance of "bat" or "cat", regardless of case.
let pattern2 = /[bc]at/i;

// Match all three-character combinations ending with "at", regardless of case.
let pattern3 = /.at/gi;

// ! METACHARACTERS:  ( [ { \ ^ $ | ) ] } ? * + .

// ******** the RegExp constructor, which accepts two arguments: a string pattern to match and an optional string of flags to apply

// Match the first instance of "bat" or "cat", regardless of case.
let pattern11 = /[bc]at/i;
// Same as pattern1, just using the constructor.
let pattern22 = new RegExp("[bc]at", "i");
//* Here, pattern1 and pattern2 define equivalent regular expressions */

//  Regular-expression literals always share the same RegExp instance, while creating a new RegExp via constructor always results in a new instance
let re = null;
for (let i = 0; i < 10; i++) {
  re = /cat/g;
  re.test("catastrophe");
}
for (let i = 0; i < 10; i++) {
  re = new RegExp("cat", "g");
  re.test("catastrophe");
}
// It is also possible to copy existing regular expression instances and optionally modify their flags using the constructor:
const re1 = /cat/g;
console.log("re1:: ", re1);

const re2 = new RegExp(re1);
console.log("re2:: ", re2);

const re3 = new RegExp(re1, "i");
console.log("re3:: ", re3);

// ********* RegExp Instance Properties *********

console.log("******** RegExp Instance Properties *********object");
//*  properties that allow you to get information about the pattern:
// (global, ignoreCase, unicode, sticky, multiline,) - boolean (lastIndex- the character position where the next match will be attempted in the source string ) - integer, source, flags

let patternOne = /\[bc\]at/i;
console.log("--> ", patternOne.global); // false
console.log("--> ", patternOne.ignoreCase); // true
console.log("--> ", patternOne.multiline); // false
console.log("--> ", patternOne.lastIndex); // 0
console.log("--> ", patternOne.source); // "\[bc\]at"
console.log("--> ", patternOne.flags); // "i"

let patternTwo = new RegExp("\\[bc\\]at", "i");
console.log("~~> ", patternTwo.global); // false
console.log("~~> ", patternTwo.ignoreCase); // true
console.log("~~> ", patternTwo.multiline); // false
console.log("~~> ", patternTwo.lastIndex); // 0
console.log("~~> ", patternTwo.source); //"\[bc\]at"
console.log("~~> ", patternTwo.flags); // "i"

// ******* RegExp Instance Methods *******
console.log("******** RegExp Instance Methods *********object");

// example

let text = "mom and dad and baby";
let pattern = /mom( and dad( and baby)?)?/gi;
let matches = pattern.exec(text);
console.log(matches.index); // 0
console.log(matches.input); // "mom and dad and baby"
console.log(matches[0]); // "mom and dad and baby"
console.log(matches[1]); // " and dad and baby"
console.log(matches[2]); // " and baby"

// The exec() method returns information about one match at a time even if the pattern is global. When the global flag is not specified, calling exec() on the same string multiple times will always return information about the first match

let texto = "cat, bat, sat, fat";
let pattern10 = /.at/;

let matches1 = pattern10.exec(texto);
console.log("matches1.index:: ", matches1.index);
console.log("matches[0]:: ", matches1[0]);
console.log("pattern10.lastIndex:: ", pattern10.lastIndex);

matches2 = pattern10.exec(texto);
console.log("matches.index:: ", matches2.index);
console.log("matches[0]:: ", matches2[0]);
console.log(("pattern.lastIndex:: ", pattern.lastIndex)); // 0

//* */ with g mode
let t = "cat, bat, sat, fat";
let pattern4 = /.at/g;
let matches3 = pattern4.exec(t);
console.log("matches.index:: ", matches.index); // 0
console.log("matches[0]:: ", matches3[0]); // cat
console.log("pattern.lastIndex:::: ", pattern4.lastIndex); // 3

matches3 = pattern4.exec(t);
console.log("index:: ", matches3.index);
console.log("[0]:: ", matches3[0]);
console.log("latIndex::: ", pattern4.lastIndex); // bat 8

matches3 = pattern4.exec(t);
console.log("index:: ", matches3.index);
console.log("[0]:: ", matches3[0]);
console.log("latIndex::: ", pattern4.lastIndex); // 10 sat1 3

// ! The sticky flag overrides the global flag
//  *** each call to exec() will search for a match in the string only at lastIndex
/*
let text = "cat, bat, sat, fat";
let pattern = /.at/y;
let matches = pattern.exec(text);
console.log(matches.index); // 0
console.log(matches[0]); // cat
console.log(pattern.lastIndex); // 3
// There is no match starting at character index 3, so exec() will return null
// exec() finding no matches resets lastIndex to 0
matches = pattern.exec(text);
console.log(matches); // null
console.log(pattern.lastIndex); // 0
// Advancing lastIndex will allow a sticky regex exec() to find the next match:
pattern.lastIndex = 5;
matches = pattern.exec(text);
console.log(matches.index); // 5
console.log(matches[0]); // bat
console.log(pattern.lastIndex); // 8
 */
//* Another method of regular expressions is test() */
// returns true if the pattern matches the argument and false if it does not
let text1 = "000-00-0000";
let pattern7 = /\d{3}-\d{2}-\d{4}/;
if (pattern7.test(text1)) {
  console.log("The pattern was matched.");
}

//! inherited methods of toLocaleString() and toString()  each return the literal representation of the regular expression - valueOf() method for a regular expression returns the regular expression itself.

let patternn = new RegExp("\\[bc\\]at", "gi");
console.log(patternn.toString()); // /\[bc\]at/gi
console.log(patternn.toLocaleString()); // /\[bc\]at/gi

// ******* RegExp Constructor Properties *******

let texto1 = "this has been a short summer";
let pattern12 = /(.)hort/g;
if (pattern12.test(texto1)) {
  console.log("~~>", RegExp.input); // this has been a short summer
  console.log("~~>", RegExp.leftContext); // this has been a
  console.log("~~>", RegExp.rightContext); // summer
  console.log("~~>", RegExp.lastMatch); // short
  console.log("~~>", RegExp.lastParen); // s
}

// *  short property names
let text8 = "this has been a short summer";
let pattern8 = /(.)hort/g;
/*
 * Note: Opera doesn't short property names.
 * Internet Explorer doesn't support multiline.
 */
if (pattern8.test(text8)) {
  console.log("*** ", RegExp.$_); // this has been a short summer
  console.log("*** ", RegExp["$`"]); // this has been a
  console.log("*** ", RegExp["$'"]); // summer
  console.log("*** ", RegExp["$&"]); // short
  console.log("*** ", RegExp["$+"]); // s
  console.log("*** ", RegExp["$*"]); // false
}

// * CONSTRUCTOR PROPERTIES
let text9 = "this has been a short summer";
let pattern9 = /(..)or(.)/g;
if (pattern9.test(text9)) {
  console.log("--> ", RegExp.$1); // sh
  console.log("--> ", RegExp.$2); // t
}
//*  a pattern with two matching groups is created and tested against a string */

// ********** Pattern Limitations **********
console.log("********** Pattern Limitations **********");

// *********** PRIMITIVE WRAPPER TYPES ***********
/*
➤➤ The \A and \Z anchors (matching the start or end of a string, respectively)
➤➤ Lookbehinds
➤➤ Union and intersection classes
➤➤ Atomic grouping
➤➤ Unicode support (except for matching a single character at a time)
➤➤ Named capturing groups
➤➤ The s (single-line) and x (free-spacing) matching modes
➤➤ Conditionals
➤➤ Regular-expression comments
*/
//* the Boolean type, the Number type, and the String typ */
let s1 = "some text";
let s2 = s1.substring(2); //!  When s1 is accessed in the second line, it is being accessed in read mode

/*
 * Create an instance of the String type
 * Call the specified method on the instance.
 * Destroy the instance.
 */
let s10 = "some text";
s10.color = "red";
console.log(s10.color); // undefined
//! The major difference between reference types and primitive wrapper types is the lifetime of the object.

let obj = new Object("some text");
console.log(obj instanceof String); // true

let value = "25";
let number = Number(value); // casting function - filled primitive number
console.log(typeof number); // "number"
let obj1 = new Number(value); // constructor - filled instance of Number
console.log(typeof obj1); // "object"
// !  not recommended to create primitive wrapper objects explicitly

// ******* The Boolean Type *******
console.log("------ The Boolean Type ------");
// ** all objects are automatically converted to true in Boolean expressions,
let falseObject = new Boolean(false);
let resultFalseObject = falseObject && true;
console.log(resultFalseObject); // true
let falseValue = false;
resultFalseObject1 = falseValue && true;
console.log(resultFalseObject1); // false

//! dont use Boolean object

// ************* The Number Type *************

let num = 10;
console.log("++++ ", num.toString()); // "10"
console.log("++++ ", num.toString(2)); // "1010"
console.log("++++ ", num.toString(8)); // "12"
console.log("++++ ", num.toString(10)); // "10"
console.log("++++ ", num.toString(16)); // "a"

// * The toFixed() method returns a string representation of a number with a specified number of decimal points

let num1 = 10;
console.log("toFixed-to-2:: ", num1.toFixed(2)); // "10.00"

let num2 = 10.005;
console.log("rounded to the nearest decimal place:: ", num2.toFixed(2)); // "10.01"

//  SOME NOT EXACT RESULTS::  0.1 + 0.2 = 0.30000000000000004.
// !  toFixed() method can represent numbers with 0 through 20 decimal places

// ******* toExponencial() method **********
console.log("---------- toExponencial() method ----------");
let num3 = 10;
console.log("toExponential:: ", num3.toExponential(3)); // "1.0e+1"

// ******* toPrecision() method **********
console.log("---------- toPrecision() method ----------");
let num4 = 99;
console.log("**** ", num4.toPrecision(1)); // "1e+2"
console.log("**** ", num4.toPrecision(2)); // "99"
console.log("**** ", num4.toPrecision(3)); // "99.0"
// ! . The toPrecision() method essentially determines whether to call toFixed() or toExponential() based on the numeric value you’re working with

let numberObject = new Number(10);
let numberValue = 10;
console.log("~~~~ ", typeof numberObject); // "object"
console.log("~~~~ ", typeof numberValue); // "number"
console.log("~~~~ ", numberObject instanceof Number); // true
console.log("~~~~ ", numberValue instanceof Number); // false

// ********* The isInteger() Method and Safe Integers *********

console.log("isInteger:: ", Number.isInteger(1)); // true
console.log("isInteger:: ", Number.isInteger(1.0)); // true
console.log("isInteger:: ", Number.isInteger(1.01)); // false

// *********** isSafeInteger ***********

//* To ascertain if an integer is inside this range, the Number.isSafeInteger() method allows you to easily check
console.log("isSafeInteger:: ", Number.isSafeInteger(-1 * 2 ** 53)); // false
console.log("isSafeInteger:: ", Number.isSafeInteger(-1 * 2 ** 53 + 1)); // true
console.log("isSafeInteger:: ", Number.isSafeInteger(2 ** 53)); //false
console.log("isSafeInteger:: ", Number.isSafeInteger(2 ** 53 - 1)); // true

// ************ The String Type ************
let stringObject = new String("hello world");

let stringValue = "hello world";
console.log("string-value:: ", stringValue.length); // "11"

// ****** The JavaScript Character ******
//* length property = how many 16 bit code units occur inside the string
let message = "abcde";
console.log("length:: ", message.length); // 5

//* charAt() returns the character at a given index
let messages = "abcde";
console.log("charAt:: ", messages.charAt(2)); // "c"
// ! JavaScript strings use a hybridized strategy of two Unicode encodings: UCS-2 and UTF-16.

// * charCodeAt()
//* You can inspect the character encoding of a given code unit

let messagecharcodeAt = "abcde"; // Unicode "Latin small letter C" is U+0063
console.log("charCodeAt:: ", messagecharcodeAt.charCodeAt(2)); // 99

// Decimal 99 === Hexadecimal 63
console.log(99 === 0x63); // true

// * fromCharCode()
//* for creating characters in a string from their UTF-16 code unit representation. This method accepts any number of numbers and returns their character equivalents concatenated into a string

console.log(
  "fromCharCode:: ",
  String.fromCharCode(0x61, 0x62, 0x63, 0x64, 0x65)
); // "abcde"
console.log("fromCharCode:: ", String.fromCharCode(97, 98, 99, 100, 101)); // "abcde"

//***  surrogate pair

// The "smiling face with smiling eyes" emoji is U+1F60A
// 0x1F60A === 128522
let messagess = "ab☺de";
console.log("smiley-face-emoji:: ", messagess.length); // 6

console.log("SMILEY::: ", String.fromCharCode(0x1f60a)); // ☺
console.log("SMILEY::: ", String.fromCharCode(97, 98, 55357, 56842, 100, 101)); // ab☺de

console.log([..."ab☺de"]); // ["a", "b", "☺", "d", "e"]

/*
 * As charAt() has an analogue in codePointAt()
 * fromCharCode() has an analogue in fromCodePoint()
 */

console.log(
  "charCodePoint:: ",
  String.fromCharCode(97, 98, 55357, 56842, 100, 101)
); // ab☺de
console.log("charCodePoint:: ", String.fromCodePoint(97, 98, 128522, 100, 101)); // ab☺de

// ************ The normalize() Method ************

// !Some Unicode characters can be encoded: Basic Multilingual Plane (BMP) o surrogate pair
let a1 = String.fromCharCode(0x00c5),
  a2 = String.fromCharCode(0x212b),
  a3 = String.fromCharCode(0x0041, 0x030a);

console.log("normalized:: ", a1.normalize("NFD") === a2.normalize("NFD")); // true
console.log("normalized:: ", a2.normalize("NFKC") === a3.normalize("NFKC")); // true
console.log("normalized:: ", a1.normalize("NFC") === a3.normalize("NFC")); // true

// ************ String-Manipulation Methods ************
// * concat()
let stringValues = "hello ";
let resultt = stringValues.concat("world");

console.log("concat:: ", resultt); // "hello world"
console.log("concat:: ", stringValues); // "hello"

//
let stringValuee = "hello ";
let results = stringValuee.concat("world", "!");
console.log("multiple-values-in-concat:: ", results); // "hello world!"
console.log("multiple-values-in-concat:: ", stringValuee); // "hello"

// ! +  performs better than the concat() method
// * three methods for creating strings values form a substring: slice, substr, substring

//!  slice(initialPosition, endPositionExcluded) and substring() RETURNS the position , substr() returns  the number of characters to return
let stringValueee = "hello world";

console.log("**** slice::  ", stringValueee.slice(3)); // "lo world"
console.log("**** substring::  ", stringValueee.substring(3)); // "lo world"
console.log("**** substr::  ", stringValueee.substr(3)); // "lo world"
console.log("**** slice::  ", stringValueee.slice(3, 7)); // "lo w"
console.log("**** substring::  ", stringValueee.substring(3, 7)); // "lo w"
console.log("**** substr::  ", stringValueee.substr(3, 7)); //"lo worl"

// ********* String Location Methods *********
console.log("********* String Location Methods *********");
let stringValueIndexOf = "hello World";
console.log(
  "stringValueIndexOf.indexOf('o):: ",
  stringValueIndexOf.indexOf("h")
);
console.log(
  "stringValueIndexOf.lastIndexOf('o'):: ",
  stringValueIndexOf.lastIndexOf("o")
);

// Each method accepts an optional second argument that indicates the position to start searching from within the string.

let stringValueIndexOfSecondArg = "hello world";
console.log(
  "IndexOfSecondArg.indexOf:: ",
  stringValueIndexOfSecondArg.indexOf("o", 6)
);

console.log(
  "IndexOfSecondArg.indexOf::",
  stringValueIndexOfSecondArg.lastIndexOf("l", 9)
);

// explanation
let stringValueIndexOfExplanation =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit";
let positions = new Array();
let pos = stringValueIndexOfExplanation.indexOf("e");

while (pos > -1) {
  positions.push(pos);
  pos = stringValueIndexOfExplanation.indexOf("e", pos + 1);
  console.log("pos:: ", pos);
}

console.log("positions:: ", positions); // "3,24,32,35,52"

// ***************** String Inclusion Methods *****************
console.log("***************** String Inclusion Methods *****************");
/*
 * startsWith = checks for a match beginning at index 0
 * startsEnd = checks for a match beginning at index(string.length - substring.length)
 * includes = checks the entire string
 */

let messageStringInclusion = "foobarbaz";

console.log("startsWith:: ", messageStringInclusion.startsWith("foo"));
console.log("startsWith:: ", messageStringInclusion.startsWith("bar"));

console.log("endsWith:: ", messageStringInclusion.endsWith("baz"));
console.log("endsWith:: ", messageStringInclusion.endsWith("bar"));

console.log("includes:: ", messageStringInclusion.includes("bar"));
console.log("includes:: ", messageStringInclusion.includes("qux"));

// * startsWith and includes accept second argument that indicates the position to start searching from within the string

let mes = "foobarbaz";
console.log("startsWidth-position:: ", mes.startsWith("foo"));
console.log("startsWidth-position:: ", mes.startsWith("foo", 1));

console.log("includes:: ", mes.includes("bar"));
console.log("includes:: ", mes.includes("bar", 4));

//* endsWith() method accepts an optional second argument that indicates the position that should be treated as the end of the string - (by default is the length of the string)

let messageEndsWith = "foobarbaz";

console.log("endsWith-second-arg:: ", messageEndsWith.endsWith("bar"));
console.log("endsWith-second-arg:: ", messageEndsWith.endsWith("foobar", 6)); // "foobar"

// ************** The trim() Method **************
console.log("************** The trim() Method **************");

// * trim method creates a copy of the string, removes all leading and trailing white space

let stringValueTrim = "   hello world    ";
let trimmedStringValue = stringValueTrim.trim();

console.log("stringValueTrim:: ", stringValueTrim); // " hello world "
console.log("trimmedStringValue:: ", trimmedStringValue); // "hello world"

// * trimLeft() and trimRight() methods
console.log("trimLeft:: ", stringValueTrim.trimLeft());
console.log("trimtrimRight:: ", stringValueTrim.trimRight());

// ************** The repeat() Method **************
console.log("************** The repeat() Method **************");

let stringValueRepeat = "na ";
console.log("stringValueRepeat:: ", stringValueRepeat.repeat(16) + "batman");
console.log("repeat-example:: ", "patty ".repeat(3) + "hello");

// ************* The padStart() and padEnd() Methods *************
// * The first argument is the desired length, and the second is the optional string to add as a pad. //! If not provided, the U+0020 ’space’ character will be used.
console.log("************ The padStart() and padEnd() Methods *************");
let stringValuePad = "foo";

console.log("stringValuePadStart:: ", stringValuePad.padStart(6)); // "    foo"
console.log("stringValuePadStart:: ", stringValuePad.padStart(6, "-")); // "......foo"

console.log("stringValuePadEnd:: ", stringValuePad.padEnd(6)); // "foo     "
console.log("stringValuePadEnd:: ", stringValuePad.padEnd(9, "*-")); // "foo......"

// *  If provided a multiple-character string,the method will use the concatenated padding and truncate it to the exact length, if the length is less than or equal to the string length, the operation is effectively a no-op

let stringValuePad1 = "foo";

console.log("padStart:: ", stringValuePad1.padStart(8, "bar")); // "barbafoo"
console.log("padStart:: ", stringValuePad1.padStart(2)); // "foo"

// *********** String Iterators and Destructuring **********
console.log("*********** String Iterators and Destructuring ***********");

let m = "abc";
let stringIterator = m[Symbol.iterator]();

console.log("stringIterator.next:: ", stringIterator.next());
console.log("stringIterator.next:: ", stringIterator.next()); // {value: "a", done: false}
console.log("stringIterator.next:: ", stringIterator.next()); // {value: "b", done:  false}
console.log("stringIterator.next:: ", stringIterator.next()); // {value: "b", done:  false}

for (const c of "abcde") {
  console.log("c:: ", c);
}
//* The string iterator becomes especially useful since it allows for interoperability with the destructuring operator. This allows you to easily split a string by its characters:

let mm = "patty";
console.log("destructuring:: ", [...mm]);

// ************* String Case Methods *************
let stringValueCase = "hello world";

console.log("stringValueCase:: ", stringValueCase.toLocaleLowerCase());

console.log("~~> ", stringValueCase.toLocaleUpperCase()); // "HELLO WORLD"
console.log("~~> ", stringValueCase.toUpperCase()); // "HELLO WORLD"
console.log("~~> ", stringValueCase.toLocaleLowerCase()); // "hello world"
console.log("~~> ", stringValueCase.toLowerCase()); // "hello world"
//! if you do not know the language in which the code will be running, it is safer to use the locale specific methods.

// ************** String Pattern-Matching Methods **************
let textPattern = "cat, bat, sat, fat";
// ------------- MATCH -------------
let patron = /.at/;

// same as patter.exec(textPattern)
let matchesPattern = textPattern.match(patron);
console.log("matchesPattern-index:: ", matchesPattern.index);
console.log("matchesPattern[0]:: ", matchesPattern[0]); // the first item is the string that matches the entire pattern,
console.log("matchesPattern-lastIndex:: ", matchesPattern.lastIndex);

// ------------- SEARCH -------------
//* search() method returns the index of the first pattern occurrence in the string or –1 if it’s not found. search() always begins looking for the pattern at the beginning of the string

let txt = "cat, bat, sat, fat";
let p = txt.search(/at/);
console.log("pos-search:: ", p); //  returns 1, which is the first position of "at" in the string

// ************* replace , accepts two arguments. ************
let tx = "cat, bat, sat, fat";
let res = tx.replace("at", "ond");
console.log("res-replace:: ", res);

rr = tx.replace(/at/g, "ond");
console.log("resultado-replace-global:: ", rr);

// ************* special character sequences ************
let x = "cat, bat, sat, fat";
rs = x.replace(/(.at)/g, "word ($1)");
// rs = x.replace(/(.at)/g, "$1"); // the same as prev

console.log("special-characters-sequences:: ", rs);

function htmlEscape(text) {
  return text.replace(/[<>"&]/g, function (match, pos, originalText) {
    switch (match) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case '"':
        return "&quot;";
    }
  });
}
console.log(htmlEscape('<p class="greeting">Hello world!</p>'));
// "&lt;p class=&quot;greeting&quot;&gt;Hello world!</p>"

// ************ SPLIT ************
// * separates the string into an array of substrings based on a separator

let colorText = "red,blue,green,yellow";
let colors1 = colorText.split(",");
let colors2 = colorText.split(",", 2); // truncate the results to only two item
let colors3 = colorText.split(/[^\,]+/);

console.log("colors1:: ", colors1);
console.log("colors2:: ", colors2);
console.log("colors2:: ", colors3);

// *************** The localeCompare() Method ***************
console.log("*************** The localeCompare() Method ***************");

let stringValuesLocaleCompare = "yellow";

console.log(
  "LocaleCompare:: ",
  stringValuesLocaleCompare.localeCompare("brick")
);
console.log(
  "LocaleCompare:: ",
  stringValuesLocaleCompare.localeCompare("yellow")
);
console.log("LocaleCompare:: ", stringValuesLocaleCompare.localeCompare("zoo"));

//examples
function determineOrder(value) {
  let result = stringValue.localeCompare(value);
  if (result < 0) {
    console.log(`The string 'yellow' comes before the string '${value}'.`);
  } else if (result > 0) {
    console.log(`The string 'yellow' comes after the string '${value}'.`);
  } else {
    console.log(`The string 'yellow' is equal to the string '${value}'.`);
  }
}
determineOrder("brick");
determineOrder("yellow");
determineOrder("zoo");
//! localeCompare() is case-sensitive, determining that uppercase letters come alphabetically after lowercase letters

// **************** HTML Methods ****************
/* METHOD          OUTPUT
 * anchor(name)     <a name="name">string</a>
 */

// *********** SINGLETON BUILT-IN OBJECTS ***********
/*
 * built-in objects: Object, Array y String
 * There are two more: GLobal and Math
 */
// **************** The Global Object ****************
// **************** The Global Object ****************
// ! isNaN(), isFinite(), parseInt(), and parseFloat(), are actually methods of the Global object.

// **************** URI-Encoding Methods ****************
/*
 * encodeURI() and encodeURIComponent() methods are used to encode URIs (Uniform Resource Identifiers) to be passed to the browser. To be valid, a URI cannot contain certain characters, such as spaces.

 * encodeURI() method is designed to work on an entire URI (for instance, www.wrox.com/illegal value.js)

* encodeURIComponent() is designed to work solely on a segment of a URI (such as illegal value.js from the previous URI)

* encodeURI() does not encode special characters that are part of a URI (colon,forward slash, question mark, and pound sign)
* encodeURIComponent() encodes every non standard character it finds
*/
console.log("**************** URI-Encoding Methods ****************");
let uri = "http:// www.wrox.com/illegal value.js#start";

// "http:// www.wrox.com/illegal%20value.js#start"
console.log("encodeURI:: ", encodeURI(uri));

// "http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.js%23start"
console.log("encodeURIComponent:: ", encodeURIComponent(uri));

console.log("**************** URI-decoding Methods ****************");
/*
 *  encodeURI() and encodeURIComponent() are decodeURI() and decode­ URIComponent().
 *
 */
let uriDecode = "http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.js%23start";
// http%3A%2F%2Fwww.wrox.com%2Fillegal value.js%23start
console.log("decodeURI:: ", decodeURI(uriDecode));
// http:// www.wrox.com/illegal value.js#start
console.log("decodeURIComponent:: ", decodeURIComponent(uriDecode));
//!  Avoid using escape() and unescape() in production code.

// **************** The eval() Method ****************
console.log("**************** The eval() Method ****************");

eval("console.log('hi')");
// EQUIVALENT
console.log("hi");

// EXAMPLE
let msg = "hello world";
eval("console.log(msg)"); //  the variable msg is defined outside the context of the eval() call,

// can define a function or variables inside an eval() call that can be referenced by the code outside

eval("function sayHi() {console.log('hi world!!!', 2 + 2)}");
sayHi();

// example
eval("let msg = 'hello world';");
console.log("msg:: ", msg);
//! Any variables or functions created inside of eval() will not be hoisted, They are created only at the time of eval() execution

// * strict mode
// "use strict";
// eval = "hi"; // causes error (book says) - humm no entiendo
// eval(console.log("hiiiiii"));

//* strict mode, assigning a value to eval causes an error:
// !  this method exposes a large attack surface for XSS exploits

// **************** Global Object Properties ****************
console.log("**************** Global Object Properties ****************");

/*
 * properties of the Global object: undefined, NaN, and Infinity, all native reference type constructors, such as Object and Function
 */

console.log("**************** The Window Object ****************");
//*  window is the Global object’s delegate.  Therefore, all variables and functions declared in the global scope become properties on window
/*
let color = "red";
function sayColor() {
  console.log("window.color:: ", window.color);
}

window.sayColor();
*/

// another way to retrieve the Global object
// * This code creates an immediately-invoked function expression that returns the value of this

let global = (function () {
  return this;
})();

console.log("global-this:: ", global);

// **************** The Math Object ****************
console.log("**************** The Math Object ****************");
// the Math object as a common location for mathematical formulas, information,and computation. -  A side-effect of this is that precision of these operations may vary between browsers, operating systems, instruction sets, and hardware

console.log("------------ Math Object Properties ------------ ");
console.log("E:: ", Math.E);
console.log("LN10:: ", Math.LN10);
console.log("PI:: ", Math.PI);
console.log("SQRT1_2:: ", Math.SQRT1_2);

console.log("------------ The min() and max() Methods ------------ ");
let max = Math.max(3, 54, 32, 16);
console.log("max:: ", max);

let min = Math.min(3, 54, 32, 16);
console.log("min:: ", min);

//* to find in arrays use spread operators
let values = [1, 2, 3, 4, 5, 6, 7, 8];
let maximo = Math.max(...values);
console.log("maximo:: ", maximo);

console.log("------------ Rounding Methods ------------ ");
/*
* Math.ceil() -  rounds numbers up to the nearest integer value
*  Math.floor() - rounds numbers down to the nearest integer value
* Math.round() - represents a standard round function
* Math.fround() -  returns the nearest single precision (32 bits) floating point rep- resentation of the number.

*/

console.log("Math-ceil:: ", Math.ceil(25.9)); // 26
console.log("Math-ceil:: ", Math.ceil(25.5)); // 26
console.log("Math-ceil:: ", Math.ceil(25.1)); // 26

console.log("Math-round:: ", Math.round(25.9)); // 26
console.log("Math-round:: ", Math.round(25.5)); // 26
console.log("Math-round:: ", Math.round(25.1)); // 25

console.log("Math-fround:: ", Math.fround(0.4)); // 0.4000000059604645
console.log("Math-fround:: ", Math.fround(0.5)); // 0.5
console.log("Math-fround:: ", Math.fround(25.9)); // 25.899999618530273

console.log("Math-floor:: ", Math.floor(25.9)); // 25
console.log("Math-floor:: ", Math.floor(25.5)); // 25
console.log("Math-floor:: ", Math.floor(25.1)); // 25

console.log("------------ The random() Method ------------ ");

let randomNumber = Math.floor(Math.random() * 10 + 1);
console.log("randomNumber:: ", randomNumber);

let randomNumber1 = Math.floor(Math.random() * 9 + 2);
console.log("randomNumber1:: ", randomNumber1);

//
function selectFrom(lowerValue, upperValue) {
  let choices = upperValue - lowerValue + 1;
  return Math.floor(Math.random() * choices + lowerValue);
}
let numm = selectFrom(2, 10);
console.log(numm); // number between 2 and 10, inclusive

console.log("------------ selectFrom Method ------------ ");

let colors = ["red", "green", "blue", "yellow", "black", "purple", "brown"];
let color = colors[selectFrom(0, colors.length - 1)];
console.log("color:: ", color);

// * for cryptographic purposes use ~~~~~> window.crypto.getRandomValues(

console.log("------------ Other Methods ------------ ");
console.log("Math.abs:: ", Math.abs(-45));
console.log("Math.exp:: ", Math.exp(3)); // e = euler^3
console.log("Math.pow:: ", Math.pow(2, 4));
console.log("Math.truncate:: ", Math.trunc(4.43224324989));
console.log("Math.sqrt:: ", Math.sqrt(2, 4));

// ********* SUMMARY *********
/*
 * There are also two built-in objects that exist at the beginning of code execution: Global and Math.
 * The Global object isn’t accessible in most ECMAScript implementations; however, web browsers implement it as the window object.
 * The Global object contains all global variables and functions as properties. The Math object contains properties and methods to aid in complex mathematical calculations
 */
