console.log("*********** Promises and Async Functions ************");
/*
➤➤ Introduction to Asynchronous Programming
➤➤ Promises
➤➤  Async Functions

*/

/*
ECMAScript 6 introduces a formal Promise reference type, allowing for elegant definition and organization of asynchronous behavior. Later editions also extended the language to support asynchronous functions with the async and await keywords.
 */
// console.log('window', window)

// alert("holaaaaaaaaaa")

/*  If it is feasible to run other instructions while a computation is completing and still maintain a stable system, then it is pragmatic to do so.
 */

//* ASYNCHRONOUS OPERATION se puede usar en cualquier lugar donde no tenga sentido bloquear un hilo de ejecución para esperar a que ocurra el comportamiento asincrónico.

console.log("******** Synchronous vs. Asynchronous JavaScript **********");
//* Synchronous behavior is analogous to sequential processor instructions in memory
{
  let x = 3;
  x = x + 4;
} //* asynchronous behavior is analogous to interrupts
/*This long wait might occur because the code is accessing a high-latency
resource, such as sending a request to a remote server and awaiting a response.
 */
// example:::::  sending a request to a remote server and awaiting a response.

// {
//   let x = 3;
//   setTimeout(() => (x = x + 4), 1000);
//   console.log(x);
// }

console.log("******Legacy Asynchronous Programming Patterns ********");

/*El comportamiento asincrónico ha sido durante mucho tiempo una piedra angular importante pero fea de JavaScript */

//*
{
  function double(value) {
    setTimeout(() => setTimeout(console.log, 0, value * 2), 1000);
    // setTimeout(() => setTimeout(window.alert, 0, value * 2), 1000);
  }

  double(4);
  // 6 (printed after roughly 1000ms    )
}

//*  This callback is dequeued and executed in a manner that is totally invisible to JavaScript code --- AND --- double() function exits immediately after the setTimeout scheduling operation is isuccessful.

console.log("****** Returning Asynchronous Values********");

//* RETURNING A USEFUL VALUE ASYNCHRONOUSLY
{
  function double(value, callback) {
    setTimeout(() => callback(value * 2, value * 10), 1000);
    // setTimeout(() => callback(value * 2), 1000);
  }
  function updateName(value, callback) {
    setTimeout(() => callback("other name", value), 1000);
    // setTimeout(() => callback(value * 2), 1000);
  }
  function updateAge(value, callback) {
    setTimeout(() => callback("other age", value), 1000);
    // setTimeout(() => callback(value * 2), 1000);
  }

  double(3, test);

  updateName("PAttt", updateInfo);
  updateAge(27, updateInfo);

  let o = {};
  function updateInfo(key, value) {
    console.log(key, value);
    o[key] = value;

    console.log(o);
  }
  console.log("-----");

  function test(x, total) {
    console.log(`I was given: ${x} of ${total}`);
  }
  // double(3, function test (x, total){ console.log(`I was given: ${x} of ${total}`)});
}
console.log("************ handling failure **********");
//*  incorporated into this callback model -  success and failure callback:

{
  function double(value, success, failure) {
    setTimeout(() => {
      try {
        if (typeof value !== "number") {
          throw "YOU MUST PROVIDE NUMBER AS FIRST ARGUMENT";
        }
        success(2 * value);
      } catch (e) {
        failure(e);
      }
    });
  }

  const successCallback = (x) => console.log(`Success: ${x}`);
  const failureCallback = (x) => console.log(`Failure: ${x}`);

  double(3, successCallback, failureCallback);
  double("b", successCallback, failureCallback);
}
//! This format is already undesirable, as the callbacks must be defined when the asynchronous operation is initialized.

console.log("******** Nesting Asynchronous Callbacks *********");
//* In the world of callbacks, this necessitates nesting the callback

{
  function double(value, success, failure) {
    setTimeout(() => {
      try {
        if (typeof value !== "number") {
          throw "Must provide number as fist argument...";
        }
        success(2 * value);
      } catch (e) {
        failure(e);
      }
    }, 1000);
  }

  const successCallback = (x) => {
    double(
      x,
      (y) => console.log(`Successsss: ${y}`),
      () => {}
    );
  };

  const failureCallback = (e) => console.log(`Failureeeee: ${e}`);

  double(3, successCallback, failureCallback);
  //Success: 12 (printed after roughly 1000ms)

  double("3", successCallback, failureCallback);
}

//* callback hell - s JavaScript codebases that were afflicted with such a structure became nearly unmaintainable

console.log("*********** PROMISES *********");

/*
  let p = new Promise(() => {});
 
  setTimeout(console.log, 0, p); // promise <pending>
   */

// If an executor function is not provided, a SyntaxError will be thrown.

//* The promise state machine
/*
 * pending
 * fulfilled  (sometimes also referred to as resolved)
 * rejected
 */
/*
1. pending state is the initial state a promise begins in
2. fulfilled state to indicate success
3. rejected state to indicate failure.

* the state of a promise is private and cannot be directly inspected in JavaScript
*  the state of a promise cannot be mutated by external JavaScript. 
*/

