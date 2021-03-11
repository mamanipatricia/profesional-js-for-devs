console.log("********Error Handling and Debugging*******");
/*
 * Understanding browser error reporting
 * Handling errors
 * Debugging JavaScript code
 */

{
  try {
    global.someNonexistentFunction();
  } catch (error) {
    console.log(error.message);
  }
}

{
  function testFinally() {
    try {
      return 2;
    } catch (error) {
      return 1;
    } finally {
      return 0;
    }
  }
  console.log("try-catch-finally:: ", testFinally());

  //! However, the presence of the finally clause causes that return to be ignored; the function returns 0 when called no matter what
  //*  If the finally clause were removed, the function would return 2. If finally is provided, then catch becomes optional (only one or the other is required).
  //?  Be sure to double-check the intended behavior of your code when using finally.
}

/*
* ECMA-262 defines the following eight error types:

? Error
? InternalError
? EvalError
? RangeError
? ReferenceError
? SyntaxError
? TypeError
? URIError
 */

//* You can determine the type of error thrown in the catch portion of a try-catch statement by using the instanceof operator
{
  try {
    someFunction();
  } catch (error) {
    if (error instanceof TypeError) {
      // handle type error
    } else if (error instanceof ReferenceError) {
      // handle reference error
    } else {
      // handle all other error types
    }
  }
}

//? The try-catch statement allows you to implement your own error-handling mechanism for specific error types.

//* Throwing Errors
{
  //   throw 12345;
  //   throw "Hello world!";
  //   throw true;
  //   throw { name: "JavaScript" };
}

//* built-in error
{
  //   throw new Error("Something bad happened.");
  //   throw new SyntaxError("I don't like your syntax.");
  //   throw new InternalError("I can't do that, Dave.");
  //   throw new TypeError("What type of variable do you take me for?");
  //   throw new RangeError("Sorry, you just don't have the range.");
  //   throw new EvalError("That doesn't evaluate.");
  //   throw new URIError("Uri, is that you?");
  //   throw new ReferenceError("You didn't cite your references properly.");
}

//?  create custom error types by inheriting from Error
{
  class CustomError extends Error {
    constructor(message) {
      super(message);
      this.name = "CustomError";
      this.message = message;
    }
  }

  //   throw new CustomError("My message...!");
}

//* the following function will fail if the argument is not an array:
{
  function process(values) {
    values.sort();
    for (let value of values) {
      if (value > 100) {
        return value;
      }
    }
    return -1;
  }
  //   process("12233344");

  //? If this function is run with a string as the argument, the call to sort() fails
  /*
   * Internet Explorer—Property or method doesn’t exist.
   * Firefox— values.sort() is not a function.
   * Safari—Value undefined (result of expression values.sort ) is not an object.
   * Chrome—Object name has no method 'sort' .
   * Opera—Type mismatch (usually a non-object value used where an object is required).
   */
}

//*
{
  function process(values) {
    if (!(values instanceof Array)) {
      throw new Error("process(): Argument must be an array.");
    }

    values.sort();
    for (let value of values) {
      if (value > 100) {
        return value;
      }
    }
    return -1;
  }

  //   process("hola mundo..");
}

/*
* when to throw errors versus when to use try-catch to capture them??

? errors are thrown in the low levels of an application architecture, at a level where not much is known about the ongoing process,  and so the error can’t really be handled

! CATCH ERRORS: you should catch errors only if you know exactly what to do next.
! THROW ERRORS: the purpose of throwing an error is to provide information about why an error occurred.
 */

{
  window.onerror = (message, url, line) => {
    console.log(message);
    return false; //! prevent the default browser error reporting by returning false,
  };
  //! By returning false, this function effectively becomes a try-catch statement for the entire document
}

//*
// {
//   const image = new Image();

//   image.addEventListener("load", (event) => {
//     console.log("Image loaded!");
//   });

//   image.addEventListener("error", (event) => {
//     console.log("Image not loaded!");
//   });

//   image.src = "doesnotexist.gif"; // does not exist, resoure will fail to load
// }
//...
//! As the developer, you should have a good understanding of when and how the code could fail and have a system to track such issues.

//* Identify Where Errors Might Occur
/*
*  there are three error categories to watch for:
? Type coercion errors
? Data type errors
? Communication errors
 */

console.log("------Type Coercion Errors --------");
/*
* Type coercion errors occur as the result of
? using an operator or other language construct that automatically changes the data type of a value.

* The two most common type coercion errors occur as a result of using the
!  equal (==) or not equal (!=) operator
!  and using a non-Boolean value in a flow control statement, such as if, for, and while.

? In most cases, it’s best to use the identically equal (===) and not identically equal (!==) operators to avoid type coercion

 */

