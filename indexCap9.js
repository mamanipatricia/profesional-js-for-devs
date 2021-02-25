console.log("*********** Proxies and Reflect ***********");

/*
 * proxy fundamentals
 * proxy traps and reflect methods
 * proxy patterns
 */

/*
 * El objeto Proxy se usa para definir un comportamiento personalizado para operaciones fundamentales (por ejemplo, para observar propiedades, cuando se asignan, enumeración, invocación de funciones, etc).
 */
//* proxies and reflection are useful only in situations where native support is offered on 100 percent of platforms */

// ********** PROXY FUNDAMENTALS **********

console.log("*********** Creating a Passthrough Proxy ***********");

//* all operations performed on the proxy will effectively be applied to the target object instead. The only perceptible difference is the identity of the proxy object.

{
  const target = {
    id: "target",
  };

  const handler = {};

  const proxy = new Proxy(target, handler);

  // The 'id property will access the same value
  console.log("target.id:: ", target.id); //target
  console.log("proxy.id:: ", proxy.id); //target

  //assignment to a target property changes both since both are accessing the same value
  target.id = "foo";
  console.log("target.id:: ", target.id); //foo
  console.log("proxy.id:: ", proxy.id); //foo

  //assignment  to a proxy property changes both since this assignment is conferred to the target object
  proxy.id = "bar";
  console.log("target.id:: ", target.id); //bar
  console.log("proxy.id:: ", proxy.id); //bar

  //hasOwnProperty() method is effectively applied to the target in both cases
  console.log('target.hasOwnProperty("id") :: ', target.hasOwnProperty("id")); //false
  console.log('proxy.hasOwnProperty("id"):: ', proxy.hasOwnProperty("id")); //false

  /*
//the instanceof operator is effectively applied to the target in both cases
console.log("target instanceof Proxy:: ", target instanceof Proxy);
console.log("proxy instanceof Proxy:: ", proxy instanceof Proxy);
 */
  // strict object equality can still be used to differentiate proxy from target
  console.log("target === proxy:: ", target === proxy); // false
}

console.log("************ Defining Traps ************");

//* traps, which behave as “fundamental operation interceptors” inside the handler object.

// DEFINING A TRAP
{
  const target = {
    foo: "bar",
  };

  const handler = {
    //traps are keyed by method name inside the handler object
    get() {
      return "handler override";
    },
  };

  const proxy = new Proxy(target, handler);
}

/*
 *  proxy[property],
 * proxy.property,
 * or Object.create(proxy)[property] will all use the fundamental operation get() to retrieve the property,
 */
{
  const target = {
    foo: "bar",
  };

  const handler = {
    //traps are keyed ny method name inside the handler object
    get() {
      return "handler override";
    },
  };

  const proxy = new Proxy(target, handler);

  console.log("target.foo:: ", target.foo); // bar
  console.log("proxy.foo:: ", proxy.foo); // handler override

  console.log('target["foo"]"" ', target["foo"]); // bar
  console.log('proxy["foo"]"" ', proxy["foo"]); // handle override

  console.log('Object.create(target)["foo"]', Object.create(target)["foo"]);
  console.log('Object.create(proxy)["foo"]', Object.create(proxy)["foo"]); // handler override
}
//!  The get() operation that is being trapped is shared between multiple operations that can be found in actual JavaScript code

console.log("*********** Trap Parameters and the Reflect API ***********");

//*  */

{
  const target = {
    foo: "bar",
  };

  const handler = {
    get(trapTarget, property, receiver) {
      console.log("trapTarget === target:: ", trapTarget === target);
      console.log("property:: ", property);
      console.log("receiver === proxy:: ", receiver === proxy);
    },
  };

  const proxy = new Proxy(target, handler);

  proxy.foo;
  //true
  //foo
  //true
}

//* it is possible to define a trap handler that wholly recreates the behavior of the method being trapped
{
  const target = {
    foo: "bar",
  };

  const handler = {
    get(trapTarget, property, receiver) {
      return trapTarget[property];
    },
  };

  const proxy = new Proxy(target, handler);

  console.log("proxy.foo:: ", proxy.foo);
  console.log("target.foo:: ", target.foo);
}

