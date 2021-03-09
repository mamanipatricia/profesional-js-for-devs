console.log("***********EVENTS***********");
/*
* This model, called the “observer pattern” in traditional software engineering
? Events can be subscribed to using listeners (also called handlers) that execute only when an event occurs the “observer pattern” in traditional software engineering
!  allows a loose coupling between the behavior of a page (defined in JavaScript) and the appearance of the page (defined in HTML and CSS)

 */
console.log("*******EVENT FLOW***********");
/*
? Event flow describes the order in which events are received on the pag
*/
console.log("*********Event Bubbling********");
//* event flow is called event bubbling because an event is said to start at the most specific element (the deepest possible point in the document tree) and then flow upward toward the least specific node (the document).
/*
<!DOCTYPE html>
<html>
<head>
<title>Event Bubbling Example</title>
</head>
<body>
<div id="myDiv">Click Me</div>
</body>
</html>

? When you click the <div> element in the page, the click event occurs in the following order
1. <div>
2. <body>
3. <html>
4. document
! the event goes from div to Document
*/
console.log("*********Event Capturing********");
/*
? Event capturing was really designed to intercept the event before it reached the intended target.
1. document
2. <html>
3. <body>
4. <div>
! the event goes from document to div
 */

console.log("*********DOM Event Flow********");
/*
* The event flow specified by DOM Level 2 Events has three phases:
? * the event capturing phase
? * at the target
? * the event bubbling phase
*/

/*
! *  Event capturing occurs first, providing the opportunity to intercept events if necessary
! * the actual target receives the event
! *  The final phase is bubbling
*/
console.log("********EVENT HANDLERS*********");
/*
* actions performed: by the user or by the browser itself.
? * 1. click, 2. load, 3.mouseover

!  A function that is called in response to an event is called an event handler (or an event listener)
* Event handlers have names beginning with "on"
*/

{
  function showMessage() {
    console.log("Goooood morning...!");
  }
  //! Code executing as an event handler has access to everything in the global scope
}

//* The function accomplishes this via scope chain augmentation using with:
{
  function a() {
    with (document) {
      with (this) {
        // attribute value
      }
    }
  }
}

//* If the element is a form input element, then the scope chain also contains an entry for the parent form element
{
  function b() {
    with (document) {
      with (this.form) {
        with (this) {
          // attribute value
        }
      }
    }
  }
}
//! assigning event handlers using HTML is that it tightly couples the HTML to the JavaScript.

console.log("*******DOM Level 0 Event Handlers*******");
//* To assign an event handler using JavaScript, you must first retrieve a reference to the object to act on.
//! Each element (as well as window and document) has event handler properties that are typically all lowercase, such as onclick

{
  let btn = document.getElementById("myBtn");
  btn.onclick = function () {
    console.log("CLIIIICKED..!");
  };
}

{
  let btn = document.getElementById("myBtn");
  btn.onclick = function () {
    console.log(this.id); // myBtn
  };

  // remove an event handler assigned via the DOM Level 0
  //   btn.onclick = null; // commented intentionally
  console.log("***", btn);
}

console.log("*****DOM Level 2 Event Handlers*******");
//? addEventListener()
//? removeEventListener()

//* to add an event to handler for the click event on a button
{
  //? onclick event handler to a button that will be fired in the bubbling phase (since the last argument is false

  let btn = document.getElementById("myBtn");
  btn.addEventListener(
    "click",
    () => {
      console.log("addEventListener-this.id:: ", this.id);
    },
    false
  );
}
//* The major advantage to using the DOM Level 2 method for adding event handlers is that multiple event handlers can be added
{
  let btn = document.getElementById("myBtn");
  btn.addEventListener(
    "click",
    () => {
      console.log(this.id);
    },
    false
  );

  btn.addEventListener(
    "click",
    () => {
      console.log("Hello World with addEventListener...");
    },
    false
  );
}
//* removeEventListener
{
  let btn = document.getElementById("myBtn");
  let handler = function () {
    console.log("this.id-removeEventListener:: ", this.id);
  };

  btn.addEventListener("click", handler, false); // works!
}
/*
? Internet Explorer Event Handlers
* attachEvent() and detachEvent(). 
* These methods accept the same two arguments: the event handler name and the event handler function
*/
{
  /* 
  var btn = document.getElementById("myBtn");
  btn.attachEvent("onclick", function () {
    console.log("Clicked");
  });
   */
}
//? The attachEvent() method, similar to addEventListener(), can be used to add multiple event handlers to a single element
//! the event handlers fire in reverse of the order they were added
//* Event handlers can always be removed as long as a reference to the same function can be passed into detachEvent()

