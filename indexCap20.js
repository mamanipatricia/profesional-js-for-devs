console.log("*********JavaScript APIs********");
/*
 * Atomics and SharedArrayBuffer
 * Cross-context messaging
 * Encoding API
 * File and Blob API
 * Drag and drop
 * Notifications API
 * Page Visibility API
 * Streams API
 * Timing APIs
 * Web components
 * Web Cryptography API
 */
console.log("-----ATOMICS AND SharedArrayBuffer-----");
/*
 * The Atomics API allows multiple contexts to safely read and write to a single SharedArrayBuffer by forcing buffer operations to occur only one at a time
 */
//*?  the Atomics API was designed to enable sophisticated multithreaded JavaScript programs to be architected out of a minimal yet robust collection of atomic behaviors.

console.log("-------SharedArrayBuffer-------");
/*
? A SharedArrayBuffer features an identical API to an ArrayBuffer
 */

//* EXAMPLE: The following example demonstrates a race condition between four dedicated workers accessing the same SharedArrayBuffer:
{
  const workerScript = `self.onmessage = ({data}) => {
const view = new Uint32Array(data);

// Perform 1000000 add operations
for (let i = 0; i < 1E6; ++i) {

// Thread-unsafe add operation introduces race condition
view[0] += 1;
}
self.postMessage(null);
};
`;

  const workerScriptBlobUrl = URL.createObjectURL(new Blob([workerScript]));
  // Create worker pool of size 4
  const workers = [];
  for (let i = 0; i < 4; ++i) {
    workers.push(new Worker(workerScriptBlobUrl));
  }

  // Log the final value after the last worker completes
  let responseCount = 0;
  for (const worker of workers) {
    worker.onmessage = () => {
      if (++responseCount == workers.length) {
        console.log(`Final buffer value: ${view[0]}`);
      }
    };
  }

  // Initialize the SharedArrayBuffer
  const sharedArrayBuffer = new SharedArrayBuffer(4);
  const view = new Uint32Array(sharedArrayBuffer);
  view[0] = 1;
  // Send the SharedArrayBuffer to each worker
  for (const worker of workers) {
    worker.postMessage(sharedArrayBuffer);
  }
}

console.log("--------Atomics Basics--------");
/*
 * El objeto Atomics existe en todos los contextos globales y expone un conjunto de métodos estáticos para realizar operaciones seguras para subprocesos. La mayoría de estos métodos toman una instancia de TypedArray (que hace referencia a SharedArrayBuffer) como primer argumento y los operandos relevantes como argumentos posteriores.
 */
console.log("-------Atomic Arithmetic and Bitwise Methods------");

/*
? each of these methods is performing a read from a location in the SharedArrayBuffer, an arithmetic or bitwise operation, and a write to the same location.

* The atomic nature of these operators means that these three operations will be performed in sequence and without interruption by another thread.
 */

{
  //* All the arithmetic methods are demonstrated here:

  // Create buffer of size 1
  let sharedArrayBuffer = new SharedArrayBuffer(1);

  // Create Uint8Array from buffer
  let typedArray = new Uint8Array(sharedArrayBuffer);

  // All ArrayBuffers are initialized to 0
  console.log(typedArray); // Uint8Array[0]

  const index = 0;
  const increment = 5;

  // Atomic add 5 to value at index 0
  Atomics.add(typedArray, index, increment);

  console.log(typedArray); // Uint8Array[5]

  // Atomic subtract 5 to value at index 0
  Atomics.sub(typedArray, index, increment);

  console.log(typedArray); // Uint8Array[0]
}

console.log("-------Atomic Reads and Writes-------");
/*
 * In addition to reading and writing values to a buffer, Atomics.load() and Atomics.store() behave as “code fences.”

 ? 
 */
{
  const sharedArrayBuffer = new SharedArrayBuffer(4);
  const view = new Uint32Array(sharedArrayBuffer);

  // Perform non-Atomic write
  view[0] = 1;

  // Non-Atomic write is guaranteed to occur before this read, so this is guaranteed to read 1
  console.log(Atomics.load(view, 0)); // 1

  // Perform Atomic write
  Atomics.store(view, 0, 2);
  // Non-Atomic read is guaranteed to occur after Atomic write, so this is guaranteed to read 2
  console.log(view[0]); // 2
}

