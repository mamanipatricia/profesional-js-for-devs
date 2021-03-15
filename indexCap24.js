console.log("******Network Requests and Remote Resources*******");
/*
 * Using the XMLHttpRequest object
 * Working with XMLHttpRequest events
 * Cross-domain Ajax restrictions
 * Fetch API
 * Streams API
 */

/*
 *  Prior to the introduction of XHR, Ajax-style communication had to be accomplished through a number of hacks, mostly using hidden frames or iframe

 ? XHR introduced a streamlined interface for making server requests and evaluating the responses. This allowed for asynchronous retrieval of additional

 * , Ajax communication is format-agnostic; he technique is about retrieving data from the server without refreshing a page, not necessarily about XML.

 ! Fetch API has blossomed as a modernized replacement for XHR. Its support for promises and service workers has made it an incredibly powerful web development tool.
 */

console.log("******THE XMLHttpRequest OBJECT *******");

/*
* XHR Usage
? To begin using an XHR object, you will first call the method open()
* ("get", "post", and so on)
*  the URL for the request, 
* and a Boolean value indicating if the request should be sent asynchronously
*/
{
  // This line opens a synchronous GET request for example.php
  //* the call to open() does not actually send the request; it simply prepares a request to be sent.
  /* 
  xhr.open("get", "example.php", false);
  //* The send() method accepts a single argument, which is data to be sent as the body of the request.
  xhr.send(null);

  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
    alert(xhr.responseText);
  } else {
    alert("Request was unsuccessful: " + xhr.status);
  }
   */
}

console.log("--------HTTP Headers---------");
/*
* Every HTTP request and response sends along with it a group of header information that may or may not be of interest to the developer.

? The XHR object exposes both types of headers—those on the request and those on the response—through several methods.

*/

console.log("----------CROSS-ORIGIN RESOURCE SHARING-----------");
/*
* One of the major limitations of Ajax communication via XHR is the cross-origin security policy
--------
? Cross-Origin Resource Sharing (CORS) defines how the browser and server must communicate when accessing sources across origins.
* The basic idea behind CORS is to use custom HTTP headers to allow both the browser and the server to know enough about each other to determine if the request or response should succeed or fail.

 */
{
  // An example Origin header might look like this:
  // Origin: http://www.nczonline.net
  // xhr.open("get", "http://www.somewhere-else.com/page/", true);
  // xhr.send(null);
}

{
  /*
    Here’s an example assuming a POST reques with a custom header called NCZ:
        Origin: http://www.nczonline.net
        Access-Control-Request-Method: POST
        Access-Control-Request-Headers: NCZ
    */
}

/*
* By default, cross-origin requests do not provide credentials (cookies, HTTP authentication, and client side SSL certificates)

* You can specify that a request should send credentials by setting the with­ Credentials property to true.

* If the server allows credentialed requests, then it responds with the following HTTP header:
Access-Control-Allow-Credentials: true

*/

console.log("--------THE FETCH API----------");
/*
* Whereas the XMLHttpRequest is optionally asynchronous
! all requests dispatched by the Fetch API are strictly asynchronous.

* 

*/

//* Basic API Utilization
//? The fetch() method is available in any global scope, both in the primary page execution, modules, and inside workers
/*
* Dispatching a Request

* The fetch() method has only a single required parameter input, which most of the time will be the URL of the resource you wish to fetch.

? 

 */
{
  let r = fetch("/bar");
  console.log(r); // Promise <pending>
}

{
  //* When the request completes and the resource is available, the promise will resolve into a Response object,

  fetch("bar.txt").then((response) => {
    console.log(response);
  });
  // Response { type: "basic", url: ... }
}

console.log("------Reading a Response------");
/*
 * The simplest way to read the contents of a response is in the raw text format
 */
{
  fetch("bar.txt").then((response) => {
    response.text().then((data) => {
      console.log(data);
    });
  });
  // Contents of bar.txt!

  //* This promise structure is commonly flattened:
  fetch("bar.txt")
    .then((response) => response.text())
    .then((data) => console.log(data));
  // Contents of bar.txt!
}

//* Handling Status Codes and Request Failures
{
  /*
   * The Fetch API allows you to inspect the Response object’s status code and status text, accessible via the status and statusText properties, respectively
   */

  //! status
  //! statusText
  fetch("/bar").then((response) => {
    console.log(response.status); // 200
    console.log(response.statusText); // OK
  });
}
//! If the server sends a response of any kind, the fetch() promise will resolve.

