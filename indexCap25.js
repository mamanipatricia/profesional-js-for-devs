console.log("*******Client-SideStorage******");
/*
 * ➤➤ Cookies
 * ➤➤ Browser storage APIs
 * ➤➤ IndexedDB
 */
/*
? Along with the emergence of web applications came a call for the ability to store user information directly on the client
?  information pertaining to a specific user should live on that user’s machine.
! HTTP cookies, commonly just called cookies
*/

{
  /*
    HTTP/1.1 200 OK
    Content-type: text/html
    Set-Cookie: name=value
    Other-header: other-header-value
 */
  /*
   ? This HTTP response sets a cookie with the name of "name" and a value of "value".  Both the name and the value are URL-encoded when sent
   * Browsers store such session information and send it back to the server via the Cookie HTTP header for every request after that point,
   */
}

//* RESTRICTIONS
/*
 * Cookies are, by nature, tied to a specific domain. When a cookie is set, it is sent along with requests to the same domain from which it was created.
 */

/*
? Name
? value
? domain
? path
? expiration
? secureFlag
 */

{
  //* Each piece of information is specified as part of the Set-Cookie header using a semicolon-space combination to separate each section
  /*
    HTTP/1.1 200 OK
    Content-type: text/html
    Set-Cookie: name=value; expires=Mon, 22-Jan-07 07:10:24 GMT; domain=.wrox.com
    Other-header: other-header-value

    */
}

console.log("******Cookies in JavaScript*****");
/*
*  document.cookie returns a string of all cookies available to the page (based on the domain, path, expiration, and security settings
of the cookies) as a series of name-value pairs separated by semicolons
? All of the names and values are URL-encoded and so must be decoded via decodeURIComponent().
* the document.cookie property can be set to a new cookie string.
? The format to set a cookie is as follows = name=value; expires=expiration_time; path=domain_path; domain=domain_name; secure
*/

{
  // only the cookie’s name and value are required
  document.cookie = "name=Nicholas";
  /*
  ? This code creates a session cookie called "name" that has a value of "Nicholas". This cookie will be sent every time the client makes a request to the server; it will be deleted when the browser is closed.

  */
}

{
  //*  it’s a best practice to always use encodeURIComponent() when setting a cookie,
  document.cookie =
    encodeURIComponent("name") + "=" + encodeURIComponent("Nicholas");

  //* To specify additional information about the created cookie, just append it to the string in the same format as the Set-Cookie header
  document.cookie =
    encodeURIComponent("name") +
    "=" +
    encodeURIComponent("Nicholas") +
    "; domain=.wrox.com; path=/";
}

//*
{
  // set cookies
  CookieUtil.set("name", "Nicholas");
  CookieUtil.set("book", "Professional JavaScript");

  // read the values
  alert(CookieUtil.get("name")); // "Nicholas"
  alert(CookieUtil.get("book")); // "Professional JavaScript"

  // remove the cookies
  CookieUtil.unset("name");
  CookieUtil.unset("book");

  // set a cookie with path, domain, and expiration date
  CookieUtil.set(
    "name",
    "Nicholas",
    "/books/projs/",
    "www.wrox.com",
    new Date("January 1, 2010")
  );

  // delete that same cookie
  CookieUtil.unset("name", "/books/projs/", "www.wrox.com");

  // set a secure cookie
  CookieUtil.set("name", "Nicholas", null, null, null, true);
}

console.log("*******Subcookies******");
/*
* Subcookies are smaller pieces of data stored within a single cookie. 
? The idea is to use the cookie’s value to store multiple name-value pairs within a single cookie.
* ejemplo:  name=name1=value1&name2=value2&name3=value3&name4=value4&name5=value5

*/
/*
* There are two methods for retrieving subcookies: get() and getAll()
?  Whereas get() retrieves a single subcookie value
? getAll() retrieves all subcookies and returns them in an object - whose properties are equal to the subcookie names and the values are equal to the subcookie values

!  The get() method accepts two arguments: the name of the cookie and the name of the subcookie

! It simply calls getAll() to retrieve all of the subcookies and then returns just the one of interest (or null if the cookie doesn’t exist).

*/