console.log("------Atomic Exchanges--------");
/*
* The Atomics API offers two types of methods that guarantee a sequential and uninterrupted read-then-write:
?  exchange() 
? compareExchange(). Atomics.exchange()
*  performs a simple swap guaranteeing that no other threads will interrupt the value swap:
*/
{
  const sharedArrayBuffer = new SharedArrayBuffer(4);
  const view = new Uint32Array(sharedArrayBuffer);

  // Write 3 to 0-index
  Atomics.store(view, 0, 3);

  // Read value out of 0-index and then write 4 to 0-index
  console.log(Atomics.exchange(view, 0, 4)); // 3

  // Read value at 0-index
  console.log(Atomics.load(view, 0)); // 4
}

//

{
  const sharedArrayBuffer = new SharedArrayBuffer(4);
  const view = new Uint32Array(sharedArrayBuffer);

  // Write 5 to 0-index
  Atomics.store(view, 0, 5);

  // Read the value out of the buffer
  let initial = Atomics.load(view, 0);

  // Perform a non-atomic operation on that value
  let result = initial ** 2;

  // Write that value back into the buffer only if the buffer has not changed
  Atomics.compareExchange(view, 0, initial, result);

  // Check that the write succeeded
  console.log(" write succeeded:: ", Atomics.load(view, 0)); // 25
}

console.log("------Atomics Futex Operations and Locks------");
/*
* Multithreaded programs wouldn’t amount to much without some sort of locking construct
*  The methods are fairly rudimentary, but they are intended to be used as a fundamental building block for more elaborate locking constructs.
! NOTE All Atomics futex operations only work with an Int32Array view. Furthermore, they can only be used inside workers.
? Atomics.wait() and Atomics.notify() -- workers to operate on an Int32Array of length 1
 */
{
  const workerScript = `
self.onmessage = ({data}) => {
const view = new Int32Array(data);
console.log('Waiting to obtain lock');
// Halt when encountering the initial value, timeout at 10000ms
Atomics.wait(view, 0, 0, 1E5);
console.log('Obtained lock');
// Add 1 to data index
Atomics.add(view, 0, 1);
console.log('Releasing lock');
// Allow exactly one worker to continue execution
Atomics.notify(view, 0, 1);
self.postMessage(null);
};
`;

  const workerScriptBlobUrl = URL.createObjectURL(new Blob([workerScript]));
  const workers = [];
  for (let i = 0; i < 4; ++i) {
    workers.push(new Worker(workerScriptBlobUrl));
  }
  // Log the final value after the last worker completes
  let responseCount = 0;
  for (const worker of workers) {
    worker.onmessage = () => {
      if (++responseCount == workers.length) {
        console.log(`Final buffer value: ${view[0]}`);
      }
    };
  }
  // Initialize the SharedArrayBuffer
  const sharedArrayBuffer = new SharedArrayBuffer(8);
  const view = new Int32Array(sharedArrayBuffer);
  // Send the SharedArrayBuffer to each worker
  for (const worker of workers) {
    worker.postMessage(sharedArrayBuffer);
  }

  // Release first lock in 1000ms
  setTimeout(() => Atomics.notify(view, 0, 1), 1000);
}

console.log("-------CROSS-CONTEXT MESSAGING-----");
/*
* Cross-document messaging, sometimes abbreviated as XDM, is the capability to pass information between different execution contexts, such as web workers or pages from different origins. 

? Prior to XDM, achieving this communication in a secure manner took a lot of work. XDM formalizes this functionality in a way that is both secure and easy to use.

? At the heart of XDM is the postMessage() method. 
 */
{
  // let iframeWindow = document.getElementById("myframe").contentWindow;
  // iframeWindow.postMessage("A secret", "http://www.wrox.com");
  /*
ERRORS
postMessage' on 'DOMWindow': The target origin provided ('http://www.wrox.com') does not match the recipient window's origin ('http://localhost:8080'
 */
  /*
  * If the origin matches, then the message will be delivered into the iframe; otherwise, postMessage() silently does nothing

  ? it is possible to allow posting to any origin by passing in "*" as the second argument to postMessage(), but this is not recommended.

  */
}
/*
* The event object that is passed to an onmessage event handler has three important pieces of information

? data—The string data that was passed as the first argument to postMessage() .
? origin —The origin of the document that sent the message, for example, "http://www.wrox.com" .
? source —A proxy for the window object of the document that sent the message. ....
 */