{
  var btn = document.getElementById("myBtn");
  var handler = function () {
    console.log("Clicked");
  };
  //   btn.attachEvent("onclick", handler);

  // other code here
  //   btn.detachEvent("onclick", handler);
}

console.log("********Cross-Browser Event Handlers********");
//* The full code for EventUtil is as follows:
{
  var EventUtil = {
    addHandler: function (element, type, handler) {
      if (element.addEventListener) {
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
      } else {
        element["on" + type] = handler;
      }
    },

    removeHandler: function (element, type, handler) {
      if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
      } else if (element.detachEvent) {
        element.detachEvent("on" + type, handler);
      } else {
        element["on" + type] = null;
      }
    },
  };

  //* This utility object can be used in the following way:
  let btn = document.getElementById("myBtn");
  let handler = function () {
    console.log("Clicked");
  };

  EventUtil.addHandler(btn, "click", handler);

  // other code here

  EventUtil.removeHandler(btn, "click", handler);
}

console.log("*******THE EVENT OBJECT********");
/*
 * When an event related to the DOM is fired, all of the relevant information is gathered and stored on an object called event.
 */
console.log("*******The DOM Event Object********");
//* an example which references the event object inside the handler both ways
{
  let btn = document.getElementById("myBtn");
  btn.onclick = function (event) {
    console.log(event.type); // "click"
  };

  btn.addEventListener(
    "click",
    (event) => {
      console.log(event.type); // "click"
    },
    false
  );
}

//* The available properties and methods differ based on the type of event that was fired
/*
 * bubbles
 * cancelable
 * currentTarget
 * defaultPrevented
 * detail - Extra information related to the event
 * eventPhase - The phase during which the event handler is being called: 1 for the capturing phase, 2 for “at target,” and 3 for bubbling.
 * preventDefault() - Cancels the default behavior for the event. If cancelable is true, this method can be used.
 * stopImmediate Propagation()
 * stopPropagation()
 * target - The target of the event.
 * trusted - When true, indicates if the event was generated by the browser. When false, indicates the event was created using JavaScript by the developer. (Added in DOM Level 3 Events.)
 * type - The type of event that was fired.
 * View -  This is equal to the window object in which the event occurred
 */

/*
 * Inside an event handler, the this object is always equal to the value of currentTarget
 * whereas target contains only the actual target of the event
 */

//!  If the event handler is assigned directly onto the intended target, then this, currentTarget, and target all have the same value

{
  let btn = document.getElementById("myBtn");
  btn.onclick = function (event) {
    console.log(event.currentTarget === this); // true
    console.log(event.target === this); // true
  };
}
//* Consider the following example, where a click handler is set on document.body:
{
  document.body.onclick = function (event) {
    console.log(event.currentTarget === document.body); // true
    console.log(this === document.body); // true
    console.log(event.target === document.getElementById("myBtn")); // true
  };
  /*
   * When the button is clicked
   *  both this and currentTarget are equal to document.body because that’s where the event handler was registered.
   * click event bubbles up to document.body, where the event is handled
   */
}

//* The type property is useful when you want to assign a single function to handle multiple events
{
  let btn = document.getElementById("myBtn");

  let handler = function (event) {
    switch (event.type) {
      case "click":
        console.log("Clicked with event type/...");
        break;
      case "mouseover":
        event.target.style.backgroundColor = "red";
        break;
      case "mouseout":
        event.target.style.backgroundColor = "";
        break;
    }
  };
  btn.onclick = handler;
  btn.onmouseover = handler;
  btn.onmouseout = handler;
}
//* preventDefault() method is used to prevent the default action of a particular event
//?  The  is to navigate to the URL specified in its href attribute when clicked. default behavior of a link:
{
  let link = document.getElementById("myLink");
  link.onclick = function (event) {
    event.preventDefault();
  };
}

