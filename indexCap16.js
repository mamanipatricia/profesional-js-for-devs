console.log("************DOM Levels 2 and 3**********");
/*
 * ➤➤ Changes to the DOM introduced in Levels 2 and 3
 * ➤➤ The DOM API for manipulating styles
 * ➤➤  Working with DOM traversal and ranges
 */
//? The first level of the DOM focuses on defining the underlying structure of HTML and XML documents

//? DOM Levels 2 and 3 actually consist of several modules that, although related, describe very specific subsets of the DOM
/*
 * DOM Core—Builds on the Level 1 core, adding methods and properties to nodes
 * DOM Views—Defines different views for a document based on stylistic information.
 * DOM Events—Explains how to tie interactivity to DOM documents using events.
 * DOM Style—Defines how to programmatically access and change CSS styling information.
 * DOM Traversal and Range—Introduces new interfaces for traversing a DOM document and selecting specific parts of it.
 * DOM HTML—Builds on the Level 1 HTML, adding properties, methods, and new interfaces
 * DOM Mutation Observers—Allows for definition of callbacks upon changes to the DOM. Mutation Observers were defined in the DOM4 specification to replace Mutation Events.
 */

//* DOM CHANGES

//? DOM Level 3 goes one step further and introduces the following methods to work with namespaces
/*
* ➤➤ isDefaultNamespace( namespaceURI)—Returns true when the specified namespaceURI is the default namespace for the node.
* ➤➤ lookupNamespaceURI(prefix) —Returns the namespace URI for the given prefix.
* ➤➤  lookupPrefix(namespaceURI ) —Returns the prefix for the given namespaceURI.

 */
{
  /*
  console.log(document.body.isDefaultNamespace("http://www.w3.org/1999/xhtml")); //true

  // assume svg contains a reference to <s:svg>
  console.log(svg.lookupPrefix("http://www.w3.org/2000/svg")); // "s"
  console.log(svg.lookupNamespaceURI("s")); // "http://www.w3.org/2000/svg"
  */
}

//* Changes to Node

{
  let div1 = document.createElement("div");
  div1.setAttribute("class", "box");

  let div2 = document.createElement("div");
  div2.setAttribute("class", "box");

  console.log(div1.isSameNode(div1)); // true
  console.log(div1.isEqualNode(div2)); // true
  console.log(div1.isSameNode(div2)); // false

  //? Here, two <div> elements are created with the same attributes. The two elements are equivalent to one another but are not the same.
}

//* DOM Level 3 also introduces methods for attaching additional data to DOM nodes
//?  The setUserData() method assigns data to a node and accepts three arguments: the key to set, the actual data (which may be of any data type), and a handler function
//! DEPRECATED? hmmm
/*
{
  document.body.setUserData("name", "Nicholas", function () {});

  let value = document.body.getUserData("name");
  console.log("----->> ::", value);
}
 */
console.log("**********Changes to iframes***********");
/*
{
  //crear un img
  let iframe = document.getElementById("myIframe");
  let iframeDoc = iframe.contentDocument;
}
 */

console.log("*********STYLES*************");
/*
 * styles are defined in HTML in three ways:
 * including an external style sheet via the <link> element,
 * defining inline styles using the <style> element,
 * and defining element-specific styles using the style attribute.
 */
//? Because CSS property names use dash case (using dashes to separate words, such as background-image), the names must be converted into camel case in order to be used in JavaScript

/* CSS                  JS
 * background-image - style.backgroundImage
 * color            - style.color
 * display          - style.display
 * font-family      - style.fontFamily
 */

{
  let myDiv = document.getElementById("myDiv3");
  // set the background color
  myDiv.style.backgroundColor = "aqua";

  // change the dimensions
  myDiv.style.width = "100px";
  myDiv.style.height = "200px";

  // assign a border
  myDiv.style.border = "1px solid black";

  //? In practice, it’s best to always include the unit of measurement
}