{
  console.log(5 == "5"); //   true;
  console.log(5 === "5"); //   false;
  console.log(1 == true); //   true;
  console.log(1 === true); //   false;
  //? The identically equal operator
  //?  not equal using the identically equal operator.
}

//* Type coercion errors also occur in flow control statements.
{
  function concat(str1, str2, str3) {
    let result = str1 + str2;
    if (str3) {
      //! avoid!!!
      result += str3;
    }
    return result;
  }
  //TODO IMPORTANT!! - If the third argument is the number 0, for example, the if condition fails, while a value of 1 causes the condition to pass.
  //? To avoid such errors, always make sure that a Boolean value is passed as the condition
}
//* rewritten
{
  function concat(str1, str2, str3) {
    let result = str1 + str2;
    if (typeof str3 === "string") {
      //! proper comparison
      result += str3;
    }
    return result;
  }
  //! This function is much safer and is less affected by incorrect values.
}

console.log("------Data Type Errors------");
/*
 * Data type errors most often occur as a result of unexpected values being passed into a function

 ? 
 */
{
  //? The purpose of this function is to return the query string of a given URL

  //* unsafe function, any non-string value causes an error
  function getQueryString(url) {
    const pos = url.indexOf("?");
    if (pos > -1) {
      return url.substring(pos + 1);
    }
    return "";
  }
}

//* rewritten
{
  function getQueryString(url) {
    if (typeof url === "string") {
      // safer with type check
      let pos = url.indexOf("?");
      if (pos > -1) {
        return url.substring(pos + 1);
      }
    }
    return "";
  }
}

//*  using non-Boolean values as conditions for flow control statements is a bad idea because of type coercion. This is also a bad practice that can cause data type errors
{
  // unsafe function, non-array values cause an error
  function reverseSort(values) {
    if (values) {
      // avoid!!!
      values.sort();
      values.reverse();
    }
  }

  //------------------
  // still unsafe, non-array values cause an error
  function reverseSort(values) {
    if (values != null) {
      // avoid!!!
      values.sort();
      values.reverse();
    }
  }
  //------------------
  // still unsafe, non-array values cause an error
  function reverseSort(values) {
    if (typeof values.sort === "function") {
      //! avoid!!!
      values.sort();
      values.reverse();
    }
  }

  //------------------
  //* safe, non-array values are ignored
  function reverseSort(values) {
    if (values instanceof Array) {
      //! fixed
      values.sort();
      values.reverse();
    }
  }
  //?  When you know the exact type of object that is expected, it’s best to use instanceof
  //! reverseSort() is safe—it tests the values argument to see if it’s an instance of Array
}

/*
 *  values that should be primitive types should be checked using typeof
 *  and values that should be objects should be checked using instanceof.
 */

console.log("--------Communication Errors--------");
/*
*  The first type of communication error involves malformed URLs or post data. This typically occurs when data isn’t encoded using encodeURIComponent() before being sent to the server
? http://www.yourdomain.com/?redir=http://www.someotherdomain.com?a=b&c=d

* This URL can be fixed by using encodeURIComponent() on everything after "redir="
? http://www.example.com/?redir=http%3A%2F%2Fwww.someotherdomain.com%3Fa%3Db%26c%3Dd
*/