//!  checking the origin during onmessage ensures that the data being passed is coming from the right place
{
  window.addEventListener("message", (event) => {
    // ensure the sender is expected
    if (event.origin == "http://www.wrox.com") {
      // do something with the data
      processMessage(event.data);
      // optional: send a message back to the original window
      event.source.postMessage("Received!", "http://p2p.wrox.com");
    }
  });
  /*
   * . If you need to pass structured data, then the best approach is to call JSON.stringify() on the data, passing the string to postMessage(), and then call JSON.parse() in the onmessage event handler.
   */
}

console.log("-----ENCODING API------");
/*
*  four global classes for performing these conversions: 
? TextEncoder,
?  TextEncoderStream,
? TextDecoder,
? and TextDecoderStream.

!  Support for stream encoding/decoding is much narrower than bulk
encoding/decoding.

 */
//* ENCODING TEXT
/*
 * The Encoding API affords two ways of converting a string into its typed array binary equivalent:  bulk encoding, and a stream encoding. When going from string to typed array, the encoder will always use UTF-8

 ? 
 */

console.log("----Bulk Encoding------");
//* The bulk designation means that the JavaScript engine will synchronously encode the entire string. For very long strings, this can be a costly operation.
//* Bulk encoding is accomplished using an instance of a TextEncoder:

{
  // This instance exposes an encode() method,
  const textEncoder = new TextEncoder();

  const decodedText = "foo";
  const encodedText = textEncoder.encode(decodedText);

  // f encoded in utf-8 is 0x66 (102 in decimal)
  // o encoded in utf-8 is 0x6F (111 in decimal)
  console.log("encodedText::: ", encodedText); // Uint8Array(3) [102, 111, 111]
}

{
  const textEncoder = new TextEncoder();
  const decodedText = " "; // a smile face
  const encodedText = textEncoder.encode(decodedText);

  // (a smile face) encoded in UTF-8 is 0xF0 0x9F 0x98 0x8A (240, 159, 152, 138 in decimal)
  console.log("**encodedText**:: ", encodedText); // Uint8Array(4) [240, 159, 152, 138]
}

//* The instance also exposes an encodeInto() method, which accepts a string and the destination Uint8Array
{
  const textEncoder = new TextEncoder();
  const fooArr = new Uint8Array(3);
  const barArr = new Uint8Array(2);
  const fooResult = textEncoder.encodeInto("foo", fooArr);
  const barResult = textEncoder.encodeInto("bar", barArr);

  console.log("--> ", fooArr); // Uint8Array(3) [102, 111, 111]
  console.log("--> ", fooResult); // { read: 3, written: 3 }

  console.log("--> ", barArr); // Uint8Array(2) [98, 97]
  console.log("--> ", barResult); // { read: 2, written: 2 }
}

console.log("-------Stream Encoding------");

{
  /* 
  async function* chars() {
    const decodedText = "foo";

    for (let char of decodedText) {
      yield await new Promise((resolve) => setTimeout(resolve, 1000, char));
    }
  }
  const decodedTextStream = new ReadableStream({
    async start(controller) {
      for await (let chunk of chars()) {
        controller.enqueue(chunk);
      }
    },
  });
  controller.close();

  const encodedTextStream = decodedTextStream.pipeThrough(
    new TextEncoderStream()
  );
  const readableStreamDefaultReader = encodedTextStream.getReader();
  (async function () {
    while (true) {
      const { done, value } = await readableStreamDefaultReader.read();
      if (done) {
        break;
      } else {
        console.log(value);
      }
    }
  })();

  //Uint8Array[102]
  // Uint8Array[111];
  // Uint8Array[111];
   */
}

console.log("******Decoding Text*******");
//* The Encoding API affords two ways of converting a typed array into its string equivalent: a bulk decoding, and a stream decoding.

console.log("--------Bulk Decoding--------");
{
  const textDecoder = new TextDecoder();

  // f encoded in utf-8 is 0x66 (102 in decimal)
  // o encoded in utf-8 is 0x6F (111 in decimal)
  const encodedText = Uint32Array.of(102, 111, 111);
  const decodedText = textDecoder.decode(encodedText);
  console.log("--decodedText--::", decodedText); // "f o o "
}
{
  const textDecoder = new TextDecoder();

  // (smiling face) encoded in UTF-8 is 0xF0 0x9F 0x98 0x8A (240, 159, 152, 138 in decimal)
  const encodedText = Uint8Array.of(240, 159, 152, 138);
  const decodedText = textDecoder.decode(encodedText);
  console.log(decodedText); // smiling face
}

