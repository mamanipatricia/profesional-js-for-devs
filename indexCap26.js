console.log("*********Modules********");
/*
 *  Understanding the module pattern
 *  Improvising module systems
 *  Working with pre-ES6 module loaders
 *  Working with ES6 modules
 */
console.log("**********UNDERSTANDING THE MODULE PATTERN**********");
/*
* The central ideas for this pattern are simple: 
? break logic into pieces that are totally encapsulated from the rest of the code
? allow each piece to explicitly define what parts of itself are exposed to external pieces,
? and allow each piece to explicitly define what external pieces it needs to execute


 */

/*
 * In the context of browsers, loading a module has several components.

 ? Common to all module systems is the concept of module identifiers. 
 ? Module systems are essentially key-value entities, where each module has an identifier that can be used to reference it.

 ! This token will sometimes be a string in cases where the module system is emulated

 !  or it might be an actual path to a module file in cases where the module system is natively implemented
 */

//* ENTRY POINTS
/*
 ? Module loading is “blocking”, meaning further execution cannot continue until an operation finishes.
 ?  loading five JavaScript files sequentially to do the work of one application is not ideal, and managing the correct load order is not an easy task to do by hand.

 <script src="moduleE.js"></script>
<script src="moduleD.js"></script>
<script src="moduleC.js"></script>
<script src="moduleB.js"></script>
<script src="moduleA.js"></script>
 */

console.log("******Asynchronous Dependencies********");
/*
 *  load modules on demand by allowing JavaScript code to instruct the module system to load a new module, and provide the module to a callback once it is ready.
 */
{
  // moduleA definition
  load("moduleB").then(function (moduleB) {
    moduleB.doStuff();
  });
}

console.log("*********Programmatic DependenciesI********");
{
  //* The following is an example of programmatic dependency loading.
  if (loadCondition) {
    require("./moduleA");

    /*
     * The loading of moduleA might be blocking, or it might yield execution and only continue once the module is loaded
     ?  moduleA’s presence is critical for subsequent module behavior.
     */
  }
}

console.log("*-------IMPROVISING MODULE SYSTEMS--------");
{
  (function () {
    // private Foo module code
    console.log("bar");
  })();
  // 'bar'
}

/*
* In order to expose a public API, the module IIFE would return an
object whose properties would be the public members inside the
module namespace
  */
{
  var Foo = (function () {
    return {
      bar: "baz",
      baz: function () {
        console.log(this.bar);
      },
    };
  })();

  console.log(Foo.bar); // 'baz'
  Foo.baz();
  // 'baz'
}

/*
* A similar pattern to the previous one, termed the “Revealing module pattern,” only returns an object
whose properties are references to private data and members:
 */
{
  var Foo = (function () {
    var bar = "baz";
    var baz = function () {
      console.log(bar);
    };
    return {
      bar: bar,
      baz: baz,
    };
  })();

  console.log(Foo.bar); // 'baz'
  Foo.baz();
  // 'baz'
}

//* It’s also possible to define modules within modules, which can be useful for namespace nesting purposes:
{
  var Foo = (function () {
    return {
      bar: "baz",
    };
  })();

  Foo.baz = (function () {
    return {
      qux: function () {
        console.log("baz");
      },
    };
  })();

  console.log(Foo.bar); // 'baz'
  Foo.baz.qux(); // 'baz'
}

//* For the module to use external values properly, they can be passed in as parameters to the IIFE:
{
  var globalBar = "baz";

  var Foo = (function (bar) {
    return {
      bar: bar,
      baz: function () {
        console.log(bar);
      },
    };
  })(globalBar);

  console.log(Foo.bar); // 'baz'
  Foo.baz(); // 'baz'
}

//* it’s entirely possible to augment the module after its definition:
{
  // Original Foo
  var Foo = (function (bar) {
    var bar = "baz";
    return {
      bar: bar,
    };
  })();

  // Augment Foo
  var Foo = (function (FooModule) {
    FooModule.baz = function () {
      console.log(FooModule.bar);
    };
    return FooModule;
  })(Foo);

  console.log(Foo.bar); // 'baz'
  Foo.baz();
  // 'baz'
}

