console.log(
  "******* Objects, Classes, and Object-Oriented Programming *******"
);
/*
 * Understanding objects
 * Understanding object creation
 * Understanding inheritance
 * Understanding classes
 */

console.log("--------- UNDERSTANDING OBJECTS ---------");

let person = new Object();

person.name = "Nicholas";
person.age = 29;
person.job = "Software Engineer";

// MWETHOD SAYNNAME
person.sayName = function () {
  console.log(this.name); // PERSON.NAME
};

//* rewritten the previous example - much better than above
let person1 = {
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  sayName() {
    console.log(this.name);
  },
};

console.log("person1:: ", person1);

console.log("---------- Types of Properties---------- ");
/* There are two types of properties:
 * data properties
 * accessor properties.
 */

console.log("************** data properties **************");
// contain a single location for a data value. Values are read from and written to this location
/*
 * [[configurable]] = true
 * [[Enumerable]] = true
 * [[writable]] =true
 * [[value]] = undefined
 */

let person2 = {
  name: "Patricia",
};

/*
 * [[configurable]] = true
 * [[Enumerable]] = true
 * [[writable]] =true
 * [[value]] = Patricia
 */

/*
 * To change any of the default property attributes, you must use the Object.defineProperty() -> the object - the name of the property - a descriptor object
 */

let person3 = {};
Object.defineProperty(person3, "name", {
  writable: false,
  value: "Patty",
});

console.log("persons3.name:: ", person3.name); // Patty
person3.name = "Greg";
console.log("person", person3.name); // Patty

//* nonconfigurable property.

let person4 = {};
Object.defineProperty(person4, "name", {
  configurable: false,
  value: "Patricia",
});

console.log("person4.name:: ", person4.name);
delete person.name;
console.log("person4.name:: ", person4.name);

//* Any attempt to call Object.defineProperty() and change any attribute other than writable causes an error

let person5 = {};
Object.defineProperty(person5, "name", {
  configurable: false,
  value: "Nicholas",
});

// Throws an error
/*
Object.defineProperty(person5, "name", {
  configurable: true,
  value: "Nicholas",
});
 */

console.log("************* Accessor Properties ************* ");

/* Accessor properties do not contain a data value. Instead, they contain a combination of a getter function and a setter function (though both are not necessary */

/*
 * FOUR PROPERTIES:
 * [[Configurable]] = TRUE
 * [[Enumerable]] = TRUE
 * [Get]] = UNDEFINED -> when is red
 * [[Set]] = UNDEFINED -> when is written
 */

//* Define object with pseudo-private member 'year_'  and public member 'edition'

let book = {
  year_: 2017,
  edition: 1,
};

Object.defineProperty(book, "year", {
  get() {
    return this.year_;
  },
  set(newValue) {
    if (newValue > 2017) {
      this.year_ = newValue;
      this.edition += newValue - 2017;
    }
  },
});

book.year = 2018;
console.log("book.edition:: ", book.edition);

// It’s not necessary to assign both a getter and a setter. n strict mode, trying to write to a property with only a getter throws an error. Likewise, a property with only a setter cannot be read and will return the value undefined in nonstrict mode,

console.log(" *************** Defining Multiple Properties ***************");
//* to define more than one property on an object,  Object.defineProperties() method.
/*
 * TWO ARGUMENTS:
 * the object on which to add or modify the properties
 * object whose property names correspond to the properties’ names to add or modify
 */

let books = {};
Object.defineProperties(book, {
  year_: {
    value: 2017,
  },
  edition: {
    value: 1,
  },

  years: {
    get() {
      return this.year_;
    },
    set(newValue) {
      if (newValue > 2017) {
        this.year_ = newValue;
        this.edition += newValue - 2017;
      }
    },
  },
});

console.log("******** Reading Property Attributes********");
/*
 * It’s also possible to retrieve the property descriptor for a given property by using the Object.
 * getOwnPropertyDescriptor() method
 * has TWO ARGUMENTS:
 * the object on which the property resides
 * the name of the property whose descriptor should be retrieved
 */
/*
 * The return value is an obj with properties for configurable, enumerable, get, and set for accessor properties or configurable, enumerable, writable, and value for data properties
 */
let book1 = {};
Object.defineProperties(book1, {
  years_: {
    value: 2017,
  },

  edition: {
    value: 1,
  },

  years: {
    get: function () {
      return this.years_;
    },

    set: function (newValue) {
      if (newValue > 2017) {
        this.years_ = newValue;
        this.edition += newValue;
      }
    },
  },
});

let descriptor = Object.getOwnPropertyDescriptor(book1, "years_");

console.log("descriptor.value:: : ", descriptor.value); // 2017
console.log("descriptor.configurable:: ", descriptor.configurable); // false
console.log("typeof descriptor.get:: ", typeof descriptor.get); // "undefined"

let descriptor1 = Object.getOwnPropertyDescriptor(book1, "years_"); // undefined

console.log("descriptor.value", descriptor1.value); // false
console.log("descriptor.enumerable", descriptor1.enumerable);
console.log("descriptor.get", descriptor1.get); // "function"

//*  For the previous example, using this static method would return the following object */
//
console.log(Object.getOwnPropertyDescriptors(book));
// {
// edition: {
// configurable: false,
// enumerable: false,
// value: 1,
// writable: false
// },
//
year: {
  // configurable: false,
  // enumerable: false,
  // get: f(),
  // set: f(newValue),
  // },
  // year_: {
  //  configurable: false,
  // enumerable: false,
  // value: 2019,
  // writable: false
  //
}
// }

console.log("************** Merging Objects **************");
//* merge two objects - "mixin"]

/*  Object.assign() method. This method accepts one destination object, and one or many source objects, and for each source object copies the enumerable (Object.propertyIsEnumerable returns true) and own (Object.hasOwnProperty returns true) properties onto the destination object
 */
let dest, src, result;
/**
 * Simple copy
 */

dest = {};
src = { id: "src", 1: 5 };

result = Object.assign(dest, src); // mutate dest object
//* Object.assign mutates the destination obj and also returns that obj after exiting
console.log("dest === result:: ", dest === result); //true
console.log("dest !== src:: ", dest !== src);
console.log("result: ", result);
console.log("dest:: ", dest);

/**
 * Multiple source objects
 */
dest = {};

result = Object.assign(dest, { a: "foo" }, { b: "bar" });
console.log("result:: ", result);
console.log("dest:: ", dest); // mutate the dest object

/**
 * Getters and setters
 */
dest = {
  set a(val) {
    console.log("Invoked dest setter with param ${val}");
  },
};

src = {
  get a() {
    console.log("Invoked src getter");
  },
};

Object.assign(dest, src);
// Invoked src getter
// Invoked dest setter with param foo

//* Since the setter does not perform an assignment, no value is actually transferred
console.log("result:: ", dest); // { set a(val) {...} }

//* Object.assign() is effectively performing a shallow copy from each source object */

let dest1, src1, result1;
/**
 * Overwritten properties
 */
dest1 = { id: "dest1" };

result2 = Object.assign(
  dest1,
  { id: "src1", a: "foo" },
  { id: "src2", b: "bar" }
);

//* Object.assign will overwrite duplicate properties.
console.log("object.assign:: ", result2); // { id: src2, a: foo, b: bar }
console.log("object.dest1:: ", dest1); // { id: src2, a: foo, b: bar }

//* This can be observed by using a setter on the destination object:
dest3 = {
  set id(x) {
    console.log("x:: ", x);
  },
};

Object.assign(dest3, { id: "first" }, { id: "second" }, { id: "third" });
console.log("dest3:: ", dest3);

/**
 * Object references
 */

dest4 = {};
src = { a: {} };

Object.assign(dest4, src);

// Shallow property copies means only object references copied.
console.log("dest4.a===src.a:: ", dest4.a === src.a);
console.log("dest4:: ", dest4); // { a :{} }
console.log("src:: ", src); // true

//* Si se lanza un error durante la asignación, se interrumpirá y saldrá con el error lanzado. Object.assign () no tiene el concepto de "deshacer=rolling back" asignaciones anteriores, por lo que es un método de mejor esfuerzo que solo puede completarse parcialmente. */

let dest5, src5, result5;
/**
 * Error Handling
 */

dest5 = {};
src5 = {
  a: "foo",
  get b() {
    //* Error will be thrown when Object.assign() invokes this getter
    throw new Error();
  },
  c: "bar",
};

try {
  Object.assign(dest5, src5);
} catch (e) {}

//* Object.assign() has no way of rolling back already performed changes, so set operations already performed on the destination object before the error is thrown remain:
console.log(dest); // { a: foo }

console.log("*********** Object Identity and Equality ***********");