console.log(" ******Controlling Promise State with the Executor****** ");
{
  let p1 = new Promise((resolve, reject) => resolve());
  console.log("------> ", p1);
  setTimeout(console.log, 0, p1); // promise <resolved>

  let p2 = new Promise((resolve, reject) => reject("124324123434"));
  setTimeout(console.log, 0, p2); // Promise <rejected>
  //uncaught error (in promise)
}

// the executor function will execute synchronously, as it acts as the initializer for the promise. This order of execu- tion is demonstrated here
{
  new Promise(() => setTimeout(console.log, 0, "executor"));

  setTimeout(console.log, 0, "promise initialized");

  // executor
  // promise initialized
}

//! EXAMPLES
// You can delay the state transition by adding a setTimeout:
let p = new Promise((resolve, reject) => setTimeout(resolve, 1000));

//when this console.log executes, the timeout callback has not yet executed
setTimeout(
  console.log,
  0,
  new Promise((resolve, reject) => setTimeout(resolve, 1000))
); // Promise <pending>

//* Once either resolve or reject is invoked, the state transition cannot be undone. Attempts to further mutate the state will silently be ignored
{
  let p = new Promise((resolve, reject) => {
    resolve();
    reject(); // no effect
  });

  setTimeout(console.log, 0, p); // promise <resolved>
}

console.log("********* Promise Casting with Promise.resolve() **********");

let p1 = new Promise((resolve, reject) => resolve());
let p2 = Promise.resolve();

console.log("000000000-> ", p1, p2);

{
  console.log("-----------------------");
  setTimeout(console.log, 1100, Promise.resolve());
  // Promise <resolved>: undefined
  setTimeout(console.log, 1100, Promise.resolve(3));
  // Promise <resolved>: 3
  // Additional arguments are ignored
  setTimeout(console.log, 1100, Promise.resolve(4, 5, 6));
  // Promise <resolved>: 4
  console.log("-----------------------");
}
{
  let p = new Promise(() => {});
  setTimeout(console.log, 0, p);
  // Promise <pending>
  setTimeout(console.log, 0, Promise.resolve(p));
  // Promise <pending>
  setTimeout(console.log, 0, p === Promise.resolve(p));
  // true
}
{
  console.log("----->>>> ", Promise.resolve(Promise.resolve("4334")));
  console.log("----->>>> ", Promise.resolve(7));
}

{
  // let p = Promise.resolve(new Error("foo"));
  // setTimeout(console.log, 2000, p);
  // Promise <resolved>: Error: foo
}

console.log("------Promise Rejection with Promise.reject() --------");
{
  let p1 = new Promise((resolve, reject) => reject("*-*--*-*-*-*"));
  let p2 = Promise.reject();
  console.log(p1, p2);
}

//* The ‘reason’ field of this resolved promise will be the first argument passed to Promise.reject()
{
  let p = Promise.reject(3);
  setTimeout(console.log, 0, p); // Promise <rejected>: 3

  p.then(null, (e) => setTimeout(console.log, 0, e)); // 3
}

{
  setTimeout(
    console.log,
    3000,
    Promise.resolve(Promise.resolve(Promise.resolve(7)))
  );
  //
}

console.log("-------- Synchronous/Asynchronous Execution Duality ---------");

{
  try {
    throw new Error("foo");
  } catch (error) {
    console.log(error); // Error: foo
  }

  // ***

  try {
    Promise.reject(new Error("bar"));
  } catch (error) {
    console.log(error);
  }
}

console.log("------- Promise Instance Methods -----------");

// THENABLE
//*

{
  function onResolved(id) {
    setTimeout(console.log, 0, id, "resolveddddd");
  }
  function onRejected(id) {
    setTimeout(console.log, 0, id, "rejecteddddddd");
  }

  let p1 = new Promise((resolve, reject) => setTimeout(resolve, 3000));
  let p2 = new Promise((resolve, reject) => setTimeout(reject, 3000));

  p1.then(
    () => onResolved("p11"),
    () => onRejected("p12")
  );
  p2.then(
    () => onResolved("p21"),
    () => onRejected("p22")
  );
}

{
  let p1 = Promise.resolve("foo");
  // Calling then() with no handler function acts as a passthrough
  let p2 = p1.then();

  setTimeout(console.log, 3200, p2);
  // Promise <resolved>: foo
  // These are equivalent
  console.log(">>> ", p1);
  console.log(">>> ", p2);
  let p3 = p1.then(() => undefined);
  let p4 = p1.then(() => {});
  let p5 = p1.then(() => Promise.resolve());

  setTimeout(console.log, 3100, p3);
  setTimeout(console.log, 3100, p4);
  setTimeout(console.log, 3100, p5);
}

{
  let p11 = p1.then(() => Error("qux"));
  setTimeout(console.log, 3300, p11);
  // Promise <resolved>: Error: qux
}

console.log("--------- Promise.prototype.catch() ---------");

//....

console.log("******* Resolved Value and Rejected Reason Passing *********");

//* RESOLVED VALUES and  REJECTED REASONS

{
  let p1 = new Promise((resolve, reject) => resolve("fooo"));
  p1.then((value) => console.log(value)); // foo

  let p2 = new Promise((resolve, reject) => reject(bar));
  p2.catch((reason) => console.log("reason:::: ", reason)); // bar

  (async () => {
    let t = await Promise.all([p1, p1]);
    setTimeout(() => {
      console.log("%%%%%%%%%%%%%%%%%", t);
    }, 4000);
  })();
}

