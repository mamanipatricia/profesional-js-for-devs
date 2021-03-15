console.log("-------------JSON-------------");

/*
* Crockford put forth JSON as a better alternative to XML for accessing structured data in JavaScript because it could be passed directly to eval() and didn’t require the creation of a DOM.

?  JSON is that it is a data format, not a programming language.

?  JSON is not a part of JavaScript even though they share syntax.

 */

/*
 * SYNTAX
? Simple values - —Strings, numbers, Booleans, and null can all be represented in JSON using the same syntax as JavaScript -  undefined is not supported.

? Objects - , objects represent ordered key-value pairs.  Each value may be a primitive type or a complex type.

? Arrays - arrays represent an ordered list of values that are accessible via a numeric index.

* The big difference between JavaScript strings and JSON strings is that JSON strings must use double quotes to be valid (single quotes causes a syntax error).

* Boolean values and null are valid exactly as they are as standalone JSON.
*/

console.log("*********Objects*******");
{
  let person = {
    name: "Nicholas",
    age: 29,
  };

  //*  standard way that developers create object literals
  let object = {
    name: "Nicholas",
    age: 29,
  };

  /*
  JSON:
    {
      "name": "Nicholas",
      "age": 29
    }
  */
}

/*
 * here is no variable declaration (variables don’t exist in JSON).
 * there is no trailing semicolon "  ;  "
 */

/*
    {
      "name": "Nicholas",
      "age": 29,
      "school": {
      "name": "Merrimack College",
      "location": "North Andover, MA"
    }
*/

//* accessing data
{
  // get the title of the third book via
  books[2].title;

  //  typical walk through of a DOM structure
  doc.getElementsByTagName("book")[2].getAttribute("title");
}

//* OBJECTS
/*
* The JSON object has two methods: stringify() and parse().

? these methods serialize JavaScript objects into a JSON string and parse JSON into a native JavaScript value

?  JSON.stringify() outputs a JSON string without any extra white space or indentation,

* 
 */
{
  //* e serializes a JavaScript object into a JSON string using JSON.stringify() and stores it  in jsonText
  let book = {
    title: "Professional JavaScript",
    authors: ["Nicholas C. Zakas", "Matt Frisbie"],
    edition: 4,
    year: 2017,
  };
  let jsonText = JSON.stringify(book);
}

/*
JSON.stringify() outputs a JSON string without any extra white space or indentation

{"title":"Professional JavaScript","authors":["Nicholas C. Zakas","Matt Frisbie"],"
edition":4,"year":2017}
*/

/*
* A JSON string can be passed directly into JSON.parse() and it creates an appropriate JavaScript value

? 
*/

{
  //* , you can create an object similar to the book object using this code:
  let bookCopy = JSON.parse(jsonText);

  //! An error is thrown if the text passed into JSON.parse() is not valid JSON.
}

console.log("********Serialization Options*******");
/*
* JSON.stringify() method actually accepts two arguments to serialize:
?  The first argument is a filter, which can be either an array or a function
? the second argument is an option for indenting the resulting JSON string
*/

/*
* Filtering Results
? If the argument is an array, then JSON.stringify()will include only object properties that are listed in the array
*/
{
  let book = {
    title: "Professional JavaScript",
    authors: ["Nicholas C. Zakas", "Matt Frisbie"],
    edition: 4,
    year: 2017,
  };
  let jsonText = JSON.stringify(book, ["title", "edition"]);
  /*
  * : "title" and "edition".
? These correspond to properties in the object being serialized, so only those properties appear in the resulting JSON string:
{"title":"Professional JavaScript","edition":4}
  */
}

//*
{
  let book = {
    title: "Professional JavaScript",
    authors: ["Nicholas C. Zakas", "Matt Frisbie"],
    edition: 4,
    year: 2017,
  };

  let jsonText = JSON.stringify(book, (key, value) => {
    switch (key) {
      case "authors":
        // "authors" key is translated from an array to a string
        return value.join(",");
      case "year":
        // "year" key is set to 5000
        return 5000;
      case "edition":
        // "edition" key is removed altogether by returning undefined
        return undefined;
      default:
        return value;
    }
  });
  /*
    {"title":"Professional JavaScript","authors":"Nicholas C. Zakas,Matt
    Frisbie","year":5000}
  */
  console.log("*****:: ", jsonText);
}

//* String Indentation
/*
* JSON.stringify() controls indentation and white space

? When this argument is a number, it represents the number of spaces to indent each level.
*/
{
  // o indent each level by four spaces
  let book = {
    title: "Professional JavaScript",
    authors: ["Nicholas C. Zakas", "Matt Frisbie"],
    edition: 4,
    year: 2017,
  };
  let jsonText = JSON.stringify(book, null, 4);
}
/*
The following is the string stored in jsonText:
{
"title": "Professional JavaScript",
"authors": [
"Nicholas C. Zakas",
"Matt Frisbie"
],
"edition": 4,
"year": 2017
}
*/
/*
?  JSON.stringify() also inserts new lines into the JSON string for easier reading.
* The maximum numeric indentation value is 10
* ; passing in a value larger than 10 automatically sets the value to 10.

! If the indentation argument is a string instead of a number, then the string is used as the indentation character for the JSON string instead of a space.
*/
{
  let jsonText = JSON.stringify(book, null, "--");
  /*
    The jsonText value then becomes:
    {
    --"title": "Professional JavaScript",
    --"authors": [
    ----"Nicholas C. Zakas",
    ----"Matt Frisbie"
    --],
    --"edition": 4,
    --"year": 2017
    }
 */
}

//* The toJSON() Method
/*
* Sometimes objects need custom JSON serialization above and beyond what JSON.stringify() can do

? you can add a toJSON() method to the object and have it return the proper JSON representation for itself.
*/
console.log("date-string-json:: ", new Date().toISOString());
{
  let book = {
    title: "Professional JavaScript",
    authors: ["Nicholas C. Zakas", "Matt Frisbie"],
    edition: 4,
    year: 2017,
    toJSON: function () {
      return this.title;
    },
  };

  let jsonText = JSON.stringify(book);
}

/*
* Parsing Options

? JSON.parse() method also accepts an additional argument:

* a function that is called o f each key-value pair.
*  The function is called a reviver function to distinguish it from the replacer (filter)function that JSON.stringify() accepts, e


*/
{
  let book = {
    title: "Professional JavaScript",
    authors: ["Nicholas C. Zakas", "Matt Frisbie"],
    edition: 4,
    year: 2017,
    releaseDate: new Date(2017, 11, 1),
  };

  let jsonText = JSON.stringify(book);

  let bookCopy = JSON.parse(jsonText, (key, value) =>
    key == "releaseDate" ? new Date(value) : value
  );
  alert(bookCopy.releaseDate.getFullYear());
}

//*  The JSON.stringify() and JSON.parse() methods are used for these two operations, respectively. Both methods have a number of options that
//* allow you to change the default behavior to filter or otherwise modify the process.