//* Unlike TextEncoder, TextDecoder is compatible with a wide number of character encodings.
{
  // uses UTF-16 encoding instead of the default UTF-8:

  const textDecoder = new TextDecoder("utf-16");

  // f encoded in utf-8 is 0x0066 (102 in decimal)
  // o encoded in utf-8 is 0x006F (111 in decimal)
  const encodedText = Uint16Array.of(102, 111, 111);
  const decodedText = textDecoder.decode(encodedText);
  console.log("--decodedText--", decodedText); // foo
}

console.log("--------Stream Decoding---------");

{
  /* 
  async function* chars() {
    // Each chunk must exist as a typed array
    const encodedText = [102, 111, 111].map((x) => Uint8Array.of(x));

    for (let char of encodedText) {
      yield await new Promise((resolve) => setTimeout(resolve, 1000, char));
    }
  }
  const encodedTextStream = new ReadableStream({
    async start(controller) {
      for await (let chunk of chars()) {
        controller.enqueue(chunk);
      }
    },
  });
  controller.close();
  const decodedTextStream = encodedTextStream.pipeThrough(
    new TextDecoderStream()
  );
  const readableStreamDefaultReader = decodedTextStream.getReader();
  (async function () {
    while (true) {
      const { done, value } = await readableStreamDefaultReader.read();
      if (done) {
        break;
      } else {
        console.log(value);
      }
    }
  })();
  // f
  // o
  // o
   */
}

console.log("********BLOB AND FILE APIs**********");
/*
 * The Blob and File APIs are designed to give web developers access to files on the client computer in a secure manner that allows for better interaction with those files


 */
console.log("--------The File Type-------");
//....

console.log("-------The FileReader Type------");
/*
 * The FileReader type represents an asynchronous file-reading mechanism
 *   When the error event fires, thE error property of the FileReader is filled in...1 (file not found), 2 (security error), 3 (read was aborted), 4 (file isn’t readable), or 5 (encoding error).

 */
{
  /* 
  let filesList = document.getElementById("files-list");
  filesList.addEventListener("change", (event) => {
    let info = "",
      output = document.getElementById("output"),
      progress = document.getElementById("progress"),
      files = event.target.files,
      type = "default",
      reader = new FileReader();
    if (/image/.test(files[0].type)) {
      reader.readAsDataURL(files[0]);
      type = "image";
    } else {
      reader.readAsText(files[0]);
      type = "text";
    }
    reader.onerror = function () {
      output.innerHTML =
        "Could not read file, error code is " + reader.error.code;
    };
    reader.onprogress = function (event) {
      if (event.lengthComputable) {
        progress.innerHTML = `${event.loaded}/${event.total}`;
      }
    };
    reader.onload = function () {
      let html = "";
      switch (type) {
        case "image":
          html = `<img src="${reader.result}">`;
          break;
        case "text":
          html = reader.result;
          break;
      }
      output.innerHTML = html;
    };
  });
   */
}

//* Suppose a worker is sent a File object via postMessage(). The following code directs the worker to synchronously read the entire file into memory and send back the file’s data URL:

{
  // worker.js

  self.omessage = (messageEvent) => {
    const syncReader = new FileReaderSync();
    console.log(syncReader); // FileReaderSync {}

    // Blocks worker thread while file is read
    const result = syncReader.readAsDataUrl(messageEvent.data);

    // Example response for PDF file
    console.log(result); // data:application/pdf;base64,JVBERi0xLjQK...

    // Send URL back up
    self.postMessage(result);
  };
}

//* BLOBS AND PARTIAL READS

{
  console.log(new Blob(["foo"]));
  // Blob {size: 3, type: ""}

  console.log(new Blob(['{"a": "b"}'], { type: "application/json" }));
  // {size: 10, type: "application/json"}

  console.log(new Blob(["<p>Foo</p>", "<p>Bar</p>"], { type: "text/html" }));
  // {size: 20, type: "text/html"}
}
{
  /*
  // A Blob also has size and type properties, as well as the slice() method for further cutting down the data.
  let filesList = document.getElementById("files-list");
  filesList.addEventListener("change", (event) => {
    let info = "",
      output = document.getElementById("output"),
      progress = document.getElementById("progress"),
      files = event.target.files,
      reader = new FileReader(),
      blob = blobSlice(files[0], 0, 32);
    if (blob) {
      reader.readAsText(blob);
      reader.onerror = function () {
        output.innerHTML =
          "Could not read file, error code is " + reader.error.code;
      };
      reader.onload = function () {
        output.innerHTML = reader.result;
      };
    } else {
      console.log("Your browser doesn't support slice().");
    }
  });
   */
}

