"use strict";

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

console.log("********HIERARCHY OF NODES********"); //! Every node has a nodeType property that indicates the type of node that it is.

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
  var someNode = document.querySelector("body");

  if (someNode.nodeType == Node.ELEMENT_NODE) {
    alert("Node is an element.");
  }
} //* The nodeName and nodeValue Properties

/*
 * Two properties: nodeName and nodeValue -> give specific information about the node.
 *  It’s always best to test the node type before using one of these values
 */

{
  var _someNode = document.querySelector("body");

  if (_someNode.nodeType == 1) {
    value = _someNode.nodeName;
  }
} //!  For elements, nodeName is always equal to the element’s tag name, and node- Value is always null.
//*The following example shows how nodes stored in a NodeList may be accessed via bracket notation or by using the item() method:

{
  var _someNode2 = document.querySelector("body");

  console.log("*****************");
  console.log(_someNode2);
  var firstChild = _someNode2.childNodes[0];

  var secondChild = _someNode2.childNodes.item(1);

  var count = _someNode2.childNodes.length;
  console.log(firstChild, secondChild);
  console.log(count);
} //* length property indicates the number of nodes in the NodeList at that time.
//* It’s possible to convert NodeList objects into arrays using Array.prototype.slice()

{
  var _someNode3 = document.querySelector("body");

  var arrayOfNodes = Array.prototype.slice.call(_someNode3.childNodes, 0);
  console.log(arrayOfNodes == "array" ? "ARRAY SI" : "ARRAY NO");
  console.log(Array.isArray(arrayOfNodes) ? "ARRAY SI" : "ARRAY NO");
  console.log("----------", arrayOfNodes);
} //! someNode.firstChild is always equal to someNode.childNodes[0]
//! someNode.lastChild is always equal to someNode.childNodes[someNode.childNodes.length-1]
//! If there is only one child node, firstChild and lastChild point to the same node;
//! if there are no children, then firstChild and lastChild are both null
//* Manipulating Nodes
//* appendChild(), which adds a node to the end of the childNodes list. When complete, appendChild() returns the newly added node

{
  var _someNode4 = document.querySelector("body");

  console.log("~~~~:: ", _someNode4);
  var link = document.createElement("div"); // and give it some content

  link.textContent = "Hi there and greetings!"; // and give it some content
  //   const newContent = document.createTextNode("Hi there and greetings!");
  //   console.log("------", newContent);

  var _returnedNode = _someNode4.appendChild(link);

  console.log("-*-*-", _returnedNode == link); // true

  console.log("-*-*-", _someNode4.lastChild == link); // true
} //* appendChild()and pass in the first child of a parent, as the following example shows, it will end up as the last child:

{
  var _someNode5 = document.querySelector("body"); // assume multiple children for someNode


  var _returnedNode2 = _someNode5.appendChild(_someNode5.firstChild);

  console.log(_returnedNode2 == _someNode5.firstChild); // false

  console.log(_returnedNode2 == _someNode5.lastChild); // true
} //* INSERT BEFORE

{
  var _someNode6 = document.querySelector("body"); //INSERT AS LAST CHILD


  returnedNode = _someNode6.insertBefore("article", null);
  console.log(newNode == _someNode6.lastChild); // true
}
{
  var z = document.createElement("p"); // is a node

  z.innerHTML = "test satu dua tiga";
  document.body.appendChild(z);
}