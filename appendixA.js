console.log("**********ES2018 and ES2019********");

{
  /* 
  const emitter = new Emitter(5);
  async function asyncIteratorSyncCount() {
    const syncCounter = emitter[Symbol.iterator]();
    for await (const x of syncCounter) {
      console.log(x);
    }
  }
  asyncIteratorSyncCount();
  console.log("--------");
   */
}

{
  /* 
  const emitter = new Emitter(5);
  const asyncCounter = emitter[Symbol.asyncIterator]();
  console.log(asyncCounter.next());
  // { value: Promise, done: false }
   */
}
//...

console.log("*****REST AND SPREAD OPERATORS FOR OBJECT LITERALS******");

console.log("-------Rest Operator-----");

{
  const person = { name: "Pat", age: 26, job: "Engineer" };
  const { name, ...remainingData } = person;

  console.log(name); // Pat
  console.log(remainingData); // {age: 26, job: "engineer"}
}

//? The rest operator can be used at most once per object literal and must be listed last
{
  const person = {
    name: "Patty",
    age: 26,
    ci: 121345,
    job: { title: "Engineer", level: 10, other: true },
  };

  const {
    name,
    job: { title, ...remainingJobData },
    ...remainingPersonData
  } = person;

  console.log(">> ", name); //Patty
  console.log(">> ", title); // Engineer
  console.log(">> ", remainingPersonData); // {age: 26}
  console.log(">> ", remainingJobData); // {level: 10}

  //   const { ...a, job} = person
  //   console.log("****:: ", a, job);
}
//? The rest operator performs a shallow copy between objects, so object references will be copied instead of creating entire object clones:
{
  const person = {
    name: "Matt",
    age: 27,
    job: { title: "Engineer", level: 10 },
  };

  const { ...remainingData } = person;

  console.log("=>", person === remainingData); // false
  console.log("=>", person.job === remainingData.job); // true
}

//? The rest operator will copy all enumerable own properties, including symbols:
{
  const s = Symbol();
  const foo = { a: 1, [s]: 2, b: 3 };

  const { a, ...remainingData } = foo;

  console.log(remainingData);
  // {b: 3, Symbol(): 2}
}

console.log("********Spread Operator*********");
//? The spread operator allows you to join two objects together in a fashion similar to array concatenation
{
  const s = Symbol();
  const foo = { a: 1 };
  const bar = { [s]: 2 };

  const foobar = { ...foo, c: 3, ...bar };

  console.log(foobar);
  // { a: 1, c: 3 Symbol(): 2 }
}
/*
? The properties copied from spread objects will be performed in the order they are listed inside the object literal.
? Objects will overwrite properties as duplicates are encountered. The last property encountered will be the one that assumes the value.
 */
{
  //* These ordering conventions are demonstrated here:
  const foo = { a: 1 };
  const bar = { b: 2 };

  const foobar = { c: 3, ...bar, ...foo };

  console.log(foobar);
  // { c: 3, b: 2, a: 1}

  const baz = { c: 4 };

  const foobarbaz = { ...foo, ...bar, c: 3, ...baz };

  console.log(foobarbaz);
  // { a: 1, b: 2, c: 4 }
}
//? As with the rest operator, all copies performed are shallow:
{
  const foo = { a: 1 };
  const bar = { b: 2, c: { d: 3 } };

  const foobar = { ...foo, ...bar };

  console.log(foobar.c === bar.c); // true
}

console.log("*******PROMISE FINALLY() DEFINITION********");

{
  let resolveA, rejectB;

  function finalHandler() {
    console.log("finished");
  }

  function resolveHandler(val) {
    console.log("resolved");
    finalHandler();
  }

  function rejectHandler(err) {
    console.log("rejected");
    finalHandler();
  }

  new Promise((resolve, reject) => {
    resolveA = resolve;
    console.log("resolveA:: ", resolveA);
    console.log("resolve:: ", resolve);
  }).then(resolveHandler, rejectHandler);

  new Promise((resolve, reject) => {
    rejectB = reject;
    console.log("rejectB:: ", rejectB);
    console.log("reject:: ", reject);
  }).then(resolveHandler, rejectHandler);

  resolveA();
  //   rejectB();
  // resolved
  // finished
  // rejected
  // finished
}