//* stopPropagation method -  stops the flow of an event through the DOM structure immediately canceling any further event capturing or bubbling before it occurs
//? an event handler added directly to a button can call stopPropagation() to prevent an event handler on document.body from being fired
{
  let btn = document.getElementById("myBtn");

  btn.onclick = function (event) {
    console.log("Clicked");
    event.stopPropagation();
  };

  document.body.onclick = function (event) {
    console.log("Body clicked");
  };
  // TODO - IMPORTANT!.... Without the call to stopPropagation() in this example, two messages would be logged when the button is clicked. However, the click event never reaches document.body, so the onclick event handler is never executed.
}

//* The eventPhase property aids in determining what phase of event flow is currently active
/*
 *  if event handler is called during the capture phase, eventPhase is 1
 *  if the event handler is at the target, eventPhase is 2
 *  if the event handler is during the bubble phase, eventPhase is 3
 */

{
  //?  Note that even though “at target” occurs during the bubbling phase, eventPhase is always 2
  let btn = document.getElementById("myBtn");
  btn.onclick = function (event) {
    console.log(event.eventPhase); // 2
  };

  document.body.addEventListener(
    "click",
    (event) => {
      console.log(event.eventPhase); // 1
    },
    true
  );

  document.body.onclick = (event) => {
    console.log(event.eventPhase); // 3
  };
  // TODO  Whenever eventPhase is 2, this, target, and currentTarget are always equal
}

console.log("*********The Internet Explorer Event Object**********");

console.log("*********The Cross-Browser Event Object*********");
//* The EventUtil object described earlier can be augmented with methods that equalize the differences:
{
  var EventUtil = {
    addHandler: function (element, type, handler) {
      // code removed for printing
    },

    getEvent: function (event) {
      return event ? event : window.event;
    },
    getTarget: function (event) {
      return event.target || event.srcElement;
    },

    preventDefault: function (event) {
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    },

    removeHandler: function (element, type, handler) {
      // code removed for printing
    },

    stopPropagation: function (event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    },
  };
}

console.log("********EVENT TYPES********");
/*
 * ➤➤ User interface (UI) events are general browser events that may have some interaction with the BOM.
 * ➤➤ Focus events are fired when an element gains or loses focus.
 * ➤➤ Mouse events are fired when the mouse is used to perform an action on the page.
 * ➤➤ Wheel events are fired when a mouse wheel (or similar device) is used.
 * ➤➤ Text events are fired when text is input into the document.
 * ➤➤ Keyboard events are fired when the keyboard is used to perform an action on the page.
 * ➤➤ Composition events are fired when inputting characters for an Input Method Editor (IME).
 */
/*
? mouse or keyboard (more generic than click or keydown ). This event is deprecated in DOM Level 3 Events
? load —Fires on a window when the page has been completely loaded, on a frameset when all frames have been completely loaded, on an <img> element when it has been completely loaded, or on an <object> element when it has been completely loaded
? unload—Fires on a window when the page has been completely unloaded, on a frameset when all frames have been completely unloaded, or on an <object> element when it has been completely unloaded.
? abort —Fires on an <object> element if it is not fully loaded before the user stops the download process.
? error —Fires on a window when a JavaScript error occurs, on an <img> element if the image specified cannot be loaded, on an <object> element if it cannot be loaded, or on a frameset if one or more frames cannot be loaded..
? select—Fires when the user selects one or more characters in a text box (either <input> or <textarea> ).
? resize —Fires on a window or frame when it is resized.
? scroll—Fires on any element with a scrollbar when the user scrolls it. The <body> element contains the scrollbar for a loaded page.
*/

console.log("********The load Event*********");
/*
* The load event is perhaps the most often used event in JavaScript
? For the window object, the load event fires when the entire page has been loaded, including all external resources such as images, JavaScript files, and CSS files
 */
{
  window.addEventListener("load", (event) => {
    console.log("LOADED...!");
  });
}
//? The second way to assign the onload event handler is to add an onload attribute to the <body> element
// <body onload="console.log('Loaded!')">

//* any events that occur on the window can be assigned via attributes on the <body> element because there is no access to the window element in HTML
/*
{
  let image = document.getElementById("myImage");
  image.addEventListener("load", (event) => {
    console.log(event.target.src);
  });
}
 */