//* These are cases where === behaves as expected:
console.log("Object-identity-and-equality:: ", true === 1);
console.log("Object-identity-and-equality:: ", {} === {});
console.log("Object-identity-and-equality:: ", "2" === 2);

//* these have different representations in the JS engine and yet are treated as equal
console.log("~~~~> ", +0 === -0);
console.log("~~~~> ", +0 === 0);
console.log("~~~~> ", -0 === 0);

//* to determine NaN equivalence, the profoundly annoying isNaN() is required
console.log("--> ", NaN === NaN); // false
console.log("--> ", isNaN(NaN)); // false

console.log("************ OBJECT.IS() ************ ");

console.log("~~> ", Object.is(true, 1)); //false
console.log("~~> ", Object.is({}, {})); //false
console.log("~~> ", Object.is("2", 2)); //false

// correct 0, -0, +0 equivalence/noneequivalence
console.log("-> ", Object.is(+0, -0)); // false
console.log("-> ", Object.is(+0, 0)); // true
console.log("-> ", Object.is(-0, 0)); // true

// Correct NaN equivalence
console.log("~>> ", Object.is(NaN, NaN));

// To check more than two objects, it;s trivial to recursively use transitive equality

function recursivelyCheckEqual(x, ...rest) {
  return (
    Object.is(x, rest[0]) && (rest.length < 2 || recursivelyCheckEqual(...rest))
  );
}

console.log("************ Enhanced Object Syntax ************ ");

console.log("************ Property Value Shorthand ************");

let name = "Pat";
let p = {
  name: name,
};

console.log("person:: ", p); // {name: "Pat"}

//! use variable itself without the colon notation, and the interpreter will automatically use the variable name as the property key
let na = "Patricia";

let per = {
  na,
};

console.log("person :: ", per);

//
function makePerson(name) {
  return {
    name,
  };
}

let person6 = makePerson("Matt");
console.log("person6.name:: ", person6.name);

// Google closure compiler
function makePerson1(a) {
  return {
    name: a,
  };
}

var person7 = makePerson1("Matt");
console.log("person7.name:: ", person7.name);

console.log("************ Computed Property Keys ************");

const nameKey = "name";
const ageKey = "age";
const jobKey = "job";

let personOne = {};
personOne[nameKey] = "Patricia";
personOne[ageKey] = "26";
personOne[jobKey] = "Software Engineer";

console.log("personOne:: ", personOne);

//* With computed properties, the property assignment can occur inside the object literal’s initial definition

// !  Square brackets around the object property key instruct the runtime to evaluate its contents as a JavaScript expression instead of a string:

const nameKey1 = "name";
const ageKey1 = "age";
const jobKey1 = "job";

let personTwo = {
  [nameKey1]: "Patty",
  [ageKey1]: 26,
  [jobKey1]: "Software Engineer",
};

console.log("personTwo:: ", personTwo);

// more complex expressions
const nameKey2 = "name";
const ageKey2 = "age";
const jobKey2 = "job";
let uniqueToken = 0;

function getUniqueKey(key) {
  return `${key}_${uniqueToken++}`;
}

let person8 = {
  [getUniqueKey(nameKey2)]: "Matt",
  [getUniqueKey(ageKey2)]: "26",
  [getUniqueKey(jobKey2)]: "Software Engineer",
};

console.log("person8:: ", person8);
//* Any errors thrown in a computed property key expression will abort the creation of the object */

console.log("*************** Concise Method Syntax*************** ");
//* FIRST WAY
let person9 = {
  sayName: function (name) {
    console.log(`My name is ${name}`);
  },
};

person9.sayName("Patricia");

//* SECOND WAY - SHORTHAND METHOD
let person10 = {
  sayName(name) {
    console.log(`My name is ${name}`);
  },
};

person9.sayName("Patricia1");

//* ----- This is also applicable to the getter and setter object conventions

//* FIRST WAY
let person11 = {
  name_: "",
  get name() {
    return this.name_;
  },
  set name(name) {
    this.name_ = name;
  },
  sayName() {
    console.log(`My name is ${this.name_}`);
  },
};

person11.name = "Matt";
person11.sayName(); // My name is Matt

//* SECOND WAY - shorthand method
const methodKey = "sayName";

let person12 = {
  [methodKey](name) {
    console.log(`My name is ${name}`);
  },
};

person12.sayName("Pepito"); // My name is Pepito

console.log("******** Object Destructuring ********");

//* Without object destructuring
let person13 = {
  name: "Patty",
  age: 26,
};

let personName = person13.name,
  personAge = person13.age;

console.log("personName: ", personName);
console.log("personAge: ", personAge);

//* With object destructuring
let person14 = {
  name: "Pat",
  age: 26,
};

let { name: personName1, age: personAge1 } = person14;

console.log("personName:: ", personName);
console.log("personAge:: ", personAge);

//* Destructuring - reuse the property name as a local variable name
let person15 = {
  names: "Pepe",
  age: 27,
};

let { names, age } = person15;

console.log("names:: ", names); // Pepe
console.log("age:: ", age); // 27

// DEFAULT VALUES
let person16 = {
  name1: "Pat",
  age: 26,
};

let { name1, job = "software Engineer" } = person16;

console.log("name:: ", name);
console.log("job:: ", job);

console.log("person16:: ", person16);

//* Destructuring uses the internal function ToObject() */
// ! null and undefined cannot be destructured and will throw an error.

let { length } = "foobar";
console.log("length:: ", length); // 6

let { constructor: c } = 4;
console.log("c === Number", c === Number); // true
console.log("constructor:: ", constructor);
console.log("typeof-C:: ", typeof c);
console.log("C:: ", c);

// let { _ } = null; // typeError
// let { _ } = undefined; // typeError

//
let personName2, personAge2;

let person17 = {
  name2: "Matt",
  age2: 27,
};

({ name2: personName2, age2: personAge2 } = person17);
console.log("obj-destructuring:: ", personName2, personAge2);

//* Destructuring does not demand that variable declarations occur inside the destructuring expression.

let personName3, personAge3;

let person18 = {
  name3: "Pattyy",
  age3: 26,
};

({ name3: personName3, age3: personAge3 } = person18);

console.log("~~>> ", personName3, personAge3);

// output: Pattyy 26

console.log("************ Nested Destructuring ************");

let person19 = {
  name4: "Patty",
  age4: 26,
  job4: {
    title: "Software Engineer",
  },
};

let personCopy = {};

({
  name4: personCopy.nameCopy,
  age4: personCopy.ageCopy,
  job4: personCopy.jobCopy,
} = person19);

//* Because an object reference was assigned into personCopy, changing a property inside the person.job object will be propagated to personCopy
person19.job4.title = "Hacker";

console.log("person19:: ", person19);
// { name4: 'Patty', age4: 26, job4: { title: 'Hacker' } }

console.log("personCopy:: ", personCopy);
// { nameCopy: 'Patty', ageCopy: 26, jobCopy: { title: 'Hacker' } }

//* Destructuring assignments can be nested to match nested property references:
let person20 = {
  name5: "Matt",
  age5: 27,
  job5: {
    title: "Software engineer",
    otherTitle: {
      t: "Data Scientist",
    },
  },
};

//* declares 'title' variable and assigns person.job.title as its value
let {
  job5: { title },
  job5: {
    otherTitle: { t: otroT },
  },
} = person20;

console.log("title:: ", title);
console.log("otherTitle:: ", otroT);

console.log("*********** Partial Destructuring Completion *********** ");
let person21 = {
  name: "Matt",
  age: 27,
};
let personName4, personBar4, personAge4;

try {
  // person.foo is undefined, so this will throw an error
  ({
    name: personName4,
    foo: { bar: personBar4 },
    age: personAge4,
  } = person21);
} catch (error) {
  // console.log("error!!:: ", error);
}

console.log(
  "partial-destructuring-completion:: ",
  personName4,
  personBar4,
  personAge4
);

console.log("************* Parameter Context Matching ************* ");

let person22 = {
  name: "Matt",
  age: 27,
};

function printPerson(foo, { name, age }, bar) {
  console.log("->> ", arguments);
  console.log("->> ", name, age);
  console.log("->> ", foo, bar);
}

function printPerson2(foo, { name: personName, age: personAge }, bar) {
  console.log("~~~>> ", arguments);
  console.log("~~~>> ", personName, personAge);
  console.log("~~~>> ", foo, bar);
}

printPerson("1st", person22, "2nd");
// ['1st', { name: 'Matt', age: 27 }, '2nd']
// 'Matt', 27

printPerson2("1st", person22, "2nd");
// ['1st', { name: 'Matt', age: 27 }, '2nd']
// 'Matt', 27

console.log("************ OBJECT CREATION ************ ");

console.log("--------- The Factory Pattern ---------");