//! REflect API
{
  const target = {
    foo: "bar",
  };

  const handler = {
    get() {
      return Reflect.get(...arguments);
    },
  };

  const proxy = new Proxy(target, handler);

  console.log("proxy.foo:: ", proxy.foo);
  console.log("target.foo:: ", target.foo);
}

//* Alternately, in a more succinct format:
{
  const target = {
    foo: "bar",
  };
  const handler = {
    get: Reflect.get,
  };

  const proxy = new Proxy(target, handler);

  console.log("proxy.foo*** :: ", proxy.foo);
  console.log("target.foo*** :: ", target.foo);
}

//* create a true passthrough proxy that traps every available method and forwards each one to its corresponding Reflect API function, defining an explicit handler object is not required:
{
  const target = {
    foo: "bar",
  };

  const proxy = new Proxy(target, Reflect);

  console.log("proxy.foo:: ", proxy.foo); //bar
  console.log("target.foo:: ", target.foo); //bar
}

//* The Reflect API allows you to modify the trapped method with minimal boilerplate code. For example, the following decorates the return value whenever a certain property is accessed:

{
  const target = {
    foo: "bar",
    baz: "qwx",
  };

  const handler = {
    get(trapTarget, property, receiver) {
      let decoration = "";
      if (property === "foo") {
        decoration = "!!!!!!";
      }

      return Reflect.get(...arguments) + decoration;
    },
  };

  const proxy = new Proxy(target, handler);

  console.log("proxy.foo:: ", proxy.foo); // bar!!!!!!
  console.log("target.foo:: ", target.foo); // bar

  console.log("proxy.baz:: ", proxy.baz); // qux
  console.log("target.baz:: ", target.baz); //qux
}

console.log("************* Trap Invariants *************");

//*  if a target object has a non-configurable and non-writable data property, a TypeError will be thrown if you attempt to return a value from the trap that is different from the target object’s property:

{
  const target = {};
  // Object.defineProperty(obj, prop, descriptor)
  Object.defineProperty(target, "foo", {
    configurable: false,
    writable: false,
    value: "bar",
  });

  const handler = {
    get() {
      return "qux";
    },
  };

  const proxy = new Proxy(target, handler);
  console.log("target:: ", target);

  // console.log("proxy.foo:: ", proxy.foo);
  /* TypeError: 'get' on proxy: property 'foo' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected 'bar' but got 'qux' */
}
//* ----------------------EXAMPLE--------------------------
console.log("----------------------EXAMPLE--------------------------");
{
  let dictionary = {
    Hello: "Hola",
    Bye: "Adiós",
  };

  dictionary = new Proxy(dictionary, {
    get(target, phrase) {
      // intercept reading a property from dictionary
      if (phrase in target) {
        // if we have it in the dictionary
        return target[phrase]; // return the translation
      } else {
        // otherwise, return the non-translated phrase
        return phrase;
      }
    },
  });

  // Look up arbitrary phrases in the dictionary!
  // At worst, they're not translated.
  console.log(dictionary["Hello"]); // Hola
  console.log(dictionary["Welcome to Proxy"]); // Welcome to Proxy (no translation)
}
console.log("----------------------EXAMPLE--------------------------");
//* ------------------------------------------------

console.log("*********** Revocable Proxies ***********");
/* the revoke function is idempotent and will not have further effect if called multiple times. Any method called on a proxy after it is revoked will throw a TypeError.
 */
{
  const target = {
    foo: "bar",
  };

  const handler = {
    get() {
      return "intercepted";
    },
  };

  //The revoke function can be captured upon proxy instantiation:
  const { proxy, revoke } = Proxy.revocable(target, handler);
  console.log("proxy, revoke::::: ", proxy, revoke);

  console.log("proxy.foo:: ", proxy.foo); // intercepted
  console.log("target.foo:: ", target.foo); // bar

  revoke();
  // Any method called on a proxy after it is revoked will throw a TypeError.

  //   console.log("proxy.foo:: ", proxy.foo);
}

console.log("************* Utility of the Reflect API *************");
/*
 * Reflect API vs. Object API

 * 1. The Reflect API is not limited to trap handler 
 *2. Most Reflect API methods have an analogue on the Object type

 * OBJECT METHODS: - are geared for fine-tuned object control and manipulation
 *  REFLECT METHODS: - are geared for general application use
 */

