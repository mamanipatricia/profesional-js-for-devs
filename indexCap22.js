console.log("--------XML in JavaScript--------");

/*
 *  Examining XML DOM support in browsers
 *  Understanding XPath in JavaScript
 *  Using XSLT processors
 */

/*
? DOM Level 2 was the first specification to introduce the concept of dynamic XML DOM creation 
?  This capability was expanded in DOM Level 3 to include parsing and serialization.

* By the time DOM Level 3 was finalized, however, most browsers had implemented their own solutions.
 */

console.log("-------DOM Level 2 Core---------");

{
  let xmldom = document.implementation.createDocument(
    namespaceUri,
    root,
    doctype
  );
}

//* To create a new XML document with document element of <root>, you can use the following code:
{
  let xmldom = document.implementation.createDocument("", "root", null);

  console.log(xmldom.documentElement.tagName); // "root"

  let child = xmldom.createElement("child");
  xmldom.documentElement.appendChild(child);
}

//* You can check to see if DOM Level 2 XML support is enabled in a browser by using the following line of code:
{
  let hasXmlDom = document.implementation.hasFeature("XML", "2.0");
}

console.log("--------The DOMParser Type-------");

console.log("--------XPATH SUPPORT IN BROWSERS--------");
/*
* XPath was created as a way to locate specific nodes within a DOM document, so it’s important to
XML processing.
 */

console.log("------DOM Level 3 XPath -------");
{
  let supportsXPath = document.implementation.hasFeature("XPath", "3.0");
}
//....