console.log("--------Drag-and-Drop File Reading------");
{
  let droptarget = document.getElementById("droptarget");
  function handleEvent(event) {
    let info = "",
      output = document.getElementById("output"),
      files,
      i,
      len;
    event.preventDefault();
    if (event.type == "drop") {
      files = event.dataTransfer.files;
      i = 0;
      len = files.length;
      while (i < len) {
        info += `${files[i].name} (${files[i].type}, ${files[i].size} bytes)<br>`;
        i++;
      }
      output.innerHTML = info;
    }
  }
  droptarget.addEventListener("dragenter", handleEvent);
  droptarget.addEventListener("dragover", handleEvent);
  droptarget.addEventListener("drop", handleEvent);
}

console.log("---------------");
/*
 * HTML5 introduces two media-related elements to enable cross-browser audio and video embedding into a browser baseline without any plug-ins: <audio> and <video>
 */

console.log("*****The Audio Type ********");
{
  /* 
  let audio = new Audio("sound.mp3");
  EventUtil.addHandler(audio, "canplaythrough", function (event) {
    audio.play();
  });
   */
}

console.log("********Custom Drop Targets*********");
{
  let droptarget = document.getElementById("droptarget");
  droptarget.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  droptarget.addEventListener("dragenter", (event) => {
    event.preventDefault();
  });
}

console.log("------The dataTransfer Object------");
/*
 *  dataTransfer object, which exists as a property of event and is used to transfer string data from the dragged item to the drop target.

 ? The dataTransfer object has two primary methods: getData() and setData()

 * The dataTransfer object is now part of the working draft of HTML5
 */
{
  /* 
  // working with text
  event.dataTransfer.setData("text", "some text");
  let text = event.dataTransfer.getData("text");

  // working with a URL
  event.dataTransfer.setData("URL", "http://www.wrox.com/");
  let url = event.dataTransfer.getData("URL");
   */
}

console.log("-------NOTIFICATIONS API------");
/*
 * The page can ask for notification permission using the Notification global object. This object features a requestPemission() method that returns a promise, which resolves when the user takes action on the permission dialog box

 */
{
  Notification.requestPermission().then((permission) => {
    console.log("User responded to permission request:", permission);
  });
}

console.log("-------Showing and Hiding Notification-------");

{
  new Notification("Title text....!");

  new Notification("Title text!", {
    body: "Body text!",
    image: "path/to/image.png",
    vibrate: true,
  });

  const n = new Notification("I will close in 1000ms");
  setTimeout(() => n.close(), 1000);
}

//* The following notification logs a message upon each lifecycle event:
/*
? document.visibilityState is one of three possible string values:
* hidden
* visible
*  prerender

 */
{
  const n = new Notification("foo");
  n.onshow = () => console.log("Notification was shown!");
  n.onclick = () => console.log("Notification was clicked!");
  n.onclose = () => console.log("Notification was closed!");
  n.onerror = () => console.log("Notification experienced an error!");
}

console.log("******STREAMS API******");
/*
*  How can a web application consume information in sequential chunks rather than in bulk?

? A block of data may not be available all at once
? A block of data can be processed in small portions.
 */

console.log("-------Introduction to Streams ---------");

console.log("------- TIMING APIs---------");
/*
 *  This interface is available through the window.performance object. All metrics related to the page, both those already defined and those in the future, exist on this object
 */
console.log("------High Resolution Time API-------");
{
  const t0 = Date.now();
  // foo();
  const t1 = Date.now();

  const duration = t1 - t0;
  console.log(duration);
}

//* High Resolution Time API defines window.performance.now(), which returns a floating point number with up to microsecond precision.

{
  const t0 = performance.now();
  const t1 = performance.now();
  console.log("performance-API:: ", t0); // 1768.625000026077
  console.log("performance-API:: ", t1); // 1768.6300000059418

  const duration = t1 - t0;
  console.log("--duration--", duration); // 0.004999979864805937

  //? The performance.time­ Origin property returns the global system clock’s value when the timer initialization occurred.

  const relativeTimestamp = performance.now();
  const absoluteTimestamp = performance.timeOrigin + relativeTimestamp;
  console.log(relativeTimestamp); // 244.43500000052154
  console.log(absoluteTimestamp); // 1561926208892.4001
}