//* It can also be useful to configure the module augmentation to perform the augmentation whether the module is present or not:
{
  // Augment Foo to add alert method
  var Foo = (function (FooModule) {
    FooModule.baz = function () {
      console.log(FooModule.bar);
    };
    return FooModule;
  })(Foo || {});

  // Augment Foo to add data
  var Foo = (function (FooModule) {
    FooModule.bar = "baz";

    return FooModule;
  })(Foo || {});

  console.log(Foo.bar); // 'baz'
  Foo.baz(); // 'baz'
}
//!  designing your own module system is an interesting exercise, but is not recommended for actual use, as the result is brittle

console.log("****WORKING WITH PRE-ES6 MODULE LOADERS*****");
console.log("-------CommonJS------");
/*
* CommonJS
? The CommonJS specification outlines a convention for module definition that uses synchronous
declarative dependencies
! CommonJS module syntax will not work natively in the browser.

? Often, NodeJS and CommonJS will be described as using the same style of module systems, and this is not entirely true

*  NodeJS uses a slightly modified version of CommonJS, which is appropriate in a server environment because it does not need to deal with the issue of network latency
*/

//*  EXAMPLE:: A CommonJS module definition will specify its dependencies using require(), and it will define its public API using an exports object.
{
  var moduleB = require("./moduleB");

  module.exports = {
    stuff: moduleB.doStuff(),
  };
}

{
  //* Requiring a module will load it, and assignment of the module to a variable is extremely common, but assignment to a variable is not required. Invoking require() means the module will load all the same.
  console.log("moduleA");
  require("./moduleA"); // "moduleA"
}

{
  //*  moduleA will only ever be printed once because moduleA is only ever loaded a single time—even though it is required multiple time
  console.log("moduleA");
  var a1 = require("./moduleA");
  var a2 = require("./moduleA");
  console.log(a1 === a2); // true
}

{
  /*
    * Modules are cached after the first time they are loaded;
    *  subsequent attempts to load a module will retrieve the cached module.
    ? Module load order is determined by the dependency graph.
    */

  console.log("moduleA");
  require("./moduleA");
  require("./moduleB"); // "moduleA"
  require("./moduleA");
}

/*
 * In CommonJS, module loading is a synchronous operation performed by the module system, so require() can be programmatically invoked inline in a module, as well as conditionally
 */
{
  console.log("moduleA");
  if (loadCondition) {
    require("./moduleA");
  }
}

/*
* The path to the module definition might reference:
? a director
? or it might be a single JavaScript file
 */

/*
 ? The exports object is extremely flexible, and can take on multiple forms. 
 ? If you are looking to export only a single entity, you are able to perform a direct assignment to module.exports:
  */

{
  module.exports = "foo";
}

{
  //* , the entire module interface is a string
  var moduleA = require("./moduleB");
  console.log(moduleB);
  // 'foo'
}

{
  //* It is also very common to bundle multiple values into exports
  // Equivalent:
  module.exports = {
    a: "A",
    b: "B",
  };

  module.exports.a = "A";
  module.exports.b = "B";
}

//* One of the primary uses of modules is to house class definitions
{
  class A {}

  module.exports = A;
  var A = require("./moduleA");

  var a = new A();

  //   it is also possible to assign an instance of a class as the exported value:
  class A {}

  module.exports = new A();

  // Furthermore, CommonJS supports programmatic dependencies:
  if (condition) {
    var A = require("./moduleA");
  }
}
/*
! s CommonJS code executed without encapsulation will declare global variables in the browser—behavior that is undesirable in the module pattern

? A common solution is to bundle the module files together ahead of time
? convert the globals to native JavaScript constructs, encapsulate the module code inside function closures, and serve a single file
 */

