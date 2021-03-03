console.log("********Client Detection********");
/*
* ➤➤ Using capability detection
* ➤➤ The history of user-agent detection
* ➤➤ Software and hardware detection
* ➤➤ When to use each type of detection

*/
//!  It’s important to understand that client detection should be the very last step in solving a problem; whenever a more common solution is available, that solution should be used.

//! The second important concept is that you must test for exactly what you want to use.

console.log("************CAPABILITY DETECTION************");
/*  the DOM method document.getElementById() didn’t exist in Internet Explorer prior
to version 5, although the same functionality could be achieved using the nonstandard document.all property. */

{
  function getElement(id) {
    if (document.getElementById) {
      return document.getElementById(id);
    } else if (document.all) {
      return document.all[id];
    } else {
      throw new Error("No way to retrieve element!");
    }
  }
}
//* This example shows an incorrect usage of capability detection

console.log("*******Safer Capability Detection********");
//* example of... tries to determine if an object is sortable:

{
  // AVOID! Incorrect capability detection – only checks for existence
  function isSortable(object) {
    return !!object.sort;
  }

  let result = isSortable({ sort: true });
}

//! Simply testing for the existence of a property doesn’t definitively indicate that the object in question is sortable. The better approach is to check that sort is actually a function

{
  //! Better – checks if sort is a function
  function isSortable(object) {
    return typeof object.sort == "function";
  }
}

//* NOTE: , DOM objects are host objects, and host objects are implemented via COM instead of JScript in Internet Explorer 8 and earlier. --  Internet Explorer 9 correctly returns "function" for DOM methods

//! The advantage of using capability detection over user-agents to identify a browser is that, while it is exceptionally easy to spoof a user-agent, it is much harder to conceal all the capabilities of a browser in a way that can reliably fool capability detection tests

console.log("*****Using Capability Detection for Browser Analysis*******");

//* Detecting Feature Support
{
  // determine if the browser has Netscape-style plugins
  let hasNSPlugins = !!(navigator.plugins && navigator.plugins.length);

  // determine if the browser has basic DOM Level 1 capabilities
  let hasDOM1 = !!(
    document.getElementById &&
    document.createElement &&
    document.getElementsByTagName
  );
}
console.log("*********Detecting Browser Identity**********");
//* Detecting Browser Identity
//*  which tests for known unique behavior of various browsers to infer the browser the code is running inside. This code intentionally does not make use of navigator.userAgent

{
  class BrowserDetector {
    constructor() {
      // Test for conditional compilation
      // Supported IE6 to IE10
      this.isIE_Gte6Lte10 = /*@cc_on!@*/ false;

      // Test for presence of documentMode
      // Supported IE7 to IE11
      this.isIE_Gte7Lte11 = !!document.documentMode;

      // Test for presence of StyleMedia constructor
      // Supported Edge >= 20
      this.isEdge_Gte20 = !!window.StyleMedia;

      // Test for proprietary Firefox add-on install API
      // Supported for all Firefox versions
      this.isFirefox_Gte1 = typeof InstallTrigger !== "undefined";

      // Test for presence of Chrome object and its webstore property. Versions
      // of Opera will have window.chrome, but not window.chrome.webstore
      // Supported for all Chrome versions
      this.isChrome_Gte1 = !!window.chrome && !!window.chrome.webstore;
      // Early versions of Safari would append "Constructor" to the constructor
      // function identifier.
      // window.Element.toString(); // [object ElementConstructor]
      // Supported Safari 3 to 9.1
      this.isSafari_Gte3Lte9_1 = /constructor/i.test(window.Element);

      // Push notification API exposed on window object. Uses default parameters
      // to prevent stringification of undefined values.
      // Supported Safari 7.1+
      this.isSafari_Gte7_1 = (({ pushNotification = {} } = {}) =>
        pushNotification.toString() == "[object SafariRemoteNotification]")(
        window.safari
      );
      // Tests for the 'addons' property.
      // Supported Opera 20+
      this.isOpera_Gte20 = !!window.opr && !!window.opr.addons;
    }

    isIE() {
      return this.isIE_Gte6Lte10 || this.isIE_Gte7Lte11;
    }
    isEdge() {
      return this.isEdge_Gte20 && !this.isIE();
    }
    isFirefox() {
      return this.isFirefox_Gte1;
    }
    isChrome() {
      return this.isChrome_Gte1;
    }
    isSafari() {
      return this.isSafari_Gte3Lte9_1 || this.isSafari_Gte7_1;
    }
    isOpera() {
      return this.isOpera_Gte20;
    }
  }
}