function createPerson(name, age, job) {
  let o = new Object();
  o.name = `My ${name}`;
  o.age = age;
  o.job = job;
  o.sayName = function () {
    return `Hii ${this.name}`;
  };
  return o;
}

let person23 = createPerson("PAt", 26, "Software Engineer");
let person24 = createPerson("Pepe", 28, "Software Engineer - I");

console.log("person23:: ", person23);
console.log("person24:: ", person24);

console.log("object", person24.sayName());

console.log("--------- The Function Constructor Pattern---------");
//*  It is also possible to define custom constructors, in the form of a function, that define properties and methods for your own type of object.

function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    console.log(this.name);
  };
}

let person25 = new Person("Nicholas", 29, "Software Engineer");
let person26 = new Person("Greg", 27, "Doctor");

person25.sayName(); // Nicholas
person26.sayName(); // Greg

console.log("-> ", person25.constructor == Person); // true
console.log("-> ", person25.constructor == Person); // true

console.log(person25 instanceof Object); // true;
console.log(person25 instanceof Person); // true;
console.log(person26 instanceof Object); // true;
console.log(person26 instanceof Person); // true;

// !  person1 and person2 are considered to be instances of Object because all custom objects inherit from Object

// *  function expression assigned to a variable behaves identically
let PersonExpression = function (name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    console.log(this.name);
  };
};
// ..... PersonExpression

console.log("--------- Constructors as Functions---------");

//* use as a constructor
let person27 = new Person("Pat", 29, "Software Enginner");
person27.sayName();

//* call as a function
Person("Greg1111111111", 27, "Doctor"); // adds to global
global.sayName();

//* call in the scope of another obj
let oo = new Object();
Person.call(oo, "Patt111", 25, "Nurse");
oo.sayName();

/*  The Person() function can also be called within the scope of a particular object
using call() (or apply()). In this case, it’s called with a this value of the object o, which then gets
assigned all of the properties and the sayName() method.
 */

console.log("----------- Problems with Constructors ----------- ");

console.log(person1.sayName == person2.sayName); // false
//* of the same name on different instances are not equivalent, as the following code proves

//* It doesn’t make sense to have two instances of Function that do the same thing, moving the function definition outside of the constructor
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = sayName;
}

function sayName() {
  console.log("->> ", this.name);
}

let person28 = new Person("Nicholas", 29, "Software Engineer");
let person29 = new Person("Greg", 27, "Doctor");

person28.sayName(); //Nicholas
person29.sayName(); // Greg

console.log("************ The Prototype Pattern************");
//* Each function is created with a prototype property, which is an object containing properties and methods that should be available to instances of a particular reference type. */
//* they can be assigned directly to the prototype, as in this example:

function Person7() {}

Person7.prototype.name = "Nicholas";
Person7.prototype.age = 29;
Person7.prototype.job = "Software Engineer";

Person7.prototype.sayName = function () {
  console.log(this.name);
};

let person30 = new Person7();
person30.sayName(); // "Nicholas"

let person31 = new Person7();
person31.sayName(); // "Nicholas"

console.log(person30.sayName == person31.sayName); //true

//* Using a function expression is also suitable */
let Person8 = function () {};

Person8.prototype.name = "Nicholas";
Person8.prototype.age = 2229;
Person8.prototype.job = "Software Engineer";
Person8.prototype.sayName = function () {
  console.log("*** ", this.name);
};

let person32 = new Person8();
person32.sayName(); // "Nicholas"

let person33 = new Person8();
person33.sayName(); // "Nicholas"

console.log(person32.sayName == person33.sayName); // true
//!  the properties and the sayName() method are added directly to the prototype property of Person, leaving the constructor empty

console.log("************ How Prototypes Work ************");
/*
* Constructor function can exist as function expression or function           declaration, so both of these are suitable:
*
 function Person {}
*
 let Person = function() {}
*/
function Person9() {}
/*
 * Upon declaration, the constructor function already has a prototype object associated with it:
 */
console.log("--> ", typeof Person9.prototype);
console.log("--> ", Person9.prototype);
// {
// constructor: f Person9(),
// __proto__: Object
// }

/*
 * As mentioned previously, the constructor function has
 * a 'prototype' reference to the prototype object, and
 * the prototype object has a 'constructor' reference to
 * the constructor function. These references are cyclical:
 */
console.log(Person9.prototype.constructor === Person9); // true
/*
 * Any normal prototype chain will terminate at the Object prototype.
 * The prototype of the Object prototype is null.
 */
console.log(Person9.prototype.__proto__ === Object.prototype); // true
console.log(Person9.prototype.__proto__.constructor === Object); // true
console.log(Person9.prototype.__proto__.__proto__ === null); // true

console.log(Person.prototype.__proto__);
// {
// constructor: f Object(),
// toString: ...
// hasOwnProperty: ...
// isPrototypeOf: ...
// ...
// }

console.log(Object.prototype.__proto__); // null

console.log("****:: ", Person9);
console.log("****:: ", Person9.prototype);
console.log("****:: ", Person9.prototype.__proto__);
console.log("****:: ", Person9.prototype.__proto__.constructor);
console.log("****:: ", Person9.prototype.__proto__.__proto__);
console.log("****:: ", Person9.prototype.__proto__.__proto__);

console.log("Object.prototype:: ", Object.prototype);

// {
// constructor: f Object(),
// toString: ...
// hasOwnProperty: ...
// isPrototypeOf: ...
//...// }

let person34 = new Person9(),
  person35 = new Person9();

/*
 * The constructor, the prototype object, and an instance
 * are three completely distinct objects:
 */

console.log(person34 !== Person9); // true
console.log(person34 !== Person9.prototype); // true
console.log(Person9.prototype !== person34); // true

/*
 * An instance is linked to the prototype through __proto__, which
 * is the literal manifestation of the [[Prototype]] hidden property.
 *
 * A constructor is linked to the prototype through the constructor property.
 *
 * An instance has no direct link to the constructor, only through the prototype.
 */
console.log(person34.__proto__ === Person9.prototype); // true
console.log(person34.__proto__.constructor === Person9); // true

/*
 * Two instances created from the same constructor function will share
 * a prototype object:
 */
console.log(person35.__proto__ === person35.__proto__); // true

/*
* instanceof will check the instance's prototype
 chain against the
* prototype property of a constructor function:
*/
console.log("--- ", person34 instanceof Person9); // true
console.log("--- ", person34 instanceof Object); // true
console.log("--- ", Person9.prototype instanceof Object); // true

//
console.log(Person9.prototype.isPrototypeOf(person34)); // true
console.log(Person9.prototype.isPrototypeOf(person34)); // true

//* Object.getPrototypeOf(), which returns the value of [[Prototype]]. */
console.log("~~~ ", Object.getPrototypeOf(person34) == Person9.prototype); //true
console.log("~~~ ", Object.getPrototypeOf(person30).name); // "Nicholas"
console.log("~~~ ", Person8.prototype.name); // "Nicholas"
console.log("~~~ ", Object.getPrototypeOf(person33).age); // "Nicholas"

// This allows you to overwrite the prototype hierarchy of an already- instantiated object:

let biped = {
  numLegs: 2,
};

let person36 = {
  name: "Matt",
};

console.log(person36.__proto__);
Object.setPrototypeOf(person36, biped);
console.log(person36);
console.log("getPrototypeOf:: ", Object.getPrototypeOf(person36));
console.log(person36.__proto__);

console.log(person36.name); // Matt
console.log(person36.numLegs); // 2
console.log(Object.getPrototypeOf(person36) === biped); // true

// changing prototype
Array.prototype.myLog = function () {
  console.log(`~>`, this);
};

[1, 2, 3, , 4].myLog();

Array.prototype.sum = function () {
  console.log(`~>`, this);
  return this.reduce((a, b) => a + b, 0);
};

console.log("object", [].sum());

//* To avoid these slowdowns, prefer to just create a new object and specify its prototype with Object.create():

let car = {
  numDoors: 4,
  colors: ["blue", "white"],
};

let person37 = Object.create(car);
person37.name = "Matt";

console.log("~~~  ", person37.prototype); // Matt

console.log("~~~  ", person37.__proto__); // Matt
console.log("~~~  ", person37.__proto__.numDoors); // Matt
console.log("~~~  ", person37.__proto__.colors); // Matt

console.log("~>>> ", person37.name); // Matt
console.log("~>>> ", person37.colors); // 2
console.log("~>>> ", Object.getPrototypeOf(person37) === car); // true

console.log("********** Understanding the Prototype Hierarchy*********");
/*
 * share properties and methods among multiple object instances....
 * the instance person1 have sayName? property NO ->
 * person1 prototype have a property sayName? yes -> the function is accessed
 */

//* NOTE: The constructor property mentioned earlier exists only on the prototype and so is accessible from object instances.

function Person10() {}

