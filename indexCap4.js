//****** 4. Variables, Scope, and Memory ******

/*
➤➤ Working with primitive and reference values in variables
➤➤ Understanding execution context
➤➤ Understanding garbage collection
 */
// * Primitive values are simple atomic pieces of data, while reference values are objects that may be made up of multiple values.

//! Unlike other languages, JavaScript does not permit direct access of memory location */
// ! such values are said to be accessed by reference.
// ***** Dynamic Properties *****
console.log("************ Dynamic Properties ************");

let person = new Object();
person.name = "Nicholas"; // PROPERTY name
console.log("person.name:: ", person.name);

/*
let namee = "Nicholas";
namee.age = 27; //! MAL
console.log("namee.age:: ", namee.age);
 */
let name1 = "Nicholas";
let name2 = new String("Matt");
name1.age = 27;
name2.age = 26;
console.log("name1:: ", name1.age);
console.log("name2:: ", name2.age);
console.log("typeof-name1:: ", typeof name1);
console.log("typeof-name1:: ", typeof name2);

// ***** Copying Values *****
/* Cuando se asigna un valor primitivo de una variable a otra, el valor almacenado en el objeto de variable se crea y se copia en la ubicación de la nueva variable. */

let num1 = 5;
let num2 = num1;

console.log("num1, num2:: ", num1, num2);

let obj1 = new Object();
let obj2 = obj1;
obj1.name = "Nicholas";
console.log("obj2.name:: ", obj2.name);

// ***** Argument Passing *****
//* variables are accessed both by value and by reference, but arguments are passed only by value.

function addTen(num) {
  // num = local variable
  num += 10;
  return num;
}

let count = 20;
let result = addTen(count);
console.log("count:: ", count); // 20 - no change
console.log("result:: ", result); // 30

//* using objects
function setName(obj) {
  obj.name = "Nicholas";
}

let persons = new Object();
setName(persons);
console.log("persons.name:: ", persons.name); // Nicholas

// * To prove that objects are passed by value
function setName(obj) {
  obj.name = "Nicholasss";
  obj = new Object(); //! overwrite to obj and it becomes a pointer to a local object
  obj.name = "Greg";
}

// * Function arguments are local variables
let people = new Object();
setName(people);
console.log("people.name:: ", people.name);

// ***** Determining Type *****
//* typeof operator is best way to determine if a variable is a string, number, Boolean, or undefined
console.log("***********-* Determining Type ***********-*");
let s = "Patty";
let b = true;
let i = 22;
let u;
let n = null;
let o = new Object();

console.log("typeof-string:: ", typeof s);
console.log("typeof-boolean:: ", typeof b);
console.log("typeof-number:: ", typeof i);
console.log("typeof-undefined:: ", typeof u);
console.log("typeof-null=object:: ", typeof n);
console.log("typeof-object:: ", typeof o);
//! Although typeof works well for primitive values, it’s of little use for reference values

// * instanceof operator, which is used to know is what type of object it is.
/* result = variable instanceof constructor */
//* The instanceof operator returns true if the variable is an instance of the given reference type
let colors = "red",
  pattern = "pattern";
console.log("person-instanceof:: ", person instanceof Object);
console.log("person-instanceof:: ", colors instanceof Array);
console.log("person-instanceof:: ", pattern instanceof RegExp);
// ! All reference values, by definition, are instances of Object,

// ****** EXECUTION CONTEXT AND SCOPE ******
console.log("***** EXECUTION CONTEXT AND SCOPE ******");

var color = "blue";

function changeColor() {
  if (color === "blue") {
    color = "red";
  } else {
    color = "blue";
  }
}
console.log("changeColor:: ", changeColor());

//* Example:  locally defined variables can be used interchangeably with global variables in a local context.
var color = "blue";

