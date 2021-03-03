console.log("************The Document Object Model**********");

/*
 * ➤➤ Understanding the DOM as a hierarchy of nodes
 * ➤➤ Working with the various node types
 * ➤➤ Coding the DOM around browser incompatibilities and gotchas
 * ➤➤ Mutation Observers
 */
/*
 * The Document Object Model (DOM) is an application programming interface (API) for HTML and XML documents
 * The DOM represents a document as a hierarchical tree of nodes, allowing developers to add, remove, and modify individual parts of the page
 *
 */
console.log("********HIERARCHY OF NODES********");
//! Every node has a nodeType property that indicates the type of node that it is.
/*
 * ➤➤ Node.ELEMENT _ NODE (1)
 * ➤➤ Node.ATTRIBUTE _NODE (2)
 * ➤➤ Node.TEXT _ NODE (3)
 * ➤➤ Node.CDATA _SECTION_NODE (4)
 * ➤➤ Node.ENTITY _ REFERENCE_ NODE (5)
 * ➤➤ Node.ENTITY _ NODE (6)
 * ➤➤ Node.PROCESSING_INSTRUCTION_NODE (7)
 * ➤➤ Node.COMMENT _ NODE (8)
 * ➤➤ Node.DOCUMENT _NODE (9)
 * ➤➤ Node.DOCUMENT _ TYPE_ NODE (10)
 * ➤➤ Node.DOCUMENT _FRAGMENT _ NODE (11)
 * ➤➤ Node.NOTATION_ NODE (12)
 */
{
  let someNode = document.querySelector("body");

  if (someNode.nodeType == Node.ELEMENT_NODE) {
    console.log("Node is an element.");
  }
}

//* The nodeName and nodeValue Properties
/*
 * Two properties: nodeName and nodeValue -> give specific information about the node.
 *  It’s always best to test the node type before using one of these values
 */

{
  let someNode = document.querySelector("body");
  if (someNode.nodeType == 1) {
    value = someNode.nodeName;
  }
}
//!  For elements, nodeName is always equal to the element’s tag name, and node- Value is always null.

//*The following example shows how nodes stored in a NodeList may be accessed via bracket notation or by using the item() method:

{
  let someNode = document.querySelector("body");
  console.log("*****************");
  console.log(someNode);
  let firstChild = someNode.childNodes[0];
  let secondChild = someNode.childNodes.item(1);
  let count = someNode.childNodes.length;
  console.log(firstChild, secondChild);
  console.log(count);
}

//* length property indicates the number of nodes in the NodeList at that time.
//* It’s possible to convert NodeList objects into arrays using Array.prototype.slice()
{
  let someNode = document.querySelector("body");

  let arrayOfNodes = Array.prototype.slice.call(someNode.childNodes, 0);
  console.log(arrayOfNodes == "array" ? "ARRAY SI" : "ARRAY NO");
  console.log(Array.isArray(arrayOfNodes) ? "ARRAY SI" : "ARRAY NO");
  console.log("----------", arrayOfNodes);
}

//! someNode.firstChild is always equal to someNode.childNodes[0]
//! someNode.lastChild is always equal to someNode.childNodes[someNode.childNodes.length-1]
//! If there is only one child node, firstChild and lastChild point to the same node;
//! if there are no children, then firstChild and lastChild are both null

//* Manipulating Nodes

//* appendChild(), which adds a node to the end of the childNodes list. When complete, appendChild() returns the newly added node
{
  let someNode = document.querySelector("body");
  console.log("~~~~:: ", someNode);

  let link = document.createElement("div");
  // and give it some content
  link.textContent = "Hi there and greetings!";

  // and give it some content
  //   const newContent = document.createTextNode("Hi there and greetings!");
  //   console.log("------", newContent);

  let returnedNode = someNode.appendChild(link);
  console.log("-*-*-", returnedNode == link); // true
  console.log("-*-*-", someNode.lastChild == link); // true
}

//* appendChild()and pass in the first child of a parent, as the following example shows, it will end up as the last child:

{
  let someNode = document.querySelector("body");

  // assume multiple children for someNode
  let returnedNode = someNode.appendChild(someNode.firstChild);
  console.log(returnedNode == someNode.firstChild); // false
  console.log(returnedNode == someNode.lastChild); // true
}