Person10.prototype.name = "Nicholas";
Person10.prototype.age = 29;
Person10.prototype.job = "Software Engineer";
Person10.prototype.sayName = function () {
  console.log(this.name);
};

let person38 = new Person10();
let person39 = new Person10();

person38.name = "Greg";
console.log(person38.name); //* "Greg" - from instance
console.log(person39.name); //* "Nicholas" - from prototype

//* The delete operator, however, completely removes the instance property and allows the prototype property to be accessed again

function Person11() {}

Person11.prototype.name = "Nicholas";
Person11.prototype.age = 29;
Person11.prototype.job = "Software Engineer";
Person11.prototype.sayName = function () {
  console.log(this.name);
};

let person40 = new Person11();
let person41 = new Person11();

person40.name = "Greg"; //  previously had been shadowed with the value "Greg"

console.log("name-instance:: ", person40.name); // "Greg" - from instance
console.log("name-prototype:: ", person41.name); // "Nicholas" - from prototype

delete person40.name;
console.log("name-deleted-prototype:: ", person40.name); // "Nicholas" - from the prototype

console.log("************** hasOwnProperty() ************");
//* determines if a property exists on the instance or on the prototype

function Person12() {}

Person12.prototype.name = "Nicholas";
Person12.prototype.age = 29;
Person12.prototype.job = "Software Engineer";
Person12.prototype.sayName = function () {
  console.log(this.name);
};

let person42 = new Person12();
let person43 = new Person12();

console.log("---> ", person42.hasOwnProperty("name")); // false

person42.name = "Greg";
console.log("---> ", person42.name); // "Greg" - from instance
console.log("---> ", person42.hasOwnProperty("name")); // true

console.log("---> ", person43.name); // "Nicholas" - from prototype
console.log("---> ", person43.hasOwnProperty("name")); // false

delete person42.name;
console.log("---> ", person42.name); // "Nicholas" - from the prototype
console.log("---> ", person42.hasOwnProperty("name")); // false

//! Calling person1.hasOwnProperty("name") returns true only after name has been overwritten on person1

console.log(" ************ Prototypes and the “in” Operator************ ");

/*
 * two ways to use the in operator:
    * on its own - in operator returns true when a property of the given name is accessible by the object, = the property may exist on the instance or on the prototype

    * a for-in loop -
 */
{
  function Person() {}

  Person.prototype.name = "Nicholas";
  Person.prototype.age = 29;
  Person.prototype.job = "Software Engineer";
  Person.prototype.sayName = function () {
    console.log(this.name);
  };

  let person1 = new Person();
  let person2 = new Person();

  console.log("name:: ", person1.hasOwnProperty("name")); // false
  console.log("name:: ", "name" in person1); // true

  person1.name = "Greg";
  console.log(person1.name); // "Greg" - from instance
  console.log(person1.hasOwnProperty("name")); // true
  console.log("name" in person1); // true

  console.log(person2.name); // "Nicholas" - from prototype
  console.log(person2.hasOwnProperty("name")); // false
  console.log("name" in person2); // true

  delete person1.name;
  console.log(person1.name); // "Nicholas" - from the prototype
  console.log(person1.hasOwnProperty("name")); // false
  console.log("name" in person1); // true
}

//* calling "name" in person1 always returns true
//! . It’s possible to determine if the property of an object exists on the prototype by combining a call to hasOwnProperty()

function hasPrototypeProperty(object, name) {
  return !object.hasOwnProperty(name) && name in object;
}

//* a prototype property can be determined if the in operator returns true but hasOwnProperty() returns false.
{
  function Person() {}

  Person.prototype.name = "Nicholas";
  Person.prototype.age = 29;
  Person.prototype.job = "Software Engineer";
  Person.prototype.sayName = function () {
    console.log(this.name);
  };

  let person = new Person();

  console.log("**** ", hasPrototypeProperty(person, "name")); // true
  person.name = "Greg";
  console.log("**** ", hasPrototypeProperty(person, "name")); // false
}

//* To retrieve a list of all enumerable instance properties on an object, you can use the Object.keys()
{
  function Person() {}

  Person.prototype.name = "Nicholas";
  Person.prototype.age = 29;
  Person.prototype.job = "Software Engineer";
  Person.prototype.sayName = function () {
    console.log(this.name);
  };

  let keys = Object.keys(Person.prototype);

  console.log(keys); // "name,age,job,sayName"
  let p1 = new Person();
  p1.name = "Rob";
  p1.age = 31;
  let p1keys = Object.keys(p1);
  console.log(p1keys); // "name,age"
}
//* Object.getOwnPropertyNames() - ist of all instance properties, whether enumerable or not
{
  let keys = Object.getOwnPropertyNames(Person.prototype);
  console.log(keys); // "constructor,name,age,job,sayName"
}

//* , Object.getOwnPropertySymbols() was introduced, which offers the same behavior as Object.getOwnPropertyNames() but with respect to symbols: let k1 = Symbol('k1'),

{
  let k1 = Symbol("k1"),
    k2 = Symbol("k2");
  let o = {
    [k1]: "k1",
    [k2]: "k2",
  };
  console.log("SYMBOL-----:: ", Object.getOwnPropertySymbols(o));
  // [Symbol(k1), Symbol(k2)]
}

console.log(" *********** Property Enumeration Order ***********");
//*  for-in loops and Object.keys() do not have a deterministic order of enumeration.  determined by the JavaScript engine and may vary by browser.

/*
 * Number keys will first be enumerated in ascending order, then string and symbol keys enumerated in insertion order
 */

{
  let k1 = Symbol("k1"),
    k2 = Symbol("k2");

  let o = {
    1: 1,
    first: "first",
    [k1]: "sym2",
    second: "second",
    0: 0,
  };

  o[k2] = "sym2";
  o[3] = 3;
  o.third = "third";
  (0)[2] = 2;

  console.log(Object.getOwnPropertyNames(o));
  // ["0", "1", "3", "first", "second", "third"]

  console.log(Object.getOwnPropertySymbols(o));
  // [Symbol(k1), Symbol(k2)]
}

console.log("*********** Object Iteration ***********");

/*
 * iterating the properties of an object

 *  static methods:
    * Object.values() - array of the object’s values
    * and Object.entries() -  returns an array of array pairs -> [key, value] pair in the object
 */
{
  const o = {
    foo: "bar",
    baz: 1,
    qux: {},
  };

  console.log(Object.values(o));
  // ["bar", 1, {}]

  console.log(Object.entries(o));
  // [["foo", "bar"], ["baz", 1], ["qux", {}]]
}

//
{
  const o = {
    qux: {},
    qux1: {},
  };

  console.log("--- ", Object.values(o)[0] === o.qux);
  // true
  console.log("--- ", Object.entries(o)[0][1] === o.qux);
  // true
  console.log(Object.entries(o));
  console.log(Object.entries(o)[0][1]);
  console.log(Object.entries(o)[0][0]);

  console.log(Object.entries(o));
  console.log(Object.entries(o)[0][1]);
  console.log(Object.entries(o)[1][0]);
}

//* Symbol-keyed properties are ignored:
{
  const sym = Symbol();
  const o = {
    [sym]: "foo",
  };

  console.log("*** ", Object.values(o));
  // []
  console.log("*** ", Object.entries(o));
  // []
}

console.log("******* Alternate Prototype Syntax *******");
{
  function Person() {}

  Person.prototype = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
      console.log(this.name);
    },
  };
}
//! this syntax overwrites the default prototype object completely, meaning that the constructor property is equal to that of a completely new object

{
  let friend = new Person();
  console.log(friend instanceof Object); // true;
  console.log(friend instanceof Person); // true;
  console.log(friend.constructor == Person); // false;
  console.log(friend.constructor == Object); // true;
}

//*  Although the instanceof operator still works reliably, you cannot rely on the constructor to indicate the type of object */

{
  function Person() {}

  Person.prototype = {
    constructor: Person, //! includes a constructor property and sets it equal to Person

    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
      console.log(this.name);
    },
  };
}

//! restoring the constructor in this manner creates a property with [[Enumerable]] set to true. Native constructor properties are not enumerable by default

//* f you’re using an ECMAScript–compliant JavaScript engine, you may wish to use Object.defineProperty() instead */
{
  function Person() {}

  Person.prototype = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
      console.log(this.name);
    },
  };

  // restore the constructor
  Object.defineProperty(Person.prototype, "constructor", {
    enumerable: false,
    value: Person,
  });
}

console.log("********** Dynamic Nature of Prototypes **********");

{
  let friend = new Person();

  Person.prototype.sayHi = function () {
    console.log("hi");
  };
  friend.sayHi(); // "hi" - works!
}

//! The [[Prototype]] pointer is assigned when the constructor is called, so changing the prototype to a different object severs the tie between the constructor and the original prototype.