//* To differentiate between these, the Response object’s ok property identifies when the response code is between 200–299.
//! response.ok
{
  fetch("/bar").then((response) => {
    console.log(response.status); // 200
    console.log(response.ok); // true
  });

  fetch("/does-not-exist").then((response) => {
    console.log(response.status); // 404
    console.log(response.ok); // false
  });
}

{
  fetch("/hangs-forever").then(
    (response) => {
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
  );
  /*
   * The request promise rejects for reasons such as for reasons such as CORS violations
   * a lack of connection to a network,
   * HTTPS violations,
   * and other browser/network policy violations.
   */
}

{
  // You can inspect the full URL used by fetch() when dispatching the request with the url property:
  /* 
  // Requests made from foo.com/bar/baz
  console.log(window.location.href); // https://foo.com/bar/baz

  fetch("qux").then((response) => console.log(response.url));
  // https://foo.com/bar/qux

  fetch("/qux").then((response) => console.log(response.url));
  // https://foo.com/qux

  fetch("//qux.com").then((response) => console.log(response.url));
  // https://qux.com

  fetch("https://qux.com").then((response) => console.log(response.url));
  // https://qux.com
   */
}
//? When used with only a URL, fetch()will dispatch a GET request with a minimal set of request headers

/*
* method
? Used to specify the HTTP method of a request.
? Will almost always be one of the following string values:
* GET
* POST
* PUT
* PATCH
* DELETE
* HEAD
* OPTIONS
* CONNECT
* TRACE
* Defaults to GET.
*/

console.log("******Sending JSON Data*******");
{
  // A simple JSON string could be sent to a server as follows:
  let payload = JSON.stringify({
    foo: "bar",
  });

  let jsonHeaders = new Headers({
    "Content-Type": "application/json",
  });

  fetch("/send-me-json", {
    method: "POST", // Must use an HTTP method which sends a body
    body: payload,
    headers: jsonHeaders,
  });
}

{
  //* Sending Files
  /*
   * Because the body supports FormData instances, a fetch() will happily serialize and send a file plucked from a file picker form input:
   */
  /*
  let imageFormData = new FormData();
  let imageInput = document.querySelector("input[type='file']");

  imageFormData.append("image", imageInput.files[0]);

  fetch("/img-upload", {
    method: "POST",
    body: imageFormData,
  });
   */
}

console.log("******Loading Files as Blobs********");
/*
 * The Fetch API is able to provide the response as a Blob
 */

{
  const imageElement = document.querySelector("#myImage");

  fetch("my-image.png")
    .then((response) => response.blob())
    .then((blob) => {
      imageElement.src = URL.createObjectURL(blob);
      console.log("IMAGE-BLOB:: ", imageElement);
    });
}

console.log("-----------");
/*
*  Sending a Cross-Origin Request
? Requesting a resource from a different origin requires the response to have CORS headers for the browser to accept it.

? Without the headers, the cross-origin request will fail and throw an error.

*/

{
  fetch("//cross-origin.com");
  // TypeError: Failed to fetch
  // No 'Access-Control-Allow-Origin' header is present on the requested resource.

  //* If the code does not need access to the response, it is possible to send a no-cors fetch
  //? In this case, the response type property will be opaque
}

{
  /*
  * If the code does not need access to the response, it is possible to send a no-cors fetch.
  ? the response type property will be opaque, therefore preventing you from inspecting it

  * This strategy can be useful for sending pings or in cases where the response can be merely cached for later use
   */
  fetch("//cross-origin.com", { method: "no-cors" }).then((response) =>
    console.log(response.type)
  );
  // opaque
}

console.log("------Aborting a Request-------");

{
  /*
  * The Fetch API supports aborting a request via an AbortController/AbortSignal pair.


   */

  let abortController = new AbortController();

  fetch("wikipedia.zip", { signal: abortController.signal }).catch(() =>
    console.log("~~~~~aborted!~~~~~~~")
  );

  // Abort the fetch after 10ms
  setTimeout(() => abortController.abort(), 10);
  // aborted!
}

console.log("********The Headers Object********");
/*
* You can also create a fresh instance through the constructor via new Headers().

 */
console.log("------Exploring Headers-Map Similarity--------");
/*
* The Headers object has a high degree of overlap with the Map object
?  as HTTP headers are essentially serialized key-value pairs
! The Headers and Map types share a number of instance methods: get(), set(), has(), and delete()
*/
{
  let h = new Headers();
  let m = new Map();
  // Set key
  h.set("foo", "bar");
  m.set("foo", "bar");
  // Check for key
  console.log(h.has("foo")); //  true;
  console.log(m.has("foo")); //  true;
  console.log(h.has("qux")); //  false;
  console.log(m.has("qux")); //  false;

  // Get value
  console.log(h.get("foo")); // bar
  console.log(m.get("foo")); // bar

  // Replace value
  h.set("foo", "baz");
  m.set("foo", "baz");

  // Get replaced value
  console.log(h.get("foo")); // baz
  console.log(m.get("foo")); // baz

  // Remove value
  h.delete("foo");
  m.delete("foo");

  // Check that value is removed
  console.log(h.get("foo")); // undefined
  console.log(m.get("foo")); // undefined

  setTimeout(() => {
    console.log("headers-maps:: ", h, m);
  }, 1000);
}

{
  //* These types can both be initialized with an iterable
  let seed = [["foo", "bar"]];

  let h = new Headers(seed);
  let m = new Map(seed);
  setTimeout(() => {
    console.log("--? ", h.get("foo")); // bar
    console.log("--? ", m.get("foo")); // bar
  }, 1010);
}

{
  //? They also feature identical keys(), values(), and entries() iterator interfaces:
  let seed = [
    ["foo", "bar"],
    ["baz", "qux"],
  ];
  let h = new Headers(seed);
  let m = new Map(seed);
  setTimeout(() => {
    console.log(...h.keys()); // foo, baz
    console.log(...m.keys()); // foo, baz
    console.log(...h.values()); // bar, qux
    console.log(...m.values()); // bar, qux
    console.log(...h.entries()); // ['foo', 'bar'], ['baz', 'qux']
    console.log(...m.entries()); // ['foo', 'bar'], ['baz', 'qux']
  }, 1200);
}

console.log("------Unique Features of the Headers Object------");
{
  //* When initializing, a Headersinitialized with an object of key-value pairs, whereas a Map cannot
  setTimeout(() => {
    let seed = { foo: "bar" };

    let h = new Headers(seed);
    console.log("~~> ", h.get("foo")); // far

    let m = new Map(seed);
    // typeError: object is not iterable
  }, 1203);
}

{
  /*
  * A single HTTP header may be assigned multiple values
  ? nd the Headers object supports this via the append() method
  ?  append() behaves identically to set()
  ? Subsequent uses will concatenate the header value delimited with a comma
   */
}
{
  setTimeout(() => {
    let h = new Headers();

    h.append("foo", "bar");
    console.log("--> ", h.get("foo")); // "bar"

    h.append("foo", "baz");
    console.log("--> ", h.get("foo")); // "bar, baz"

    for ([k, v] of h.entries()) {
      console.log("~~~>> ", k, v);
      // console.log()
    }
  }, 1300);
}

console.log("------Header Guards-------");
console.log("------The Request Object-------");
/*
* the Request object is an interface to the request for a fetched resource.

! The properties and methods involving the body are covered in the “Requests, Responses, and the Body Mixin
 */

//* Creating Request Objects
{
  let r = new Request("https://foo.com");
  console.log(r);
  // Request {...}
}

{
  setTimeout(() => {
    console.log('new Request("")', new Request(""));
  }, 1400);
  /*
  Request {method: "GET", url: "http://localhost:8080/", headers: Headers, destination: "", referrer: "about:client", …}
bodyUsed: false
cache: "default"
credentials: "same-origin"
destination: ""
headers: Headers {}
integrity: ""
isHistoryNavigation: false
keepalive: false
method: "GET"
mode: "cors"
redirect: "follow"
referrer: "about:client"
referrerPolicy: ""
signal: AbortSignal {aborted: false, onabort: null}
url: "http://localhost:8080/"
__proto__: Request
  */
}

{
  setTimeout(() => {
    // Creates Request object with specified init values:
    console.log(
      "new request::: ",
      new Request("https://foo.com", { method: "POST" })
    );
  }, 1420);
  /*
  Request {method: "POST", url: "https://foo.com/", headers: Headers, destination: "", referrer: "about:client", …}
bodyUsed: false
cache: "default"
credentials: "same-origin"
destination: ""
headers: Headers {}
integrity: ""
isHistoryNavigation: false
keepalive: false
method: "POST" <--------
mode: "cors"
redirect: "follow"
referrer: "about:client"
referrerPolicy: ""
signal: AbortSignal {aborted: false, onabort: null}
url: "https://foo.com/" <--------
__proto__: Request
   */
}

console.log("------Cloning Request Objects------");
/*
* 2 ways of making copies of a Request object:
? using the constructor
? using the clone() method
 */

{
  //* Passing a Request instance as the input argument to the Request constructor will make a copy of that request:
  let r1 = new Request("https://foo.com");
  let r2 = new Request(r1);

  console.log(r2.url); // https://foo.com/
}

{
  //* Values inside the init object will override those of the source object
  let r1 = new Request("https://foo.com");
  let r2 = new Request(r1, { method: "POST" });

  console.log(r1.method); // GET
  console.log(r2.method); // POST
  //! This copying strategy will not always yield an exact copy.
}

{
  setTimeout(() => {
    //? it will mark the first request body as used
    let r1 = new Request("https://foo.com", { method: "POST", body: "foobar" });
    let r2 = new Request(r1);

    console.log("copy-requests:: ", r1.bodyUsed); // true
    console.log("copy-requests:: ", r2.bodyUsed); // false
  }, 1500);
}

//* CLONE()
{
  //* The second way of cloning a Request object is to use the clone() method, which creates an exact copy with no opportunity to override any values

  //!  Unlike the first technique, this will not mark any request body as used:
  let r1 = new Request("https://foo.com", { method: "POST", body: "foobar" });
  let r2 = r1.clone();

  console.log(r1.url); //https://foo.com/
  console.log(r2.url); //https://foo.com/I

  https: console.log(r1.bodyUsed); // false
  console.log(r2.bodyUsed); // false
}

{
  /*
   * Cloning a Request using either technique is not allowed if the bodyUsed request property is false, meaning the body has not yet been read. Once the body is read, attempting to clone will throw a TypeError
   */

  let r = new Request("https://foo.com");
  r.clone();
  new Request(r);
  // No error

  r.text(); // sets the bodyUsed field to false

  r.clone();
  // TypeError: Failed to execute 'clone' on 'Request': Request body is already used
  new Request(r);
  // TypeError: Failed to construct 'Request': Cannot construct a Request with a Request object that has already been used.
}

//* Using Request Objects with fetch()
{
  //! When calling fetch(), you are able to pass an already-created Request instance instead of a URL
  let r = new Request("https://foo.com");

  // send GET request to foo.com
  fetch(r);

  // send POST request to foo.com
  fetch(r, { method: "POST" });
  //! Internally, a fetch is cloning the provided Request object.  As with cloning a Request, a fetch cannot be dispatched with a Request that has a used body:
}

{
  // *Importantly, using a Request in a fetch will also serve to mark the body as used.
  //* (Requests that do not include a body are not subject to this restriction)

  let r = new Request("https://foo.com", { method: "POST", body: "foobar" });
  r.text();
  fetch(r);
  // TypeError: Cannot construct a Request with a Request object that has already been used.
}

{
  //? In order to invoke fetch() multiple times with the same Request object that includes a body, clone() must be invoked prior to dispatching the first fetch():
  let r = new Request("https://foo.com", { method: "POST", body: "foobar" });
  // All 3 succeed
  fetch(r.clone());
  fetch(r.clone());

  fetch(r);
}

console.log("------Creating Response Objects-------");
/*
* the Response object is an interface to the response from a fetched resource.

 */
{
  setTimeout(() => {
    let r = new Response();
    console.log("RESPONSE::: ", r);
  }, 1600);

  /*
  Response {type: "default", url: "", redirected: false, status: 200, ok: true, …}
body: (...)
bodyUsed: false
headers: Headers {}
ok: true
redirected: false
status: 200
statusText: ""
type: "default"
url: ""
__proto__: Response
  */
}
/*
* The Response constructor accepts a first optional argument, a body.
? 1. This body, which can be null
? 2. the init object, ( should be populated with any number of the keys and corresponding values in the table that follows.
)
*/

{
  setTimeout(() => {
    // The body and init can be used to build a Response as follows:
    let r = new Response("foobar", {
      status: 418,
      statusText: "I'm a teapot",
    });
    console.log("****>>> ", r);
  }, 1600);

  /*
  Response {type: "default", url: "", redirected: false, status: 418, ok: false, …}
body: (...)
bodyUsed: false
headers: Headers {}
ok: false
redirected: false
status: 418
statusText: "I'm a teapot"
type: "default"
url: ""
__proto__: Response
  */
}

{
  //* s a promise that resolves to a Response object that does represent an actual HTTP response.
  fetch("https://foo.com").then((response) => {
    console.log(response);
  });
}

{
  /*
  * The Response class also features two static methods for generating Response objects
  ?  Response. redirect() - accepts a URL and redirect status code (301, 302, 303, 307, or 308) and returns a redirected Response object
  ?  Response.error()

  ? Also available for use is Response.error() -  produces a response that you would expect from a network error, which would cause a fetch() promise to reject.


  */
}
{
  setTimeout(() => {
    console.log(
      "Response.redirect:: ",
      Response.redirect("https://foo.com", 301)
    );
    // Response {
    //  body: (...)
    //   bodyUsed: false
    // headers: Headers {}
    // ok: false
    // redirected: false
    // status: 301
    // statusText: ""
    // type: "default"
    // url: ""
    //}
  }, 1700);
}

{
  // The provided status code must qualify as a redirect; otherwise an error is thrown:
  Response.redirect("https://foo.com", 200);
  // RangeError: Failed to execute 'redirect' on 'Response': Invalid status code
}

{
  setTimeout(() => {
    console.log("Response.error():: ", Response.error());
  }, 1800);
}
// ...

console.log("------Cloning Response Objects-----");
/*
* Cloning a Response is not allowed if the bodyUsed request property is false, meaning the body has not yet been read.
?  Once the body is read, attempting to clone will throw a TypeError
*/
{
  let r = new Response("foobar");
  r.clone();
  // No error
  r.text();
  // sets the bodyUsed field to false
  r.clone();
  // TypeError: Failed to execute 'clone' on 'Response': Response body is already used
}

//...

console.log("------Requests, Responses, and the Body Mixin--------");

{
  fetch("https://foo.com")
    .then((response) => response.text())
    .then(console.log);
}

{
  setTimeout(() => {
    let request = new Request("https://foo.com", {
      method: "POST",
      body: "barbazqux",
    });
    request.text().then(console.log);
    // barbazqux
  }, 2000);
}

console.log("---Body.json()------");
{
  setTimeout(() => {
    fetch("https://foo.com/foo.json")
      .then((response) => response.json())
      .then(console.log);
    // {"foo": "bar"}
  }, 2100);
}

{
  //! EXAMPLE
  /*
  await fetch(`${process.env.GATSBY_BASE_URL}/support`, {
    signal: controller.signal,
    method: "post",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...form,
      token: Token,
      language: (i18n.language || "").split("-")[0],
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      clearTimeout(id);
      console.log("response: ", res);
      setIsSubmitting(false);
      if (res.ok) {
        resetForm();
        closeModal();
        <Redirect push to="/" />;
      }
    })
    .catch((error) => {
      clearTimeout(id);
      console.log("error: ", error);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    });
     */
}

console.log("-----Body.formData()-------");
{
  let myFormData = new FormData();

  myFormData.append("foo", "bar");

  let request = new Request("https://foo.com", {
    method: "POST",
    body: myFormData,
  });

  request.formData().then((formData) => console.log(formData.get("foo")));
  // bar
}
console.log("-----Body.arrayBuffer()-------");
{
  fetch("https://foo.com")
    .then((response) => response.arrayBuffer())
    .then(console.log);
  // ArrayBuffer(...) {}

  // Use of Body.arrayBuffer() is shown here with a Request object:
  let request = new Request("https://foo.com", {
    method: "POST",
    body: "abcdefg",
  });

  // Logs the encoded string binary values as integers
  request.arrayBuffer().then((buf) => console.log(new Int8Array(buf)));
  // Int8Array(7) [97, 98, 99, 100, 101, 102, 103]
}

console.log("*****Body.blob()*******");
/*
? You may find the need to use the body payload as raw binary without inspection or modification.
*/
{
  fetch("https://foo.com")
    .then((response) => response.blob())
    .then(console.log);
  // Blob(...) {size:..., type: "..."}

  // Use of Body.blob() is shown here with a Request object:
  let request = new Request("https://foo.com", {
    method: "POST",
    body: "abcdefg",
  });
  request.blob().then(console.log);
  // Blob(7) {size: 7, type: "text/plain;charset=utf-8"}
}

//....
{
  setTimeout(() => {
    fetch("https://fetch.spec.whatwg.org/")
      .then((response) => response.body)
      .then(async function (body) {
        let reader = body.getReader();
        let asyncIterable = {
          [Symbol.asyncIterator]() {
            return {
              next() {
                return reader.read();
              },
            };
          },
        };
        for await (chunk of asyncIterable) {
          console.log(chunk);
        }
      });
  }, 2000);
}

//...
{
  //* This can be reduced further into a slightly cleaner generator function.
  //? Furthermore, this implementation can be made more robust by allowing for a partial stream read.

  /*
  * A ReadableStream, as defined in the Stream API, exposes a getReader() method that produces a ReadableStreamDefaultReader, which can be used to asynchronously retrieve chunks of the body as they arrive. Each chunk of the body stream is provided as a Uint8Array.

  */
  async function* streamGenerator(stream) {
    const reader = stream.getReader();
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        yield value;
      }
    } finally {
      reader.releaseLock();
    }
  }

  fetch("https://fetch.spec.whatwg.org/")
    .then((response) => response.body)
    .then(async function (body) {
      for await (chunk of streamGenerator(body)) {
        console.log(chunk);
      }
    });
}