{
  let p1 = Promise.resolve("foo");
  p1.then((value) => console.log(value)); //foo

  let p2 = Promise.reject("bar");
  p2.catch((reason) => console.log(reason)); //bar
}

console.log("******* Rejecting Promises and Rejection Error Handling *******");
//* rejecting a promise is analogous to a throw expression

{
  let p1 = new Promise((resolve, reject) => reject(Error("foo")));
  let p2 = new Promise((resolve, reject) => {
    throw Error("foo");
  });

  let p3 = Promise.resolve().then(() => {
    throw Error("foo");
  });

  let p4 = Promise.reject(Error("foo"));

  setTimeout(console.log, 0, p1); // Promise <rejected>: Error:foo
  setTimeout(console.log, 0, p2); // Promise <rejected>: Error:foo
  setTimeout(console.log, 0, p3); // Promise <rejected>: Error:foo
  setTimeout(console.log, 0, p4); // Promise <rejected>: Error:foo
}

//* All errors are asynchronously thrown and unhandled
//* The Promise.resolve().then() error executes last because it requires an additional entry on the runtime’s message queue because it is creating one additional promise prior to ultimately throwing the uncaught error.

//* when  using the throw keyword,  will decline to execute any instructions following the thrown error

{
  setTimeout(() => {
    let aa = Promise.reject(Error("foo"));
    console.log("*-*-*-*-*-::: ", aa);
    console.log("bar");
    // bar

    // Uncaught (in promise) Error: foo
  }, 4000);
}

//*  Promise.reject(), an asynchronous error can be caught only with an asynchronous onRejection handler.

{
  setTimeout(() => {
    // correct
    Promise.reject("foo").catch((e) => {
      console.log("turtrturturuturuturutu", e);
    });
  }, 4100);

  try {
    Promise.reject(Error("foo"));
  } catch (e) {}
}

{
  let p = new Promise((resolve, reject) => {
    try {
      throw Error("foo");
    } catch (e) {}
    resolve("bar");
  });

  setTimeout(console.log, 0, p); // Promise <resolved>: bar
}

//* comparacion sincrona-sincrona
{
  console.log("begin synchronous execution");
  try {
    throw Error("foo");
  } catch (e) {
    console.log("caught error", e);
  }
  console.log("continue synchronous execution");
  // begin synchronous execution
  // caught error Error: foo
  // continue synchronous execution

  new Promise((resolve, reject) => {
    console.log("begin asynchronous execution");
    reject(Error("bar"));
  })
    // then returns (res or reject)
    .catch((e) => {
      console.log("caught error", e);
    })
    // then returns (res or reject)
    .then(() => {
      console.log("continue asynchronous execution");
    });

  // begin asynchronous execution
  // caught error Error: bar
  // continue asynchronous execution
}

console.log("*******Promise Chaining and Composition *********");

/*
 * CODE PATTERNS:
 * Promise Chaining and Composition:  sequencing multiple promises
 * promise composition: combining multiple promises into a single promise
 */

console.log("*********Promise Chaining***********");

//! then(), catch(), and finally()—returns a separate promise instance which in turn can have another instance method called upon it

{
  setTimeout(() => {
    let p = new Promise((resolve, reject) => {
      console.log("first");
      resolve();
    });

    p.then(() => console.log("second"))
      .then(() => console.log("third"))
      .then(() => console.log("fourth"));
  }, 4200);
}

//* Multiple promises in series that resolve after a timeout
{
  setTimeout(() => {
    let p1 = new Promise((resolve, reject) => {
      console.log("p1 executor");
      setTimeout(resolve, 1000);
    });

    p1.then(
      () =>
        new Promise((resolve, reject) => {
          console.log("p2 executor");
          setTimeout(resolve, 1800, "teeeeeeeeest");
          resolve("testetset");
        })
    )
      .then(
        (fromSecond) =>
          new Promise((resolve, reject) => {
            console.log("p3 executor", fromSecond);
            setTimeout(resolve, 2600, "xxxxx", "turururut");
          })
      )
      .then(
        (xx, tutu) =>
          new Promise((resolve, reject) => {
            console.log("p4 executor", tutu, xx);
            setTimeout(resolve, 1400);
          })
      );
  }, 4300);

  // BY RULE RESOLVE EXPECT ONE ARG
}

//
{
  setTimeout(() => {
    function delayedResolve(str) {
      return new Promise((resolve, reject) => {
        console.log("**************>", str);
        setTimeout(resolve, 1000);
      }); // it returns a new promise <fulfilled>state
    }
    function delayedRejected(str) {
      return new Promise((resolve, reject) => {
        console.log("-------------->", str);
        setTimeout(reject, 1000); // it returns a new promise <rejected>state
      });
    }
    delayedResolve("p111 executor")
      .then(() => delayedResolve("p222 executor"))
      .then(() => delayedRejected("p333 executor")) // keep in mind this line, 'cause this is rejected state and above this is caught with catch methods
      .catch(() => delayedResolve("p444 executor"));
  }, 6500);
}

