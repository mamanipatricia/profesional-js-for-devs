console.log("********** FUNCTIONS **********");
/*
 * ➤➤ Function expressions, function declarations, and arrow functions
 * ➤➤ Default parameters and spread operators
 * ➤➤ Recursion with functions
 * ➤➤  Private variables using closures
 */

function sum(num1, num2) {
  return num1 + num2;
}

// FUNCTION DECLARATION
{
  let sum = function (num1, num2) {
    return num1 + num2;
  };
  console.log(sum(1, 3));
}

// ARROW FUNCTION
{
  let sum = (num1, num2) => {
    return num1 + num2;
  };
  console.log(sum(4, 4));
}

// FUNCTION CONSTRUCTOR
{
  let sum = new Function("num1", "num2", "return num1 + num2"); //! NOTE RECOMMENDED
}

//! think of functions as objects and function names as pointers

console.log("********* ARROW FUNCTIONS *********");
{
  let arrowSum = (a, b) => {
    return a + b;
  };

  let functionExpressionSum = function (a, b) {
    return a + b;
  };

  console.log("arrowSum(5, 8):: ", arrowSum(5, 8));
  console.log("functionExpressionSum(5, 8):: ", functionExpressionSum(5, 8));
}

//
{
  let ints = [1, 2, 3];
  console.log(
    ints.map(function (i) {
      return i + 1;
    })
  );

  console.log(
    ints.map((i) => {
      return i + 1;
    })
  );
}

// Arrow functions do not require the parentheses if you only want to use a single parameter

{
  // Both are valid
  let double = (x) => {
    return 2 * x;
  };
  // let triple = x => { return 3 * x; };
  let triple = (x) => {
    return 3 * x;
  };

  // Zero parameters require an empty pair of parentheses
  let getRandom = () => {
    return Math.random();
  };

  // Multiple parameters require parentheses
  let sum = (a, b) => {
    return a + b;
  };

  // Invalid syntax:
  // let multiply = a, b => { return a * b; };
}

/*
 * If you omit the curly braces, you are using the “concise body
 */
{
  // Both are valid and will return the value
  let double = (x) => {
    return 2 * x;
  };
  let triple = (x) => 3 * x;
  // Assignment is allowed
  let value = {};
  let setName = (x) => (x.name = "Matt");
  setName(value);
  console.log(value.name); // "Matt"
  // Invalid syntax:
  // let multiply = (a, b) => return a * b;
}

//* Arrow functions, do not allow the use of arguments, super, or new.target, and cannot be used as a constructor.

//* function objects created with the arrow syntax do not have a prototype defined.

console.log("********** FUNCTION NAMES ********");
//*  unction names are simply pointers to functions, they act like any other variable containing a pointer to an objecT
//*  it’s possible to have multiple names for a single function

{
  function sum(num1, num2) {
    return num1 + num2;
  }

  console.log(sum(10, 10)); // 20

  let anotherSum = sum;
  console.log(anotherSum(10, 10)); // 20

  sum = null;
  console.log(anotherSum(10, 10)); // 20

  //   sum(1,2) // error
}

//* If a function is unnamed, it will be reported as such. If it is created using the function constructor, it will be identified as “anonymous”

{
  function foo() {}

  let bar = function () {};
  let baz = () => {};

  console.log(foo.name); // foo
  console.log(bar.name); // bar
  console.log(baz.name); // baz
  console.log((() => {}).name); // (empty string)
  console.log(new Function().name); // anonymous
}

//* If a function is a getter, a setter, or instantiated using bind(), a prefix will be prepended to identify it as such
{
  function foo() {}

  console.log(foo.bind(null).name); // bound foo

  let dog = {
    years: 1,
    get age() {
      return this.years;
    },
    set age(newAge) {
      this.years = newAge;
    },
  };

  let propertyDescriptor = Object.getOwnPropertyDescriptor(dog, "age");

  console.log("------", propertyDescriptor);
  console.log("------", propertyDescriptor.configurable);
  console.log("------", propertyDescriptor.values);
  console.log("/****", propertyDescriptor.get.name);
  console.log("/****", propertyDescriptor.set.name);
  /*
  ------ {
  get: [Function: get age],
  set: [Function: set age],
  enumerable: true,
  configurable: true
}
------ true
------ undefined
/**** get age
/**** set age */
}

console.log("********** UNDERSTANDING ARGUMENTS **********");

