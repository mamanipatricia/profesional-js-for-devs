console.log("**********The Browser Object Model*********");
/*
 * ➤➤ Understanding the window object, the core of the BOM
 * ➤➤ Controlling windows and pop-ups
 * ➤➤ Page information from the location object
 * ➤➤ Using the navigator object to learn about the browser
 * ➤➤  Manipulating the browser history stack with the history object
 */
/* Browser Object Model (BOM) is
really the core of using JavaScript on the web. The BOM provides objects that expose browser
functionality independent of any web page content. */

/*
 * window is an instance of the browser
 * The window object serves a dual purpose in browsers, acting as the JavaScript interface to the browser window and the ECMAScript Global object
 *  every object, variable, and function define in a web page uses window as its Global object and has access to methods like parseInt()
 * window object properties are available in the global scope
 */

console.log("********The Global Scope *********");

//* a variable named age and a function named sayAge() are defined in the global scope, which automatically places them on the window object.
/*
var age = 29;
var sayAge = () => console(this.age);

console(window.age); // 29
sayAge(); // 29
window.sayAge(); // 29
*/
//* If, instead, let or const is substituted for var, the default attachment to the global object does not occur:
/*
{
  let age = 29;
  const sayAge = () => console(this.age);

  console(window.age); // undefined
  sayAge(); // undefined
  window.sayAge(); // TypeError: window.sayAge is not a function
}
*/
//* objects in JavaScript that are considered to be global, such a: "location" and "navigator". but are actually properties of the window object.

/*
 * the window object::
 * via window.parent
 * window.top
 * ...
 *  it’s possible to chain window objects together, such as window.­parent.parent
 */
console.log("*****Window Position and Pixel Ratio******");

/*
* move the window to a new position using the moveTo() and moveBy() method, each method accepts two args:
* moveTo():: x,y coordinates to move to an absolute coordinate
* moveBy():: moveBy() expects the number of pixels to move relative to the current coordinate

*/
{
  //move the windows to the upper-left coordinate
  window.moveTo(0, 0);

  //move the window down by 100 pixeles
  window.moveBy(0, 100);

  //move the window to position (200, 300)
  window.moveTo(200, 300);

  //move the window left by 50 pixels
  window.moveBy(-50, 0);
}

//* Pixel Ratios
/*
 * "CSS pixel" is the denomination of the pixel used universally in web development
 *  It is defined as an angular measurement: 0.0213°, approximately 1/96 of an inch on a device held at arm’s length
 *
 *
 */

console.log("*********Window Size*********");

/*
 * All modern browsers provide four properties: innerWidth, innerHeight, outerWidth, and outerHeight.

 * outerWidth and outerHeight return the dimensions of the browser window itself
 * The innerWidth and innerHeight properties indicate the size of the page viewport inside the browser window
 * The document.documentElement.clientWidth and document.documentElement.clientHeight properties provide the width and height of the page viewport
 * 
 */

//! there’s no accurate way to determine the size of the browser window itself. but it is possible to get the dimensions of the page viewport

{
  let pageWidth = window.innerWidth,
    pageHeight = window.innerHeight;

  if (typeof pageWidth != "number") {
    if (document.compatMode == "CSS1Compat") {
      pageWidth = document.documentElement.clientWidth;
      pageHeight = document.documentElement.clientHeight;
    } else {
      pageWidth = document.documentElement.clientWidth;
      pageHeight = document.documentElement.clientHeight;
    }
  }
}

//* For mobile devices, window.innerWidth and window.innerHeight are the dimensions of the visual viewport, which is the visible area of the page on the screen

/*
 * The browser window can be resized:
 * resizeTo() and resizeBy() methods: EAch method accepts two arguments.
 * resizeTo() expects a new width and height
 * resizeBy() expects the differences in each dimension
 */
/*
* window.resizeBy(xDelta, yDelta):::
 * xDelta is the number of pixels to grow the window horizontally.
 * yDelta is the number of pixels to grow the window vertically.
 
 */
{
  // resize to 100 x 100
  window.resizeTo(100, 100);

  // resize to 200 x 500
  window.resizeBy(100, 50);

  //resize to 300 x 300
  window.resizeTo(300, 300);
}
console.log("*************");
//! these methods apply only to the topmost window object

console.log("**********Window Viewport Position***********");

//* Because the browser window is usually not large enough to display the entire rendered document at once...the ability to scroll around the document with a limited viewport
/*
 *The X and Y offsets are each accessible via two properties, which return identical values: window.pageXoffset / window.scrollX, and window.pageYoffset / window.scrollY
 */