console.log("******THE BEACON API*******");
/*
? The Beacon API is used to send an asynchronous and non-blocking request to a web server. The request does not expect a response.
? the browser guarantees to initiate beacon requests before the page is unloaded and to run them to completion.

! This simple method accepts a URL and a data payload and dispatches a POST request.
*/
{
  //! The method can be used as follows:
  // Sends POST request
  // URL: 'https://example.com/analytics-reporting-url'
  // Request Payload: '{foo: "bar"}'
  navigator.sendBeacon(
    "https://example.com/analytics-reporting-url",
    '{foo: "bar"}'
  );
}

/*
* WEB SOCKETS
? The goal of Web Sockets is to provide full-duplex, bidirectional communication with the server over a single, long-lasting connection


*/

console.log("-------WEB SOCKETS- The API-------");
{
  //* To create a new Web Socket, instantiate a WebSocket object and pass in the URL that will  provide the connection:
  let socket = new WebSocket("ws://www.example.com/server.php");
}

console.log("********Sending/Receiving Data******");

{
  let socket = new WebSocket("ws://www.example.com/server.php");

  let stringData = "Hello world!";
  let arrayBufferData = Uint8Array.from(["f", "o", "o"]);
  let blobData = new Blob(["f", "o", "o"]);

  socket.send(stringData);
  socket.send(arrayBufferData.buffer);
  socket.send(blobData);

  socket.onmessage = function (event) {
    let data = event.data;
    // do something with data
  };

  //? When the server sends a message to the client, a message event is fired on the WebSocket object
  //* The message event works similar to other messaging protocols, with the payload available through the event.data property:

  socket.onmessage = function (event) {
    let data = event.data;
    // do something with data
  };
}