//* ARGUMENTS
{
  function sayHi(name, message) {
    console.log("Hello " + name + ", " + message);
  }
  sayHi("PAt", "you look tired!");

  //* The same value can be accessed by referencing arguments[0]
  function sayHi1() {
    console.log("Hello " + arguments[0] + ", " + arguments[1]);
    console.log("--- ", arguments);
    console.log("--- ", arguments.length);
  }
  sayHi1("Patricia", "go to sleep..");

  console.log(sayHi1.arguments);
}

//! named arguments are a convenience, not a necessity.
{
  function doAdd() {
    if (arguments.length === 1) {
      console.log("--->> ", arguments[0] + 10);
    } else if (arguments.length === 2) {
      console.log("***>> ", arguments[0] + arguments[1]);
    }
  }

  doAdd(10);
  doAdd(30, 20);
}

//*  arguments object can be used in conjunction with named arguments
{
  function doAdd(num1, num2) {
    if (arguments.length === 1) {
      console.log(num1 + 10);
    } else if (arguments.length === 2) {
      console.log(arguments[0] + num2);
    }
  }
}

//*  its values always stay in sync with the values of the corresponding named parameters

{
  function doAdd(num1, num2) {
    arguments[1] = 10;
    console.log(arguments[0] + num2); // 3 + 10
  }
  doAdd(3, 4);
}
/*
Any named argument that is not passed into the function is automatically assigned the value undefined. */
//* if only one argument is passed into the doAdd() function, then num2 has a value of undefined.

//! Strict mode (The code will not execute.)

console.log("********* Arguments in Arrow Functions *********");
//* arguments passed to the function cannot be accessed using the arguments keyword

{
  function foo() {
    console.log(arguments[0]);
  }
  foo(5); // 5

  let bar = () => {
    console.log(arguments[0]);
  };
  bar(5); // ReferenceError: arguments is not defined - NO FUNCIONA EL ERROR?
}

//* it is possible that the arguments keyword is provided to the arrow function scope from the scope of a wrapping function being invoked

{
  function foo() {
    console.log("--> ", arguments[0]);
    let bar = () => {
      console.log("ARGUMENTS in ARROW FUC ->> ", arguments[0]); //5
    };

    bar();
  }

  foo(5);
}

//!  All arguments in ECMAScript are passed by value. It is not possible to pass arguments by reference. If an object is passed as an argument, the value is just a reference to the object.

console.log("------------ NO OVERLOADING ------------");
/*
 *  functions in ECMAScript don’t have signatures because the arguments are represented as an array containing zero or more values
 * Without function signatures, true overloading is not possible
 */

//! If two functions are defined to have the same name in ECMAScript, it is the last function that becomes the owner of that name

{
  function addSomeNumber(num) {
    return num + 100;
  }

  function addSomeNumber(num) {
    return num + 200;
  }

  let result = addSomeNumber(100); // 300
  console.log(result);
}
//*  the second function has overwritten the first.

//! it’s possible to simulate overloading of methods by checking the type and number of arguments that have been passed into a function and then reacting accordingly.

{
  let addSomeNumber = function (num) {
    return num + 100;
  };

  addSomeNumber = function (num) {
    return num + 200;
  };

  let result = addSomeNumber(100); // 300
  console.log("--> ", result);
}
// The variable addSomeNumber is simply being overwritten when the second function is created

console.log("********** DEFAULT PARAMETER VALUES **********");

// BEFORE ES5
{
  function makeKing(name) {
    name = typeof name !== "undefined" ? name : "Henry";
    return `King ${name} VIII`;
  }
  console.log(makeKing());
  // 'King Henry VIII'
  console.log(makeKing("Louis"));
  // 'King Louis VIII'
}

// AFTER ES5
{
  function makeKing(name = "Henry") {
    return `King ${name} VIII`;
  }

  console.log(makeKing("Louis")); // 'King Louis VIII'
  console.log(makeKing()); // 'King Henry VIII'
}

//* Passing undefined as an argument is treated the same as not passing any argument

{
  function makeKing(name = "Henry", numerals = "VIII") {
    return `King ${name} ${numerals}`;
  }
  console.log(makeKing());
  // 'King Henry VIII'
  console.log(makeKing("Louis"));
  // 'King Louis VIII'
  console.log(makeKing(undefined, "VI"));
  // 'King Henry VI'
}

//* preserves the values as they were passed when the function was invoked:
console.log("----------------------");
{
  function makeKing(name = "Henry") {
    name = "LouisSS";
    return `King ${arguments[0]}`;
  }
  console.log(makeKing());
  // 'King undefined'
  console.log(makeKing("Louis"));
  // 'King Louis'
}