//* Styles specified in the style attribute can also be retrieved using the style object
{
  let myDiv = document.getElementById("myDiv3");

  //* this element’s style attribute can be retrieved
  console.log(myDiv.style.backgroundColor); //"blue"
  console.log(myDiv.style.width); // "10px"
  console.log(myDiv.style.height); //  "25px"
  // jajaj por querer copiar me demore mas
}

//* DOM Style Properties and Methods
//? The DOM Level 2 Style specification also defines several properties and methods on the style object. These properties and methods provide information about the contents of the element’s style attribute and enabling changes

/*
 *
 */
{
  let myDiv = document.getElementById("myDiv4");

  //? e cssText property is the fastest way to make multiple changes to an element’s style because all of the changes are applied at once.
  myDiv.style.cssText = "width: 25px; height: 100px; background-color: green";
  console.log(myDiv.style.cssText);
}

//* The length property is designed for use in conjunction with the item() method for iterating over the CSS properties defined on an element.
{
  let myDiv = document.getElementById("myDiv3");

  for (let i = 0, len = myDiv.style.length; i < len; i++) {
    console.log("####:: ", myDiv.style[i]); // alternately, myDiv.style.item(i)
  }
}

//*  getPropertyValue() to retrieve the actual value of the property
{
  let myDiv = document.getElementById("myDiv3");

  let prop, value, i, len;
  for (i = 0, len = myDiv.style.length; i < len; i++) {
    prop = myDiv.style[i]; // alternately, myDiv.style.item(i)
    value = myDiv.style.getPropertyValue(prop);
    console.log(`prop: ${value}`);
  }
}

//* If you need more information, getPropertyCSSValue() returns a CSSValue object that has two properties: cssText and cssValueType.
{
  //! deprecated..?
  /*
  let myDiv = document.getElementById("myDiv3");

  let prop, value, i, len;
  for (i = 0, len = myDiv.style.length; i < len; i++) {
    prop = myDiv.style[i]; // alternately, myDiv.style.item(i)
    value = myDiv.style.getPropertyCSSValue(prop);
    console.log(`prop:: ${value.cssText} (${value.cssValueType})`);
  }
   */
}

console.log("********Computed Styles***********");
//? The getComputedStyle() method returns a CSSStyleDeclaration object (the same type as the style property) containing all computed styles for the element. Consider the following HTML page:

{
  let myDiv = document.getElementById("myDiv3");
  let computedStyle = document.defaultView.getComputedStyle(myDiv, null);

  console.log("computedStyle:: ", computedStyle.backgroundColor); // "red"
  console.log("computedStyle:: ", computedStyle.width); // "100px"
  console.log("computedStyle:: ", computedStyle.height); // "200px"
  console.log("computedStyle:: ", computedStyle.border); // "1px solid black" in some browsers
  //! The important thing to remember about computed styles in all browsers is that they are read-only
  //! ome browsers set the visibility property to "visible" by default, whereas others have it as "inherit"
}

console.log("***********Working with Style Sheets*********");
//* RULES
{
  let sheet = document.styleSheets[0];
  let rules = sheet.cssRules || sheet.rules; // get rules list
  let rule = rules[0]; // get first rule
  console.log("rule:: ", rule.selectorText); // "div.box"
  console.log("rule:: ", rule.style.cssText); // complete CSS code
  console.log("rule:: ", rule.style.backgroundColor); // "blue"
  console.log("rule:: ", rule.style.width); // "100px"
  console.log("rule:: ", rule.style.height); // "200px"
}

{
  let sheet = document.styleSheets[0];
  let rules = sheet.cssRules || sheet.rules; // get rules list
  let rule = rules[0]; // get  first rule
  rule.style.backgroundColor = "pink";
  console.log(">>> ", rule.style.backgroundColor);
}

console.log("******Creating Rules********");
{
  let sheet = document.styleSheets[0];

  sheet.insertRule(`body { background-color: silver }`, 0); // DOM method
  console.log("creating rules:: ", sheet);
  //! the order is important in determining how the rule cascades into the document.
}