//* STATUS FLAG
// Many Reflect methods return a Boolean
{
  //INITIAL CODE
  const o = {};

  try {
    Object.defineProperty(o, "foo", "bar");
    console.log("successs!! ");
  } catch (e) {
    console.log("failure@!!!");
  }
}

//* In the event of a problem with defining the new property, Reflect.defineProperty will return false instead of throwing an error

//refactor code
/*
{
  const o = {};

  if (Object.defineProperty(o, "foo", {})) {
    console.log("SUCCESSSS");
  } else {
    console.log("FAILUREEEE");
  }
}
 */

/*
➤➤ Reflect.defineProperty
➤➤  Reflect.preventExtensions
➤➤ Reflect.setPrototypeOf
➤➤ Reflect.set
➤➤ Reflect.deleteProperty

 */

console.log("**** Supplanting Operators with First-Class Functions ****");
{
  // NIGHTMARE LINE OF CODE
  // Function.prototype.apply.call(myFunc, thisVal, argumentList);
  // THE SAME AS ABOVE REPLICATED USING REFLECT
  //Reflect.apply(myFunc, thisVal, argumentsList);
}

console.log("******* Proxying a Proxy *******");
/* Proxies are capable of intercepting Reflect API operations --> to create a proxy of a proxy
 */
{
  const target = {
    foo: "bar",
  };
  const firstProxy = new Proxy(target, {
    get() {
      console.log("first proxy");
      return Reflect.get(...arguments);
    },
  });
  const secondProxy = new Proxy(firstProxy, {
    get() {
      console.log("second proxy");
      return Reflect.get(...arguments);
    },
  });
  console.log(secondProxy.foo);
  // second proxy
  // first proxy
  // bar
}

console.log("****** Proxy Considerations and Shortcomings ******");

/*proxies work very well as a virtualization layer for objects.
Nevertheless, proxies cannot always seamlessly integrate with existing ECMAScript constructs in
certain scenarios */

//* 'this' Inside a Proxy
console.log("-------- 'this' Inside a Proxy ------");
// As you might expect, the this value inside a method will respect the object upon which it was called:

{
  const target = {
    thisValEqualsProxy() {
      console.log("thisss:: ", this);
      return this === proxy;
    },
  };
  const proxy = new Proxy(target, {});

  console.log("proxy::: ", proxy);

  console.log(target.thisValEqualsProxy()); // false
  console.log(proxy.thisValEqualsProxy()); // true
}

//* Recall the WeakMap private variable implementation
{
  const wm = new WeakMap();
  class User {
    constructor(userId) {
      wm.set(this, userId);
    }
    set id(userId) {
      wm.set(this, userId);
    }
    get id() {
      return wm.get(this);
    }
  }

  const UserClassProxy = new Proxy(User, {});
  const proxyUser = new UserClassProxy(456);
  console.log("proxyUser.id:: ", proxyUser.id);

  /*
  CREAR COMO EL DE ARRIBA

  const user = new User(123);
  console.log(user.id); // 123

  const userInstanceProxy = new Proxy(user, {});
  console.log(userInstanceProxy.id); // undefined
   */
}

console.log("****** Proxies and Internal Slots ******");

/* some methods on a wrapped instance will flat out not work properly */
{
  const target = new Date();
  const proxy = new Proxy(target, {});

  console.log(proxy instanceof Date); // true

  console.log(proxy);
  console.log(target);

  //   proxy.getDate(); // TypeError: 'this' is not a Date object
}

console.log("***PROXY TRAPS AND REFLECT METHODS ********** ");

console.log("******* GET *******");
//* The return value is unrestricted.

//* Reflect.get()

{
  const myTarget = {};

  const proxy = new Proxy(myTarget, {
    get(target, property, receiver) {
      console.log("get()");
      return Reflect.get(...arguments);
    },
  });

  proxy.foo;
  // get()
}

/*
proxy.property
proxy[property]
Object.create(proxy)[property]
Reflect.get(proxy, property, receiver)
*/