console.log("-------Performance Timeline API--------");
/* The Performance Timeline API extends the Performance interface with a suite of tools intended to measure client-side latency. */
{
  console.log("performance.getEntries()::", performance.getEntries());
  // [PerformanceNavigationTiming, PerformanceResourceTiming, ... ]

  const entry = performance.getEntries()[0];

  console.log("*-*", entry.name); // ("https://foo.com");
  console.log("*-*", entry.entryType); //  navigation;
  console.log("*-*", entry.startTime); // 0;
  console.log("*-*", entry.duration); //  182.36500001512468;
}

console.log("-----User Timing API-----");
{
  performance.mark("foo");
  console.log("performance*mark:: ", performance.getEntriesByType("mark")[0]);
  // PerformanceMark {
  // name: "foo" // entryType: "mark",
  // startTime: 269.8800000362098,
  // duration: 0
  // }
}

console.log("------WEB COMPONENTS----------");

console.log("------HTML Templates----------");
/*
* When rendered inside a browser, you will not see this text render on the page. Because the <template> content is not considered part of the active document

 */
/*
<template id="foo">
<p>I'm inside a template!</p>
</template>
*/

//* A reference to this DocumentFragment can be retrieved via the content property of the <tem- plate> element:
{
  console.log("*/*/*::", document.querySelector("#foo").content); // #document-fragment

  const fragment = document.querySelector("#foo").content;

  console.log(document.querySelector("p")); // null
  //! fragment. ....
  console.log(fragment.querySelector("p")); // <p>...<p>
}

//! A DocumentFragment is also incredibly useful for adding HTML in bulk.
//? Consider a scenario where one wishes to add multiple children to an HTML element as efficiently as possible
{
  //Start state:
  // <div id="foo"></div>
  // Desired end state:
  // <div id="foo">
  // <p></p>
  // <p></p>
  // <p></p>
  // </div>

  // Also can use document.createDocumentFragment()
  const fragment = new DocumentFragment();

  const foo = document.querySelector("#foo");

  // Adding children to a DocumentFragment incurs no reflow
  fragment.appendChild(document.createElement("p"));
  fragment.appendChild(document.createElement("p"));
  fragment.appendChild(document.createElement("p"));

  console.log(fragment.children.length); // 3

  foo.appendChild(fragment);

  console.log(fragment.children.length); // 0

  console.log(document.body.innerHTML);
  // <div id="foo">
  // <p></p>
  // <p></p>
  // <p></p>
  //</div>
}

console.log("****Shadow DOM***********");
//?  It allows you to attach an entirely separate DOM tree as a node on a parent DOM tree

//* Introduction to Shadow DOM

//? A shadow DOM is created by attaching it to a valid HTML element using the attachShadow()

{
  /* 
  document.body.innerHTML = `
<div id="foo"></div>
<div id="bar"></div>
`;

  const foo = document.querySelector("#foo");
  const bar = document.querySelector("#bar");

  const openShadowDOM = foo.attachShadow({ mode: "open" });
  const closedShadowDOM = bar.attachShadow({ mode: "closed" });

  console.log(openShadowDOM); // #shadow-root (open)
  console.log(closedShadowDOM); // #shadow-root (closed)

  console.log(foo.shadowRoot); // #shadow-root (open)
  console.log(bar.shadowRoot); // null
   */
  /*
   *  there are plenty of ways for malicious code to circumnavigate this and regain access to the shadow DOM. In short, creating a closed shadow DOM should not be used for security purposes
   */
}
//
{
  for (let color of ["red", "green", "blue"]) {
    const div = document.createElement("div");
    const shadowDOM = div.attachShadow({ mode: "open" });
    document.body.appendChild(div);
    shadowDOM.innerHTML = `
    <p>Make me ${color}</p>
    <style>
    p {
      color:${color};
    }
    </style>
    `;
  }
}
//! Once the shadow DOM is attached, the browser gives priority to the shadow DOM

//. .....

console.log("*******THE WEB CRYPTOGRAPHY API*******");
/*
! Each time Math.random() is called, the internal state is mutated by an algorithm and the result is converted into a new random value. For example, the V8 engine uses an algorithm called xorshift128+ to perform this mutation.

*/