//* Default parameter values are not limited to primitives or object types, you can also calculate a value from an invoked function:

console.log("----------------------");
{
  let romanNumerals = ["I", "II", "III", "IV", "V", "VI"];
  let ordinality = 0;

  function getNumerals() {
    // Increment the ordinality after using it to index into the numerals array
    console.log(romanNumerals[ordinality++]);
    return romanNumerals[ordinality++];
  }

  function makeKing(name = "Henry", numerals = getNumerals()) {
    return `King ${name} ${numerals}`;
  }

  console.log("---> ", makeKing());
  console.log("---> ", makeKing("Louis", "XVI"));
  console.log("---> ", makeKing());
  console.log("---> ", makeKing());
}

//* Arrow functions are also capable of utilizing default parameters
{
  let makeKing = (name = "Henry") => `King ${name}`;

  console.log("~~> ", makeKing()); // King Henry
  console.log("~~> ", makeKing("PEPITO")); // King Henry
}

console.log("***** Default Parameter Scope and Temporal Dead Zone *****");
//* Defining multiple parameters with default values operates in effectively the same way as declaring variables sequentially using the let keyword
console.log("--------- default parameter ---------");
{
  function makeKing(name = "Henry", numerals = "VIII") {
    return `King ${name} ${numerals}`;
  }
  console.log(makeKing()); // King Henry VIII

  function makeKing() {
    let name = "Henry";
    let numerals = "VIII";

    return `King ${name} ${numerals}`;
  }
}
//* Because the parameters are initialized in order, parameters that have their default value defined later can reference an earlier parameter

{
  function makeKing(name = "Henry", numerals = name) {
    return `King ${name} ${numerals}`;
  }

  console.log(makeKing()); // King Henry Henry
}

console.log("--------- temporal Dead Zone ---------");
/* The order of parameter initialization follows the same Temporal Dead Zone rules specifying that parameter values cannot reference other parameter values that are defined later. */

{
  // Error
  function makeKing(name = numerals, numerals = "VIII") {
    return `King ${name} ${numerals}`;
  }
  // ERROR - Cannot access 'numerals' before initialization
  // console.log('***** ', makeKing())
}
//* Parameters also exist inside their own scope, and therefore cannot reference the scope of the function body
{
  // Error
  function makeKing(name = "Henry", numerals = defaultNumeral) {
    let defaultNumeral = "VIII";
    return `King ${name} ${numerals}`;
  }

  // ReferenceError: defaultNumeral is not defined
  // console.log(makeKing());
}

console.log("********* SPREAD ARGUMENTS AND REST PARAMETERS *********");

//* spread operator way of managing and grouping collections
//* The spread operator is useful both when invoking a function, as well as when defining a function’s parameters

console.log("---------- Spread arguments ----------");

//* sums all the values passed as arguments:

{
  let values = [1, 2, 3, 4];

  function getSum() {
    let sum = 0;
    for (let i = 0; i < arguments.length; ++i) {
      sum += arguments[i];
    }
    return sum;
  }
  //*  most prudent way to flatten this array into separate parameters is to inelegantly utilize .apply()

  console.log(getSum.apply(null, values)); // 10

  //* unpacking the outer array into individual args, inside the function
  console.log(getSum(...values));

  //
  console.log("--> ", getSum(-1, ...values));
  console.log("--> ", getSum(...values, 5));
  console.log("--> ", getSum(-1, ...values, 5));
  console.log("--> ", getSum(...values, ...[5, 6, 7]));
}

/* the spread operator is totally unknown to the arguments object; it will treat the value being broken apart as separate pieces because that is how they are passed to the function:
 */
{
  let values = [1, 2, 3, 4];

  function countArguments() {
    console.log("**** ", arguments.length);
  }

  countArguments(-1, ...values); //  5;
  countArguments(...values, 5); // 5;
  countArguments(-1, ...values, 5); // 6;
  countArguments(...values, ...[5, 6, 7]); // 7;
}

//
{
  function getProduct(a, b, c = 1) {
    return a * b * c;
  }

  let getSum = (a, b, c = 0) => {
    return a + b + c;
  };

  console.log("---> ", getProduct(...[1, 2]));
  console.log("---> ", getProduct(...[1, 2, 3]));
  console.log("---> ", getProduct(...[1, 2, 3, 4])); // ignores 4

  console.log("-> ", getSum(...[0, 1]));
  console.log("-> ", getSum(...[0, 1, 2]));
  console.log("-> ", getSum(...[0, 1, 2, 3]));
}