console.log("********** Trap handler parameters **********");
/*
target: Target object
property: String key property being referenced on target object
receiver: Proxy object or object that inherits from proxy object

*/
//* Trap invariants

console.log("********** set() **********");
//* true indicates success; false indicates failure, IN strict mode will throw a TypeError.

//*   set() trap is called inside operations that assign a property value

{
  const myTarget = {};
  const proxy = new Proxy(myTarget, {
    set(target, property, value, receiver) {
      console.log("set()");
      return Reflect.set(...arguments);
    },
  });
  proxy.foo = "bar";
  // set()
}

console.log("----- Intercepted operations -----");
/*
proxy.property = value
proxy[property] = value
Object.create(proxy)[property] = value
Reflect.set(proxy, property, value, receiver)

*/

console.log("------- Trap handler parameters -------");
/*
* target: Target object property: String key property being referenced on target object value: The value being assigned to property receiver: The original assignment recipient object

*/
console.log("------ Trap invariants ------");

console.log("********** has() **********");
//* has() must return a Boolean indicating if the property is present or not. Non-Boolean return values will be coerced into a Boolean.

{
  const myTarget = {};

  const proxy = new Proxy(myTarget, {
    has(target, property) {
      console.log("has()");
      return Reflect.has(...arguments);
    },
  });

  "foo" in proxy;
  // has()
}

/*
Intercepted operations
property in proxy
property in Object.create(proxy)
with(proxy) {(property);}
Reflect.has(proxy, property)
*/

/*
 * Trap handler parameters
 * target: Target object
 *property: String key property being referenced on target object
 */

console.log("****** defineProperty() ******");

//* Reflect.defineProperty().
//* defineProperty() must return a Boolean indicating if the property was successfully defined or not.

{
  const myTarget = {};
  const proxy = new Proxy(myTarget, {
    defineProperty(target, property, descriptor) {
      console.log("defineProperty()");
      return Reflect.defineProperty(...arguments);
    },
  });
  Object.defineProperty(proxy, "foo", { value: "bar" });
  // defineProperty()
}

/*
* Intercepted operations
Object.defineProperty(proxy, property, descriptor)
Reflect.defineProperty(proxy, property, descriptor)
 */

// .........

console.log("*********** getOwnPropertyDescriptor() ***********");
//* getOwnPropertyDescriptor() must return an object, or undefined if the property does not exist.

{
  const myTarget = {};
  const proxy = new Proxy(myTarget, {
    getOwnPropertyDescriptor(target, property) {
      console.log("getOwnPropertyDescriptor()");
      return Reflect.getOwnPropertyDescriptor(...arguments);
    },
  });
  Object.getOwnPropertyDescriptor(proxy, "foo");
  // getOwnPropertyDescriptor()
}
/*
property in proxy
property in Object.create(proxy)
with(proxy) {(property);}
Reflect.has(proxy, property)

 */

console.log("*********** deleteProperty() *********** ");
//* The deleteProperty() trap is called inside the delete operator. Its corresponding Reflect API method is Reflect.deleteProperty().

//* deleteProperty()must return a Boolean indicating if the property was successfully deleted or not.

{
  const myTarget = {};
  const proxy = new Proxy(myTarget, {
    deleteProperty(target, property) {
      console.log("deleteProperty()");
      return Reflect.deleteProperty(...arguments);
    },
  });
  delete proxy.foo;
  // deleteProperty()
}

/*
Intercepted operations
delete proxy.property
delete proxy[property]
Reflect.deleteProperty(proxy, property)

 */

console.log("******** ownKeys() ********");
//* The ownKeys() trap is called inside Object.keys() and similar methods. Its corresponding Reflect API method is Reflect.ownKeys().

//* ownKeys()must return an enumerable object that contains either strings or symbols.

{
  const myTarget = {};
  const proxy = new Proxy(myTarget, {
    ownKeys(target) {
      console.log("ownKeys()");
      return Reflect.ownKeys(...arguments);
    },
  });
  Object.keys(proxy);
  // ownKeys()
}

/*
Intercepted operations
Object.getOwnPropertyNames(proxy)
Object.getOwnPropertySymbols(proxy)
Object.keys(proxy)
Reflect.ownKeys(proxy)
 */