console.log("********Asynchronous Module Definition*******");
/*
* Mientras que CommonJS está dirigido a un modelo de ejecución de servidor, donde no hay penalización por cargar todo en la memoria a la vez
?  el sistema de definición de módulo asincrónico (AMD) de definición de módulo está específicamente dirigido a un modelo de ejecución de navegador, donde existen penalizaciones por aumento de la red. latencia
*/
/*
* An AMD module can specify its dependencies with string identifiers,
*  and the AMD loader will call the module factory function once all the dependent modules have loaded.
? Unlike CommonJS, AMD allows you to optionally specify the string identifier for your module.
 */
{
  // Definition for a module with id 'moduleA'. moduleA depends on moduleB,
  // which will be loaded asynchronously.
  define("moduleA", ["moduleB"], function (moduleB) {
    return {
      stuff: moduleB.doStuff(),
    };
  });
}

/*
* AMD also supports the require and exports objects,
?  but the AMD loader will recognize them as native AMD constructs rather than module
definitions:
 */

{
  define("moduleA", ["require", "exports"], function (require, exports) {
    var moduleB = require("moduleB");
    exports.stuff = moduleB.doStuff();
  });

  // Programmatic dependencies are supported using this style:
  define("moduleA", ["require"], function (require) {
    if (condition) {
      var moduleB = require("moduleB");
    }
  });
}

console.log("********Universal Module Definition*********");
/*
* In an attempt to unify the CommonJS and AMD ecosystems, 
? the Universal Module Definition (UMD) convention was introduced to create module code that could be used by both systems. 

? You should never be expected to be authoring this exact wrapper by hand—it should be automatically generated by a build tool.
! Your goal is to be concerned with the content of the modules, not the boilerplate that connects each of them.
 */

{
  (function (root, factory) {
    if (typeof define === "function" && define.amd) {
      // AMD. Register as an anonymous module.
      define(["moduleB"], factory);
    } else if (typeof module === "object" && module.exports) {
      // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = factory(require(" moduleB "));
    } else {
      // Browser globals (root is window)
      root.returnExports = factory(root.moduleB);
    }
  })(this, function (moduleB) {
    //use moduleB in some fashion.
    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {};
  });
}

console.log("--------WORKING WITH ES6 MODULES--------");

console.log("------Module Tagging and Definition-----");
/*
?  A script tag with type="module will signal to the browser that the associated code should be executed as a module
<script type="module">
// module code
</script>
<script type="module" src="path/to/myModule.js"></script>

*/
/*
? También es posible agregar un atributo asíncrono a las etiquetas del módulo. El efecto de esto es doble:
? el orden de ejecución del módulo ya no está vinculado al orden de las etiquetas de script en la página, 
? y el módulo no esperará a que el documento termine de analizar antes de comenzar la ejecución. El módulo de entrada aún debe esperar a que se carguen sus dependencias.

* There are no restrictions as to how many entry modules there can be on a page, 
* and there is no limit to overlap of modules
! it will only ever load a single time

* Modules defined inline cannot be loaded into other modules using import. 
* Only modules loaded from an external file can be loaded using import
 */
{
  // it's a HTML
}

console.log("*********Module Exports********");
{
  /*
    * There are two types of exports in ES6 modules: 
    ? named exports
    ? and default exports
    ! Different types of exports means they are imported differently

    * The export keyword is used to declare a value as a named export
    //? Allowed
    export ...
    //? Disallowed
    if (condition) {
        export ...
    }
*/

  // Allowed
  const foo = "foo";
  export { foo };

  // Allowed
  export const foo = "foo";

  // Allowed, but avoid
  export { foo };
  const foo = "foo";
}
{
  /*
    ? A named export behaves as if the module is a container for exported value
    ? An external module could import this module, and the value foo would be available inside it as a property of that module:
    */
  export const foo = "foo";
  /*
   * Declaration does not need to occur in the same line as the export; you can perform the declaration and export the identifier elsewhere in the module inside an export clause:
   */
  const foo = "foo";
  export { foo };

  /*
    * It is also possible to provide an alias when exporting
    ?  an external module would access this value by    importing this module and using the myFoo export:
*/
  const foo = "foo";
  export { foo as myFoo };

  /*
   *  you can declare multiple named exports inside a single module.
   */
  export const foo = "foo";
  export const bar = "bar";
  export const baz = "baz";
  /*
   *  grouping export declarations is supported, as is aliasing some or all of those exports:
   */
  const foo = "foo";
  const bar = "bar";
  const baz = "baz";
  export { foo, bar as myBar, baz };

  /*
  ! A default export behaves as if the module is the same entity as the exported value.
?  there can only ever be a single default export
  */
  const foo = "foo";
  export default foo;

  /*
   *will recognize the default keyword when provided as an alias
   */
  const foo = "foo";

  // Behaves identically to "export default foo;"
  export { foo as default };
  /*
  * Because there are no incompatibilities between named exports and default exports,
  ?  ES6 allows you to use both in the same module:
   */
  const foo = "foo";
  const bar = "bar";

  export { bar };
  export default foo;

  //* The two export statements can be combined into the same line:
  const foo = "foo";
  const bar = "bar";

  export { foo as default, bar };
}