{
  /*
  * The SubCookieUtil.getAll() method is very similar to CookieUtil.get() in the way it parses a cookie value
    ?  Both items are decoded using decodeURIComponent() and assigned on the result object
    ? If the cookie doesn’t exist, then null is returned.

     */
  //*  assume document.cookie=data=name=Nicholas&book=Professional%20JavaScript
  // get all subcookies
  let data = SubCookieUtil.getAll("data");
  alert(data.name); // "Nicholas"
  alert(data.book); // "Professional JavaScript"

  // get subcookies individually
  alert(SubCookieUtil.get("data", "name")); // "Nicholas"
  alert(SubCookieUtil.get("data", "book")); // "Professional JavaScript"
}

//* to write subcookies
{
  // To write subcookies, you can use two methods: set() and setAll()

  //* assume document.cookie=data=name=Nicholas&book=Professional%20JavaScript

  // set two subcookies
  SubCookieUtil.set("data", "name", "Nicholas");
  SubCookieUtil.set("data", "book", "Professional JavaScript");

  // set all subcookies with expiration date
  SubCookieUtil.setAll(
    "data",
    { name: "Nicholas", book: "Professional JavaScript" },
    new Date("January 1, 2010")
  );

  // change the value of name and change expiration date for cookie
  SubCookieUtil.set("data", "name", "Michael", new Date("February 1, 2010"));
}

{
  //*  Regular cookies are removed by setting the expiration date to some time in the past, but subcookies cannot be removed as easily
  // ?  In order to remove a subcookie, you need to retrieve all subcookies contained within the cookie,
  // ? eliminate just the one that is meant to be removed, and then set the value of the cookie back with the remaining subcookie values.

  // just remove the "name" subcookie
  SubCookieUtil.unset("data", "name");

  // remove the entire cookie
  SubCookieUtil.unsetAll("data");
}
//! The larger the cookie information, the longer it will take to complete the request to the serve
/*
!  Avoid storing important or sensitive data in cookies. 
? Cookie data is not stored in a secure environment, so any data contained within may be accessible
by others.
?  You should avoid storing data such as credit card numbers or personal addresses in cookies.

 */

console.log("*******WEB STORAGE ***********");
/*
* . The two primary goals of the Web Storage specification are:
?  To provide a way to store session data outside of cookies.
?  To provide a mechanism for storing large amounts of data that persists across sessions
*/
/*
* Web Storage specification includes definitions for two objects
? : localStorage, the permanent storage mechanism
?  sessionStorage, the session-scoped storage mechanism.
! both can survive a page reload
*/

/*
* THE STORAGE TYPE
? Storage type is designed to hold name-value pairs up to a maximum size (determined by
the browser
? f Storage acts like any other object
*  has the following additional methods:

?  clear()—Removes all values; not implemented in Firefox.
?  getItem(name)—Retrieves the value for the given name
? key(index)—Retrieves the name of the value in the given numeric position.
? removeItem(name) —Removes the name-value pair identified by name.
? setItem(name, value) —Sets the value for the given name.
! The Storage type is capable of storing only strings.
! Nonstring data is automatically converted into a string before being stored.
*/

console.log("********The sessionStorage Object*******");
/*
 * The sessionStorage object stores data only for a session - meaning that the data is stored until the browser is closed.

 ? sessionStorage object is an instance of Storage
 ? you can assign data onto it either by using setItem() or by assigning a new property directly

 * 
 */
{
  // store data using method
  sessionStorage.setItem("name", "Nicholas");

  // store data using property
  sessionStorage.book = "Professional JavaScript";
  //! All modern browsers implement storage writing as a blocking synchronous action, so data added to storage is committed right away
}