console.log("*********** getPrototypeOf() ***********");
//* The getPrototypeOf() trap is called inside Object.getPrototypeOf(). Its corresponding Reflect API method is Reflect.getPrototypeOf().

//* getPrototypeOf()must return an object or null.

{
  const myTarget = {};

  const proxy = new Proxy(myTarget, {
    getPrototypeOf(target) {
      console.log("getPrototypeOf()");
      return Reflect.getPrototypeOf(...arguments);
    },
  });
  Object.getPrototypeOf(proxy);
  // getPrototypeOf()
}
/*
Intercepted operations
Object.getPrototypeOf(proxy)
Reflect.getPrototypeOf(proxy)
proxy.__proto__
Object.prototype.isPrototypeOf(proxy)
proxy instanceof Object

*/

//* If target is non-extensible, the only valid return value of Object.getPrototypeOf(proxy) is the value returned from Object.getPrototypeOf(target)

console.log("******* setPrototypeOf() *******");
//*The setPrototypeOf() trap is called inside Object.setPrototypeOf(). Its corresponding Reflect method is Reflect.setPrototypeOf().

//* setPrototypeOf() must return a Boolean indicating if the prototype assignment was successful or not
{
  const myTarget = {};
  const proxy = new Proxy(myTarget, {
    setPrototypeOf(target, prototype) {
      console.log("setPrototypeOf()");
      return Reflect.setPrototypeOf(...arguments);
    },
  });
  Object.setPrototypeOf(proxy, Object); // setPrototypeOf()
}

/*
Object.setPrototypeOf(proxy)
Reflect.setPrototypeOf(proxy)

*/

console.log("******** isExtensible() ********");
//* The isExtensible() trap is called inside Object.isExtensible(). Its corresponding Reflect API method is Reflect. isExtensible ().

//* isExtensible() must return a Boolean indicating if the prototype assignment was successful or not.

{
  const myTarget = {};
  const proxy = new Proxy(myTarget, {
    isExtensible(target) {
      console.log("isExtensible()");
      return Reflect.isExtensible(...arguments);
    },
  });
  Object.isExtensible(proxy);
  // isExtensible()
}

/*
Intercepted operations
Object.isExtensible(proxy)
Reflect.isExtensible(proxy)
 */

console.log("***** preventExtensions() *****");
//* The preventExtensions() trap is called inside Object.preventExtensions(). Its corresponding Reflect API method is Reflect.preventExtensions().

//* preventExtensions() must return a Boolean indicating if target is already non-extensible

{
  const myTarget = {};
  const proxy = new Proxy(myTarget, {
    preventExtensions(target) {
      console.log("preventExtensions()");
      return Reflect.preventExtensions(...arguments);
    },
  });
  Object.preventExtensions(proxy);
  // preventExtensions()
}
// Trap invariants - If Object.isExtensible(proxy) is false, the handler must return true.

/*
intercepted operations
Object.preventExtensions(proxy)
Reflect.preventExtensions(proxy)
 */

console.log("********* apply() *********");
//* The apply() trap is called on function calls. Its corresponding Reflect API method is Reflect.apply().

//*  The return value is unrestricted.

{
  const myTarget = () => {};

  const proxy = new Proxy(myTarget, {
    apply(target, thisArg, ...argumentsList) {
      console.log("apply()");
      return Reflect.apply(...arguments);
    },
  });
  proxy();
  // apply()
}

/*
Intercepted operations
proxy(...argumentsList)
Function.prototype.apply(thisArg, argumentsList)
Function.prototype.call(thisArg, ...argumentsList)
Reflect.apply(target, thisArgument, argumentsList)
 */

console.log("******** construct() ********");

//* The construct() trap is called inside the new operator. Its corresponding Reflect API method is Reflect.construct().
//* construct() must return an object.

{
  const myTarget = function () {};
  const proxy = new Proxy(myTarget, {
    construct(target, argumentsList, newTarget) {
      console.log("construct()");
      return Reflect.construct(...arguments);
    },
  });
  new proxy();
  // construct()
}
/*
ntercepted operations
new proxy(...argumentsList)
Reflect.construct(target, argumentsList, newTarget)

*/