{
  //! EXAMPLE?
  /* */
  // import { Message } from 'constants/types';
  // import config from 'constants/config';
  /* 
type WsStatus = "unknown" | "connected" | "disconnected"
// type OnStateChangeCallback = (state: WsStatus) => void;
type InitializeParams = {
    token: string
    deviceId: string
}
export type TypingEvent = {
    room_id: number
    from_user_id: number
    created_att: Date
}

type MessageType = "text" | "image" | "video" | "file" | "system" | "event" | "task"
type FileInfo = {
    uploadId: number
    uuid: string
    fromUserId: number
    createdAt: string
    filename: string
    filesize: number
    mimetype: string
    savedTo: string
    jsonData: any
}
type Message = {
    messageId: number
    roomId: number
    fromUserId: number
    payload: string
    createdAt: string
    jsonData: {
        type: MessageType
        file: FileInfo
    }
}

let status: WsStatus = "unknown"
const callbacks: {[key: string]: any} = []
const reconnectTimeout = 1 * 1000
let socketUnsubcribe: any = null
const WS_API_CHAT_URL = process.env.REACT_APP_API_CHAT_API
let domain = WS_API_CHAT_URL.split("//")[1]
*/
  /**
   * Init websocket and listeners.
   * @param getParams those params will be used to send to server when first connect
   */
  /*
const initialize = (params) => {
    // console.log("initialize")

    const ws = new WebSocket(`ws://${domain}/ws`)

    ws.onopen = () => {
        const packet = {
            command: "hello",
            ...params
        }
        setStatus("connected")
        ws.send(JSON.stringify(packet))
    }

    ws.onmessage = (event: any) => {
        const dataObj = JSON.parse(event.data)
        const {command, data} = dataObj
        if (command === "message") {
            notify("messages", data)
            const {room_id} = data
            notify(`message-${room_id}`, data)
        }
        if (command === "typing") {
            notify("typings", data)
            const {room_id} = data
            notify(`typing-${room_id}`, data)
        }
        if (command === "reaction") {
            const {room_id} = data
            notify(`reaction-${room_id}`, data)
        }
        if (command === "updated-message") {
            const {room_id} = data
            notify(`updated-message-${room_id}`, data)
        }
        if (command === "room-created") {
            notify(`room-created`, data)
        }
        if (command === "mark-as-read-multiple") {
            const {room_id} = data
            notify(`mark-as-read-multiple-${room_id}`, data)
        }
    }
    ws.onclose = (error) => {
        // console.log("onclose")

        setStatus("disconnected")
        if (error.code !== 1000) {
            // Try to reconnect
            setTimeout(() => {
                initialize(params)
            }, reconnectTimeout)
        }
    }
    socketUnsubcribe = () => {
        ws.close(1000, "done")
        // Remove all listeners
        Object.keys(callbacks).forEach((key) => {
            callbacks[key] = undefined
        })
    }
    return () => {
        if (socketUnsubcribe) {
            socketUnsubcribe()
        }
    }
}
//

//   ws.onerror = (error) => {
//     ws.close();
//     setStatus('unknown');
//   };

// };

const setStatus = (wsStatus: WsStatus) => {
    status = wsStatus
    // const listener = callbacks.stateChange;
    // if (listener) {
    //   listener(wsStatus);
    // }
}

// const registerOnStateChange = (
//   callback: OnStateChangeCallback,
// ): (() => void) => {
//   callbacks.stateChange = callback;
//   callback(status);
//   return () => {
//     callbacks.stateChange = undefined;
//   };
// };

const registerOnNewMessage = (roomId: number, callback: (message: Message) => void) =>
    registerListener(`message-${roomId}`, callback)

const registerOnNewMessages = (callback: (message: any) => void) => registerListener("messages", callback)

const registerTyingEvent = (roomId: number, callback: (value: TypingEvent) => void) =>
    registerListener(`typing-${roomId}`, callback)



const registerTyingsEvent = (callback: (value: TypingEvent) => void) => registerListener("typings", callback)

const registerOnReaction = (roomId: number, callback: (data: any) => void) =>
    registerListener(`reaction-${roomId}`, callback)

const registerOnUpdatedMessage = (roomId: number, callback: (data: any) => void) =>
    registerListener(`updated-message-${roomId}`, callback)

const registerOnRoomCreated = (callback: (data: any) => void) => registerListener(`room-created`, callback)

const registerOnMarkAsReadMultiple = (roomId: number, callback: (data: any) => void) =>
    registerListener(`mark-as-read-multiple-${roomId}`, callback)

const registerListener = (name: string, callback: any) => {
    callbacks[name] = callback
    return () => {
        callbacks[name] = null
    }
}

const notify = (name: string, data: any) => {
    const listener = callbacks[name]

    if (listener) {
        listener(data)
    }
}

const ChatWs = {
    initialize,
    // registerOnStateChange,
    registerOnNewMessage,
    registerOnNewMessages,
    registerTyingEvent,
    registerTyingsEvent,
    registerOnReaction,
    registerOnUpdatedMessage,
    registerOnRoomCreated,
    registerOnMarkAsReadMultiple
}

export default ChatWs
*/
}

console.log("--------SECURITY--------");
/*
* Security considerations for large-scale Ajax applications are vast, but there are some basic things to understand about Ajax security in general.
? When an unauthorized system is able to access a resource, it is considered a cross-site request forgery (CSRF) attack
*/
/*
? how to secure URLs accessed via Ajax is to validate that the sender has access to the resource
* ➤➤ Requiring SSL to access resources that can be requested via Ajax
* ➤➤ Requiring a computed token to be sent along with every request

? Please recognize that the following are ineffective against CSRF attacks:
* ➤➤ Requiring a POST instead of a GET—This is easily changed.
* ➤➤ Using the referrer as a determination of origin—Referrers are easily spoofed.
* ➤➤ Validating based on cookie information—Also easily spoofed.

* 
*/