//! Remember that the instance has a pointer to only the prototype, not to the constructor.
{
  function Person() {}

  let friend = new Person();

  Person.prototype = {
    constructor: Person,
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName() {
      console.log(this.name);
    },
  };

  // friend.sayName(); // error // commented 'cause thrown error
}

/* Overwriting the prototype on the constructor means that new instances will reference the new prototype while any previously existing object instances still reference the old prototype.
 */

console.log("******* Native Object Prototypes *******");
//* the sort() method can be found on Array.prototype, and substring() can be found on String.prototype,  */

console.log(typeof Array.prototype.sort); // "function"
console.log(typeof String.prototype.substring); // "function"

//* Through native object prototypes, it’s possible to get references to all of the default methods and to define new methods */

//* he following code adds a method called startsWith() to the String primitive wrapper

{
  String.prototype.startsWith = function (text) {
    return this.indexOf(text) === 0;
  };
  let msg = "Hello world!";
  console.log("***", msg.startsWith("Hello"));
  // true
}

// ! it is not recommended to modify native object prototypes in a production environment.

console.log("************ Problems with Prototypes ************");

//* The main problem comes with their shared nature */

//! The real problem occurs when a property contains a reference value. Consider the following example: -- If the intention is to have an array shared by all instances, then this outcome is okay.

{
  function Person() {}
  Person.prototype = {
    constructor: Person,
    name: "Nicholas",

    age: 29,
    job: "Software Engineer",
    friends: ["Shelby", "Court"],
    sayName() {
      console.log(this.name);
    },
  };
  let person1 = new Person();
  let person2 = new Person();
  person1.friends.push("Van");
  console.log(person1.friends); // "Shelby,Court,Van"
  console.log(person2.friends); // "Shelby,Court,Van"
  console.log(person1.friends === person2.friends); // true
}

console.log("********************** INHERITANCE **********************");

/*
 * TWO TYPES OF INHERITANCE
 * INTERFACE INHERITANCE - where only the method signatures are inherited - NOT POSSIBLE IN JS  because functions do not have signatures
 * IMPLEMENTATION INHERITANCE - where actual methods are inherited, and this is done primarily through the use of prototype chaining
 */

console.log("***************** Prototype Chaining ***************** ");
//* The basic idea is to use the concept of prototypes to inherit properties and methods between two reference types */

//*  Recall the relationship between constructors, prototypes, and instances: each constructor has a prototype object that points back to the constructor, and instances have an internal pointer to the prototype */

//!  If that p ototype were also an instance of another type, then the pattern would continue, forming a chain between instances and prototypes

//* implementing prototype chaining involves the following code pattern

function SuperType() {
  this.property = true;
}

SuperType.prototype.getSuperValue = function () {
  return this.prototype;
};

function SubType() {
  this.subproperty = false;
}

//inherit from SuperType
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function () {
  return this.subproperty;
};

let instance = new SubType();
console.log("getSuperValue::: ", instance.getSuperValue());

//!  When inheritance has been implemented via prototype chaining, that search can continue up the prototype chain. In the previous example, for instance a call to instance.getSuperValue() results in a three-step search: the instance, SubType.prototype, and SuperType.prototype, where the method is found

console.log("********** Default Prototypes **********");

//* All reference types inherit from Object by default, which is accomplished through prototype chaining

//* SUBTYPE INHERITS FROM SUPERTYPE - SUPERTYPE INHERITS FROM OBJECT
// SUBTYPE -> SUPERTYPE -> OBJECT -- instance.toString call Object.prototype)

console.log("------ Prototype and Instance Relationships ------");
//* first way - instanceof
console.log("instanceof --> ", instance instanceof Object); // true
console.log("instanceof --> ", instance instanceof SuperType); // true
console.log("instanceof --> ", instance instanceof SubType); // true
// instanceof operator, which returns true whenever an instance is used with a constructor that appears in its prototype chain

// Here, the instance object is technically an instance of Object, SuperType, and SubType because of the prototype chain relationship

//* second way - isPrototypeOf
console.log(Object.prototype.isPrototypeOf(instance)); // true
console.log(SuperType.prototype.isPrototypeOf(instance)); // true
console.log(SubType.prototype.isPrototypeOf(instance)); // true

console.log("************* Working with Methods *************");

//* To override or introduce a new method from subtype to superType the methods must be added to the prototype after the prototype has been assigned
{
  function SuperType() {
    this.property = true;
  }
  SuperType.prototype.getSuperValue = function () {
    return this.property;
  };
  function SubType() {
    this.subproperty = false;
  }

  //inherit from SuperType
  SubType.prototype = new SuperType();

  //new method
  SubType.prototype.getSubValue = function () {
    return this.subproperty;
  };

  //override existing method
  SubType.prototype.getSuperValue = function () {
    return false;
  };

  let instance = new SubType();
  console.log("instance-override:: ", instance.getSuperValue());
}

//* The important thing to note is that both of the methods are defined after the prototype has been assigned as an instance of SuperType

{
  function SuperType() {
    this.property = true;
  }
  SuperType.prototype.getSuperValue = function () {
    return this.property;
  };
  function SubType() {
    return (subproperty = false);
  }

  //inherit from SuperType
  SubType.prototype = new SuperType();

  //try to add new methods - this nullifies the previous line
  SubType.prototype = {
    getSubValue() {
      return this.subproperty;
    },
    someOtherMethod() {
      return false;
    },
  };
  //! ABOVE::: e prototype is reassigned to be an object literal after it was already assigned to be an instance of SuperType prototype now contains a new instance of Object instead of an instance of SuperType, SO THE PROTOTYPE CHAIN HAS BEEN BROKEN

  let instance = new SubType();
  // THE LINE BELOW IS INTENTIONALLY COMMENTED - ERROR
  // console.log("o---> ", instance.getSuperValue()); // error!
}

console.log("************ Problems with Prototype Chaining ************");

/* Al implementar la herencia usando prototipos, el prototipo se convierte en una instancia de otro tipo, lo que significa que lo que antes eran propiedades de instancia ahora son propiedades de prototipo. El problema se destaca en el siguiente ejemplo: */
{
  function SuperType() {
    this.colors = ["red", "blue", "green"];
  }

  function SubType() {}

  //inherit from SuperType
  SubType.prototype = new SuperType();

  let instance1 = new SubType();

  instance1.colors.push("black");
  console.log("instance1.colors:: ", instance1.colors);

  let instance2 = new SubType();
  console.log("instance2.colors:: ", instance2.colors);
}
//! When implementing inheritance using prototypes, the prototype actually becomes an instance of another type

//! there is no way to pass arguments into the supertype constructor without affecting all of the object instance

//* SECOND ISSUE - u cannot pass arguments into the supertype coNstructor when the subtype instance is being created. --> prototype chaining is rarely used alone.

console.log("************** Constructor Stealing**************");

//* object masquerading or classical inheritance)
//* call the supertype constructor from within the subtype constructor
// functions are simply objects that execute code in a particular type context,

//! the apply() and call() methods can be used to execute a constructor on the newly created object

{
  function SuperType() {
    this.colors = ["red", "blue", "green"];
  }

  function SubType() {
    //inherit from SuperType
    SuperType.call(this);
  }

  let instance1 = new SubType();
  instance1.colors.push("pink");
  console.log("instance1.colors:: ", instance1.colors);

  let instance2 = new SubType();
  console.log("instance2.colors:: ", instance2.colors);
}
//* Doing this effectively runs all of the object-initialization code in the SuperType() function on the new SubType object
//! each instance has its own copy of the colors property

console.log("--------------  Passing Arguments --------------");
//* the ability to pass arguments into the supertype constructor from within the subtype constructor

{
  function SuperType(name) {
    this.name = name;
  }

  function SubType() {
    //inherit from SuperType passing arguments
    SuperType.call(this, "nicholas");

    //instance property
    this.age = 29;
  }

  let instance = new SubType();
  console.log("instance.name:: ", instance.name);
  console.log("instance.age:: ", instance.age);
}

console.log("********** Problems with Constructor Stealing **********");

//! Because of these issues, constructor stealing is rarely used on its own

console.log("************* Combination Inheritance *************");

/*
 * Combination inheritance = pseudoclassical inheritance
 * 1. prototype chaining TO inherit properties and methods on the prototype
 * 2. constructor stealing TO inherit instance properties
 */