//! NO USAR FOR PRODUCTION XD... Without the use of promises, the preceding code would look something like this
{
  function delayedExecute(str, callback = null) {
    setTimeout(() => {
      console.log(str);
      callback && callback();
    }, 1000);
  }

  delayedExecute("p1* callback", () => {
    delayedExecute("p2* callback", () => {
      delayedExecute("p3* callback", () => {
        delayedExecute("p4* callback");
      });
    });
  });
}

//* Because then(), catch(), and finally() all return a promise,
{
  setTimeout(() => {
    let p = new Promise((resolve, reject) => {
      console.log("initial promise reject");
      reject();
    });

    p.catch(() => console.log("reject handler"))
      .then(() => console.log("resolve handler"))
      .finally(() => console.log("finally handler"));
  }, 7600);
}

console.log("*******Promise Graphs**********");
{
  let A = new Promise((resolve, reject) => {
    console.log("A");
    resolve();
  });
  let B = A.then(() => console.log("B"));
  let C = A.then(() => console.log("C"));
  B.then(() => console.log("D"));
  B.then(() => console.log("E"));
  C.then(() => console.log("F"));
  C.then(() => console.log("G"));
}
//* directed acyclic graph is the most accurate characterization of the universe of promise chaining possibilities.

console.log(
  "****Parallel Promise Composition with Promise.all() and Promise.race()****"
);

//* The Promise class provides two static methods: all() , race()
/* The Promise.all() static method creates an all-or-nothing promise that resolves only once every
promise in a collection of promises resolves. The static method accepts an iterable and returns a
new promise:
 */

{
  setTimeout(() => {
    let p1 = Promise.all([Promise.resolve("test"), Promise.reject("test1")]);
    setTimeout(console.log, 1000, p1, "<><><><><><><><><><><>P1");
    let p2 = Promise.all([3, 4]);
    // let p2 = Promise.all([Promise.resolve(3), Promise.resolve(4)]); // the same as above
    setTimeout(console.log, 1000, p2, "<><><><><><><><><><><>P2");

    let p3 = Promise.all([]);
    setTimeout(console.log, 1000, p3, "<><><><><><><><><><><>P3");

    let p4 = Promise.all();
    setTimeout(console.log, 1000, p4, "<><><><><><><><><><><>P4");
    // TypeError: cannot read Symbol.iterator of undefined
  }, 6700);
}

//* The composed promise will only resolve once every contained promise is resolved:

{
  setTimeout(() => {
    let p = Promise.all([
      Promise.resolve(),
      new Promise((resolve, reject) =>
        setTimeout(resolve, 1000, "@@@@@@@@@@ ")
      ),
    ]);

    setTimeout(console.log, 0, p, "[][][][][][][][][]"); //Promise <pending>

    p.then(() => setTimeout(console.log, 0, "all() resolved"));

    p.then(() => setTimeout(console.log, 0, "all() RESOLVED!!!!!!!!"));
  }, 6800);
}

//* If at least one contained promise remains pending, the composed promise also will remain pending. If one contained promise rejects, the composed promise will reject:
{
  setTimeout(() => {
    // will forever remain pending
    let p1 = Promise.all([new Promise(() => {})]);
    setTimeout(console.log, 0, p1); // promise <pending>

    //Single rejection causes rejection of composed promise
    let p2 = Promise.all([
      new Promise((resolve, reject) => {
        console.log("%########   ########");
        resolve("whatever...");
      }),
      Promise.resolve(),
      Promise.reject(),
      Promise.resolve(),
      new Promise((resolve, reject) => {
        console.log("%%%%%%%%   %%%%%%%");
        resolve("whatever...");
      }),
    ]);

    setTimeout(console.log, 1200, p2, ":):):):):):):):)::):)"); // Promise <rejected>

    //uncaught (in promise) undefined
  }, 7000);
}

//* If one of the promises rejects, whichever is the first to reject will set the rejection reason for the composed promise

{
  let p = Promise.all([
    Promise.reject((resolve, reject) => setTimeout(reject, 1000)),
  ]);

  p.catch((reason) => setTimeout(console.log, 0, reason)); //3

  // no unhandled
}

console.log("**********Promise.race() ***********");
/* The Promise.race() static method creates a promise that will mirror whichever promise inside a
collection of promises reaches a resolved or rejected state first. The static method accepts an iterable
and returns a new promise:
 */
//! EXAMPLE: https://www.codota.com/code/javascript/functions/builtins/PromiseConstructor/race
{
  setTimeout(() => {
    let p1 = Promise.race([Promise.resolve(), Promise.resolve()]);

    //Elements in the iterable are coerced into a promise using Promise.resolve()
    let p2 = Promise.race([3, 4]);

    // empty iterable is equivalent to new Promise(()=>{})
    let p3 = Promise.race([]);

    //invalid syntax
    let p4 = Promise.race();
    //TypeError: cannot read Symbol.iterator of undefined
  }, 7000);
}