//* INSERT BEFORE
{
  let someNode = document.querySelector("body");

  const span = document.createElement("span");
  span.textContent = "insertBefore text with null...";
  //* INSERT AS LAST CHILD
  returnedNode = someNode.insertBefore(span, null);
  console.log(span == someNode.lastChild); // true

  //* INSERT AS THE NEW FIRST CHILD
  let someP = document.querySelector(".nodes");
  console.log("someP:: ", someP);

  const pp = document.createElement("p");
  pp.textContent = "insertBefore normally...";
  returnedNode = someP.insertBefore(pp, someP.firstChild);
  console.log("+++", returnedNode == pp); // true
  console.log("+++", pp == someP.firstChild); // true

  //* INSERT BEFORE LAST CHILD
  const someDiv = document.createElement("u");
  someDiv.textContent = "INSERT BEFORE LAST CHILD... ";

  returnedNode = someP.insertBefore(someDiv, someP.lastChild);
  console.log(someDiv == someP.childNodes[someP.childNodes.length - 2]); // true
  //! Both appendChild() and insertBefore() insert nodes without removing any
}

//* The replaceChild() method accepts two arguments: the node to insert and the node to replace.
{
  //   let someNode = document.querySelector("body");
  //   const someB = document.createElement("b");
  //   // replace first child
  //   let returnedNode = someNode.replaceChild(someB, someNode.firstChild);
  //   // replace last child
  //   returnedNode = someNode.replaceChild(someB, someNode.lastChild);
}

{
  let someNode = document.querySelector(".nodes");

  // remove first child
  let formerFirstChild = someNode.removeChild(someNode.firstChild);

  // remove last child
  let formerLastChild = someNode.removeChild(someNode.lastChild);

  console.log("------>>>", formerFirstChild, formerLastChild);
}

//* CLONE NODE
{
  const myList = document.querySelector("ul");
  let deepList = myList.cloneNode(true);
  console.log("clone nodes:: ", deepList.childNodes.length); // 3 (IE < 9) or 7 (others)
  let someNode = document.querySelector(".nodes");
  someNode.appendChild(deepList);

  let shallowList = myList.cloneNode(false);
  console.log("clone nodes:: ", shallowList.childNodes.length); // 0

  //* normalize()    If an empty text node is found, it is removed; if text nodes are immediate siblings, they are joined into a single text node
  someNode.normalize();
}

console.log("*********The Document Type*********");
/*
 *  the document object is an instance of HTMLDocument (which inherits from Document)
 * The document object is a property of window and so is accessible globally
 */
//*
{
  let html = document.documentElement; // get reference to <html>
  console.log("<><><><>", html === document.childNodes[0]); // true
  console.log("<><><><>", html === document.firstChild); // true
}

{
  let doctype = document.doctype; // get reference to <!DOCTYPE>
  console.log("doctype :: ", doctype);
}
let comment =
  "<!-- first comment --> <html><body></body></html> <!-- second comment -->";
//!  In practice, however, browsers handle comments outside of the <html> element in different ways with respect to ignoring one or both of the comment nodes.

console.log("*********Document Information");
{
  // get the document title
  let originalTitle = document.title;

  // set the document title
  document.title = "New page title";

  // get the complete URL
  let url = document.URL;

  // get the domain
  let domain = document.domain;

  // get the referrer
  let referrer = document.referrer;

  console.log(
    "*-------*",
    "originalTitle: ",
    originalTitle,
    "URL: ",
    url,
    "DOMAIN:",
    domain,
    "REFERRER:",
    referrer
  );
}

//* Of these three properties, the domain property is the only one that can be set
{
  // page from p2p.wrox.com
  //   document.domain = "wrox.com"; // succeeds
  //   document.domain = "nczonline.net"; // error!
}
//! outer page and the inner page are restricted from accessing each other’s JavaScript objects
//!  If the document.domain value in each page is set to "wrox.com", the pages can then communicate.
{
  // page from p2p.wrox.com
  //   document.domain = "wrox.com"; // loosen - succeeds
  //   document.domain = "p2p.wrox.com"; // tighten - error!
}

console.log("**********Locating Elements********");
//*  retrieve references to a specific element or sets of elements to perform certain operations
/*
 * two methods to this end:
 * getElementById() - accepts a single argument—the ID of an element to retrieve —and returns the element if found, or null if an element with that ID doesn’t exist
 * getElementsByTagName().
 */