console.log("********Capability Detection Limitations*********");
//*
{
  //! AVOID! Not specific enough
  let isFirefox = !!(navigator.vendor && navigator.vendorSub);
  //! AVOID! Makes too many assumptions
  let isIE = !!(document.all && document.uniqueID);
}

console.log("*********USER-AGENT DETECTION*********");
//* User-agent detection uses the browser’s user-agent string to determine information about the browser being used.

//! Among the controversial aspects of the user-agent string is its long history of spoofing, when brows­ers try to fool servers by including erroneous or misleading information in their user-agent string

console.log("**********History of User-Agent Composition**********");
//* The specification further stipulates that the user-agent string should be specified as a list of products in the form token/product version. In reality, however, user-agent strings have never been that simple

console.log("**********Early Browsers***********");
//* The first web browser, Mosaic, was released in 1993 by the National Center for Supercomputing Applications (NCSA). Its user-agent string was fairly simple
//! Mosaic/0.9
//! The text before the forward slash indicates the product name
//! the text after the slash is the product version.

/*
 *  A typical user-agent string from Netscape Navigator 2 looked like this:
 *  Mozilla/2.02 [fr] (WinNT; I)
 */

console.log("****** Netscape Navigator 3 and Internet Explorer 3 *******");
//! For example, Internet Explorer 3.02 running on Windows 95 had this user-agent string:
//! ex1.  Mozilla/2.0 (compatible; MSIE 3.02; Windows 95)
//! ex2.  Mozilla/4.0 (compatible; MSIE 4.0; Windows 98)

//! In Internet Explorer versions through version 7, the following pattern has remained:
//! Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)

//! Internet Explorer 8 introduced an additional token called Trident, which is the name of the rendering engine. The format became:
//* Mozilla/4.0 (compatible; MSIE Version; Operating System; Trident/TridentVersion)

//* For example:
//* Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)

//! Adding this extra token makes it possible to determine if a browser is Internet Explorer 7 (in which case there is no Trident token) or Internet Explorer 8 running in compatibility mode.

//! The default user-agent string for Internet Explorer 9 looks like this:
//* Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)

//* All of these changes were made to ensure that past user-agent detection scripts continue to work correctly while enabling new scripts to have additional information.

console.log("*******Gecko********");
//* The Gecko rendering engine is at the heart of Firefox.

//* To better understand the Gecko user-agent string format, consider the following user-agent strings taken from various Gecko-based browsers:

/*
* Netscape 6.21 on Windows XP:
Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:0.9.4) Gecko/20011128
Netscape6/6.2.1
* SeaMonkey 1.1a on Linux:
Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1b2) Gecko/20060823 SeaMonkey/1.1a
* Firefox 2.0.0.11 on Windows XP:
Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.11) Gecko/20071127
Firefox/2.0.0.11
* Camino 1.5.1 on Mac OS X:
Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en; rv:1.8.1.6) Gecko/20070809
Camino/1.5.1

 */
//! The Mozilla version hasn’t changed from 5.0 since the first Gecko-based browser was released, and it likely won’t change again.

//! An example of the final Firefox 4 user-agent string is:
//* Mozilla/5.0 (Windows NT 6.1; rv:2.0.1) Gecko/20100101 Firefox 4.0.1

console.log("***********WebKit************");
//* In 2003, Apple announced that it would release its own web browser, called Safari

/*
* Safari’s user-agent string was augmented slightly when version 3 was released. The following version token is now used to identify the actual version of Safari being used:

* Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/522.15.5 (KHTML, like Gecko) Version/3.0.3 Safari/522.15.5
*/

console.log("**********Konqueror*************");
//* Konqueror, the browser bundled with the KDE Linux desktop environment
//* follows: Mozilla/5.0 (compatible; Konqueror/Version; OS-or-CPU)

//! However, Konqueror 3.2 introduced a change to coincide with changes to the WebKit user-agent string, identifying itself as KHTML
//! Mozilla/5.0 (compatible; Konqueror/Version; OS-or-CPU) KHTML/KHTMLVersionu(like Gecko)
//* the last
//! Mozilla/5.0 (compatible; Konqueror/3.5; SunOS) KHTML/3.5.0 (like Gecko)

console.log("************Chrome***********");
//* Google’s Chrome web browser uses Blink as its rendering engine but uses V8 as its JavaScript engine.

/*
 * Mozilla/5.0 (Platform; Encryption; OS-or-CPU; Language) AppleWebKit/AppleWebKitVersion (KHTML, like Gecko) Chrome/ChromeVersion Safari/SafariVersion
 */