//* it’s important to assign the event before assigning the src property
{
  window.addEventListener("load", () => {
    let image = document.createElement("img");
    image.addEventListener("load", (event) => {
      console.log(event.target.src);
    });
    document.body.appendChild(image);
    image.src = "smile.gif";
  });
}
//* This same technique can be used with the DOM Level 0 Image object
{
  window.addEventListener("load", () => {
    let image = new Image();
    image.addEventListener("load", (event) => {
      console.log("Image loaded!");
    });
    image.src = "smile.gif";
  });
  //? Image constructor is used to create a new image and the event handler is assigned. Some browsers implement the Image object as an <img> element, but not all,
}

//* . Internet Explorer 8 and earlier versions do not support the load event for <script> elements.
/*
{
  window.addEventListener("load", () => {
    let script = document.createElement("script");
    script.addEventListener("load", (event) => {
      console.log("Loaded");
    });

    script.src = "example.js";
    document.body.appendChild(script);
  });
}
{
  window.addEventListener("load", () => {
    let link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.addEventListener("load", (event) => {
      console.log("css loaded");
    });

    link.href = "example.css";
    document.getElementsByTagName("head")[0].appendChild(link);
  });
  //? As with the <script> node, a style sheet does not begin downloading until the href property has been assigned and the <link> element has been added to the document.

}
 */

console.log("*****The unload Event*******");
//* he unload event fires when a document has completely unloaded.
//? The unload event typically fires when navigating from one page to another and is most often used to clean up references to avoid memory leaks
{
  window.addEventListener("unload", (event) => {
    console.log("Unloaded!");
  });
}
//* cond way to assign the event handler, similar to the load event, is to add an attribute to the <body> element
// <body onunload="console.log('Unloaded!')">

console.log("*********The resize Event*********");
//* When the browser window is resized to a new height or width, the resize event fires. This event fires on window, so an event handler can be assigned either via JavaScript or by using the onresize attribute on the <body> element.
{
  window.addEventListener("resize", (event) => {
    console.log("Resized");
  });
}
//? The resize event also fires when the browser window is minimized or maximized.

console.log("**********The scroll Event**********");
{
  window.addEventListener("scroll", (event) => {
    if (document.compatMode == "CSS1Compat") {
      console.log(document.documentElement.scrollTop);
    } else {
      console.log(document.body.scrollTop);
    }
  });
  //? This code assigns an event handler that outputs the vertical scroll position of the page, depending on the rendering mode
}
//! Similar to resize, the scroll event occurs repeatedly as the document is being scrolled, so it’s best to keep the event handlers as simple as possible

console.log("*********Focus Events********");
//* Focus events are fired when elements of a page receive or lose focus
/*
* blur —Fires when an element has lost focus.
* DOMFocusIn —Fires when an element has received focus
* DOMFocusOut —Fires when an element has lost focus. 
* focus—Fires when an element has received focus.
* focusin —Fires when an element has received focus.
* focusout —Fires when an element has lost focus.

? One of the biggest issues with these events is that they don’t bubble.
? This led to the inclusion of focusin and focusout by Internet Explorer and DOMFocusIn and DOMFocusOut by Opera
*/

console.log("********Mouse and Wheel Events*********");
//* There are nine mouse events defined in DOM Level 3 Events.
/*
 * These four mouse events always fire in the following order
 * 1. mousedown
 * 2. mouseup
 * 3. click
 * 4. mousedown
 * 5. mouseup
 * 6. click
 * 7. dblclick
 */
//! Note that the DOM Level 3 feature name is just "MouseEvent" instead of "MouseEvents".

console.log("********Client Coordinates*******");
/*
 * Mouse events all occur at a particular location within the browser viewport. This information is stored in the clientX and clientY properties of the event object. These properties indicate the location of the mouse cursor within the viewport at the time of the event and are supported in all browsers
 ? Client area (all view)
 ? (clientX, clientY)
 */

//* You can retrieve the client coordinates of a mouse event in the following way:
// These properties indicate the location of the mouse cursor within the viewport at the time of the event
{
  //*  onclick event handler to a <div> element. When the element is clicked, the client coordinates of the event are displayed
  let div = document.getElementById("myLink");
  div.addEventListener("click", (event) => {
    console.log(`Client coordinates: ${event.clientX}, ${event.clientY}`);
  });
  //? Keep in mind that these coordinates do not take into account the scroll position of the page, so these numbers do not indicate the location of the cursor on the page
  //! estos números no indican la ubicación del cursor en la página.
}