//* With Promise.prototype.finally(), you are able to unify the shared handler.
//? The finally() handler is not passed any arguments and does not know if it is handling a resolved or rejected promise
{
  let resolveA, rejectB;
  function finalHandler() {
    console.log("finished");
  }

  function resolveHandler(val) {
    console.log("resolved");
  }

  function rejectHandler(err) {
    console.log("rejected");
  }

  new Promise((resolve, reject) => {
    resolveA = resolve;
  })
    .then(resolveHandler, rejectHandler)
    .finally(finalHandler);

  new Promise((resolve, reject) => {
    rejectB = reject;
  })
    .then(resolveHandler, rejectHandler)
    .finally(finalHandler);

  resolveA();
  rejectB();
  // resolved
  // rejected
  // finished
  // finished
  /*
  ? Cada finally() crea una nueva instancia de promesa, y estas nuevas promesas se agregan a la cola de microtareas del navegador y solo se resuelven después de que se resuelven las promesas del controlador anterior.
   */
}

console.log("*******REGULAR EXPRESSION ENHANCEMENTS*******");
//? dotAll Flag
{
  const text = `
    foo
    bar
    `;

  const re = /foo.bar/;
  console.log("TEST:: ", re.test(text));
}

//* This proposal introduces the “s” flag (standing for singleline), which corrects for this behavior:
{
  const text = `
foo
bar
`;

  const re = /foo.bar/s;

  console.log("TEST-s:: ", re.test(text)); // true
}

console.log("*******Lookbehind Assertions********");
{
  const text = "foobar";

  // Positive lookahead
  // Assert that a value follows, but do not capture
  const rePositiveMatch = /foo(?=bar)/;
  const rePositiveNoMatch = /foo(?=baz)/;

  console.log(rePositiveMatch.exec(text));
  // ["foo"]

  console.log(rePositiveNoMatch.exec(text));
  // null

  // Negative lookahead
  // Assert that a value does not follow, but do not capture
  const reNegativeNoMatch = /foo(?!bar)/;
  const reNegativeMatch = /foo(?!baz)/;

  console.log(reNegativeNoMatch.exec(text));
  // null

  console.log(reNegativeMatch.exec(text));
  // ["foo"]
}
/*
? The new proposal introduces the mirror image of these assertions, positive and negative lookbehinds.
? with the exception that they work to inspect content preceding the matched segment:
*/
{
  const text = "foobar";

  // Positive lookbehind
  // Assert that a value precedes, but do not capture
  const rePositiveMatch = /(?<=foo)bar/;
  const rePositiveNoMatch = /(?<=baz)bar/;

  console.log(rePositiveMatch.exec(text));
  // ["bar"]

  console.log(rePositiveNoMatch.exec(text));
  // null

  // Negative behind
  // Assert that a value does not precede, but do not capture
  const reNegativeNoMatch = /(?<!foo)bar/;
  const reNegativeMatch = /(?<!baz)bar/;

  console.log(reNegativeNoMatch.exec(text));
  // null

  console.log(reNegativeMatch.exec(text));
  // ["bar"]
}

console.log("*******Named Capture Groups*********");
{
  const text = "2018-03-14";

  const re = /(\d+)-(\d+)-(\d+)/;

  console.log(re.exec(text));
  //["2018-03-14", "2018", "03", "14"]
}
//? The proposal allows for associating a valid JavaScript identifier with a capture group that can then be retrieved from the groups property of the result:
{
  const text = "2018-03-14";
  const re = /(?<year>\2)-(?<month>\d+)-(?<day>\d+)/;
  console.log("->> ", re.exec(text).groups);
}

{
  const text = "2018-03-14";
  const re = /(?<year>\d+)-(?<month>\d+)-(?<day>\d+)/;
  console.log("--> ", re.exec(text).groups);
  // { year: "2018", month: "03", day: "14" }
}

{
  const pi = String.fromCharCode(0x03c0);

  console.log("PIII: ", pi);
  const linereturn = `
`;
  const reWhiteSpace = /\p{White_Space}/u;
  const reGreek = /\p{Script_Extensions=Greek}/u;
  const reNotWhiteSpace = /\P{White_Space}/u;
  const reNotGreek = /\P{Script_Extensions=Greek}/u;

  console.log(reWhiteSpace.test(pi));
  console.log(reWhiteSpace.test(linereturn));
  console.log(reNotWhiteSpace.test(pi));
  console.log(reNotWhiteSpace.test(linereturn));

  console.log(reGreek.test(pi));
  console.log(reGreek.test(linereturn));
  console.log(reNotGreek.test(pi));
  console.log(reNotGreek.test(linereturn));

  /*
   * \p{L} matches a single code point in the category "letter".
   * \p{N} matches any kind of numeric character in any script.
   */
}

console.log("*******ARRAY FLATTENING METHODS********");
/*
 * ECMAScript 2019 added two methods to the Array prototype, flat() and flatMap()
 * which make array flattening operations much easier

 ? flat() and flatMap() are strictly limited to flattening nested arrays.
? Nested iterable objects such as Map and Set will not be flattened.
 */