/*
 * Esto permite la reutilización de funciones definiendo métodos en el prototipo y permite que cada instancia tenga sus propias propiedades.
 */
{
  function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
  }

  SuperType.prototype.sayName = function () {
    console.log("this.name:: ", this.name);
  };

  function SubType(name, age) {
    //inherit properties
    SuperType.call(this, name);

    this.age = age;
  }

  // inherit methods
  SubType.prototype = new SuperType();

  SubType.prototype.sayAge = function () {
    console.log(this.age);
  };

  let instance1 = new SubType("Patricia", 29);
  instance1.colors.push("aqua");
  console.log("instance1.colors:: ", instance1.colors);
  instance1.sayName();
  instance1.sayAge();

  let instance2 = new SubType("Pepito", 27);
  console.log("instance2.colors:: ", instance2.colors);
  instance2.sayName();
  instance2.sayAge();

  // console.log(SubType.prototype.__proto__);
}

console.log("************Prototypal Inheritance************");
//*  prototypes allow you to create new objects based on existing objects without the need for defining custom types

//object() function creates a temporary constructor assigns a given object as the constructor’s prototype, and returns a new instance of the temporary type
{
  function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
  }

  let person = {
    name: "Nick",
    friends: ["Shelby", "Court", "Van"],
  };

  let anotherPerson = object(person);
  anotherPerson.name = "Greg";
  anotherPerson.friends.push("Rob");

  let yetAnotherPerson = object(person);
  yetAnotherPerson.name = "Linda";
  yetAnotherPerson.friends.push("Barbie");

  console.log("person.friends:: ", person.friends);
}

//! Object.create()
console.log("--------- Object.create() ---------");
/*
 * TWO ARGUMENTS::
 * an object to use as the prototype for a new object
 * an optional object defining additional properties to apply to the new object
 */
{
  let person = {
    name: "Nicholas",
    friends: ["shelby", "court", "van"],
  };

  let anotherPerson = Object.create(person);
  anotherPerson.name = "Greg";
  anotherPerson.friends.push("rob");
  console.log("anotherPerson:: ", anotherPerson);
  console.log("anotherPerson-PROTO:: ", anotherPerson.__proto__);

  let yetAnotherPerson = Object.create(person);
  yetAnotherPerson.name = "Linda";
  yetAnotherPerson.friends.push("Barbie1");
  console.log("yetAnotherPerson-PROTO:: ", yetAnotherPerson.__proto__);

  console.log("person.friends:: ", person.friends);
  //[ 'shelby', 'court', 'van', 'rob', 'Barbie1' ]
}
{
  //* second argument - same format as the second argument for Object.defineProperties()
  let person = {
    name: "Patricia",
    friends: ["pat", "mimi", "jhen"],
  };

  let anotherPerson = Object.create(person, {
    name: {
      value: "Greg",
    },
  });

  console.log("anotherPerson.name:: ", anotherPerson.name);
}

console.log("********** Parasitic Inheritance **********");

{
  function createAnother(original) {
    let clone = object(original); // create a new object by calling a function
    // augment the object in some way
    clone.sayHi = function () {
      console.log("hiiiiii!!");
    };
    return clone; // return the object
  }

  //* The createAnother() function can be used in the following way:
  let person = {
    name: "Nicholas",
    friends: ["shelby", "court", "van"],
  };

  let anotherPerson = createAnother(person);
  anotherPerson.sayHi(); //"hi"
  console.log(anotherPerson.name);
  console.log(anotherPerson.friends);
  console.log("person:: ", person);
  //!  returns a new object based on person. The anotherPerson object has all of the properties and methods of person but adds a new method called sayHi().

  /*
   * Parasitic inheritance is another pattern to use when you are concerned primarily with objects and not with custom types and constructors
   * adding functions to objects using parasitic inheritance leads to inefficiencies related to function reuse, similar to the constructor pattern
   */
}

console.log("********** Parasitic Combination Inheritance **********");
/*
 * inefficient part of the pattern is that the supertype constructor is ALWAYS CALLED TWICE
 * 1ST: create the subtype’s prototype
 * 2ND:  once inside the subtype constructor
 *
 */
{
  function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
  }

  SuperType.prototype.sayName = function () {
    console.log("this.name:: ", this.name);
  };

  function SubType(name, age) {
    SuperType.call(this, name); // second call to SuperType

    this.age = age;
  }

  SubType.prototype = new SuperType("paaat", 26); // first call to SuperType
  SubType.prototype.constructor = SubType;

  SubType.prototype.sayAge = function () {
    console.log("this.age:: ", this.age);
  };
}

//! hybrid form of prototype chaining to inherit methods
/*
 * constructor stealing to inherit properties
 * uses a hybrid form of prototype chaining to inherit methods.
 */
//* Instead of calling the supertype constructor to assign the subtype’s prototype, all you need is a copy of the supertype’s prototype

{
  function inheritPrototype(subType, superType) {
    let prototype = object(superType.prototype); // create object
    prototype.constructor = subType; // augment object
    subType.prototype = prototype; // assign object
  }

  function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
  }

  SuperType.prototype.sayName = function () {
    console.log("this.name:: ", this.name);
  };

  function SubType(name, age) {
    SuperType.call(this, name);

    this.age = age;
  }

  inheritPrototype(SubType, SuperType);

  SubType.prototype.sayAge = function () {
    console.log("this.age:: ", this.age);
  };
}

//! Parasitic combination inheritance is considered the most optimal inheritance paradigm for reference types.

console.log("*************** CLASSES ***************");
{
  //* class declaration
  class Person {}

  //* class expression
  const Animal = class {};
}
//* class declarations are not hoisted

{
  console.log("FunctionExpression", FunctionExpression);
  var FunctionExpression = function () {};
  console.log("FunctionExpression", FunctionExpression);

  console.log("FunctionDeclaration:: ", FunctionDeclaration);
  function FunctionDeclaration() {}
  console.log("FunctionDeclaration:: ", FunctionDeclaration);

  console.log("ClassExpression:: ", ClassExpression);
  var ClassExpression = class {};
  console.log("ClassExpression:: ", ClassExpression);
  /*
  console.log("ClassDeclaration:: ", ClassDeclaration);
  class ClassDeclaration {}
  console.log("ClassDeclaration:: ", ClassDeclaration);
   */

  /*
   * FUNCTION DECLARATION: HOISTED
   * FUNCTION EXPRESSION: NO
   * CLASS EXPRESSION: NO - Undefined
   * CLASS DECLARATION: NO - Reference Error
   */
}
//! class declarations are block scoped
{
  function FunctionDeclaration() {}
  class ClassDeclaration {}
}
// console.log(FunctionDeclaration); // FunctionDeclaration() {}
// console.log(ClassDeclaration); // ReferenceError: ClassDeclaration is not defined

console.log("**************** Class Composition ****************");

//* everything inside a class definition executes in strict mode.

// valid empty class definition
class Foo {}

// valid class definition with constructor
class Bar {
  constructor() {}
}

//valid class definition with getter
class Baz {
  get myBaz() {}
}

// valid class definition with static method
class Qux {
  static myQux() {}
}

//*  When the expression is assigned to a variable, the name property may be used to retrieve the class expression name string, but the identifier itself is not accessible outside the class expression scope

{
  let Person = class PersonName {
    identify() {
      console.log(
        "Person.name, PersonName.name::** ",
        Person.name,
        PersonName.name
      );
    }
  };

  let p = new Person();

  p.identify(); // PersonName, PersonName

  console.log("Person.name", Person.name); // PersonName
  // console.log("PersonName", PersonName); // ReferenceError: PersonName is not defined
}

console.log("************* The Class Constructor *************");

//* electing not to define the class constructor is the same as defining the constructor as an empty function.

/*
 *  A new object is created in memory.
 *
 */
{
  class Animal {}

  class Person {
    constructor() {
      console.log("person ctor");
    }
  }

  class Vegetable {
    constructor() {
      this.color = "orangeeee";
    }
  }

  let a = new Animal();
  let p = new Person(); // person ctor

  let v = new Vegetable();
  console.log("v.color:: ", v.color);
}

{
  class Person {
    constructor(name, age) {
      console.log("arguments:: ", arguments);
      console.log("arguments.length:: ", arguments.length);
      this.name = name || null;
      this.age = age || null;
    }
  }

  let p1 = new Person(); // 0
  console.log("p1.name:: ", p1.name); // null

  let p2 = new Person(); // 0
  console.log("p2.name:: ", p2.name); //null

  let p3 = new Person("jake", "4343"); // 2
  console.log("p3.name:: ", p3.name); // jake
  console.log("p3.age:: ", p3.age); // jake
}

//

