console.log("********DOM Extensions**********");
{
  // Get the body element
  let body = document.querySelector("body");

  // Get the element with the ID "myDiv"
  let myDiv = document.querySelector("#myDiv");

  // Get first element with a class of "selected"
  let selected = document.querySelector(".selected");

  // Get first image with class of "button"
  let img = document.body.querySelector("img.button");
}
console.log("********The querySelectorAll() Method**********");
//* The querySelectorAll() method accepts the same single argument as querySelector()—the CSS query—but returns all matching nodes instead of just one
//*  This method returns a static instance of NodeList.

{
  // Get all <em> elements in a <div> (similar to getElementsByTagName("em"))
  let ems = document.getElementById("myDiv").querySelectorAll("em");

  // Get all elements wthat have "selected" as a class
  let selecteds = document.querySelectorAll(".selected");

  // Get all <strong> elements inside of <p> elements
  let strongs = document.querySelectorAll("p strong");
}

//*= the resulting NodeList object may be iterated over using iteration hooks, item(), or bracket nota- tion to retrieve individual elements
{
  let strongElements = document.querySelectorAll("p strong");

  //* all three of the following loops will have the same effect

  for (let strong of strongElements) {
    strong.className = "important";
  }

  // for (let i = 0; strongElements.length; ++i) {
  //   strongElements.item(i).className = "important";
  // }

  // for (let i = 0; strongElements.length; ++i) {
  //   strongElements[i].className = "important";
  // }
}

console.log("********************");
//* This method accepts a single argument, a CSS selector, and returns true if the given element matches the selector or false if not
{
  if (document.body.matches("body.page1")) {
    //true
  }
  //! easily check if an element... already have the element reference
}

console.log("**********ELEMENT TRAVERSAL**********");
{
  //* Using the Element Traversal properties allows a simplification of the code:
  /*
  let parentElement = document.getElementById("parent");
  let currentChildElement = parentElement.firstElementChild;

  // For zero children, firstElementChild returns null and the loop is skipped
  while (currentChildElement) {
    // You already know this is an ELEMENT_NODE, do whatever work is needed here
    processChild(currentChildElement);
    if (currentChildElement === parentElement.lastElementChild) {
      break;
    }
    currentChildElement = currentChildElement.nextElementSibling;
  }
   */
}

console.log("*********Class-Related Additions*********");
//* major changes in web development since the time HTML4 was adopted is the increased usage of the class attribute to indicate both stylistic and semantic information about elements.

console.log("**********The getElementsByClassName() Method*********");
//* returned value is a NodeList
{
  // Get all elements with a class containing "username" and "current"
  // It does not matter if one is declared before the other
  let allCurrentUsernames = document.getElementsByClassName("username current");

  // Get all elements with a class of "selected" that exist in myDiv's subtree
  let selected = document
    .getElementById("myDiv")
    .getElementsByClassName("selected");

  console.log("allCurrentUsernames:: ", allCurrentUsernames);
  console.log("selected:: ", selected);
}
console.log("************The classList Property**********");
//* classList property is an instance of a ew type of collection named DOMTokenList.
//*  DOMTokenList has a length property to indicate how many items it contains, and individual items may be retrieved via the item() method or using bracket notation.
/*
 *  add(value)
 * contains(value)
 * remove(value)
 *  toggle(value)
 */

{
  let div = document.getElementById("myDiv"); // retrieve reference to the <div>

  div.classList.remove("user");

  // Remove the "disabled" class
  div.classList.remove("disabled");
  // Add the "current" class
  div.classList.add("current");
  // Toggle the "user" class
  div.classList.toggle("user");
  // Figure out what's on the element now
  if (div.classList.contains("bd") && !div.classList.contains("disabled")) {
    // Do stuff
  }
  // Iterate over the class names
  for (let clas of div.classList) {
    // doStuff(clas);
  }
}

console.log("***********Focus Management**********");
//*  An element can receive focus automatically as the page is loading
{
  let button = document.getElementById("myButton");
  button.focus();
  console.log("activateElement:: ", document.activeElement === button); // true
  console.log("---button:: ", button, document.activeElement);

  //  returns a Boolean value indicating if the document has focus
  console.log("FOCUSSSSSSSSS:: ", document.hasFocus()); // true
}

console.log("*********Changes to HTMLDocument***********");

//* the readyState property
//! document.readyState property is as an indicator that the document has loaded.
/*
 * loading—The document is loading.
 * complete —The document is completely loaded.
 */
{
  if (document.readyState == "complete") {
    // Do stuff
    console.log("loaded completed.... ");
  }
}

//* Compatibility Mode
//* Internet Explorer added a property on the document named compatMode whose sole job is to indicate what rendering mode the browser is in

{
  if (document.compatMode == "CSS1Compat") {
    console.log("----> ", "Standards mode");
  } else {
    console.log("----> ", "Quirks mode");
  }
}
//* The head Property
{
  let head = document.head;
  console.log("HEAAD:: ", head);
}

console.log("******Character Set Properties*******");
//* By default, this value is "UTF-16", although it may be changed by using <meta> elements or response headers or through setting the characterSet property directly.
{
  console.log("characterSet:: ", document.characterSet); // "UTF-16"

  document.characterSet = "UTF-8";
}

console.log("*********Custom Data Attributes*********");