//* resolve occurs first, reject in timeout ignored
{
  setTimeout(() => {
    let p1 = Promise.race([
      Promise.resolve(3),
      new Promise((resolve, reject) => setTimeout(reject, 1000)),
    ]);

    setTimeout(console.log, 0, p1); // Promise <resolved>

    //reject occurs first, resolve in timeout ignored
    let p2 = Promise.race([
      Promise.reject(4),
      new Promise((resolve, reject) => setTimeout(resolve, 1000)),
    ]);

    setTimeout(console.log, 0, p2); // promise <rejected>: 4

    //Iterator order is the tiebreaker for settling order
    let p3 = Promise.race([
      Promise.resolve(5),
      Promise.resolve(6),
      Promise.resolve(7),
    ]);

    setTimeout(console.log, 0, p3);
  }, 7100);
}

console.log("**********Serial Promise Composition*************");
//function composition
{
  setTimeout(() => {
    function addTwo(x) {
      return x + 2;
    }
    function addThree(x) {
      return x + 3;
    }
    function addFive(x) {
      return x + 5;
    }
    function addTen(x) {
      return Promise.resolve(x).then(addTwo).then(addThree).then(addFive);
    }
    addTen(8).then(console.log);
    // 18
  }, 7200);
}

{
  setTimeout(() => {
    function addTwo(x) {
      return x + 2;
    }
    function addThree(x) {
      return x + 3;
    }
    function addFive(x) {
      return x + 5;
    }
    function compose(...fns) {
      return (x) =>
        fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(x));
    }
    let addTen = compose(addTwo, addThree, addFive);
    addTen(8).then(myLog);
    // addTen(8).then((value) => myLog(value));
    // addTen(8).then((value) => console.log(value, "===================::"));
    // 18

    function myLog(v) {
      console.log("============****", v);
    }
  }, 8000);
}

console.log("**********Promise extension**********");

//* Promise Cancelling
/*
 * BLuebird: (The ability to cancel a promise) A promise will be in progress but the program will no longer care about the result
 */

//* A basic implementation of a CancelToken
/*
{
  class CancelToken {
    constructor(cancelFn) {
      this.promise = new Promise((resolve, reject) => {
        cancelFn(resolve);
      });
    }
  }

  // a rough example
  
  let html = `<button id="start">Start</button>
   <button id="cancel">Cancel</button>`;

  class CancelToken {
    constructor(cancelFn) {
      this.promise = new Promise((resolve, rejetc) => {
        cancelFn(() => {
          setTimeout(console.log, 0, "delay cancelled");
        });
      });
    }
  }

  const startButton = document.querySelector("#start");
  const cancelButton = document.querySelector("#cancel");

  function cancellableDelayedResolve(delay) {
    setTimeout(console.log, 0, "set delay");
    return new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        setTimeout(console.log, 0, "delayed resolve");
        resolve();
      }, delay);
      const cancelToken = new CancelToken((cancelCallback) =>
        cancelButton.addEventListener("click", cancelCallback)
      );
      cancelToken.promise.then(() => clearTimeout(id));
    });
  }

  startButton.addEventListener("click", () => cancellableDelayedResolve(100));
}
*/
console.log("******Promise Progress Notifications**********");

console.log("***********ASYNC FUNCTIONS************");

//* operative keyword pair “async/await,”

//* The simplest example of this begins with a simple promise, which resolves with a value after a timeout:

{
  setTimeout(() => {
    let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 333));
    p.then((x) => console.log(x)); // 3
    p.then((x) => console.log(x)); // 3
  }, 8000);
}

{
  function handler(x) {
    console.log(x);
  }

  let p = new Promise((resolve, reject) => setTimeout(resolve, 100, 3));

  p.then(handler); //3
}

console.log("*********Async Function Basics*********");
//* the async keyword can be used on function declarations, function expression, arrow functions, and methods

{
  async function foo() {}

  let bar = async function () {};

  let baz = async function () {};

  class Qux {
    async qux() {}
  }
}

//* example: which shows the foo() function is still evaluated before proceeding to subsequent instructions
{
  setTimeout(() => {
    async function foo() {
      console.log("1:: ", 1);
    }

    foo();
    console.log(2, "*****");
  }, 8200);
}

/* whatever value is returned with the return keyword (or undefined if there is
no return) will be effectively converted into a promise object with Promise.resolve(). An async
function will always return a promise object. Outside the function, the evaluated function will be this promise object */

{
  setTimeout(() => {
    async function foo() {
      console.log("*-*-*-*-*:: ", 1);
      return 3;
    }

    //attach a resolved handler to the returned promise
    foo().then(console.log);

    console.log(2, "***-***");
    console.log(21, "***-***");
    console.log(22, "***-***");
  }, 8200);
  // 1
  //2
  //21
  //22
  //3
}

// the same as above

{
  setTimeout(() => {
    async function foo() {
      console.log(1, "+++++++");
      return Promise.resolve(3, "+++++++");
    }

    //attach a resolved handler to the returned promise
    foo().then(console.log);

    console.log(2, "+++++++");
  }, 8300);
}

//* thenable object