console.log("******Deleting Rules********");
//*  deleteRule(), which accepts a single argument: the index of the rule to remove
{
  let sheet = document.styleSheets[0];
  /*
  //? commented intentionally to not to remove styles
  sheet.deleteRule(0); // DOM method
  sheet.deleteRule(1); // DOM method
  console.log("deleting rule[0]::: ", sheet);
   */
}

console.log("*****Offset Dimensions********");
/*
 * the offsetParent of a <td> element is the <table> element that it’s an ancestor of, because the <table> is the first element in the hierarchy that provides dimensions
 * offsetHeight
 * offsetLeft
 * offsetTop
 * offsetWidth
 */

console.log("*******Client Dimensions ********");
/*
 * There are only two properties related to client dimensions: clientWidth and client­ Height
 * the clientWidth property is the width of the content area plus the width of both the left and the right padding
 
 * The clientHeight property is the height of the content area plus the height of both the top and the bottom padding
 */
//! The most common use of these properties is to determine the browser viewport size.

console.log("********Scroll Dimensions********");
//? The following function checks to see if the element is at the top, and if not, it scrolls it back to the top
{
  function scrollToTop(element) {
    if (element.scrollTop != 0) {
      element.scrollTop = 0;
    }
  }
}

console.log("********TRAVERSALS***********");
/* The DOM Level 2 Traversal and Range module defines two types that aid in sequential traversal of a DOM structure. These types, NodeIterator and TreeWalker, perform depth-first traversals of a DOM structure given a certain starting point */

console.log("*******NodeIterator********");
console.log("*******TreeWalker********");

/*
 * ➤➤  parentNode()—Travels to the current node’s parent.
 * ➤➤  firstChild() —Travels to the first child of the current node.
 * ➤➤  lastChild() —Travels to the last child of the current node.
 * ➤➤  nextSibling()—Travels to the next sibling of the current node.
 * ➤➤  previousSibling()—Travels to the previous sibling of the current node.
 */

//* A TreeWalker object is created using the document.createTreeWalker() method, which accepts the same arguments as document.createNodeIterator(): the root to traverse from , which node types to show, a filter, and a Boolean value indicating if entity references should be expanded. Because of these similarities, TreeWalker can always be used in place of NodeIterator
{
  /*
  let div = document.getElementById("div1");
  let filter = function (node) {
    return node.tagName.toLowerCase() == "li"
      ? NodeFilter.FILTER_ACCEPT
      : NodeFilter.FILTER_SKIP;
  };

  let walker = document.createTreeWalker(
    div,
    NodeFilter.SHOW_ELEMENT,
    filter,
    false
  );

  let node = iterator.nextNode();
  while (node !== null) {
    console.log(node.tagName);
    // output the tag name
    node = iterator.nextNode();
  }
   */
}

console.log("*******RANGES*********");

{
  let range = document.createRange();
  console.log("------>> ", range);
}

/*
 * The simplest way to select a part of the document using a range is to use either selectNode() or selectNodeContents(). These methods each accept one argument, a DOM node
 */
{
  let range1 = document.createRange(),
    range2 = document.createRange(),
    p1 = document.getElementById("p1");
  range1.selectNode(p1);
  range2.selectNodeContents(p1);

  console.log("nooooodes:: ", range1, range2);
}

console.log("*********Complex Selection in DOM Ranges*********");
{
  let p1 = document.getElementById("p1"),
    helloNode = p1.firstChild.firstChild,
    worldNode = p1.lastChild;

  let range = document.createRange();
  range.setStart(helloNode, 2);
  range.setEnd(worldNode, 3);

  console.log("---->> ", range);
}

//? .................

console.log("********cloning DOM ranges***********");

{
  let range = document.createRange();

  let newRange = range.cloneRange();
  console.log("newRange-cloned:: ", newRange);
}

console.log("********CLEANUP***********");
/* using a range, it is best to call the detach() method, which detaches the range
from the document on which it was created. After calling detach(), the range can be safely dereferenced, so the memory can be reclaimed through garbage collection */

{
  range.detach(); // detach from document
  range = null; // dereferenced;
}