console.log("*********** REST PARAMETERS ***********");
//* rest parameter becomes a formal Array object.

{
  function getSum(...values) {
    // sequentially sum all elements in "values"
    // initial total = 0
    console.log(values);
    return values.reduce((x, y) => x + y, 0);
  }

  console.log(getSum(1, 2, 3));
}

//* parameters places in a function with rest parameters
{
  //ERror
  // function getProduct(...values, lastValue) {}
  //OK
  function ignoreFirst(firstValue, ...values) {
    console.log("****** ", values);
  }
  ignoreFirst(2, [1, 2, 3, 4]);
  ignoreFirst();
  ignoreFirst(1);
  ignoreFirst(1, 2);
  ignoreFirst(1, 2, 3);
  ignoreFirst(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  /* [
    2, 3, 4,  5, 6,
    7, 8, 9, 10
  ]
  */
  ignoreFirst(1, 2, { 1: 1 });
}
//* arrow functions do not support the arguments object, they do support rest parameters,

{
  let getSum = (...values) => {
    return values.reduce((x, y) => x + y, 0);
  };

  console.log("rest-params-in -arrow functions :: ", getSum(1, 2, 3)); // 6
}
// still the same to the function
console.log("------------");
{
  function getSum(...values) {
    console.log(arguments.length); // 3
    console.log(arguments); // [1, 2, 3]
    console.log(values); // [1, 2, 3]
  }
  console.log(getSum(1, 2, 3));
}

console.log("**** FUNCTION DECLARATIONS VERSUS FUNCTION EXPRESSIONS *******");
//*  Function declarations are read and available in an execution context before any code is executed, whereas function expressions aren’t complete until the execution reaches that line of code.
{
  // OK
  console.log(sum(10, 10));

  function sum(num1, num2) {
    return num1, num2;
  }
}

/* the JavaScript engine does a first pass for function declarations and pulls them to the top of the source treeSo even though the function declaration appears after its usage in the code, the
engine changes this to hoist the function declarations to the top */

//* function expression
{
  // Error
  // console.log("**** ", sum(10, 10));

  let sum = function (num1, num2) {
    return num1 + num2;
  };
}

console.log("********** FUNCTIONS AS VALUES **********");
/*
 * function names are variables:
 * pass a function into another function as an argument
 * to return a function as the result of another function
 */

{
  function callSomeFunction(someFunction, someArgument) {
    return someFunction(someArgument);
  }

  function add10(num) {
    return num + 10;
  }

  let result1 = callSomeFunction(add10, 10);
  console.log(result1);

  function getGreeting(name) {
    return "Hello, " + name;
  }

  let result2 = callSomeFunction(getGreeting, "Patricia");
  console.log("result2:: ", result2);
}
// to access a function pointer instead of executing the function, you must leave off the parentheses,

//* RETURNING A FUNCTION FROM A FUNCTION
{
  function createComparisonFunction(propertyName) {
    return function (object1, object2) {
      let value1 = object1[propertyName];
      let value2 = object2[propertyName];
      console.log("~~>::: ", "value1", value1);
      console.log("~~>::: ", "value2", value2);

      console.log("~~>*** ", "object1", object1);
      console.log("~~>*** ", "object2", object2);
      if (value1 < value2) {
        return -1;
      } else if (value1 > value2) {
        return 1;
      } else {
        return 0;
      }
    };
  }

  let data = [
    { name: "Pepe11", age: 21 },
    { name: "Camila", age: 23 },
  ];

  data.sort(createComparisonFunction("name"));
  console.log("---> ", data[0].name); //pepe1

  data.sort(createComparisonFunction("age"));
  console.log("---> ", data[0].name); // camila
}

console.log("*********** FUNCTION INTERNALS ***********");

//* TWO SPECIAL OBJECTS:  arguments and this (es5)
//*  new.target (es6)

//* arguments -  array-like object that contains all of the arguments that were passed into the function - available  when a function is declared using the function keyword

// factorial function
{
  function factorial2(num) {
    if (num <= 1) {
      return 1;
    } else {
      return num * factorial2(num - 1);
    }
  }

  console.log("FACTORIAL:: ", factorial2(4));
}

{
  function factorial1(num) {
    if (num <= 1) {
      return 1;
    } else {
      return num * arguments.callee(num - 1); // callee is the pointer to the function
    }
  }

  console.log("FACTORIAL-callee:: ", factorial1(4));
}

{
  let trueFactorial = factorial1; // with the function decoupled from the function name, trueFactorial() correctly calculates the factorial

  factorial = function () {
    return 0;
  };

  console.log(trueFactorial(5)); // 120
  console.log(factorial(5)); // 0
}

console.log("****** THIS ********** ");

{
  global.color = "red";
  let o = {
    color: "blue",
  };

  function sayColor() {
    console.log(this.color);
  }

  sayColor(); // 'red' - 'cause sayColor() id called in the global scope and this is pointing to global

  o.sayColor = sayColor; // color this now is in o ant this is -> color: "blue"
  o.sayColor(); // 'blue'
}
//! when a function is called in the global scope of a web page, the this object points to window
console.log("-----REVISAR ETA SECCION------");
{
  global.color1 = "red";
  let o = {
    color1: "blue",
  };

  let sayColor = () => console.log(this.color1);
  console.log("+++++ ", sayColor());

  sayColor(); // red

  o.sayColor = sayColor;
  o.sayColor(); // red
}

console.log("-----------");
//
{
  function King() {
    this.royaltyName = "Henry";

    // 'this' will be the King instance
    setTimeout(() => console.log(this.royaltyName), 1000);
  }

  function Queen() {
    this.royaltyName = "Elizabeth";
    // 'this' will be the window object
    setTimeout(function () {
      console.log(this.royaltyName);
    }, 1000);
  }

  new King(); // Henry
  new Queen(); // undefined
}

console.log("********** caller **********");

{
  function outer() {
    inner();
  }
  function inner() {
    console.log("----->>> ", inner.caller);
  }

  outer();
  // [Function: outer]
}

//* access the same information via arguments.callee.caller:

{
  function outer() {
    inner();
  }
  function inner() {
    console.log("arguments.callee.caller::: ", arguments.callee.caller);
  }
  outer();
}

console.log("********** new.target **********");
/*
 *  6 is the ability to determine if a function was invoked with the new keyword using new.target.
 * FUNCTION CALLED NORMAL FUNCTION: new.target = undefined
 * FUNCTION CALLED WITH NEW: will reference the constructor or function
 */
{
  function King() {
    // !new.targe = true porque !new.target = !undefined y undefined es un valor falsy
    if (!new.target) {
      console.log("**** ", new.target);
      throw 'King must be instantiated using "new"';
    }
    console.log("**** ", new.target);
    console.log('King instantiated using "new"');
  }

  new King(); // King instantiated using "new"
  // King(); // Error: King must be instantiated using "new"
}

console.log("*********** FUNCTION PROPERTIES AND METHODS ***********");

//*  Each function has two properties: length and prototype

{
  function sayName(name) {
    console.log("name::: ", name);
  }

  function sum(num1, num2) {
    return num1 + num2;
  }

  function sayHi() {
    console.log("hiiii..");
  }

  console.log("sayName.length:: ", sayName.length);
  console.log("sum.length::: ", sum.length);
  console.log("sayHi.length:: ", sayHi.length);
}

console.log("--------------------");
//!  methods for functions: apply() and call()
//*  both call the function with a specific this value,

/*
 * APPLY: accepts 2 args: {this, an array of arguments(may be an instance of Array/ args objects)}
 
 */
{
  function sum(num1, num2) {
    return num1 + num2;
  }

  function callSum1(num1, num2) {
    return sum.apply(this, arguments); // passing in arguments object
  }

  function callSum2(num1, num2) {
    return sum.apply(this, [num1, num2]);
  }

  console.log("callSum1(10,10):: ", callSum1(10, 10));
  console.log("callSum2(10,10):: ", callSum2(10, 10));
}

/*
 * CALL: {this, the remaining args are passed directly into the func}
 * Using call() arguments must be enumerated specifically
 */

{
  function sum(num1, num2) {
    return num1 + num2;
  }

  function callSum(num1, num2) {
    return sum.call(this, num1, num2);
  }

  console.log("callSum(10,10):: ", callSum(10, 10));
  // The result is the same as using apply()
}

//! If there are no arguments to pass in, these methods are identical.

{
  global.color = "red";
  let o = {
    color: "blue",
  };

  function sayColor() {
    console.log("this.color--::: ", this.color);
  }

  sayColor(); // red

  sayColor.call(this);
  sayColor.call(global);
  sayColor.call(o); //! sayColor.call(o) switches the context of the function such that this points to o,
}
console.log("------- bind method -------");
//* The bind() method creates a new function instance whose this value is bound to the value that was passed into bin ()
{
  global.color = "red";
  var o = {
    color: "blue",
  };
  function sayColor() {
    console.log(this.color);
  }

  let objectSayColor = sayColor.bind(o);
  objectSayColor(); // blue

  console.log("-----// ", objectSayColor); // [Function: bound sayColor]
}

console.log("-------------**************--------------");
// EXAMPLE FROM MDN
{
  const module = {
    x: 42,
    getX: function () {
      return this.x;
    },
  };

  console.log("@@@@@@@:: ", module.getX());

  const unboundGetX = module.getX;
  console.log(".....", unboundGetX);
  console.log(unboundGetX()); // The function gets invoked at the global scope
  // expected output: undefined

  const boundGetX = unboundGetX.bind(module);

  const boundGetX1 = module.getX.bind(module);

  console.log(boundGetX());

  console.log(boundGetX1());
  // expected output: 42
}
console.log("-------------**************--------------");

console.log("******** FUNCTION EXPRESSIONS *********");
//* function declarations are read before the code executes
/* Este ejemplo no arroja un error porque la declaración de la función se lee primero antes de que el código comience a ejecutarse. */

// Anonymous functions are also sometimes called lambda functions.) This means the name property is the empty string.

//! Function expressions act like other expressions, must be assigned before usage

console.log("**********  RECURSION ***********");

{
  function factorial(num) {
    if (num <= 1) {
      return 1;
    } else {
      return num * factorial(num - 1);
    }
  }

  let anotherFactorial = factorial;
  // factorial = null;
  console.log("anotherFactorial(4):: ", anotherFactorial(4));
}

//*

{
  function factorial(num) {
    if (num < 1) {
      return 1;
    } else {
      return num * arguments.callee(num - 1);
    }
  }
  //* use arguments.callee en lugar del nombre de la función asegura que esta función funcionará independientemente de cómo se acceda a ella
}
// The value of arguments.callee is not accessible to a script running in strict mode
//! Es aconsejable usar siempre arguments.callee del nombre de la función siempre que esté escribiendo funciones recursivas.

// *********** named function expressions ***********

{
  const factorial = function f(num) {
    if (num <= 1) {
      return 1;
    } else {
      return num * f(num - 1);
    }
  };
  console.log("*-*-*-*-*-*-*-*-*-", factorial(3));
}

console.log("******* TAIL CALL OPTIMIZATION *******");

//* Tail Call Optimization Requirements

{
  ("use strict");
  // No optimization: tail call is not returned
  function outerFunction() {
    innerFunction();
  }

  // No optimization: tail call is not directly returned
  function outerFunction() {
    let innerFunctionResult = innerFunction();
    return innerFunctionResult;
  }

  // No optimization: tail call must be cast as a string after return
  function outerFunction() {
    return innerFunction().toString();
  }

  // No optimization: tail call is a closure
  function outerFunction() {
    let foo = "bar";
    function innerFunction() {
      return foo;
    }
    return innerFunction();
  }
}

//*

{
  ("use strict");
  // Optimization used: argument computation occurrs before stack frame is discarded
  function outerFunction(a, b) {
    return innerFunction(a + b);
  }

  // Optimization used: initial return values do not have stack frame implications
  function outerFunction(a, b) {
    if (a < b) {
      return a;
    }
    return innerFunction(a + b);
  }

  // Optimization used: both inner functions are considered to be in a tail position
  function outerFunction(condition) {
    return condition ? innerFunctionA() : innerFunctionB();
  }
}

console.log("******* Coding for Tail Call Optimization *******");

{
  function fib(n) {
    if (n < 2) {
      return n;
    }
    return fib(n - 1) + fib(n - 2);
  }

  console.log(fib(0)); // 0
  console.log(fib(1)); // 1
  console.log(fib(2)); // 1
  console.log(fib(3)); // 2
  console.log(fib(4)); // 3
  console.log(fib(5)); // 5
  console.log(fib(6)); // 8
}

//* An excellent strategy is to nest two functions: the outer one acting as the base case, and the inner one acting as the recursive case
// NO ENTIENDO
{
  ("use strict");

  // base case
  function fib(n) {
    return fibImpl(0, 1, n);
  }

  // recursive case
  function fibImpl(a, b, n) {
    if (n === 0) {
      return a;
    }
    return fibImpl(b, a + b, n - 1);
  }
}

console.log("****** closures ********");
//* Closures are functions that have access to variables from another function’s scope. This is often accomplished by creating a function inside a function

//! inner function (an anonymous function)  (propertyName) has access to that variable. This occurs because the inner function’s scope chain includes the scope of createComparisonFunction()

// When a function is called, an execution context is created, and its scope chain is created

{
  // compare() is called in the global execution context
  function compare(value1, value2) {
    if (value1 < value2) {
      return -1;
    } else if (value1 > value2) {
      return 1;
    } else {
      return 0;
    }
  }

  let result = compare(5, 10);
}

//* Whenever a variable is accessed inside a function, the scope chain is searched for a variable with the given name. Once the function has completed, the local activation object is destroyed, leaving only the global scope in memory. Closures, however, behave differently.

{
  // create function
  let compareNames = createComparisonFunction("name");

  // call function
  let result = compareNames({ name: "Nicholas" }, { name: "Matt" });

  // dereference function - memory can now be reclaimed
  compareNames = null;
}

//! Overuse of closures can lead to excess memory consumption

console.log("************ The this Object ************");

//*

{
  global.identity = "The windows";

  let object = {
    identity: "My object",
    getIdentityFunc() {
      return function () {
        return this.identity;
      };
    },
  };

  console.log(object.getIdentityFunc()()); // "The window"
  //! calling object.getIdentityFunc()() immediately calls the function that is returned, which returns a string

  //* ach function automatically gets two special variables as soon as the function is called: this and arguments.
}

//* An inner function can never access these variables directly from an outer function. It is possible to allow a closure access to a different this object by storing it in another variable that the closure can access

{
  global.identity = "The Window";

  let object = {
    identity: "My Object",
    getIdentityFunc() {
      let that = this;
      return function () {
        return that.identity;
      };
    },
  };

  console.log(
    "CLOSURE-access-to-a-diff-this-storing-another-var:: ",
    object.getIdentityFunc()()
  ); // 'My Object'
}

//* There are a few special cases where the value of this may not end up as the value you expect
console.log("-------------few special cases----------");
{
  global.identity = "The Window";
  let object = {
    identity: "My Object",
    getIdentity() {
      return this.identity;
    },
  };

  console.log(object.getIdentity());
  console.log(object.getIdentity()); // (object.getIdentity)(); // object.getIdentity and (object.getIdentiy) are defined to be equivalent.
  console.log((object.getIdentity = object.getIdentity)());
}

console.log("*********** Memory Leaks ***********");
{
  function assignHandler() {
    let element = document.getElementById("someElement");
    element.onclick = () => console.log(element.id);
  }

  function assignHandler() {
    let element = document.getElementById("someElement");
    let id = element.id;
    element.onclick = () => console.log(id);
    element = null;
  }
}

console.log("**** IMMEDIATELY INVOKED FUNCTION EXPRESSIONS ******");
//* An anonymous function that is called immediately is most often called an immediately invoked function expression (IIFE)

//* enclosed in parentheses it is interpreted as a function expression

//* he use of an IIFE to simulate block scope uses values defined inside a function expression that is executed immediately

//* (The utility of the IIFE was much greater in previous versions of ECMAScript 6 where block scoped variables were not supported.

{
  // IIFE

  (function () {
    let count = 0;
    for (var i = 0; i < count; i++) {
      console.log(i);
    }
  })();

  // console.log(i); // Throws an error
}

//* With ECMAScript 6, the IIFE is no longer required for emulating block scope

//* Inline block scope
{
  let i,
    count = 0;
  for (i = 0; i < count; i++) {
    console.log(i);
  }
}
// console.log(i); // Throws an error

//* Function block scope
{
  let count = 0;
  for (let i = 0; i < count; i++) {
    console.log(i);
  }
  // console.log(i);
  // Throws an error
}
//* the utility of the IIFE involved its ability to freeze parameter values

{
  /* 
  let divs = document.querySelectorAll("div");

  // Does not work!
  for (var i = 0; i < divs.length; ++i) {
    divs[i].addEventListener("click", function () {
      console.log(i);
    });
  }
   */
}

// BEFORE ES5
{
  /*
  let divs = document.querySelectorAll("div");
  for (var i = 0; i < divs.length; ++i) {
    divs[i].addEventListener(
      "click",
      (function (frozenCounter) {
        return function () {
          console.log(frozenCounter);
        };
      })(i)
    );
  }
   */
}

//*  ECMAScript block scoped variables
{
  /* 
  let divs = document.querySelectorAll("div");
  for (let i = 0; i < divs.length; ++i) {
    divs[i].addEventListener("click", function () {
      console.log(i);
    });
  }
   */
}
/* . In ECMAScript 6, a for loop using a
block scoped variable keyword—here, let—for the iterator will create a separate counter instance
per iteration, thereby allowing each click handler to reference that specific counter when executing */

//* will not happen when that variable is pulled outside the for loop
{
  /*
  let divs = document.querySelectorAll("div");
  // Does not work
  let i;
  for (i = 0; i < divs.length; ++i) {
    divs[i].addEventListener("click", function () {
      console.log(i);
    });
  }
   */
}

console.log("******** private variables **********");
//* JavaScript has no concept of private members
/*
 * Any variable defined inside a function or block is considered private because it is inaccessible outside that function

 * This includes function arguments, local variables, and functions defined inside other functions
 */
{
  // * three private variables: num1, num2, and sum
  //* These variables are accessible inside the function but can’t be accessed outside it
  function add(num1, num2) {
    let sum = num1 + num2;
    return sum;
  }
}

console.log("*******   privileged method *********");
//* there is two ways:
/*
 *  first is to do so inside a constructor,
 *
 */

{
  function MyObject() {
    // private variables and functions
    let privateVariable = 10;

    function privateFunction() {
      return false;
    }
    // privileged methods
    this.publicMethod = function () {
      privateVariable++;
      return privateFunction();
    };
  }
}

//* define private and privileged members

{
  function Person(name) {
    this.getName = function () {
      return name;
    };

    this.setName = function (value) {
      name = value;
    };
  }

  let person = new Person("Nicholas");
  console.log(person.getName()); // 'Nicholas'
  person.setName("Greg");
  console.log(person.getName()); // 'Greg'
}

// .....
console.log("********* Static Private Variables ***********");

{
  (function () {
    // private variables and functions
    let privateVariable = 10;

    function privateFunction() {
      return false;
    }

    // constructor
    MyObject = function () {};

    // public and privileged methods
    MyObject.prototype.publicMethod = function () {
      privateVariable++;
      return privateFunction();
    };
  })();
}

//* The privileged method, being a closure, always holds a reference to the containing scope.
(function () {
  let name = "";

  Person = function (value) {
    name = value;
  };

  Person.prototype.getName = function () {
    return name;
  };

  Person.prototype.setName = function (value) {
    name = value;
  };
})();

let person1 = new Person("Nicholas");
console.log(person1.getName()); // 'Nicholas'
person1.setName("Matt");
console.log(person1.getName()); // 'Matt'

let person2 = new Person("Michael");
console.log(person1.getName()); // 'Michael'
console.log(person2.getName()); // 'Michael'

console.log("******** The Module Pattern **********");
//* The module pattern augments the basic singleton to allow for private variables and privileged methods, taking the following format:

let singleton = (function () {
  // private variables and functions
  let privateVariable = 10;
  function privateFunction() {
    return false;
  }
  // privileged/public methods and properties
  return {
    publicProperty: true,
    publicMethod() {
      privateVariable++;
      return privateFunction();
    },
  };
})();

//* This can be useful when the singleton requires some sort of initialization and access to private variables
/*
let application = (function () {
  // private variables and functions
  let components = new Array();
  // initialization
  components.push(newBaseComponent());
  // public interface
  return {
    getComponentCount() {
      return components.length;
    },
    registerComponent(component) {
      if (typeof component == "object") {
        components.push(component);
      }
    },
  };
})();
 */

/*When the object
is first created, the private components array is created and a new instance of BaseComponent is added to its list. 

The getComponentCount() and registerComponent() methods are privileged
methods with access to the components array. The former simply returns the number of registered components, and the latter registers a new componen*/

console.log("********* The Module-Augmentation Pattern **********");

/* useful when the singleton object needs to be an instance of a particular type but must be augmented with additional properties and/or methods. */

{
  /*
  let singleton = (function () {
    // private variables and functions
    let privateVariable = 10;

    function privateFunction() {
      return false;
    }

    // create object
    let object = new CustomType();

    // add privileged/public properties and methods
    object.publicProperty = true;

    object.publicMethod = function () {
      privateVariable++;
      return privateFunction();
    };

    // return the object
    return object;
  })();
   */
}