//return a primitive
{
  setTimeout(() => {
    async function foo() {
      return "fooaaaaaaaa";
    }
    foo().then(console.log);
    //foo

    // return a non-thenable object
    async function bar() {
      return ["bar"];
    }
    bar().then(console.log);
    //['bar']

    // return a thenable non-promise object
    async function baz() {
      const thenable = {
        then(callback) {
          callback("baz");
        },
      };

      return thenable;
    }
    baz().then(console.log());
    // baz

    // return a promise
    async function qux() {
      return Promise.resolve("qux");
    }
    qux().then(console.log);
    //qux
  }, 8300);
}

//* As with promise handler functions, throwing an error value will instead return a rejected promise:
{
  setTimeout(() => {
    async function foo() {
      console.log(1, "~~~~~");
      throw 3;
    }

    // attach a rejected handler to the returned promise
    foo().catch(console.log);
    console.log(2, "~~~~~");
  }, 8400);
}

// However, promise rejection errors will not be captured by the async function:

{
  setTimeout(() => {
    async function foo() {
      console.log(1, "~~~~~");
      Promise.reject(3);
    }

    // attach a rejected handler to the returned promise
    foo().catch(console.log);
    console.log(2, "~~~~~");

    // 1
    // 2
    // Uncaught (in promise): 3
  }, 8500);
}

console.log("********The await keyword**********");

//* the await keyword, which is used to pause execution while waiting for a promise to resolve
{
  let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));

  p.then((x) => console.log(x)); // 3
}
//* rewritten using async/await
{
  async function foo() {
    let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
    console.log(await p);
  }
  foo();
  //3
}

//* The await keyword will pause execution of the async function
//* the await keyword is used in the same way as a JavaScript unary operator. It can be used standalone or inside an expression

{
  setTimeout(() => {
    //* asynchronously print "foo"
    async function foo() {
      console.log(await Promise.resolve("FOOOAEIOU"));
    }
    foo();
    // FOOOAEIOU

    //* asynchronously print "bar"
    async function bar() {
      return await Promise.resolve("barrrrrrr");
    }
    bar().then(console.log);
    // barrrrrrr

    //Asynchronously print "baz" after 1000ms
    async function baz() {
      await new Promise((resolve, reject) => setTimeout(resolve, 1000));
      console.log("baz");
    }
    baz();
    // baz <after 1000ms>
  }, 8500);
}

//  A thenable object will be “unwrapped” via the first argument provided to the then() callback.
// A non-thenable object will be passed through as if it were an already resolved promise.

{
  setTimeout(() => {
    // await a primitive
    async function foo() {
      console.log(await "fooooooo");
    }
    foo();
    // foo

    //await a non-thenable object
    async function bar() {
      console.log(await ["barrrrrrr"]);
    }
    bar();
    //["bar"]

    // await a thenable non-premise object
    async function baz() {
      const thenable = {
        then(callback) {
          callback("bazzzzzz");
          console.log(callback, "^^^^^^^^^^^^^^::");
        },
      };
      console.log(thenable, "ONJECTOOOO");
      console.log(await thenable);
    }
    baz();
    // baz

    // await a promise
    async function qux() {
      console.log(await Promise.resolve("quxxxxxx"));
    }
    qux();
    //qux
  }, 8600);
}

//*  Awaiting a synchronous operation that throws an error will instead return a rejected promise:

{
  setTimeout(() => {
    async function foo() {
      console.log(11);
      await (() => {
        throw 3;
      })();
      // await Promise.reject(33)
    }

    // attach a rejected handler to the returned promise
    foo().catch(console.log);
    console.log(22);
    // 1
    // 2
    // 3
  }, 8800);
}

//
//! a standalone Promise.reject() will not be captured by an async function and will throw as an unhandled error. However, using await on a promise that rejects will unwrap the error value
{
  setTimeout(() => {
    async function foo() {
      console.log(10);
      await Promise.reject(30);
      console.log(40); //! never prints
    }

    //attach a rejected handler to the returned promise
    foo().catch(console.log);
    foo().catch((x) => console.log(x));
    foo().catch(function (x) {
      console.log(x);
    });
    foo().catch(myLogger);

    // my function outside
    function myLogger(x) {
      console.log(x);
    }

    console.log(20);
    //1
    //2
    //3
  }, 8900);
}

console.log("*********Restrictions on await************");
//* The await keyword must be used inside an async function.  However, there is nothing preventing you from immediately invoking an async function

{
  setTimeout(() => {
    async function foo() {
      console.log(await Promise.resolve("restriction on await1"));
    }
    foo();
    // 333333

    // immediately invoked async function expression
    (async function () {
      console.log(await Promise.resolve("restriction on await2"));
    })();
  }, 9000);
}

//* attempting to use await inside a synchronous function will throw a SyntaxError
/* {
  setTimeout(() => {
    //not allowed: "await" inside arrow function
    function foo () {
      const syncFn = () => {
        return await Promise.resolve("foou")
      };
      console.log(syncFn())
    }

    // not allowed: "await" inside function declaration
    function bar () {
      function syncFn () {
        return await Promise.resolve("baru")
      }
      console.log(syncFn())
    }

    //! not allowed: "Await" inside function expression
    function baz () {
      const syncFn = function () {
        return await Promise.resolve("bazu")
      }
      console.log(syncFn())
    }

    // not allowed: IIFE using expression or arrow function
    function qux () {
      (function () {
        console.log(await Promise.resolve("quxu"))
      })()
      (() => console.log(await Promise.resolve("qux")))()
    }
  }, 9100);
} */