{
  const array = new Uint8Array(1);

  for (let i = 0; i < 5; ++i) {
    console.log(crypto.getRandomValues(array));
  }
  // Uint8Array[41];
  // Uint8Array[250];
  // Uint8Array[51];
  // Uint8Array[129];
  // Uint8Array[35];

  //* getRandomValues() will generate up to 216 bytes; above that it will throw an error:
  const fooArray = new Uint8Array(2 ** 16);
  console.log(window.crypto.getRandomValues(fooArray)); // Uint32Array(16384) [...]

  // const barArray = new Uint8Array(2 ** 16 + 1);
  // console.log(window.crypto.getRandomValues(barArray)); // Error
}

/*
*  Reimplementing Math.random() using the CSPRNG could be accomplished by generating
? a single random 32-bit number and dividing this into the maximum possible value, 0xFFFFFFFF. 
* This yields a value between 0 and 1:
*/
{
  function randomFloat() {
    // Generate 32 random bits
    const fooArray = new Uint32Array(1);

    // Maximum value is 2^32 - 1
    const maxUint32 = 0xffffffff;

    // Divide by maximum possible value
    return crypto.getRandomValues(fooArray)[0] / maxUint32;
  }

  console.log(randomFloat()); // 0.5033651619458955
}

console.log("------Using the SubtleCrypto Object------");

{
  console.log("-crypto.subtle--> ", crypto.subtle); // SubtleCrypto {}
  //! This object contains a collection of methods for performing common cryptographic functions such as encryption, hashing, signing, and key generation
}
//! NOTE The SubtleCrypto object is only accessible in a secure context (https). In an insecure context, the subtle property will be undefined .

console.log("-------Generating Cryptographic Digests------");
/*
* One extremely common cryptography operation is to calculate a cryptographic digest of data. The specification supports four algorithms for this, SHA-1 and three flavors of SHA-2:

? Secure Hash Algorithm 1 (SHA-1) -- . This algorithm is no longer considered secure as it is vulnerable to collision attacks.

? Secure Hash Algorithm 2 (SHA-2) -  This algorithm is considered secure and widely used in many applications and protocols, including TLS, PGP, and cryptocurrencies like Bitcoin.

 */

//* The SubtleCrypto.digest() method is used to generate a message digest.

//* The following example demonstrates a simple application of SHA-256 to generate a message digest of the string foo:

{
  (async function () {
    const textEncoder = new TextEncoder();
    const message = textEncoder.encode("foo");
    const messageDigest = await crypto.subtle.digest("SHA-256", message);
    console.log(
      "*generate a message digest*:: ",
      new Uint32Array(messageDigest)
    );
  })();

  // Uint32Array(8) [1806968364, 2412183400, 1011194873, 876687389,
  // 1882014227, 2696905572, 2287897337, 2934400610]
}

console.log("-------CryptoKeys and Algorithms--------");
/*
 *  The CryptoKey class supports multiple types of encryption algorithms and allows for control over key extraction and usage
 
 ? The CryptoKey class supports the following algorithms, categorized by their parent cryptosystem:

* RSA (Rivest-Shamir-Adleman)
* RSASSA-PKCS1-v1_5
* RSA-PSS
* RSA-OAEP
* ECC (Elliptic-Curve Cryptography)
* ECDSA (Elliptic Curve Digital Signature Algorithm)
* ECDH (Elliptic Curve Diffie-Hellman)
* AES (Advanced Encryption Standard)
* AES-CTR
* AES-CBC
* AES-GCM
* AES-KW
* HMAC (Hash-Based Message Authentication Code)
* KDF (Key Derivation Functions)
* HKDF (HMAC-Based Key Derivation Function)
* PBKDF2 (Password-Based Key Derivation Function 2)

! The CryptoKey supports a large number of algorithms, but only some are applicable to some SubtleCrypto methods
 */

//* Generating a random CryptoKey is accomplished with the SubtleCrypto.generateKey() metho
{
  /*
  * Suppose you want to generate a symmetric key with the following properties:
  * Supports the AES-CTR algorithm
  * Key length of 128 bits
  * Cannot be extracted from the CryptoKey object
  * Is able to be used with the encrypt() and decrypt() methods

   */
  (async function () {
    const params = {
      name: "AES-CTR",
      length: 128,
    };
    const keyUsages = ["encrypt", "decrypt"];
    const key = await crypto.subtle.generateKey(params, false, keyUsages);
    console.log("***key**:: ", key);
    // CryptoKey {type: "secret", extractable: true, algorithm: {...}, usages: Array(2)}
  })();
}

console.log("~~~crypto~~~:: ", crypto.getRandomValues(new Uint8Array(16)));