console.log("*******Array.prototype.flat()********");

{
  /*
     ? To address these use cases, the Array.prototype.flat() method was added

     ? This method accepts a depth argument (defaulting to a depth of 1) and returns a shallow copy of the Array instance flattened to the specified depth
      */

  const arr = [[0], 1, 2, [3, [4, 5]], 6];

  console.log(arr.flat(2));
  // [0, 1, 2, 3, 4, 5, 6]

  console.log(arr.flat());
  // [0, 1, 2, 3, [4, 5], 6]
}

{
  //? Because a shallow copy is performed, arrays with cycles will copy values from the source array when flattening:
  const arr = [[0], 1, 2, [3, [4, 5]], 6];
  arr.push(arr);

  console.log("****:: ", arr.flat());
  // [0, 1, 2, 3, 4, 5, 6, [0], 1, 2, [3, [4, 5]], 6]
}

console.log("*******Array.prototype.flatMap()********");
/*
? The Array.prototype.flatMap() method allows you to perform a map operation before flattening the array. arr.flatMap(f) is functionally equivalent to arr.map(f).flat(),
? but arr.flatMap() is more efficient since the browser only must perform a single traversal.
* The function signature of flatMap() is identical to map()
 */
{
  const arr = [[1], [3], [5]];

  console.log(arr.map(([x]) => [x, x + 1]));
  // [[1, 2], [3, 4], [5, 6]]

  console.log(arr.flatMap(([x]) => [x, x + 1]));
  // [1, 2, 3, 4, 5, 6]
}

//? flatMap() is especially useful in situations where a non-array object’s method returns an array, such as split().
{
  const arr = ["Lorem ipsum dolor sit amet,", "consectetur adipiscing elit."];

  console.log(arr.flatMap((x) => x.split(/[\W+]/)));
  // ["Lorem", "ipsum", "dolor", "sit", "amet", "", "consectetur", "adipiscing", "elit", ""]
}

//? A handy trick is to use an empty array to filter out results after a map
{
  setTimeout(() => {
    const arr = ["Lorem ipsum dolor sit amet,", "consectetur adipiscing elit."];

    console.log(
      ">> ",
      arr.flatMap((x) => x.split(/[\W+]/)).flatMap((x) => x || [])
    );
    // ["Lorem", "ipsum", "dolor", "sit", "amet", consectetur", "adipiscing", "elit"]
  }, 1000);
  //! This strategy is not recommended, as each value to be filtered requires
  //! construction of a new Array instance that is immediately discarded.
}

console.log("********OBJECT.FROMENTRIES()*******");
/*
* ECMAScript 2019 added a static method fromEntries() to the Object class which builds an object from a collection of key-value array pairs. 
? This method performs the opposite operation of Object.entries().
 */
{
  const obj = {
    foo: "bar",
    baz: "qux",
  };

  const objEntries = Object.entries(obj);

  console.log(objEntries);
  // [["foo", "bar"], ["baz", "qux"]]

  console.log(Object.fromEntries(objEntries));
  // { foo: "bar", baz: "qux" }
}

{
  setTimeout(() => {
    //? especially useful in cases where you wish to convert a Map instance to an Object instance
    const map = new Map().set("foo", "bar");

    console.log(Object.fromEntries(map));
    // { foo: "bar" }
  }, 1100);
}

console.log("********STRING TRIMMING METHODS********");
/*
*  allow for targeted whitespace removal.
?  trimStart() and trimEnd()
 */
{
  setTimeout(() => {
    let s = " foo  ";
    console.log(">>> ", s.trimStart()); // "foo  "
    console.log(">>> ", s.trimEnd()); // "  foo"

    console.log(">>> ", s.trim().padStart(9, "-")); // "foo  "
  }, 1200);
}

console.log("******SYMBOL.PROTOTYPE.DESCRIPTION*********");
{
  setTimeout(() => {
    const s = Symbol("foo");
    //? this was only available when the symbol was casted to a string
    console.log("++: ", s.toString());
    // Symbol(foo)

    //?
    const ss = Symbol("foo");
    console.log("++: ", ss.description);
    // foo
  }, 1300);
}

console.log("********OPTIONAL CATCH BINDING********");
{
  try {
    throw "foo";
  } catch (e) {
    // An error happened, but you don't care about the error object
  }

  //* In ES2019, you are now able to omit the error object assignment and simply ignore the error entirely:
  try {
    throw "foo";
  } catch {
    // An error happened, but you don't care about the error object
  }
}