{
  //* You can iterate over the values in sessionStorage using a combination of the length property and key() method

  for (let i = 0, len = sessionStorage.length; i < len; i++) {
    let key = sessionStorage.key(i);
    let value = sessionStorage.getItem(key);
    alert(`${key}=${value}`);
  }
}

{
  /*
? The name-value pairs in sessionStorage can be accessed sequentially by first retrieving the name of the data in the given position via key() and then using that name to retrieve the value via getItem().   */
  // It’s also possible to iterate over the values in sessionStorage using a for-in loop:
  for (let key in sessionStorage) {
    let value = sessionStorage.getItem(key);
    alert(`${key}=${value}`);
  }
}

//* To remove data from sessionStorage, you can use either the delete operator on the object property or the removeItem() method

{
  // use delete to remove a value
  delete sessionStorage.name;

  // use method to remove a value
  sessionStorage.removeItem("book");
}
/*
! The sessionStorage object should be used primarily for small pieces of data that are valid only for
a session. If you need to persist data across sessions, then either globalStorage or localStorage is
more appropriate.
 */

console.log("*********The localStorage Object ********");
/*
* The localStorage object superceded globalStorage in the revised HTML5 specification as a way to store persistent client-side data

?  In order to access the same localStorage object, pages must
be served from the same domain (subdomains aren’t valid), using the same protocol, and on the
same port.
*/
{
  //*  localStorage is an instance of Storage, it can be used in exactly the same manner as ses- sionStorage

  // store data using method
  localStorage.setItem("name", "Nicholas");

  // store data using property
  localStorage.book = "Professional JavaScript";

  // get data using method
  let name = localStorage.getItem("name");

  // get data using property
  let book = localStorage.book;
}
//! The difference between the two storage methods is that data stored in localStorage is persisted until it is specifically removed via JavaScript or the user clears the browser’s cache

console.log("******The storage Event*********");
/*
*  The event object has the following four properties:
? domain—The domain for which the storage changed.
? key—The key that was set or removed.
? newValue—The value that the key was set to, or null if the key was removed.
?  oldValue —The value prior to the key being changed.
*/
{
  // You` can listen for the storage event using the following code:
  window.addEventListener("storage", (event) =>
    alert("Storage changed for ${event.domain}")
  );
}
//! Storage limits for localStorage and sessionStorage are inconsistent across browsers, but most will limit the per-origin storage to 5MB

console.log("*******INDEXEDDB******");
/*
* The Indexed Database API, 
? IndexedDB for short, is a structured data store in the browser.

? t IndexedDB uses object stores instead of tables to keep track of data.
? An IndexedDB database is simply a collection of object stores grouped under a common name—a NoSQL-style implementation.


*/

{
  /* 
    ?La llamada a indexDB.open () devuelve una instancia de IDBRequest a la que puede adjuntar controladores de eventos onerror y onsuccess
    */

  let db,
    request,
    version = 1;

  request = indexedDB.open("admin", version);
  request.onerror = (event) =>
    alert(`Failed to open: ${event.target.errorCode}`);
  request.onsuccess = (event) => {
    db = event.target.result;
  };
}

console.log("*****Object Stores*****");
{
  /*
   *  store user records containing username, password, and so on
   */
  let user = {
    username: "007",
    firstName: "James",
    lastName: "Bond",
    password: "foo",
  };

  //* Here’s how you would create an object store for these users:
  // * If the database doesn’t yet exist, the open() operation creates it; then, an upgradeneeded event is fired
  /*
   */
  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    // Delete the current objectStore if it exists. This is useful for testing,
    // but this will wipe existing data each time this event handler executes.
    if (db.objectStoreNames.contains("users")) {
      db.deleteObjectStore("users");
    }
    db.createObjectStore("users", { keyPath: "username" });
  };
}

db.transaction();
//! .....