/*
* Following is the full user-agent string for Chrome 7: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/534.7 (KHTML, like Gecko) Chrome/7.0.517.44 Safari/534.7

 */
console.log("************Opera**************");
//* One of the most controversial web browsers, as far as user-agent strings are concerned
/*
 * . Prior to version 8, the Opera user-agent string was in the following format:
 * Opera/Version (OS-or-CPU; Encryption) [Language]
 */

//! Instead of confusing sniffers by changing its own user-agent string, Opera identifies itself as a different browser completely by changing its own user-agent string

//* Another option for identifying the browser is to mask it as either Firefox or Internet Explorer.

/*
* Opera 10 introduced changes to its user-agent string. The format became:
    * Opera/9.80 (OS-or-CPU; Encryption; Language) Presto/PrestoVersion Version/Version

*/
//* Opera 10 introduced the additional Presto token and the Version token to hold the actual browser version.
//* Opera/9.80 (Windows NT 6.1; U; en) Presto/2.6.30 Version/10.63

//! Lexically, the user-agent now resembles that of WebKit browsers with the exception of the trailing OPR clause. This is the user-agent string for Opera 52 on Windows 10:
//* Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
//* Chrome/65.0.3325.181 Safari/537.36 OPR/52.0.2871.64

console.log("*********Using User-Agent for Browser Analysis**********");

//User-agent identification is an imperfect browser identification solution, especially because of how easy it is to spoof a user-agent string
{
  console.log("----->> ", window.navigator.userAgent);

  window.navigator.userAgent = "foobar";

  console.log("----->> ", window.navigator.userAgent);
}

//* browsers that offer the pseudo-private __defineGetter__ make spoofing the user-agent very easy:
{
  console.log("***", window.navigator.userAgent);

  window.navigator.__defineGetter__("userAgent", () => "foobar");

  console.log("***", window.navigator.userAgent);
  // foobar
}
//! If you suspect a script or browser may be manipulating this value, you may prefer to use capability detection

console.log("*********Using User-Agents for Browser Analysis**********");

/*
 * user-agent parser implementations require constant updates to avoid becoming outdated
 * Any hand-rolled user-agent parser implementation will become quickly obsolete without constant updating and revision
 * constructing a parser from scratch is no longer recommended
 */

//!  user-agent parsers that are actively maintained
/*
 * ➤➤ Bowser— https://github.com/lancedikson/bowser
 * ➤➤ ua-parser-js—https://github.com/faisalman/ua-parser-js
 * ➤➤ Platform.js—https://github.com/bestiejs/platform.js
 * ➤➤ current-device—https://github.com/matthewhudson/current-device
 * ➤➤ Google Closure—https://github.com/google/closure-library/tree/master/closure/goog/useragent
 * ➤➤ Mootools— https://github.com/mootools/mootools-core/blob/master/Source/Browser/Browser.js
 */

console.log("*********SOFTWARE AND HARDWARE DETECTION  ************");
/*
Although feature detection and user-agent parsing are two ways of identifying the browser that is cur­
rently in use, the navigator and screen objects also offer information about the software environ­
ment in which the page is currently executing.

 */
{
  //* The navigator.oscpu Property
  //* The oscpu property can provide a string, which is usually the operating system/architecture compo­nent of the user-agent.
  console.log(navigator.userAgent);

  console.log(navigator.oscpu);
}

{
  //* The navigator.vendor Property
  //*  The vendor property can provide a string, which is usually the browser vendor. The string returned is a function of the browser’s navigator compatibility mode
  console.log(navigator.vendor);
}

{
  //* The navigator.platform Property
  //* The platform property can provide a string, which is usually indicative of the operating system inside which the browser is executing.

  console.log(navigator.platform);
}

console.log("***The screen.colorDepth and screen.pixelDepth Properties***");
//* The colorDepth and pixelDepth properties return the same value: the number of color bits that can be represented in the display. Per the CSSOM Specification:
{
  console.log(screen.colorDepth);

  console.log(screen.pixelDepth);
}

console.log("*******The screen.orientation Property");
/* The orientation property returns a ScreenOrientation object, which contains information about
the browser’s screen according to the Screen Orientation API. The most interesting properties inside this object are angle, which returns the angle of the screen relative to the default, and type, which returns a string from an enum of possible orientation types */
/*
 * portrait-primary
 * portrait-secondary
 * landscape-primary
 * landscape-secondary
 */