console.log("*******Page Coordinates*******");
/*
 * page coordinates tell you where on the page the event occurred via the pageX and pageY properties of the event object.
 * These properties indicate the location of the mouse cursor on the page, so the coordinates are from the left and top of the page itself rather than the viewport
 */
{
  //* You can retrieve the page coordinates of a mouse event in the following way:

  let div = document.getElementById("myDiv");
  div.addEventListener("click", (event) => {
    console.log(`Page coordinates: ${event.pageX}, ${event.pageY}`);
  });
}
//! The values for pageX and pageY are the same as clientX and clientY when the page is not scrolled.

console.log("*********Screen Coordinates**********");
//* It’s possible to determine the location of the mouse in relation to the entire screen by using the screenX and screenY properties.

{
  let div = document.getElementById("myDiv");
  div.addEventListener("click", (event) => {
    console.log(`Screen coordinates: ${event.screenX}, ${event.screenY}`);
  });
}
console.log("*********Modifier Keys*********");
/*
? The modifier keys Shift, Ctrl, Alt, and Meta are often used to alter the behavior of a mouse event.
* The DOM specifies four properties to indicate the state of these modifier keys: shiftKey, ctrlKey, altKey, and metaKey. Each of these properties contains a Boolean value that is set to true if the key is being held down or false if the key is not pressed.
 */
{
  let div = document.getElementById("myLink");
  div.addEventListener("click", (event) => {
    let keys = new Array();
    if (event.shiftKey) {
      keys.push("shift");
    }

    if (event.ctrlKey) {
      keys.push("ctrl");
    }

    if (event.altKey) {
      keys.push("alt");
    }

    if (event.metaKey) {
      keys.push("meta");
    }

    console.log("Keys: " + keys.join(","));
  });
}

console.log("********Buttons*********");
/*
 * The DOM button property has the following three possible values
 * 0 for the primary mouse button - left button
 * 1 for the middle mouse button (usually the scroll wheel button)
 *  2 for the secondary mouse button - secondary button
 */
//* For mouse events, detail contains a number indicating how many times a click has occurred at the given location
//? Clicks are considered to be a mousedown event followed by a mouseup event at the same pixel location

console.log("***********he mousewheel Event*********");
/*
 * When the mouse wheel is rolled toward the front of the mouse, wheelDelta is a positive multiple of FIGURE 17-6: 120;
 * when the mouse wheel is rolled toward the rear of the mouse, wheelDelta is a negative multiple of 120
 */
//? An onmousewheel event handler can be assigned to any element on the page or to the document to handle all mouse wheel interactions.
{
  document.addEventListener("mousewheel", (event) => {
    console.log("event.wheelDelta:: ", event.wheelDelta);
  });
  //?  displays the wheelDelta value when the event is fired, to know which direction the mouse wheel was turned
}

console.log("*******Touch Device Support*******");
console.log("---------Accessibility Issues--------");
/*
 *  It’s advisable not to use mouse events other than click to show functionality or cause code execution, as this will severely limit the usability for blind or sight-impaired users
 !  Use click to execute code
 ! Avoid using onmouseover to display new options to the user.
 ! Avoid using dblclick to execute important actions.
 ! The keyboard cannot fire this event.
 */

console.log("---------Keyboard and Text Events--------");
//* Keyboard events are fired when the user interacts with the keyboard
//* keyboard events are largely supported based on the original DOM Level 0 implementations.

/*
* There are three keyboard events:
? keydown—Fires when the user presses a key on the keyboard and fires repeatedly while the key is being held down.
? keypress —Fires when the user presses a key on the keyboard that results in a character and fires repeatedly while the key is being held down. --This event also fires for the Esc key --  DOM Level 3 Events deprecates the keypress event in favor of the textInput event.
? keyup —Fires when the user releases a key on the keyboard.
 */
/* There is only one text event and it is called textInput. This event is an augmentation of keypress intended to make it easier to intercept text input before being displayed to the user. The textInput event fires just before text is inserted into a text box.
 */

//? shiftKey, ctrlKey, altKey and metaKey properties are all available for keyboards events

console.log("**********Key Codes *********");
{
  let textbox = document.getElementById("myText");
  textbox.addEventListener("keyup", (event) => {
    console.log("event.keyCode:: ", event.keyCode);
  });
}