{
  // scroll  down 100px relative to the current viewport
  window.scroll(0, 100);

  // scroll right 40px relative to the current viewport
  window.scroll(40, 0);

  //scroll to the top left corner of the page
  window.scrollTo(0, 0);

  //scroll to 100px from the top and left of the page
  window.scrollTo(100, 100);
}

// these methods also accept a ScrollToOptions dictionary,...
{
  // normal scroll
  window.scrollTo({
    left: 100,
    top: 100,
    behavior: "auto",
  });
  // smooth scroll
  window.scrollTo({
    left: 100,
    top: 100,
    behavior: "smooth",
  });
}

console.log("********Navigating and Opening Windows*********");
/*
 * window.open() method:: used to navigate to a particular URL and to open a new browser window
 * 4 arguments: URL to load, the window target, a string of features, a boolean value indicating that the new page should take the place of the currently loaded page in the browser history
 * only the first three arguments are used; the last argument applies only when not opening a new window.

 */

{
  //* same as <a href="http://www.wrox.com" target="topFrame" />
  window.open("http://www.wrox.com", "topFrame");
}
//* the second argument: _self, _parent, _top, _blank

console.log("**********Popping Up Windows **********");

/* When the second argument doesn’t identify an existing window, a new window or tab is created based on a string passed in as the third argument*/
//! The third argument is ignored when not opening a new window.

//* The third argument is a comma-delimited string of settings indicating display information for the new window

//*  name value pairs are indicated by an equal sign. (No white space is allowed in the feature string.)

{
  window.open(
    "http://www.wrox.com/",
    "wroxWindow",
    "height=400,width=400,top=10,left=10,resizable=yes"
  );
}

//* For instance, some browsers that don’t allow you to resize or move the main browser window by default may allow you to resize or move windows that you’ve created using window.open()
{
  let wroxWin = window.open(
    "http:..www.wrox.com",
    "wroxWindow",
    "height=400,width=400,top=10,left=10,resizable=yes"
  );

  //resize it
  wroxWin.resizeTo(500, 500);

  //move it
  wroxWin.moveTo(100, 100);

  // close window
  // wroxWin.close();

  //* This method works only for pop-up windows created by window.open(). It’s not possible to close the main browser window without confirmation from the user.

  //* Once the window has been closed, the window reference still exists but cannot be used other than to check the closed property,

  wroxWin.close();
  alert(wroxWin.closed); //true
}

//*

{
  let wroxWin = window.open(
    "http://www.wrox.com/",
    "wroxWindow",
    "height=400,width=400,top=10,left=10,resizable=yes"
  );

  alert(wroxWin.opener === window); // true
}

//*
{
  let wroxWin = window.open(
    "http://www.wrox.com/",
    "wroxWindow",
    "height=400,width=400,top=10,left=10,resizable=yes"
  );

  //* Setting opener to null indicates to the browser that the newly created tab doesn’t need to communicate with the tab that opened it
  wroxWin.opener = null;
}

console.log("********Security Restrictions*********");
//* browsers will allow the creation of pop-up windows only after a user action.
//* Pop-up windows may be opened based only on a click or a key press.

console.log("***********Pop-up Blockers**********");
/*
 * All modern browsers have pop-up–blocking software built in
 * When a pop-up is blocked, one of two things happens::
 * * If the browser’s built-in pop-up blocker stopped the pop-up ~~> then window.open() will most likely return null
 * * In that case, you can tell if a pop-up was blocked by checking the return value
 */

{
  //! if the browser’s built-in pop-up blocker stopped the pop-up
  let wroxWin = window.open("http://www.wrox.com", "_blank");
  if (wroxWin == null) {
    alert("the pop-up was blocked!!!!");
  }
}

//* When a browser add-on or other program blocks a pop-up, window.open() typically throws an error

{
  let blocked = false;

  try {
    let wroxWin = window.open("http://www.wrox.com", "_blank");
    if (wroxWin == null) {
      blocked = true;
    }
  } catch (ex) {
    blocked = true;
  }

  if (blocked) {
    console.log("the pop-up aws blocked!!!!...");
  }
}

console.log("********Intervals and Timeouts*********");

console.log("*********settimeouts************");
//* Timeouts execute some code after a specified amount of time, whereas intervals execute code repeatedly, waiting a specific amount of time in between each execution

//* window’s setTimeout() method, which accepts two arguments: the code to execute,  the time (in milliseconds) to wait before scheduling the callback function to be executed