console.log("*****Module Imports******");
/*
* import statements are hoisted to the top of the module.
?  like the export keyword, the order in which import statements appear relative to the use of the imported values is unimportant
 */
{
  // Allowed
  import { foo } from "./fooModule.js";
  console.log(foo); // 'foo'

  // Allowed, but avoid
  console.log(foo); // 'foo'
  import { foo } from "./fooModule.js";
}

{
  import "./foo.js";
  /* 
  ? Imports are treated as read-only views to the module
  ? When performing a bulk import using *, the aliased collection of named exports behaves as if it were treated with Object.freeze().

  * 
  */
  //  import foo, * as Foo './foo.js'
  foo = "foo"; // Error
  Foo.foo = "foo"; // Error
  foo.bar = "bar"; // Allowed
}

{
  /*
   * Named exports can be retrieved in bulk without specifying their exact identifier using * and providing an identifier for the collection of exports:
   */

  const foo = "foo",
    bar = "bar",
    baz = "baz";

  export { foo, bar, baz };
  import * as Foo from "./foo.js";

  console.log(Foo.foo); // foo
  console.log(Foo.bar); // bar
  console.log(Foo.baz); // baz

  /*
  ? To perform explicit imports, the identifiers can be placed inside an import clause
  */
  import { foo, bar as myBar, baz as myBaz } from "./foo.js";

  console.log(foo); // foo
  console.log(bar); // bar
  console.log(myBaz); // baz

  //! Equivalent
  import { default as foo } from "./foo.js";
  import foo from "./foo.js";

  //? If a module exports both named exports and default exports, it’s possible to retrieve them in the same import statement
  import foo, { bar, baz } from "./foo.js";
  import { default as foo, bar, baz } from "./foo.js";
  import foo, * as Foo from "./foo.js";
}

console.log("*******Module Passthrough Exports*******");
{
  // All named exports in foo.js will be available when importing bar.js.
  //! This syntax will ignore the default value of foo.js if it has one
  export * from "./foo.js";

  //* foo.js
  export const baz = "origin:foo";

  //* bar.js
  export * from "./foo.js";
  export const baz = "origin:bar";
  import { baz } from "./bar.js";

  //* main.js
  console.log(baz); // origin:bar

  //? It’s also possible to enumerate which values from the external module are being passed through to the local exports. This syntax supports aliasing:
  export { foo, bar as myBar } from "./foo.js";

  //* Similarly, the default export of an imported module can be reused and exported as the default export of the current module:
  export { default } from "./foo.js";
  //! This does not perform any copy of the export; it merely propagates the imported reference to the original module.

  //? When performing a re-export, it is also possible to alter the named/default designation from the imported module. A named import can be specified as the default export as follows:
  export { foo as default } from "./foo.js";
}
console.log("******Worker Modules*******");
/*
 * Worker instantiation for both types of workers would behave as follows:
 */
{
  // Second argument defaults to { type: 'classic' }
  const scriptWorker = new Worker("scriptWorker.js");
  const moduleWorker = new Worker("moduleWorker.js", { type: "module" });
}

/*
//?  Legacy browser will not execute this
<script type="module" src="module.js"></script>
//?  Legacy browser will execute this
<script src="script.js"></script>

//* Modern browser will execute this
//* Legacy browser will not execute this
<script type="module" src="module.js"></script>
//* Modern browser will not execute this
//* Legacy browser will execute this
<script nomodule src="script.js"></script>
*/