{
  //* The following example takes a raw string, applies the PBKDF2 algorithm to import it into a raw master key, and derives a new key in AES-GCM format:

  (async function () {
    const password = "foobar";
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const algoIdentifier = "PBKDF2";
    const keyFormat = "raw";
    const isExtractable = false;
    const params = {
      name: algoIdentifier,
    };
    const masterKey = await window.crypto.subtle.importKey(
      keyFormat,
      new TextEncoder().encode(password),
      params,
      isExtractable,
      ["deriveKey"]
    );
    const deriveParams = {
      name: "AES-GCM",
      length: 128,
    };
    const derivedKey = await window.crypto.subtle.deriveKey(
      Object.assign({ salt, iterations: 1e5, hash: "SHA-256" }, params),
      masterKey,
      deriveParams,
      isExtractable,
      ["encrypt"]
    );
    console.log("+++derivedKey++:: ", derivedKey);
    // CryptoKey {type: "secret", extractable: false, algorithm: {...}, usages: Array(1)}
  })();
}

/*
! The SubtleCrypto object allows you to use public-key algorithms to generate signatures using a private key or to verify signatures using a public key.
* These are performed using the SubtleCrypto. sign() and SubtleCrypto.verify() methods, respectively.
 */

/*
 ? Encrypting a message requires a params object to specify the algorithm and any necessary values, the encryption key, and the data to be encrypted.
  */

//* The following example generates a symmetric AES-CBC key, encrypts it, and finally decrypts a message:

{
  (async function () {
    const algoIdentifier = "AES-CBC";
    const keyParams = {
      name: algoIdentifier,
      length: 256,
    };
    const keyUsages = ["encrypt", "decrypt"];
    const key = await crypto.subtle.generateKey(keyParams, true, keyUsages);
    const originalPlaintext = new TextEncoder().encode("I am Satoshi Nakamoto");
    const encryptDecryptParams = {
      name: algoIdentifier,
      iv: crypto.getRandomValues(new Uint8Array(16)),
    };
    const ciphertext = await crypto.subtle.encrypt(
      encryptDecryptParams,
      key,
      originalPlaintext
    );
    console.log(ciphertext);
    // ArrayBuffer(32) {}
    const decryptedPlaintext = await crypto.subtle.decrypt(
      encryptDecryptParams,
      key,
      ciphertext
    );
    console.log(
      "TEXT-DECODER:: ",
      new TextDecoder().decode(decryptedPlaintext)
    );
    // I am Satoshi Nakamoto
  })();
}

//* Wrapping and Unwrapping a Key
/*
 * The SubtleCrypto object allows you to wrap and unwrap keys to allow for transmission over an untrusted channel

 ? These are performed using:
 * SubtleCrypto.wrapKey()
 * SubtleCrypto.unwrapKey() methods

 */
{
  (async function () {
    const keyFormat = "raw";
    const extractable = true;
    const wrappingKeyAlgoIdentifier = "AES-KW";
    const wrappingKeyUsages = ["wrapKey", "unwrapKey"];
    const wrappingKeyParams = {
      name: wrappingKeyAlgoIdentifier,
      length: 256,
    };
    const keyAlgoIdentifier = "AES-GCM";
    const keyUsages = ["encrypt"];
    const keyParams = {
      name: keyAlgoIdentifier,
      length: 256,
    };
    const wrappingKey = await crypto.subtle.generateKey(
      wrappingKeyParams,
      extractable,
      wrappingKeyUsages
    );
    console.log(wrappingKey);
    // CryptoKey {type: "secret", extractable: true, algorithm: {...}, usages: Array(2)}
    const key = await crypto.subtle.generateKey(
      keyParams,
      extractable,
      keyUsages
    );
    console.log(key);
    // CryptoKey {type: "secret", extractable: true, algorithm: {...}, usages: Array(1)}
    const wrappedKey = await crypto.subtle.wrapKey(
      keyFormat,
      key,
      wrappingKey,
      wrappingKeyAlgoIdentifier
    );
    console.log(wrappedKey);
    // ArrayBuffer(40) {}
    const unwrappedKey = await crypto.subtle.unwrapKey(
      keyFormat,
      wrappedKey,
      wrappingKey,
      wrappingKeyParams,
      keyParams,
      extractable,
      keyUsages
    );
    console.log(unwrappedKey);
    // CryptoKey {type: "secret", extractable: true, algorithm: {...}, usages: Array(1)}
  })();
}

