console.log("*******Workers*******");
/*
 * Introduction to workers
 * Running background tasks with dedicated workers
 * Using with shared workers
 * Managing requests with service workers
 */

//? WITHOUT WORKERS:: This provides each page its own memory, event loop, DOM, and so on. E
//? Each page is more or less sandboxed and cannot interfere with other pages.
/*
*  USING WORKERS:::, browsers are able to allocate a second child environment that is totally separated from the original page environment.
? This child environment is prevented from interacting with single thread–dependent constructs such as the DOM, but is otherwise free to execute code in parallel with the parent environment.

*/