{
  class Person {
    constructor(override) {
      this.foo = "foo";
      if (override) {
        return {
          bar: "bar",
        };
      }
    }
  }

  let p1 = new Person(),
    p2 = new Person(true);

  console.log(p1); // Person{ foo: 'foo' }
  console.log(p1 instanceof Person); // true
  console.log(p2); // { bar: 'bar' }
  console.log(p2 instanceof Person); // false
}
//* NEW MANDATORY
{
  function Person() {}
  class Animal {}
  // Constructs instance using window as 'this'
  let p = Person();
  // let a = Animal();
  // TypeError: class constructor Animal cannot be invoked without 'new'
}
//! With class constructors, neglecting to use the new operator will throw an error:
{
  class Person {}
  // Create a new instance using the class
  let p1 = new Person();

  // p1.constructor();
  // TypeError: Class constructor Person cannot be invoked without 'new'

  // Create a new instance using the reference to the class constructor
  let p2 = new p1.constructor();
  console.log("p2:: ", p2);
}

console.log("******* Understanding Classes as Special Functions *******");
//! t classes behave like special functions
{
  class Person {}
  console.log(Person); // class Person {}
  console.log("typeof of a class is:: ", typeof Person); // function
}

//* The class identifier has a prototype property, and the prototype has a constructor property that refers back to the class itself:
{
  class Person {
    constructor() {
      this.age = 23;
    }
  }

  console.log("constructor-back:: ", Person.prototype); // { constructor: f() }
  console.log("constructor-back:: ", Person === Person.prototype.constructor); // true
  let copyPerson = Person.prototype;
  let copyP = new Person();
  console.log(copyP.age);
}

//* INSTANCEOF in the prototype chain
{
  class Person {}
  let p = new Person();
  console.log(p instanceof Person); // true
}

//* . If the constructor method is invoked directly, this is the same as using a non-class function constructor, and the instanceof convention will reverse:

{
  class Person {}
  let p1 = new Person();
  console.log("-->> ", p1.constructor === Person); // true
  console.log("-->> ", p1 instanceof Person); // true
  console.log("-->> ", p1 instanceof Person.constructor); // false

  let p2 = new Person.constructor();

  console.log("-->> ", p2.constructor === Person); // false

  console.log("-->> ", p2 instanceof Person); // false
  console.log("-->> ", p2 instanceof Person.constructor); // true
}

//* class can be passed around as you would any other object or function reference:

//* Classes may be defined anywhere a function would, such as inside an array:
{
  let classList = [
    class {
      constructor(id) {
        this.id_ = id;
        console.log(`instance ${this.id_}`);
      }
    },
  ];

  // second way
  let clase = new classList[0](21);

  // first way
  function createInstance(classDefinition, ...args) {
    return new classDefinition(args);
  }
  let val = [3141, 32, 54];
  let foo = createInstance(classList[0], val, "type", new Date().getFullYear()); // instance 3141
}

//* Similar to an immediately invoked function expression, a class can also be immediately instantiated:

{
  let p = new (class Foo {
    constructor(x) {
      this.nae = x;
      console.log("x::: ", x);
    }
  })("bar"); // bar

  console.log("p:: ", typeof p);
  console.log("p:: ", p);
  console.log("p.nae:: ", p.nae);
}

console.log("********** Instance, Prototype, and Class Members **********");
/* Each time new <classname> is invoked, the constructor function will execute. Inside this function, you are able to populate the freshly created instance (the this object) with “own” properties. */
{
  class Person {
    constructor() {
      //for this example, define a string with object wrapper as to check object equality between instances below
      this.name = new String("Jack");

      this.sayName = () => console.log(this.name);

      this.nicknames = ["jake", "j-dog"];
    }
  }

  let p1 = new Person(),
    p2 = new Person();

  p1.sayName(); // jack
  p2.sayName(); // jack

  console.log("p1.name === p2.name:: ", p1.name === p2.name); // false
  //parsing to string to check equality
  console.log("p1.name === p2.name:: ", `${p1.name}` === `${p2.name}`); // false
  console.log("p1.sayName === p2.sayName:: ", p1.sayName === p2.sayName); // false
  console.log("p1.nicknames === p2.nicknames", p1.nicknames === p2.nicknames); //false

  p1.name = p1.nicknames[0];
  p2.name = p2.nicknames[1];

  p1.sayName(); // jake
  p2.sayName(); // j-dog
}

console.log("*********** Prototype Methods and Accessors ***********");
{
  class Person {
    constructor() {
      // Everything added to 'this' will exist on each individual instance
      this.locate = () => console.log("instance"); // this property is a function
    }
    // Everything defined in the class body is defined on the class prototype object
    locate() {
      console.log("prototype");
    }
    test() {
      console.log("***********");
    }
  }
  let p = new Person();

  p.locate(); // instance
  Person.prototype.locate(); // prototype
  Person.prototype.test(); // ********

  p.test();
}

//!  primitives and objects cannot be added to the prototype inside the class body

{
  class Person {
    // name: "Jake"; // this line is commented intentionally because of error
  }
  // Uncaught SyntaxError: Unexpected token :
}

/*
 *Class methods behave identically to object properties, meaning they can be keyed with strings, symbols, or computed values
 */
{
  const symbolKey = Symbol("symbolKey");

  class Person {
    stringKey() {
      console.log("invoked stringKey");
    }
    [symbolKey]() {
      console.log("invoked symbolKey");
    }
    ["computed" + "Key"]() {
      console.log("invoked computedKey");
    }
  }

  let p = new Person();

  p.stringKey(); // invoked stringKey
  p[symbolKey](); // invoked symbolKey
  p.computedKey(); // invoked computedKey
}

//* Class definitions also support getters and setter accessors
{
  class Person {
    set name(newName) {
      console.log("------");
      this.name_ = newName + "2021";
    }
    get name() {
      return this.name_;
    }
  }
  let p = new Person();
  p.name = "Jake";
  console.log(p.name); // Jake
}

console.log("*********** Static Class Methods and Accessors ***********");

{
  class Person {
    constructor() {
      // Everything added to 'this' will exist on each individual instance
      this.locate = () => console.log("instance:: ", this);
    }

    // Defined on the class prototype object
    locate() {
      console.log("prototype:: ", this);
    }

    // Defined on the class
    static locate() {
      console.log("class:: ", this);
    }
  }

  let p = new Person();

  p.locate(); // instance, Person {}
  Person.prototype.locate(); // prototype, {constructor: ... }
  Person.locate(); // class, class Person {}
}

//* You may often find that these static class methods are useful as instance factories:
{
  class Person {
    constructor(age, height) {
      this.age_ = age;
      this.height_ = height;
    }

    sayAge() {
      console.log(this.age_);
    }

    static create() {
      // Create and return a person instance with a random age
      return new Person(Math.floor(Math.random() * 100), 1.567);
    }
  }
  console.log(Person.create()); // Person { age_:... }
}

// ! its not necessary to instantiate the class to execute a static class method

console.log("******** Non-Function Prototype and Class Members ********");
//* adding member data to prototypes or classes, outside the class definition there is nothing preventing you from adding them manually

{
  class Person {
    sayName() {
      console.log(`${Person.greeting} ${Person.sayingBye} ${this.name}`);
    }
  }

  // Define data member on class
  Person.greeting = "My name is";
  Person.sayingBye = "saying bye";

  // Define data member on prototype
  Person.prototype.name = "Jakeeee";

  let p = new Person();
  p.sayName(); // My name is Jake
}

console.log("********* Iterator and Generator Methods *********");
{
  class Person {
    // define generator on prototype
    *createNicknameIterator() {
      yield "Jack";
      yield "Jake";
      yield "J-Dog";
    }

    // define generator on class
    static *createJobIterator() {
      yield "Butcher";
      yield "Baker";
      yield "Candlestick maker";
    }
  }

  let jobIter = Person.createJobIterator();
  console.log("---> ", jobIter.next().value); // Butcher
  console.log("---> ", jobIter.next().value); // Baker
  console.log("---> ", jobIter.next().value); // Candlestick maker

  let p = new Person();
  let nicknameIter = p.createNicknameIterator();
  console.log("---> ", nicknameIter.next().value); // Jack
  console.log("---> ", nicknameIter.next().value); // Jake
  console.log("---> ", nicknameIter.next().value); // J-Dog
}

//* make a class instance iterable by adding a default iterator

{
  class Person {
    constructor() {
      this.nicknames = ["Jack", "Jake", "J-Dog"];
    }

    *[Symbol.iterator]() {
      yield* this.nicknames.entries();
    }
  }
  let p = new Person();

  for (let [idx, nickname] of p) {
    console.log(nickname);
  }
  // Jack
  // Jake
  // J-Dog
}

console.log("************ Inheritance ************");
//* Although it makes use of a new syntax, class inheritance still uses the prototype chain under the hood

console.log("------------ Inheritance Basics ------------");

//* S6 classes support a single inheritance format. Using the extends keyword, you are able to inherit from anything that has a [[Construct]] property and a prototype