console.log("*******Character Codes*********");

{
  var EventUtil = {
    // more code here
    getCharCode: function (event) {
      if (typeof event.charCode == "number") {
        return event.charCode;
      } else {
        return event.keyCode;
      }
    },
    // more code here
  };

  let textbox = document.getElementById("myText");
  textbox.addEventListener("keypress", (event) => {
    console.log("EventUtil.getCharCode(event)::", EventUtil.getCharCode(event));
  });
  //? Once you have the character code, it’s possible to convert it to the actual character using the String. fromCharCode() method.
}

console.log("*******DOM Level 3 Changes*********");
/*
*  The charCode property, for instance, isn’t part of the DOM Level 3 Events specification for keyboard events.
* Instead, the specification defines two additional properties: key and char.


*/
{
  let textbox = document.getElementById("myText");
  textbox.addEventListener("keypress", (event) => {
    let identifier = event.key || event.keyIdentifier;
    if (identifier) {
      console.log(identifier);
    }
  });
}

//? DOM Level 3 Events also adds a property called location, which is a numeric value indicating where the key was pressed.
{
  setTimeout(() => {
    let textbox = document.getElementById("myText");
    textbox.addEventListener("keypress", (event) => {
      let loc = event.location || event.keyLocation;
      if (loc) {
        console.log("loc::- ", loc);
      }
    });
  }, 500);
}
/*
 * The last addition to the event object is the getModifierState() method. This method accepts a single argument, a string equal to Shift, Control, Alt, AltGraph, or Meta, which indicates the modifier key to check. The method returns true if the given modifier is active (the key is being held down) or false if no
 */
{
  let textbox = document.getElementById("myText");
  textbox.addEventListener("keypress", (event) => {
    if (event.getModifierState) {
      console.log("shift::: ", event.getModifierState("Shift"));
    }
  });
}

console.log("********The textInput Event********");

{
  //?  the character that was inserted into the text box is displayed in a log message.

  let textbox = document.getElementById("myText");
  textbox.addEventListener("textInput", (event) => {
    console.log("event.data::*", event.data);
  });
}
/*
 * There is another property, on the event object, called inputMethod that indicates how the text was input into the control
 * 0,1,2,3,4,5,6,7,8,9
 * you can determine how text was input into a control in order to verify its validity
 */
console.log("*********Composition Events*********");
//* Composition events help to detect and work with such input
/*
 * ➤➤ compositionstart—Fires when the text composition system of the IME is opened, indicating that input is about to commence.
 * ➤➤ compositionupdate—Fires when a new character has been inserted into the input field.
 * ➤➤ compositionend—Fires when the text composition system is closed, indicating a return to normal keyboard input.
 */
/*
 * Composition events are similar to text events in many ways. When a composition event fires, the target is the input field receiving the text. The only additional event property is data, which contains one of the following:
 * ➤➤ When accessed during compositionstart, contains the text being edited (for instance, if text has been selected and will now be replaced).
 * ➤➤ When accessed during compositionupdate , contains the new character being inserted.
 * ➤➤ When accessed during compositionend , contains all of the input entered during this composition session.
 */
{
  let textbox = document.getElementById("myText");
  textbox.addEventListener("compositionstart", (event) => {
    console.log(event.data);
  });
  textbox.addEventListener("compositionupdate", (event) => {
    console.log(event.data);
  });
  textbox.addEventListener("compositionend", (event) => {
    console.log(event.data);
  });
}

console.log("---------Mutation Events---------");

console.log("---------Device Events---------");
//* . Device events allow you to determine how a device is being used

{
  window.addEventListener("load", (event) => {
    let div = document.getElementById("myDiv");
    div.innerHTML = "Current orientation is " + window.orientation;
    window.addEventListener("orientationchange", (event) => {
      div.innerHTML = "Current orientation is " + window.orientation;
    });
  });
}

console.log("*******The deviceorientation Event*********");
/*
 * When deviceorientation fires, it returns information about how the values of each axis have changed relative to the device at rest. The event object has five properties
 */

