console.log("******Best Practices*****");
/*
 * ➤➤ Writing maintainable code
 * ➤➤ Ensuring code performance
 * ➤➤ Deploying code to production
 */

console.log("*****MAINTAINABILITY*****");
/*
? Writing maintainable code is important because most developers spend a large amount of their time maintaining other people’s code
 */

//* What Is Maintainable Code?
/*
 * UNDERSTANDABLE — Someone else can pick up the code and figure out its purpose and general approach without a walk-through by the original developer.
 * INTUITIVE — Things in the code just seem to make sense, no matter how complex the operation.
 *  ADAPTABLE — The code is written in such a way that variation in data doesn’t require a complete rewrite.
 * EXTENDABLE — Care has been given in the code architecture to allow extension of the core functionality in the future.
 * DEBUGGABLE — When something goes wrong, the code gives you enough information to identify the issue as directly as possible.
 */

console.log("------Avoid Double Interpretation-------");
{
  // evaluate some code - AVOID!!
  eval("console.log('Hello world!')");

  // create a new function - AVOID!!
  let sayHi = new Function("console.log('Hello world!')");

  // set a timeout - AVOID!!
//   setTimeout("console.log('Hello world!')", 500);
}
/*
* a new parser has to be started while the JavaScript code is running to parse the new code.
? Instantiating a new  parser has considerable overhead,
* the code runs slower than if it were included natively.
*/
//? There are workarounds for all of these instances
{
  //fixed
  console.log("Hello World");

  //create a new function - fixed
  let sayHi = function () {
    console.log("Hello World");
  };

  //set a timeout - fixed
  setTimeout(() => {
    console.log("Hello world");
  }, 500);
}