{
  // Methods used in this example are for illustrative purposes only
  let div = document.getElementById("myDiv4");

  // Get the values
  let appId = div.dataset.appid;
  let myName = div.dataset.myname;
  console.log("~~~", appId, myName);

  // Set the value
  div.dataset.appId = 1111111;
  div.dataset.myName = "Patricia";

  // Is there a "myname" value?
  if (div.dataset.myName) {
    console.log(`Hello, ${div.dataset.myName}, ${div.dataset.appId}`);
  }
}

console.log("********Markup Insertion********");
//* The innerHTML Property

{
  let div = document.getElementById("myDiv4");

  div.innerHTML = "Hello world!!!!!";
  div.innerHTML = 'Hello & welcome, <b>"reader"!</b>';

  const otherDiv = div.innerHTML;
  console.log("otherDiv::: ", otherDiv);
}

{
  let div = document.getElementById("myDiv4");

  // All these will work
  div.innerHTML = "_<script defer>console.log('hi');</script>";
  div.innerHTML =
    "<div>&nbsp;</div><script defer>console.log('hi??');</script>";
  div.innerHTML =
    "<input type=\"hidden\"><script defer>console.log('hi????!');</script>";

  div.innerHTML =
    '_<style type="text/css">body {background-color: red; }</style>';
  div.removeChild(div.firstChild);

  console.log("INNER HTML::: ", div.innerHTML);
}

//* outerHTML
//* When outerHTML is called on the <div> in this example, the same code is returned, including the code for the <div>.
{
  let div = document.getElementById("myDiv4");

  div.outerHTML = "<p>This is a paragraphhhh.</p>";
}

console.log("***The insertAdjacentHTML() and insertAdjacentText() Methods***");
/*
 * "beforebegin"—Insert just before the element as a previous sibling.
 * "afterbegin"—Insert just inside of the element as a new child or series of children before the first child.
 * "beforeend"—Insert just inside of the element as a new child or series of children after the last child
 * "afterend"—Insert just after the element as a next sibling.
 */
{
  let element = document.getElementById("myDiv3");

  // Insert as previous sibling
  element.insertAdjacentHTML("beforebegin", "<p>Hello world!</p>");
  element.insertAdjacentText("beforebegin", "Hello world!");

  // Insert as first child
  element.insertAdjacentHTML("afterbegin", "<p>Hello world!</p>");
  element.insertAdjacentText("afterbegin", "Hello world!");

  // Insert as last child
  element.insertAdjacentHTML("beforeend", "<p>Hello world!</p>");
  element.insertAdjacentText("beforeend", "Hello world!");

  // Insert as next sibling
  element.insertAdjacentHTML("afterend", "<p>Hello world!</p>");
  element.insertAdjacentText("afterend", "Hello world!");
}

console.log("*********Memory and Performance Issues***********");

// {
//   let values = document.getElementById("content");

//   let itemsHtml = "";
//   for (let value of values) {
//     itemsHtml += `<li>${value}</li>`;
//   }
//   ul.innerHTML = itemsHtml;
// }

// {
//   ul.innerHTML = values.map((value) => `<li>${value}</li>`).join("");
// }

//* Cross-Site Scripting Considerations
//*  it is nearly always inadvisable to do so using innerHTML. The headaches of preventing XSS vulnerabilities far outweigh any convenience benefits gained from using innerHTML.

//!  don’t hesitate to use libraries that escape interpolated data before inserting them into the page

console.log("*********The scrollIntoView() Method********");
/*
 * The scrollIntoView() method exists on all HTML elements and scrolls the browser window or container element so the element is visible in the viewport
 * If an argument of true is supplied, it specifies alignToTop: The window scrolls so that the top of the element is at the top of the viewport.
 * If an argument of false is supplied, it specifies alignToTop: The window scrolls so that the bottom of the element is at the top of the viewport.


 */
{
  /*
  // Ensures this element is visible
  document.forms[0].scrollIntoView();

  // These behave identically
  document.forms[0].scrollIntoView(true);
  // document.forms[0].scrollIntoView();
  document.forms[0].scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });

  document.forms[0].scrollIntoView({ block: true });

  // This attempts to scroll the element smoothly into view:
  document.forms[0].scrollIntoView({ behavior: "smooth", block: true });
  */
}

//* The children Property
{
  let element = document.getElementById("myDiv3");

  let childCount = element.children.length;
  let firstChild = element.children[0];
}

//* The contains() Method
{
  console.log("--->>> ", document.documentElement.contains(document.body)); // true
}

console.log("*********Markup Insertion***********");
//* While the innerHTML and outerHTML markup insertion properties were adopted by HTML5 from Internet Explorer

//****** The innerText Property ******
/*
 * When used to read the value, innerText concatenates the values of all text nodes in the subtree in depth-first order.
 *  When used to write the value, innerText removes all children of the element and inserts a text node containing the given value
 */
{
  let div = document.getElementById("myDiv3");

  div.innerText = "INNER TEXT.....";
}

//****** The outerText Property ******
/*
 * For reading text values, outerText and innerText essentially behave in the exact same way. In writing mode, however, outerText behaves very differently
 *  Instead of replacing just the child nodes of the element on which it’s used, outerText actually replaces the entire element, includ- ing its child nodes
 */
{
  div.outerText = "Hello world!";

  let text = document.createTextNode("Hello world!");
  div.parentNode.replaceChild(text, div);
  //! The outerText property is nonstandard, and not on a standards track. It is not recommended that you rely on it for important behavior
}
console.log("********Scrolling*******");
{
  // Make sure this element is visible only if it's not already
  document.images[0].scrollIntoViewIfNeeded();

  //* Because scrollIntoView() is the only method supported in all browsers, this is typically the only one used.
}