{
  let div = document.getElementById("myDiv"); // retrieve reference to the <div>

  // The following code, however, would return null:
  let div1 = document.getElementById("mydiv"); // null

  console.log("divvv:: ", div);
}

//*  retrieves all <img> elements in the page and returns an HTMLCollection
{
  // This code stores an HTMLCollection object in the images variable
  let images = document.getElementsByTagName("img");
}
//* h NodeList objects, items in HTMLCollection objects can be accessed using bracket notation or the item() method.
{
  let images = document.getElementsByTagName("img");
  console.log("++++", images.length);
  // output the number of images
  console.log("++++", images[0].src);
  // output the src attribute of the first image
  console.log("++++", images.item(0).src);
  // output the src attribute of the first image
}

{
  let images = document.getElementsByTagName("img");

  let myImage = images.namedItem("myImage");
  // tb asi
  let myImage1 = images["myImage"];
  console.log("imageeeeeeeeeEE: ", myImage);
  console.log("imageeeeeeeeeEE: ", myImage1);
}

console.log("*****************");
//* To retrieve all elements in the document, pass in * to getElementsByTagName().
{
  let allElements = document.getElementsByTagName("*");
}

//************ getElementsByName().************
//! The getElementsByName() method is most often used with radio buttons, all of which must have the same name to ensure the correct value gets sent to the server
{
  let radios = document.getElementsByName("color");
  console.log("raio--names->", radios);
}
//* As with getElementsByTagName(), the getElementsByName() method returns an HTMLCollection
//*  however, the namedItem() method always retrieves the first item (since all items have the same name).

console.log("*********Special Collections*******");
/*
 * ➤➤ document.anchors —Contains all <a> elements with a name attribute in the document.
 * ➤➤ document.applets—Contains all <applet> elements in the document. This collection is deprecated because the <applet> element is no longer recommended for use.
 * ➤➤ document.forms—Contains all <form> elements in the document. The same as document.getElementsByTagName("form") .
 * ➤➤ document.images—Contains all <img> elements in the document. The same as document. getElementsByTagName("img") .
 * ➤➤ document.links —Contains all <a> elements with an href attribute in the document.
 */

console.log("******Document Writing *******");

//*  write() simply adds the text as is, whereas writeln() appends a new-line character (\n) to the end of the string
{
  document.write("<strong>" + new Date().toString() + "</strong>");
}
//! The open() and close() methods are used to open and close the web page output stream, respectively. Neither method is required to be used when write() or writeln() is used during the course of page loading.

{
}

console.log("-----------The Element Type------------");
console.log("-----------HTML Elements------------");
//* <div id="myDiv" class="bd" title="Body text" lang="en" dir="ltr"></div>
{
  let div = document.getElementById("myDiv");
  console.log(div.id); // "myDiv"
  console.log(div.className); // "bd"
  console.log(div.title); // "Body text"
  console.log(div.lang); // "en"
  console.log(div.dir); // "ltr"
}
//
{
  //   div.id = "someOtherId";
  //   div.className = "ft";
  //   div.title = "Some other text";
  //   div.lang = "fr";
  //   div.dir = "rtl";
}

//!  all HTML elements are represented by an instance of HTMLElement

console.log("*******Getting Attributes*********");
{
  let div = document.getElementById("myDiv2");
  console.log("---->> ", div.getAttribute("id")); // "myDiv"
  console.log("---->> ", div.getAttribute("class")); // "bd"
  console.log("---->> ", div.getAttribute("title")); // "Body text"
  console.log("---->> ", div.getAttribute("lang")); // "en"
  console.log("---->> ", div.getAttribute("dir")); // "ltr"
  console.log("---->> ", div.getAttribute("style")); // "ltr"
  console.log("---->> ", div.style); // "ltr"
  console.log("---->> ", div.onclick); // "ltr"

  let value = div.getAttribute("onclick");
  console.log("+++", value);
}

{
  let div = document.getElementById("myDiv3");
  let value = div.getAttribute("my_special_attribute");
  console.log("----", div.my_special_attribute); // "ltr"
  console.log("*****", value);
}

//! atributos -> propiedades
console.log("*******Setting Attributes*********");