function changeColor() {
  let anotherColor = "red";

  function swapColors() {
    let tempColor = anotherColor;
    anotherColor = color;
    color = tempColor;
    //color, anotherColor, and tempColor are all accessible here
  }
  // color and anotherColor are accessible here, but not tempColor
  swapColors();
}
//only color is accessible here
changeColor();
console.log("color::: ", color);

// * Explanation: there are three execution context: global context, local context of changeColor(), local context of swapColors()
//* . The local context of swapColors() has one variable, named tempColor, that is accessible only within that context */

// ******** Scope Chain Augmentation  ********
//*  two primary types of execution contexts, global and function (the third exists inside of a call to eval()) */
/*
➤➤ The catch block in a try-catch statement
➤➤ A with statement
 */
//* */ for the catch statement, a new variable object is created and contains a declaration for the thrown error object

// ******** Variable Declaration ********
// * Function Scope Declaration Using var
//  If a variable is initialized without first being declared, it gets added to the global context automatically
function add(num1, num2) {
  //   var sum = num1 + num2;
  //! sum is created in the global context and continues to exist even after the function has completed, allowing you to access it later.
  sum = num1 + num2;
  return sum;
}

let resultado = add(10, 20);
console.log("resultado:: ", resultado);
console.log("sum:: ", sum);

var name = "Jake";
//  this is equivalent to:
name = "Jake";
var name;
console.log("name:: ", name);

//* in functions - hoisting
function fn1() {
  var name = "Jake";
}
// This is equivalent to:
function fn2() {
  var name;
  name = "Jake";
}

// ***** hoisting *****
// * The hoist- ing of the declaration means you will see undefined instead of ReferenceError
console.log("***** hoisting *****");

console.log(namee); // undefined
var namee = "Jake";

function a() {
  console.log(namee); // undefined
  var namee = "Jake";
}

// ********** Block Scope Declaration Using let **********
//*  Block scope is defined as the nearest set of enclosing curly braces {}

if (true) {
  let a;
}
console.log("a:: ", a);

// while (true) {
//   let b;
// }
// console.log("b::", b);

function foo() {
  let c;
}
// console.log("c:: ", c);

//* let cannot be declared twice inside the same block scope
console.log("********LET********");
var z;
var z;
console.log("z:: ", z);

{
  let y;
  // let y;
}

//* The behavior of let is useful in iterators inside loops
//! VAR
for (var ii = 0; ii < 10; ++ii) {}
console.log("ii:: ", ii);
//! LET
for (let jj = 0; jj < 10; ++jj) {}
// console.log("jj:: ", jj);

//!  let is not hoisted in the same way as var.
//
console.log("********CONST********");
// *********** CONST  ***********
//* Constant Declaration Using const
//* const must be initialized to some value, once declared, it cannot be reassigned
// const aa; // SyntaxError
const bb = 3;
console.log("bb:: ", bb);
// bb = 4;

const o1 = {};
// o1 = {};

const o2 = {};
o2.name = "Jake";
console.log("o2.name:: ", o2.name);

//* If you wish to make the entire object immutable, you can use Object.freeze(), although attempted property assignment will not raise errors; it will just silently fail

const o3 = Object.freeze({});
o3.name = "Jake";
console.log("o3.name:: ", o3.name);

// ******* Identifier Lookup *******
var color = "blue";
function getColor() {
  return color;
}
console.log("identifier - lookup:: ", getColor());
// 'blue'
// *************************
var colores = "pinky";
function getColores() {
  let colores = "red";
  return colores;
}
console.log("getColores:: ", getColores()); // 'red'

// block scoped declaration
var color = "blue";
function getColor() {
  let color = "red";
  {
    let color = "green";
    return color;
  }
}
console.log(getColor()); // 'green'

// ********** GARBAGE COLLECTION **********
//* JavaScript is a garbage-collected language, meaning that the execution environment is responsible for managing the memory required during code execution
//* Java­Script frees developers from worrying about memory management by automatically allocating what is needed and reclaiming memory that is no longer being used */