{
  class Vehicle {}

  // inherit from class
  class Bus extends Vehicle {}

  let b = new Bus();
  console.log("**** ", "b instanceof Bus:: ", b instanceof Bus); //true
  console.log("**** ", "b instanceof Bus:: ", b instanceof Vehicle); //true

  function Person() {}

  //inherit from function constructor
  class Engineer extends Person {}

  let e = new Engineer();
  console.log("**** ", "e instanceof Engineer:: ", e instanceof Engineer); // true
  console.log("**** ", "e instanceof Person:: ", e instanceof Person); // true
}

//* Both class and prototype methods are carried down to the derived class. The value of this reflects the class or instance that is invoking the method:
{
  class Vehicle {
    identifyPrototype(id) {
      console.log("id, this:: ", id, this);
    }

    static identifyClass(id) {
      console.log("id, this", id, this);
    }
  }

  class Bus extends Vehicle {}

  let v = new Vehicle();
  let b = new Bus();

  b.identifyPrototype("bus"); // bus, Bus {}
  v.identifyPrototype("vehicle"); // vehicle, Vehicle {}

  Bus.identifyClass("bus"); // bus, class Bus {}
  Vehicle.identifyClass("vehicle"); // vehicle, class Vehicle {}
}

{
  //! The extends keyword is valid inside class expressions
  let Bar = class extends Foo {};
}

console.log("************ Constructors, HomeObjects, and super() ************");

/*
 * available for derived classes and ONLY AVAILABLE
 * inside the constructor
 * inside static methods
 */
{
  class Vehicle {
    constructor() {
      this.hasEngine = true;
    }
  }

  class Bus extends Vehicle {
    constructor() {
      //cannot reference 'this' before super(), will throw ReferenceError

      super(); //* same as super.constructor

      console.log("this instanceof Vehicle:: ", this instanceof Vehicle); // true
      console.log("this::::  ", this); // Bus { hasEngine: true }
    }
  }

  new Bus();
}

//! super también se puede usar dentro de métodos estáticos para invocar métodos estáticos definidos en la clase heredada

{
  class Vehicle {
    static identify() {
      console.log("****vechicle****");
    }
  }

  class Bus extends Vehicle {
    static identify() {
      super.identify();
    }
  }

  Bus.identify(); // vehicle
}
//! super will always be defined as the prototype of [[HomeObject]]
{
  // .....
  class Vehicle {}
  class Bus extends Vehicle {
    constructor() {
      super();
      console.log(this instanceof Vehicle);
    }
  }
  new Bus(); // true
}

{
  //*********
  class Vehicle {
    constructor(licensePlate) {
      this.licensePlate = licensePlate;
    }
  }
  class Bus extends Vehicle {
    constructor(licensePlate) {
      super(licensePlate);
    }
  }
  console.log(new Bus("1337H4X")); // Bus { licensePlate: '1337H4X' }
}

//* If you decline to define a constructor function, super() will be invoked and all arguments passed to the derived class constructor.

{
  class Vehicle {
    constructor(licensePlate) {
      this.licensePlate = licensePlate;
    }
  }

  class Bus extends Vehicle {}

  console.log(new Bus("1337H4X")); // Bus { licensePlate: '1337H4X' }
}

//* You cannot reference this inside the constructor before invoking super() .
{
  /*
  class Vehicle {}

  class Bus extends Vehicle {
    constructor() {
      console.log(this);
    }
  }
  
  new Bus();  */
  // ReferenceError: Must call super constructor in derived class
  // before accessing 'this' or returning from derived constructor
}

//* If a class is derived from a parent class and you explicitly define a constructor, you must either invoke super() or return an object from the constructor.

{
  class Vehicle {}

  class Car extends Vehicle {}

  class Bus extends Vehicle {
    constructor() {
      super();
    }
  }

  class Van extends Vehicle {
    constructor() {
      return {};
      // super()
    }
  }

  console.log("new Car()::: ", new Car());
  console.log("new Bus()::: ", new Bus());
  console.log("new Van()::: ", new Van());
}

console.log("********** Abstract Base Classes **********");

//* You may find a need to define a class that should be inherited from but not directly instantiated.
//! clase heradad pero no directamente instanciada

{
  //* Abstract base class
  class Vehicle {
    constructor() {
      console.log("new.target::: ", new.target);
      if (new.target === Vehicle) {
        throw new Error("Vehicle cannot be directly instantiated");
      }
    }
  }

  //* Derived class
  class Bus extends Vehicle {}

  new Bus(); // class Bus {}
  // new Vehicle(); // class Vehicle - commented intentionally
  // Error: Vehicle cannot be directly instantiated
}

//* a method be defined on a derived class by checking for it in the abstract base class constructor.

//* abstract base class
{
  class Vehicle {
    constructor() {
      if (new.target == Vehicle) {
        throw new Error("Vehicle cannot be directly instatiated");
      }

      if (!this.foo) {
        throw new Error("Inheriting class must define foo()");
      }
      console.log("success!!!!!!1");
    }
  }
  //* derived classes
  class Bus extends Vehicle {
    foo() {}
    // foo() {}// can comment this line to see the error (!this.error)
  }

  //* derived class
  class Van extends Vehicle {}

  new Bus(); // success!
  // new Van(); // Error: Inheriting class must define foo()
}

console.log("********* Inheriting from Built-in Types *********");
//* ES6 classes offer seamless interoperability with existing built-in reference types,

{
  class SuperArray extends Array {
    shuffle() {
      // Fisher-Yates shuffle
      for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
      }
    }
  }

  let a = new SuperArray(1, 2, 3, 4, 5);

  console.log(a instanceof Array); // true
  console.log(a instanceof SuperArray); // true

  console.log(a); // [1, 2, 3, 4, 5]
  a.shuffle();
  console.log(a); // [3, 1, 4, 5, 2]
}

//*

{
  class SuperArray extends Array {}
  let a1 = new SuperArray(1, 2, 3, 4, 5);

  let a2 = a1.filter((x) => !!(x % 2));

  console.log("*** ", a1); // [1, 2, 3, 4, 5]
  console.log("*** ", a2); // [1, 3, 5]
  console.log("*** ", a1 instanceof SuperArray); // true
  console.log("*** ", a2 instanceof SuperArray); // true
}

// OVERRIDE the Symbol.species accesor,\\

{
  class SuperArray extends Array {
    static get [Symbol.species]() {
      return Array;
    }
  }

  let a1 = new SuperArray(1, 2, 3, 4, 5);
  let a2 = a1.filter((x) => !!(x % 2));

  console.log("a1:: ", a1);
  console.log("a2:: ", a2);
  console.log("a1 instanceof SuperArray:: ", a1 instanceof SuperArray); // true
  console.log("a2 instanceof SuperArray:: ", a2 instanceof SuperArray); //false
}

console.log("******** Class Mixins ********");

//* If you only need to merge properties between multiple objects, prefer to use Object.assign().
//*  Any syntax is valid there as long as it resolves to a class or function constructor.
{
  class Vehicle {}
  function getParentclass() {
    console.log("evaluated expression");
    return Vehicle;
  }

  class bus extends getParentclass() {}
  //evaluated expression
}

//!mixin pattern can be achieved by chaining multiple mixin elements inside the expression, which will resolve into a single class that can be inherited from
{
  class Vehicle {}

  let FooMixin = (SuperClass) =>
    class extends SuperClass {
      foo() {
        console.log("fooooooo");
      }
    };

  let BarMixin = (SuperClass) =>
    class extends SuperClass {
      bar() {
        console.log("barrrrr");
      }
    };

  let BazMixin = (SuperClass) =>
    class extends SuperClass {
      baz() {
        console.log("bazzzz");
      }
    };

  class Bus extends FooMixin(BarMixin(BazMixin(Vehicle))) {}

  let b = new Bus();
  b.foo(); // foo
  b.bar(); // bar
  b.baz(); // foo
}

//* It is possible to flatten this nesting using a utility function:
{
  class Vehicle {}

  let FooMixin = (Superclass) =>
    class extends Superclass {
      foo() {
        console.log("foooooo!!!");
      }
    };

  let BarMixin = (Superclass) =>
    class extends Superclass {
      bar() {
        console.log("barrr!!!");
      }
    };

  let BazMixin = (Superclass) =>
    class extends Superclass {
      baz() {
        console.log("bazzzz!!!!!");
      }
    };

  function mix(BaseClass, ...Mixins) {
    return Mixins.reduce(
      (accumulator, current) => current(accumulator),
      BaseClass
    );
  }

  class Bus extends mix(Vehicle, FooMixin, BarMixin, BazMixin) {}

  let b = new Bus();
  b.foo(); // foo
  b.bar(); // bar
  b.baz(); //baz
}

//! React, are moving away from mixin patterns and toward composition (in the form of extracting methods into separate classes and utilities, and incorporating those piecemeal without the uuse of inheritance)

//! This reflects the well-known software principle of “composition over inheritance,” which is regarded by many to offer superior flexibility and code design