console.log("***********Halting and Resuming Execution***********");
// Detener y reanudar la ejecución
//* , consider the following example where three functions are invoked in order but their outputs print in reverse:

{
  setTimeout(() => {
    async function foo() {
      console.log(await Promise.resolve("fooo"));
    }

    async function bar() {
      console.log(await "barr");
    }
    //! an async function that doesn’t contain the await keyword executes much like a regular function
    async function baz() {
      console.log("bazz");
    }

    foo();
    bar();
    baz();
    //baz
    //bar
    //foo
    //* don't print reversely, sino //bazz // fooo // barr // something is wrongi
  }, 9200);
}

//*  an async function that doesn’t contain the await keyword executes much like a regular function:
{
  setTimeout(() => {
    async function foo() {
      console.log(2);
    }

    console.log(1);
    foo();
    console.log(3);

    // 1
    // 2
    // 3
  }, 9300);
}

//! resume execution of that function

{
  setTimeout(() => {
    console.log("**********************************");
    async function foo() {
      console.log(2);
      console.log(21);
      console.log(22);
      await null;
      console.log(4);
      console.log(5);
      await null;
      console.log(6);
    }

    console.log(1);
    foo();
    console.log(3);
    console.log(31);
    console.log(32);
    // 1
    // 2
    // 3
    // 31
    // 32
    // 4
    // 5
    // 6
  }, 9400);
}

/*
 * 1. Imprimir 1.
 * 2. Invoque la función asíncrona foo.
 * 3. (dentro de foo) Imprimir 2.
 * 4. (dentro de foo) la palabra clave await detiene la ejecución y agrega una tarea en la cola de mensajes para el valor nulo disponible inmediatamente
 * 5. foo sale.
 * 6. Imprimir 3.
 * 7. Termina el hilo de ejecución sincrónico.
 * 8. El tiempo de ejecución de JavaScript retira la tarea de la cola de mensajes para reanudar la ejecución.
 * 9. (inside foo) Se reanuda la ejecución; await se proporciona con el valor nulo (que, aquí, no se utiliza).
 * 10. (dentro de foo) Imprimir 4.
 * 11. foo vuelve.
 */

console.log("*********");
//* Using await with a promise makes this scenario more complicated.
//*  there will, in fact, be two separate message queue tasks that are evaluated asynchronously to complete execution of the async function.

{
  setTimeout(() => {
    async function foo() {
      console.log(2);
      console.log(await Promise.resolve(8));
      console.log(9);
    }

    async function bar() {
      console.log(4);
      console.log(await 6);
      console.log(7);
    }

    console.log(1);
    foo();
    console.log(3);
    bar();
    console.log(5);
  }, 9500);

  // 1
  // 2
  // 3
  // 4
  // 5
  // 6
  // 7
  // 8
  // 9
}

/*
* 13. Hilo de alto nivel de acabados de ejecución.
* 14. El tiempo de ejecución de JavaScript retira de la cola el manejador de promesa de espera resuelto y le proporciona el valor resuelto de 8.
* 15. El tiempo de ejecución de JavaScript pone en cola la tarea para reanudar la ejecución de foo en la cola de mensajes.
* 16. El tiempo de ejecución de JavaScript retira la tarea de la cola para reanudar la ejecución de la barra con el valor 6 fuera de la cola de mensajes.
* 17. (barra interior) La ejecución se reanuda, await se proporciona con el valor 6.
* 18. (barra interior) Imprimir 6.
* 19. (barra interior) Imprimir 7.
* 20. barras devuelve.
* 21. La tarea asincrónica se completa, JavaScript quita la cola de la tarea para reanudar la ejecución de foo con el valor 8.
* 22. (dentro de foo) Imprimir 8.
* 23. (dentro de foo) Imprimir 9.
* 24. foo vuelve.
* ****************
* 13.  Top-level thread of execution finishes.
* 14.  JavaScript runtime dequeues resolved await promise handler and provides it with the resolved value of 8.
* 15.  JavaScript runtime enqueues task to resume execution of foo onto message queue.
* 16.  JavaScript runtime dequeues task to resume execution of bar with value 6 off message queue.
* 17.  (inside bar) Execution resumes, await is provided with the value 6.
* 18.  (inside bar) Print 6.
* 19.  (inside bar) Print 7.
* 20.  bar returns.
* 21.  Asynchronous task completes, JavaScript dequeues task to resume execution of foo with value 8.
* 22. (inside foo) Print 8.
* 23.  (inside foo) Print 9.
* 24.  foo returns.

*/

console.log("*************Strategies for Async Functions**************");
//* Implementing Sleep()
//* With async functions, this is no longer the case! It is trivial to build a utility that allows a function to sleep() for a variable number of milliseconds

{
  setTimeout(() => {
    async function sleep(delay) {
      return new Promise((resolve) => setTimeout(resolve, delay));
    }

    async function foo() {
      const t0 = Date.now();
      await sleep(1500); // sleep for ~1500ms
      console.log(Date.now() - t0);
    }
    foo();
    // 1502
  }, 9600);
}

console.log("********Maximizing Parallelization*********");