//* The garbage collector must keep track of which variables can and can’t be used
//! The strategy for identifying the unused variables:  though two strategies have traditionally been used in browsers: *mark-and-sweep, *reference counting.

//* Mark-and-Sweep
//* When a variable comes into context it is flagged as being in context, When a variable goes out of context, it is also flagged as being out of context
//* The garbage collector then does a memory sweep, destroying each of the marked values and reclaiming the memory associated with them

// ******** Reference Counting ********
//* BOOM and DOM are implemented as COM objects in C++, and OM objects use reference counting for garbage collection.

// circular reference with a COM object:
/*
let element = document.getElementById("some_element");
let myObject = new Object();
myObject.element = element;
element.someObject = myObject;

// cleaning up the circular references
myObject.element = null;
element.someObject = null;
 */
// ****** Performance ******
/* Modern garbage collectors decide when to run based on a collection of heuristics that are measured from the JavaScript runtime environment. These heuristics will vary by engine, but they will all be approximately based upon the size and number of objects that have been allocated */

// ****** Managing Memory ******
/* JavaScript runs in an environment where memory management and
garbage collection operate uniquely. */

/* When data is no longer necessary, it’s best to set the value to null, freeing
up the reference—this is called dereferencing the value */

function createPerson(name) {
  let localPerson = new Object();
  localPerson.name = name;
  return localPerson;
}
let globalPerson = createPerson("Nicholas");
// do something with globalPerson
globalPerson = null;

// ! Keep in mind that dereferencing a value doesn’t automatically reclaim the memory associated with it.

// ***** Performance Boosts with const and let Declarations *****

console.log("***** Performance Boosts with const and let Declarations *****");

//*  Because const and let are scoped to a block instead of a function */

//  ****** Hidden Classes and the delete Operation  ******
//* As of 2017, the most popular web browser is Google Chrome, which uses the V8 JavaScript engine.  */
function Article(opt_author) {
  this.title = "Inauguration Ceremony Features Kazoo Band";
  this.author = opt_author;
}
let a1 = new Article();
let a2 = new Article("Jake");
console.log("a1, a2:: ", a1, a2);
// ! Bear in mind though that using the delete keyword can generate the same hidden class fragmentation
function Article() {
  this.title = "Inauguration Ceremony Features Kazoo Band";
  this.author = "Jake";
}

let a11 = new Article();
let a22 = new Article();

delete a11.author;

// ! Best practices dictate that unwanted properties should be set to null. It will allow the hidden classes to remain intact and shared
function Article() {
  this.title = "Inauguration Ceremony Features Kazoo Band";
  this.author = "Jake";
}
let a111 = new Article();
let a222 = new Article();
a111.author = null;

// ***** Memory Leaks *****
//* memory leaks in JavaScript are caused by unwanted references. */
function setName() {
  name = "Jake";
}
//! the interpreter will handle this as window.name = 'Jake' and, of course, properties set on the window object will never be cleaned up if the window object itself is not cleaned up. This is easily fixed by prefixing the declaration with var, let, or const, which will all go out of scope at the end of the function’s execution

//* Interval timers can also quietly cause memory leak */
let nameee = "Jake"; // is unable to clean up the outer variable.
/*
setInterval(() => {
  console.log(nameee);
}, 100);
 */
//* JavaScript closures are an exceedingly common way to leak memory without realizing it */
let outer = function () {
  let name = "Jake"; // leaks memory allocated for name
  return function () {
    return name;
  };
};

//****** Static Allocation and Object Pools *******/
//* One important metric measured by the browser to decide when to schedule garbage collection is the rate of object churn */
/*
function addVector(a, b) {
  let resultant = new Vector();
  resultant.x = a.x + b.x;
  resultant.y = a.y + b.y;
  return resultant;
}
console.log("**********");

let vectorList = new Array(100);
let vector = new Vector();
vectorList.push(vector);
 */