{
  //*  For example, in Chrome on a mobile phone, screen.orientation is reported as follows:
  // Viewed vertically
  console.log(screen.orientation.type);
  // portrait-primary
  console.log(screen.orientation.angle);
  // 0

  // Rotate phone left
  console.log(screen.orientation.type);
  // landscape-primary
  console.log(screen.orientation.angle);
  // 90

  // Rotate phone right
  console.log(screen.orientation.type);
  // landscape-secondary
  console.log(screen.orientation.angle);
  // 270
}

console.log("******The Geolocation API*******");
//* The navigator.geolocation property provides access to the GeoLocation API, which allows browser scripts to learn about the current device’s location. This API is only available in a secure execution context (scripts which are served via HTTPS).

//* The API can send out requests to the host system to return the device’s location

//* Common sources of location information include Global Positioning System (GPS) and location inferred from network signals such as IP address, RFID, WiFi and Bluetooth MAC addresses, and GSM/CDMA cell IDs, as well as user input.

//* To perform a one-time capture of the browser’s current location, use the getCurrentPositio  () method. It returns a Coordinates object, the contents of which may or may not be complete depend­ing on the abilities of the host system:

//*
{
  // getCurrentPosition() callback is invoked with Position object as only argument
  let p;
  navigator.geolocation.getCurrentPosition((position) => (p = position));

  console.log(p.timestamp);
  // 1525364883361

  console.log(p.coords);
  // Coordinates {...}

  //* The Coordinates object contains latitude/longitude in standard degrees format, as well as the accuracy of that pair in meters. The accuracy measurement is provided by the same mechanism that assessed the device location.

  console.log(p.coords.latitude, p.coords.longitude);
  // 37.4854409, -122.2325506

  console.log(p.coords.accuracy);
  // 58
}

console.log("******Connection State and the NetworkInformation API******");

console.log("******Connection State and the NetworkInformation API********");
/*
 * The browser tracks the network connection state and exposes this information in two ways
 * con­nection events
 * the navigator.onLine property
 *
 */
{
  const connectionStateChange = () => console.log(navigator.onLine);

  window.addEventListener("online", connectionStateChange);
  window.addEventListener("offline", connectionStateChange);
  // On device connect:
  // true

  // On device disconnect:
  // false
}

console.log("**********Battery Status API*********");
//* The browser is capable of accessing information about the device’s battery and charging state. The navigator.getBattery() method returns a promise that resolves to a BatteryManager object.
{
  let battery = navigator.getBattery().then((b) => console.log(b));
  // BatteryManager { ... }

  /*
  MY RESULT...
  navigator.getBattery().then((b) => console.log(b))
  Promise {<pending>}
  VM3843:1 BatteryManager {charging: true, chargingTime: Infinity, dischargingTime: Infinity, level: 1, onchargingchange: null, …}
  */
}

/*
 * The API also offers four event properties that can be used to set callbacks when any of the battery properties change. This can be accomplished either by adding an event listener on the BatteryManager object or assigning the handler to the respective property:
 * ➤➤  onchargingchange
 * ➤➤  onchargingtimechange
 * ➤➤  ondischarcingtimechange
 * ➤➤  onlevelchange
 */
{
  navigator.getBattery().then((battery) => {
    // Assign callback for when the charging state changes:
    const chargingChangeHandler = () => console.log("chargingchange");
    battery.onchargingchange = chargingChangeHandler;
    // OR
    battery.addEventListener("chargingchange", chargingChangeHandler);
    // Assign callback for when the charging time changes:
    const chargingTimeChangeHandler = () => console.log("chargingtimechange");
    battery.onchargingtimechange = chargingTimeChangeHandler;
    // OR
    battery.addEventListener("chargingtimechange", chargingTimeChangeHandler);
    // Assign callback for when the discharging time changes:
    const dischargingChangeHandler = () => console.log("dischargingtimechange");
    battery.ondischargingtimechange = dischargingTimeChangeHandler;
    // OR
    battery.addEventListener(
      "dischargingtimechange",
      dischargingTimeChangeHandler
    );
    // Assign callback for when the battery level changes:
    const levelChangeHandler = () => console.log("levelchange");
    battery.onlevelchange = levelChangeHandler;
    // OR
    battery.addEventListener("levelchange", levelChangeHandler);
  });
}

console.log("*******Hardware*******");
console.log("processor cores......", navigator.hardwareConcurrency);
console.log("processor cores......", navigator.deviceMemory);
console.log("processor cores......", navigator.maxTouchPoints);

console.log("*******SUMMARY**********");