console.log("****** PROXY PATTERNS ******");
//* The Proxy API allows you to introduce some incredibly useful patterns into your code.
console.log("------------- Tracking Property Access -------------");

{
  const user = {
    name: "Jake",
  };
  const proxy = new Proxy(user, {
    get(target, property, receiver) {
      console.log(`Getting ${property}`);
      return Reflect.get(...arguments);
    },
    set(target, property, value, receiver) {
      console.log(`Setting ${property}=${value}`);

      return Reflect.set(...arguments);
    },
  });
  proxy.name;
  // Getting name
  proxy.age = 27;
  // Setting age=27
}

console.log("--------- Hidden Properties ---------");

{
  const hiddenProperties = ["foo", "bar"];
  const targetObject = {
    foo: 1,
    bar: 2,
    baz: 3,
  };
  const proxy = new Proxy(targetObject, {
    get(target, property) {
      if (hiddenProperties.includes(property)) {
        return undefined;
      } else {
        return Reflect.get(...arguments);
      }
    },
    has(target, property) {
      if (hiddenProperties.includes(property)) {
        return false;
      } else {
        return Reflect.has(...arguments);
      }
    },
  });

  // get()
  console.log(proxy.foo); // undefined
  console.log(proxy.bar); // undefined
  console.log(proxy.baz); // 3
  // has()
  console.log("foo" in proxy); // false
  console.log("bar" in proxy); // false
  console.log("baz" in proxy); // true
}

console.log("----------- Property Validation -----------");

//* Because all assignments must go through the set() trap, you can allow or reject assignments based on the content of the intended value:

{
  const target = {
    onlyNumbersGoHere: 0,
  };
  const proxy = new Proxy(target, {
    set(target, property, value) {
      if (typeof value !== "Number") {
        return false;
      } else {
        return Reflect.set(...arguments);
      }
    },
  });

  proxy.onlyNumbersGoHere = 1;
  console.log(proxy.onlyNumbersGoHere); // 1
  proxy.onlyNumbersGoHere = "2";
  console.log(proxy.onlyNumbersGoHere); // 1
}

console.log("***** Function and Constructor Parameter Validation ******");
/*
{
  function median(...nums) {
    return nums.sort()[Math.floor(nums.length / 2)];
  }

  const proxy = new Proxy(median, {
    apply(target, thisArg, ...argumentsList) {
      for (const arg of argumentsList) {
        if (typeof arg !== "number") {
          throw "Non-number argument provided";
        }
      }
      return Reflect.apply(...arguments);
    },
  });

  console.log(proxy(4, 7, 1)); // 4
  // console.log(proxy(4, "7", 1)); // intentionally commented

  // Error: Non-number argument provided
}
 */
//* Similarly, a constructor can enforce the presence of constructor parameters:
{
  class User {
    constructor(id) {
      this.id_ = id;
    }
  }
  const proxy = new Proxy(User, {
    construct(target, argumentsList, newTarget) {
      if (argumentsList[0] === undefined) {
        throw "User cannot be instantiated without id";
      } else {
        return Reflect.construct(...arguments);
      }
    },
  });

  new proxy(1);
  //   new proxy();
  // Error: User cannot be instantiated without id
}

console.log("************ Data Binding and Observables ************");

{
  const userList = [];

  class User {
    constructor(name) {
      this.name_ = name;
    }
  }

  const proxy = new Proxy(User, {
    construct() {
      const newUser = Reflect.construct(...arguments);
      userList.push(newUser);
      return newUser;
    },
  });

  new proxy("John");
  new proxy("Jacob");
  new proxy("Jingleheimerschmidt");
  console.log(userList); // [User {}, User {}, User{}]
}

// Alternately, a collection can be bound to an emitter, which will fire each time a new instance is inserted:

{
  const userList = [];
  function emit(newValue) {
    console.log(newValue);
  }
  const proxy = new Proxy(userList, {
    set(target, property, value, receiver) {
      const result = Reflect.set(...arguments);
      if (result) {
        emit(Reflect.get(target, property, receiver));
      }
      return result;
    },
  });

  proxy.push("John"); // John
  proxy.push("Jacob"); // Jacob
}