{
  setTimeout(() => {
    async function randomDelay(id) {
      // Delay between 0 and 1000ms
      const delay = Math.random() * 1000;
      console.log("*/*/*/*/*/*/", delay);
      return new Promise((resolve) =>
        setTimeout(() => {
          console.log(`${id} FINISHED`);
          resolve();
        }, delay)
      );
    }

    async function foo() {
      const t0 = Date.now();
      await randomDelay(0);
      await randomDelay(1);
      await randomDelay(2);
      await randomDelay(3);
      await randomDelay(4);
      console.log(`${Date.now() - t0}ms ELAPSED`);
    }
    foo();
    // 0 finished
    // 1 finished
    // 2 finished
    // 3 finished
    // 4 finished
    //  2219ms elapsed
  }, 9700);
}

//* Rolling (enrrollando) up into a for loop yields the following
{
  setTimeout(() => {
    async function randomDelay(id) {
      // Delay between 0 and 1000 ms
      const delay = Math.random() * 1000;
      return new Promise((resolve) =>
        setTimeout(() => {
          console.log(`${id} finished`);
          resolve();
        }, delay)
      );
    }
    async function foo() {
      const t0 = Date.now();
      for (let i = 0; i < 5; ++i) {
        await randomDelay(i);
      }
      console.log(`${Date.now() - t0}ms elapsed`);
    }
    foo();
    // 0 finished
    // 1 finished
    // 2 finished
    // 3 finished
    // 4 finished
    // 2219ms elapsed
  }, 9800);
}

//
{
  setTimeout(() => {
    async function randomDelay(id) {
      // Delay between 0 and 1000 ms
      const delay = Math.random() * 1000;
      return new Promise((resolve) =>
        setTimeout(() => {
          setTimeout(console.log, 0, `${id} finished`);
          resolve();
        }, delay)
      );
    }
    async function foo() {
      const t0 = Date.now();
      const p0 = randomDelay(0);
      const p1 = randomDelay(1);
      const p2 = randomDelay(2);
      const p3 = randomDelay(3);
      const p4 = randomDelay(4);

      await p0;
      await p1;
      await p2;
      await p3;
      await p4;
      setTimeout(console.log, 0, `${Date.now() - t0}ms elapsed`);
    }
    foo();
    // 1 finished
    // 4 finished
    // 3 finished
    // 0 finished
    // 2 finished
    // 2219ms elapsed
  }, 9900);
}

//* Rolling up into an array and for loop yields the following

{
  setTimeout(() => {
    console.log("-------------------");
    async function randomDelay(id) {
      // Delay between 0 and 1000 ms
      const delay = Math.random() * 1000;
      return new Promise((resolve) =>
        setTimeout(() => {
          console.log(`${id} finished`);
          resolve();
        }, delay)
      );
    }

    async function foo() {
      const t0 = Date.now();

      const promises = Array(5)
        .fill(null)
        .map((_, i) => randomDelay(i));

      for (const p of promises) {
        await p;
      }

      console.log(`${Date.now() - 0}ms elapsed!!`);
    }

    foo();

    //  4 finished
    //  2 finished
    //  1 finished
    //  0 finished
    //  3 finished
    //  877ms elapsed
  }, 9990);
}

//
{
  setTimeout(() => {
    console.log("*************************--");
    async function randomDelay(id) {
      // Delay between 0 and 1000 ms
      const delay = Math.random() * 1000;
      return new Promise((resolve) =>
        setTimeout(() => {
          console.log(`${id} finishedd`);
          resolve(id);
        }, delay)
      );
    }
    async function foo() {
      const t0 = Date.now();
      const promises = Array(5)
        .fill(null)
        .map((_, i) => randomDelay(i));
      for (const p of promises) {
        console.log(`awaitedd ${await p}`);
      }
      console.log(`${Date.now() - t0}ms elapsedd`);
    }
    foo();
  }, 10000);
}

console.log("**********Serial Promise Execution************");

{
  setTimeout(() => {
    console.log("#######################");
    function addTwo(x) {
      return x + 2;
    }
    function addThree(x) {
      return x + 3;
    }
    function addFive(x) {
      return x + 5;
    }

    async function addTen(x) {
      for (const fn of [addTwo, addThree, addFive]) {
        x = await fn(x);
      }
      return x;
    }
    addTen(9).then(console.log); // 19
  }, 10100);
}

//* with async function
{
  setTimeout(() => {
    async function addTwo(x) {
      return x + 2;
    }
    async function addThree(x) {
      return x + 3;
    }
    async function addFive(x) {
      return x + 5;
    }

    async function addTen(x) {
      for (const fn of [addTwo, addThree, addFive]) {
        x = await fn(x);
      }
      return x;
    }
    addTen(9).then(console.log);
    // 19
  }, 10200);
}

console.log("**********Stack Traces and Memory Management***********");

{
  setTimeout(() => {
    function fooPromiseExecutor(resolve, reject) {
      setTimeout(reject, 1000, "bar");
    }
    async function foo() {
      await new Promise(fooPromiseExecutor);
    }
    foo();
    // Uncaught (in promise) bar
    // foo
    // async function (async)
    // foo
  }, 10300);
}