// schedules an alert to show after 1 second
setTimeout(() => {
  alert("HELLO WORLD!!");
}, 1000);

/*
 * JavaScript is single-threaded and, as such, can execute only one piece of code at a time
 * To manage execution, there is a queue of JavaScript tasks to execute
 * The tasks are executed in the order in which they were added to the queue
 * The second argument of setTimeout() tells the JavaScript engine to add this task onto the queue after a set number of milliseconds
 *  If the queue is empty, then that code is executed immediately
 *  if the queue is not empty, the code must wait its turn
 */

//* When setTimeout() is called, it returns a numeric ID for the timeout. The timeout ID is a unique identifier for the scheduled code that can be used to cancel the timeout. To cancel a pending timeout, use the clearTimeout() method and pass in the timeout ID

{
  // set the timeout
  let timeoutId = setTimeout(() => {
    alert("my name is Pat");
  }, 1000);

  // to cancel it
  clearTimeout(timeoutId);

  /* All code executed by a timeout using a conventional anonymous function
runs in the global scope, so the value of this inside the function will always
point to window when running in nonstrict mode and undefined when running
in strict mode. When setTimeout is instead provided an arrow function, this
preserves the lexical scope in which it was defined*/
}

console.log("*********setintervals************");
//* Intervals work in the same way as timeouts except that they schedule the code for execution repeatedly at specific time intervals until the interval is canceled or the page is unloaded

{
  // setInterval(() => {
  //   console.log("hello world setInterval...");
  // }, 1000);
}

//* cancel the interval
{
  let num = 0,
    intervalId = null;
  let max = 10;

  let incrementNumber = function () {
    num++;

    // if the max has been reached, cancel all pending executions
    if (num == max) {
      clearInterval(intervalId);
      console.log("DONEE!!!");
    }
  };

  intervalId = setInterval(incrementNumber, 500);
  console.log(intervalId, "*****");
}

//* This pattern can also be implemented using timeouts

{
  let num = 0;
  let max = 10;

  let incrementNumber = function () {
    num++;

    // if the max has not been reached, set another timeout
    if (num < max) {
      setTimeout(incrementNumber, 500);
    } else {
      console.log("DONE!, FINISHED!!");
    }
  };

  setTimeout(incrementNumber, 500);
}
//! Note that when you’re using timeouts, it is unnecessary to track the timeout ID because the execution will stop on its own and continue only if another timeout is set

//!  True intervals are rarely used in production environments because the time between the end of one interval and the beginning of the next is not necessarily guaranteed, and some intervals may be skipped.

console.log("*******System Dialogs*********");
//* The browser is capable of invoking system dialogs to display to the user through the alert(), confirm(), and prompt() methods

//! each of these dialogs is synchronous and modal, meaning code execution stops when a dialog is displayed, and resumes after it has been dismissed
//* If alert() is passed an argument that is not a string primitive, it will coerce the argument into a string with its .toString() method

confirm("are you sure?");

{
  if (confirm("Are you sure?")) {
    alert("I'm so glad you're sure!");
  } else {
    alert("I'm sorry to hear you're not sure.");
  }

  prompt("What is your name?");

  let result = prompt("What is your name? ", "");
  if (result !== null) {
    alert("Welcome, " + result);
  }
}

//* find and print
{
  // display print dialog
  window.print();

  // display find dialog
  window.find();
}

console.log("*************THE LOCATION OBJECT************");
//* objects is location, which provides information about the document that is currently loaded in the window

/*
 * location.hash - "#contents"
 * location.host - “www.wrox.com:80“
 * location.hostname - “www.wrox.com“
 * location.href - “http://www.wrox.com:80/WileyCDA/?q=javascript#contents“
 * location.pathname - "/WileyCDA/"
 * location.port - "80"
 * location.protocol - "http:"
 * location.search - "?q=javascript"
 * location.username - "foouser"
 * location.password - "barpassword"
 * location.origin - “http:// www.wrox.com“
 */
console.log("**********Query String Arguments********");
{
  let getQueryStringArgs = function () {
    //get query strings without the initial '?'
    let qs = location.search.length > 0 ? location.search.substring(1) : "";
    console.log(qs);
    // object to hold data
    args = {};

    //assign each item onto the args object
    for (let item of qs.split("&").map((kv) => kv.split("="))) {
      console.log("*********", item);
      let name = decodeURIComponent(item[0]),
        value = decodeURIComponent(item[1]);

      if (name.length) {
        args[name] = value;
      }
    }

    return args;
  };

  //assume query string of ?q=javascript&num=10
  let args = getQueryStringArgs();

  alert(args["q"]); // javascript
  alert(["num"]); // "10"
}