let div = document.getElementById("myDiv2");
{
  console.log(div);
  //   setTimeout(() => {
  div.setAttribute("id", "someOtherId");
  div.setAttribute("class", "ft");
  div.setAttribute("title", "Some other text");
  div.setAttribute("lang", "fr");
  // div.setAttribute("dir", "rtl");
  div.setAttribute("mySuperAttribute", "PAttt");
  console.log(div);
  //   }, 3000);
  //   setTimeout(() => {
  div.id = "someOtherIddd";
  div.align = "lefttt";
  div.mySuperAttribute = "Patty";
  console.log(div);
  //   }, 3100);
}

//* removeAttributes
{
  div.removeAttribute("class");
  div.removeAttribute("style");
}

console.log("********The attributes Property*********");
{
  let id = div.attributes.getNamedItem("id").nodeValue;
  console.log("-*-*-*-*", id);

  let id1 = div.attributes["id"].nodeValue;
  console.log("-*-*-*-*", id1);
}

{
  function outputAttributes(element) {
    let pairs = [];
    for (let i = 0, len = element.attributes.length; i < len; ++i) {
      const attribute = element.attributes[i];
      pairs.push(`${attribute.nodeName}="${attribute.nodeValue}"`);
    }
    return pairs.join(" ");
  }

  console.log(outputAttributes(div));
}

console.log("******Creating Elements**************");
{
  let q = document.createElement("q");
  q.id = "myNewDiv";
  q.className = "box";
  q.textContent = "creating elements...";
  q.setAttribute("mySuperAttribute11", "PAttt11");
  document.body.appendChild(q);
}

{
  //   for (let i = 0, len = element.childNodes.length; i < len; ++i) {
  //     if (element.childNodes[i].nodeType == 1) {
  //       // do processing
  //     }
  //   }

  const myList = document.querySelector("ul");
  console.log("mylist: ", myList);
  console.log("mylist-childNodes: ", myList.childNodes); // 7 elements
  //   let ul = document.getElementById(myList);
  let items = myList.getElementsByTagName("li"); // 3 elements
  console.log("+++", items);
}

console.log("*******The Text Type*********");
//* The text contained in a Text node may be accessed via either the nodeValue property or the data property

{
  let div = document.getElementById("textType1");
  let textNode = div.firstChild; // or div.childNodes[0]

  div.firstChild.nodeValue = "Some other message";
  console.log("div;;;; ", div);
}

{
  // outputs as "Some &lt;strong&gt;other&lt;/strong&gt; message"
  div.firstChild.nodeValue = "Some <strong>other</strong> message";
}

console.log("*********Creating Text Nodes********");
{
  let element = document.createElement("div");
  element.className = "message";

  let textNode = document.createTextNode("Hello world!");
  element.appendChild(textNode);

  document.body.appendChild(element);
}

{
  let element = document.createElement("div");
  element.className = "message1";

  let textNode = document.createTextNode("Hello world1!");
  element.appendChild(textNode);

  let anotherTextNode = document.createTextNode("Yippee1!");
  element.appendChild(anotherTextNode);

  document.body.appendChild(element);
}

console.log("*********Normalizing Text Nodes*********");
{
  let element = document.createElement("div");
  element.className = "message";

  let textNode = document.createTextNode("Hello world!");
  element.appendChild(textNode);

  let anotherTextNode = document.createTextNode("heeeey!");
  element.appendChild(anotherTextNode);

  document.body.appendChild(element);

  console.log(element.childNodes.length); // 2

  element.normalize();
  console.log(element.childNodes.length); // 1
  console.log(element.firstChild.nodeValue); // "Hello world!Yippee!"
}

console.log("********Splitting Text Nodes********");
//*

{
  let element = document.createElement("div");
  element.className = "message";

  let textNode = document.createTextNode("Hello world!");
  element.appendChild(textNode);

  document.body.appendChild(element);

  let newNode = element.firstChild.splitText(5);
  alert(element.firstChild.nodeValue); // "Hello"
  alert(newNode.nodeValue); // " world!"
  alert(element.childNodes.length); // 2
}

console.log("**********WORKING WITH THE DOM***********");

{
  let script = document.createElement("script");
  script.src = "foo.js";
  document.body.appendChild(script);
}

{
  function loadScript(url) {
    let script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
  }

  loadScript("client.js");
}

//* Async Callbacks and the Record Queue
//* The MutationObserver specification is designed for performance