//* the encodeURIComponent() method should always be used for query string arguments.
{
  function addQueryStringArg(url, name, value) {
    if (url.indexOf("?") == -1) {
      url += "?";
    } else {
      url += "&";
    }
    url += `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    return url;
  }

  const url = "http://www.somedomain.com";
  const newUrl = addQueryStringArg(
    url,
    "redir",
    "http://www.someotherdomain.com?a=b&c=d"
  );
  console.log(newUrl);
}

console.log("-----Distinguishing between Fatal and Nonfatal Errors---------");

//* clean up our legacy

/*
? One or more of the following identifies a nonfatal error
* It won’t interfere with the user’s main tasks.
* It affects only a portion of the page.
* Recovery is possible.
* Repeating the action may result in success.
 */

/*
 ?  consider a personalized home page, such as Gmail (https://mail.google.com), that has multiple independent modules on the page. If each module has to be initialized using a Java­ Script call, you may see code that looks something like this:
  */
{
  let mods = []; // just for testing
  for (let mod of mods) {
    mod.init(); // possible fatal error
  }
}

//* the code can be rewritten as follows to make an error in any one module nonfatal:
{
  let mods = []; // just for testing

  for (let mod of mods) {
    try {
      mod.init();
    } catch (ex) {
      // handle error here
    }
  }
  /*
  ? By adding a try-catch statement into the for loop, any error when a module initializes will not prevent other modules from initializing. When an error occurs in this code, it can be handled independently and in a way that doesn’t interfere with the user experience.
   */
}

//* Log Errors to the Server
{
  function logError(sev, msg) {
    let img = new Image(),
      encodedSev = encodeURIComponent(sev),
      encodedMsg = encodeURIComponent(msg);
    img.src = "log.php?sev=${encodedSev}&msg=${encodedMsg}";
  }
  let mods = [];
  for (let mod of mods) {
    try {
      mod.init();
    } catch (error) {
      logError(`nonFatal", "Module init failed: ${ex.message}`);
    }
  }
}

//* Logging Messages to a Console
{
  function sum(num1, num2) {
    console.log(`Entering sum(), arguments are ${num1},${num2}`);
    console.log("Before calculation");
    const result = num1 + num2;
    console.log("After calculation");

    console.log("Exiting sum()");
    return result;
  }
  sum(2, 4);
}

/*
*  In the Element tab inside the developer tools, when you click a node in the DOM tree, you gain a reference to the JavaScript instance of that node inside the Console tab by using $0.

*  It behaves as a normal JavaScript instance, so reading properties such as $0.scrollWidth and invoking member methods such as $0.remove() are allowed.

*/

console.log("------Using the JavaScript Debugger---------");
/*
 *  debugger keyword will attempt to invoke any available debugging functionality. If there is no associated behavior, this statement will be silently skipped as a no-op
 */
{
  function pauseExecution() {
    console.log("Will print before breakpoint");
    // debugger;
    console.log("Will not print until breakpoint continues");
  }

  pauseExecution();
}

//* In this new version of log(), the code first checks to see if the debugging element already exists.
{
  function log(message) {
    // Lexical scope of this function will use the following instance
    // instead of window.console
    // const console = document.getElementById("debuginfo");
    // console.log("----->>", console);
    if (console === null) {
      console = document.createElement("div");
      console.id = "debuginfo";
      console.style.background = "#dedede";
      console.style.border = "1px solid silver";
      console.style.padding = "5px";
      console.style.width = "400px";
      console.style.position = "absolute";
      console.style.right = "0px";
      console.style.top = "0px";
      document.body.appendChild(console);
    }
    console.innerHTML += "<p> ${message}</p>";
  }

  log();
}

console.log("---------Shimming Console Methods--------");
{
  // Join all arguments into string and alert the result
  console.log = function () {
    // 'arguments' does not have a join method, first convert arguments to array
    // const args = Array.prototype.slice.call(arguments);
    // console.log(args.join(", "));
    /* MY ERROR :o
    Maximum call stack size exceeded
    at Arguments.slice (<anonymous>)
    at console.log (indexCap21.js:460)
    at console.log (indexCap21.js:461)
    at console.log (indexCap21.js:461)
    at console.log (indexCap21.js:461)
    at console.log (indexCap21.js:461)
    at console.log (indexCap21.js:461)
    at console.log (indexCap21.js:461)
    at console.log (indexCap21.js:461)
    at console.log (indexCap21.js:461) */
  };
}

console.log("-----Throwing Errors-------");

{
  function divide(num1, num2) {
    return num1 / num2;
  }

  function divide(num1, num2) {
    if (typeof num1 != "number" || typeof num2 != "number") {
      throw new Error("divide(): Both arguments must be numbers.");
    }
    return num1 / num2;
  }

  divide(1, 2);
}

//! In large applications, custom errors are typically thrown using an assert() function
{
  function assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  function divide(num1, num2) {
    assert(
      typeof num1 == "number" && typeof num2 == "number",
      "divide(): Both arguments must be numbers."
    );
    return num1 / num2;
  }
}

//*  all DOM objects in Internet Explorer are implemented as COM objects rather than in native JavaScript

/*
* Unknown Runtime Error
?  if a block element is being inserted into an inline element
? or you’re accessing either property on any part of a table (<table>, <tbody>, and so on)
*/

// DEVOPS yamil ~> pelado nerd - nana youtubers
{
  // so the following code will cause an unknown runtime error
  // p.innerHTML = "<div>Hi</div>"; // where p contains a <p> element
}

console.log("-----Syntax Error---------");

{
  //* This error occurs when JavaScript is used to request a resource by URL and the URL is longer than Internet Explorer’s maximum URL length of 2083 characters.
  function createLongUrl(url) {
    var s = "?";
    for (var i = 0, len = 2500; i < len; i++) {
      s += "a";
    }
    return url + s;
  }
  var x = new XMLHttpRequest();
  x.open("get", createLongUrl("http://www.somedomain.com/"), true);
  x.send(null);
  /*
  ? One workaround for this type of error is to shorten the query string necessary for the request to succeed
  ? Another workaround is to change the request to a POST and send the data as the request body instead of in the query string
   */
}