//* URLSearchParams
//* URLSearchParams methods which allow you to inspect and modify query parameters using a standardized API
{
  let qs = "?q=javascript&num=10";
  let searchParams = new URLSearchParams(qs);

  alert(searchParams.toString()); // " q=javascript&num=10"
  searchParams.has("num"); // true
  searchParams.get("num"); // 10

  searchParams.set("page", "3");
  alert(searchParams.toString()); // " q=javascript&num=10&page=3"

  searchParams.delete("q");
  alert(searchParams.toString()); // " num=10&page=3"
}

//* Most browsers that support URLSearchParams also support using the URLSearchParams as an iterable object

{
  let qs = "?q=javascript&num=10";
  let searchParams = new URLSearchParams(qs);

  for (let param of searchParams) {
    console.log(param);
  }
  // ["q", "javascript"]
  // ["num", "10"]
}

console.log("***********Manipulating the Location************");
//* assign() method and pass in a URL
{
  //! three approaches to changing the browser location - location.href is most often seen in code
  location.assign("http://www.wrox.com");
  // For example, both of the following perform the same behavior as calling assign() explicitly
  window.location = "http://www.wrox.com";
  location.href = "http://www.wrox.com";
}

//* Changing various properties on the location object can also modify the currently loaded page.
{
  // assume starting at http://www.wrox.com/WileyCDA/

  // changes URL to "http://www.wrox.com/WileyCDA/#section1"
  location.hash = "#section1";

  // changes URL to "http://www.wrox.com/WileyCDA/?q=javascript"
  location.search = "?q=javascript";

  // changes URL to "http://www.yahoo.com/WileyCDA/"
  location.hostname = "www.yahoo.com";

  // changes URL to "http://www.yahoo.com/mydir/"
  location.pathname = "mydir";

  // changes URL to "http://www.yahoo.com:8080/WileyCDA/
  Location.port = 8080;
}
//! Each time a property on location is changed, with the exception of hash, the page reloads with the new URL.

//*  calling replace(), the user cannot go back to the previous page

/*
<!DOCTYPE html>
<html>
<head>
<title>You won't be able to get back here</title>
</head>

<body>
<p>Enjoy this page for a second, because you won't be coming back here.</p>
<script>
setTimeout(() => location.replace("http://www.wrox.com/"), 1000);
</script>
</body>
</html>

/*
* reload() which reloads the currently displayed page
*  When reload() is called with no argument, the page is reloaded in the most efficient way possible. ~~>
* the page may be reloaded from the browser cache if it hasn’t changed since the last request
*  To force a reload from the server, pass in true
*/
{
  location.reload(); // reload - possibly from cache
  location.reload(true); // reload - go back to the server
}

//* Any code located after a reload() call may or may not be executed, depending on factors such as network latency and system resources.  it is best to have reload() as the last line of code

console.log("**********THE NAVIGATOR OBJECT***********");
/*
* The navigator object implements methods and properties defined in the NavigatorID, Navigator Language, NavigatorOnLine, NavigatorContentUtils, NavigatorStorage, NavigatorStorageUtils, NavigatorConcurrentHardware, NavigatorPlugins, and NavigatorUserMedia interfaces.

*/

console.log("*********Detecting Plug-ins**********");
/*
 * to determine whether the browser has a particular plug-in installed
 */

/*
 * ➤➤ name —The name of the plug-in
 * ➤➤ description —The description of the plug-in
 * ➤➤ filename—The filename for the plug-in
 * ➤➤ length —The number of MIME types handled by this plug-in
 * Multipurpose Internet Mail Extensions (MIME)
 */

//* plugins name
{
  //! plugin detection - doesn't work in Internet Explorer 10 or below
  let hasPlugin = function (name) {
    name = name.toLowerCase();
    for (let plugin of window.navigator.plugins) {
      //* hasPlugin() example accepts a single argument: the name of a plug-in to detect
      if (plugin.name.toLowerCase().indexOf(name) > -1) {
        return true;
      }
    }
    return false;
  };

  // detect flash
  alert(hasPlugin("Flash"));
  // detect quicktime
  alert(hasPlugin("QuickTime"));
}
//! window.navigator.plugins
console.log("@@@@@@@#", window.navigator.plugins);
//*  The first step is to convert that name to lowercase for easier comparison. Next, the plugins array is iterated over, and each name property is checked via indexOf() to see if the passed-in name appears somewhere in that string