//? Here’s a simple example that outputs the values for alpha, beta, and gamma:
{
  window.addEventListener("deviceorientation", (event) => {
    let output = document.getElementById("output");
    output.innerHTML = `Alpha=${event.alpha}, Beta=$[event.beta], Gamma=${event.gamma$}<br>`;
  });

  //* ou can use this information to rearrange or otherwise alter elements on the screen in reaction to the device changing its orientation. For example, this code rotates an element in reaction to the device orientation:

  {
    window.addEventListener("deviceorientation", (event) => {
      let arrow = document.getElementById("arrow");
      arrow.style.webkitTransform = `rotate(${Math.round(event.alpha)}deg)`;
    });
  }
  //? This example works only on mobile WebKit browsers because of the use of the proprietary webkit Transform property
}

console.log("*********The devicemotion Event********");
/*
 * This event is designed to inform you when the device is actually moving, not just when it has changed orientation. For instance, devicemotion is useful to determine that the device is falling or is being held by someone who is walking
 */
{
  window.addEventListener("devicemotion", (event) => {
    let output = document.getElementById("output");
    if (event.rotationRate !== null) {
      output.innerHTML +=
        `Alpha=${event.rotationRate.alpha}` +
        `Beta=${event.rotationRate.beta}` +
        `Gamma=${event.rotationRate.gamma}`;
    }
  });
}
console.log("**********Touch and Gesture Events*******");
/*
 *Touch events are fired when a finger is placed on the screen, dragged across the screen, or removed from the screen. The touch events are as follows:
 */
/*
 * touchstart—Fires when a finger touches the screen even if another finger is already touching the screen.
 * touchmove—Fires continuously as a finger is moved across the screen. Calling prevent­ Default() during this event prevents scrolling.
 * touchend—Fires when a finger is removed from the screen.
 * touchcancel —Fires when the system has stopped tracking the touch. It’s unclear in the documentation as to when this can occur
 */

console.log("******MEMORY AND PERFORMANCE*********");
/*
*  In JavaScript, the number of event handlers on the page directly relates to the overall performance of the page.
? 1. The first is that each function is an object and takes up memory; the more objects in memory, the slower the performance
? 2. the amount of DOM access needed to assign all of the event handlers up front delays the interactivity of the entire page
! There are a number of ways that you can improve performance by minding your use of event handlers.
*/

console.log("----------Event Delegation---------");
/*
* The solution to the “too many event handlers” issue is called event delegation.
?  Event delegation takes advantage of event bubbling to assign a single event handler to manage all events of a particular type. The click event, for example, bubbles all the way up to the document level
*/

//* it’s possible to assign one onclick event handler for an entire page instead of one for each clickable element

{
  let item1 = document.getElementById("goSomewhere");
  let item2 = document.getElementById("doSomething");
  let item3 = document.getElementById("sayHi");

  item1.addEventListener("click", (event) => {
    location.href = "http:// www.wrox.com";
  });
  item2.addEventListener("click", (event) => {
    document.title = "I changed the document's title";
  });
  item3.addEventListener("click", (event) => {
    console.log("hi");
  });
}

//?  Event delegation approaches this problem by attaching a single event handler to the highest possible point in the DOM tree
{
  let list = document.getElementById("myLinks");
  list.addEventListener("click", (event) => {
    let target = event.target;
    switch (target.id) {
      case "doSomething":
        document.title = "I changed the document's title";
        break;
      case "goSomewhere":
        location.href = "http:// www.wrox.com";
        break;
    }
  });

  //? In this code, event delegation is used to attach a single onclick event handler to the <ul> element. Because all of the list items are children of this element, their events bubble up and are handled by this function. The event target is the list item that was clicked so you can check the id property to determine the appropriate action.
}
//! The best candidates for event delegation are click, mousedown, mouseup, keydown, keyup, and keypress

console.log("*********Removing Event Handlers*********");
/*
? The more of these connections that exist, the slower a page performs.
 * One way to handle this issue is through event delegation to limit the number of connections that are set up. Another way to manage the issue is to remove event handlers when they are no longer needed.
 */

{
  let btn = document.getElementById("myBtn");
  btn.onclick = function () {
    // do something

    btn.onclick = null; // remove event handler
    document.getElementById("myDiv").innerHTML = "Processing...";
  };
}
//!  it’s a good idea to remove all event handlers before the page is unloaded by using an onunload event handler

//! A good way to think about this technique is that anything done using an onload event handler must be reversed using onunload.

console.log("**********SIMULATING EVENTS*********");
//....