console.log("*********Legacy Internet Explorer Plugin Detection*******");
//* Plug-ins are implemented in Internet Explorer using COM objects, which are identified by unique strings - So to check for a particular plug-in, you must know its COM identifier
//! you can write a function to determine if the plug-in is installed in Internet Explorer as follows:

{
  // plugin detection for legacy Internet Explorer
  function hasIEPlugin(name) {
    try {
      new ActiveXObject(name);
      return true;
    } catch (ex) {
      return false;
    }
  }
  // detect flash
  alert(hasIEPlugin("ShockwaveFlash.ShockwaveFlash"));
  // detect quicktime
  alert(hasIEPlugin("QuickTime.QuickTime"));
}

console.log("*********Registering Handlers*********");

//* A call can be made for protocols by using registerProtocolHandler(), which accepts three arguments: the protocol to handle (i.e., "mailto" or "ftp"), the URL of the page that handles the protocol, and the name of the application

//*  to register a web application as the default mail client
{
  navigator.registerProtocolHandler(
    "mailto",
    "http://www.somemailclient.com?cmd=%s",
    "Some Mail Client"
  );
}
/* In this example, a handler is registered for the mailto protocol, which will now point to a web-based e-mail client. Once again, the second argument is the URL that should handle the request, and %s
represents the original request.
 */

console.log("**********THE SCREEN OBJECT ***********");
/*
 * The screen object
 * This object provides information about the client’s display outside the browser window, including information such as pixel width and height
 */

console.log("*******THE HISTORY OBJECT*********");
//* The history object represents the user’s navigation history since the given window was first used.

//* It is possible, however, to navigate backwards and forwards through the list of places the user has been without knowing the exact URL.

console.log("*********Navigation************");
/*
 * The go() method navigates through the user’s history in either direction, backward or forward
 *  an integer representing the number of pages to go backward or forward
 * a negative number moves backward in history
 * a positive number moves forward
 */
{
  // go back one page
  history.go(-1);

  // go forward one page
  history.go(1);

  // go forward two pages
  history.go(2);
}

//* go() method argument can also be a string,
{
  // go to nearest wrox.com page
  history.go("wrox.com");

  // go to nearest nczonline.net page
  history.go("nczonline.net");
}

//* Two shortcut methods, back() and forward(), may be used in place of go()
{
  // go back one page
  history.back();

  // go forward one page
  history.forward();
}

//* The history object also has a property, length, which indicates how many items are in the history stack - both those going backward and those going forward

//*  it’s possible to determine if the user’s start point was your page
{
  if (history.length == 0) {
    // this is the first page in the user's window
  }
}

//* The history object typically is used to create custom Back and Forward buttons and to determine if the page is the first in the user’s history.

/* For major browsers released since 2009, this includes changes to the URL hash
(thus, setting location.hash causes a new entry to be inserted into the history
stack for these browsers). This behavior is commonly used by single-page appli­cation frameworks, which wish to simulate Back and Forward button function­ality without causing full page reloads upon each navigation event.
 */

console.log("***********History State Management ************");
//* the hashchange event simply let you know when the URL hash changed and expected you to act accordingly

/*
 * the hashchange event simply let you know when the URL hash changed and expected you to act accordingly, the state management API actually lets you change the browser URL without loading a new page.
 */
{
  let stateObject = { foo: bar };

  history.pushState(stateObject, "My title", "baz.html");
  //* As soon as pushState() executes, the state information is pushed onto the history stack and the browser’s address bar changes to reflect the new relative URL
}

//*
{
  window.addEventListener("popstate", (event) => {
    let state = event.state;
    if (state) {
      // state is null when at first page load
      processState(state);
    }
  });
}
//* You can access the current state object by using history.state. You can also update the current state information by using replaceState() and passing in the same first two arguments as push- State(). Doing so does not create a new entry in history, it just overwrites the current state:
{
  history.replaceState({ newFoo: "newBar" }, "New title");
  //* The state object passed into pushState() or replaceState() should only contain informa- tion that can be serialized. Therefore, things like DOM elements are inappropriate for use in the state object.
}

//* make sure that any "fake" URL you create using pushState() is backed up by a real, physical URL on the web server. Otherwise, hitting the Refresh button will result in a 404. All single-page application (SPA) frameworks must address this problem in some way via configuration on the server or client.

