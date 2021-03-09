console.log("************Animation and Graphics with Canvas**********");

/*
 * ➤➤ Using requestAnimationFrame
 * ➤➤ Understanding the <canvas> element
 * ➤➤ Drawing simple 2D graphics
 * ➤➤ 3D drawing with WebGL
 */

console.log("**********Early Animation Loops *********");

{
  (function () {
    function updateAnimations() {
      //   doAnimation1();
      //   doAnimation2();
      //etc.
    }
    setInterval(updateAnimations, 100);
  })();
}
//! In short, the millisecond delay is not an indication of when the code will be executed, only an indication of when the job will be queued

//? Exacerbating these problems is the timer resolution of the browser
//? Timers are not accurate to the millisecond
/*
 * Internet Explorer 8 and earlier have a timer resolution of 15.625ms.
 * Internet Explorer 9 and later have a timer resolution of 4ms.
 * Firefox and Safari have a timer resolution of ~10ms.
 * Chrome has a timer resolution of 4ms.
 */
//! So even if you set your interval for optimum display, you’re still only getting close to the timing you want

console.log("*******requestAnimationFrame*********");
/*
 * With JavaScript animations, the browser has no idea that an animation is taking place. His solution was to create a new method, called mozRequestAnimationFrame(), that indicates to the browser that some JavaScript code is performing an animation.
 ? mozRequestAnimationFrame(), that indicates to the browser that some JavaScript code is performing an animation.
 */

//* The requestAnimationFrame() method accepts a single argument which is a function to call prior to repainting the screen

//? . In order to create an animation loop, you can chain multiple calls to requestAnimationFrame() together in the same way previously done with setTimeout().
{
  function updateProgress() {
    var div = document.getElementById("status");
    div.style.width = parseInt(div.style.width, 10) + 5 + "%";
    if (div.style.left != "100%") {
      requestAnimationFrame(updateProgress);
    }
  }
  requestAnimationFrame(updateProgress);
}
//* requestAnimationFrame() actually schedules a repaint for some known point in the future and can tell you when that is. You’re then able to determine how best to adjust your animation.

console.log("********cancelAnimationFrame******");
//* Similar to setTimeout(), requestAnimationFrame() returns a request ID which can be used to cancel the request via cancelAnimationFrame().

//? In the following example, the request callback is enqueued but immediately cancelled
{
  let requestID = window.requestAnimationFrame(() => {
    console.log("Repaint!");
  });

  window.cancelAnimationFrame(requestID);
}

console.log("****Performance Throttling with requestAnimationFrame*****");
/*
 * Browsers that support this method are effectively exposing a hook callback queue
 * The hook is the point just before the browser performs the next repaint.
 *
 */

/* Consider the following naïve implementation, which will invoke the pseudo-expensive operation
upon a scroll event being fired from the window object.
 When scrolling down a web page, this event
can be fired hundreds or thousands of times very quickly
*/

{
  // function expensiveOperation() {
  //   console.log("Invoked at:: ", Date.now());
  // }
  // window.addEventListener("scroll", () => {
  //   expensiveOperation();
  // });
}

//* If you wanted to restrict the callback to only occur just before a repaint, you could wrap it inside a requestAnimationFrame:

{
  // function expensiveOperation() {
  //   console.log("Invoked at...:", Date.now());
  // }
  // window.addEventListener("scroll", () => {
  //   window.requestAnimationFrame(expensiveOperation);
  // });
}

//* You can prevent redundant repaint execution by introducing a flag that is set and unset by the callback

{
  // let enqueued = false;
  // function expensiveOperation() {
  //   console.log("Invoked at:: ", Date.now());
  //   enqueued = false;
  // }
  // window.addEventListener("scroll", () => {
  //   if (!enqueued) {
  //     enqueued = true;
  //     window.requestAnimationFrame(expensiveOperation);
  //   }
  // });
}
// * The following example will prevent the callback from executing more than once every 50ms:

{
  let enabled = true;

  function expensiveOperation() {
    console.log("Invoked at-:: ", Date.now());
  }

  window.addEventListener("scroll", () => {
    if (enabled) {
      enabled = false;
      window.requestAnimationFrame(expensiveOperation);
      window.setTimeout(() => (enabled = true), 50);
    }
  });
}

console.log("*********BASIC CANVAS USAGE*******");

{
  let drawing = document.getElementById("drawing");

  // make sure <canvas> is completely supported
  if (drawing.getContext) {
    let context = drawing.getContext("2d");

    // more code...
  }
}

// * Images created on a <canvas> element can be exported using the toDataURL() method.
//? accepts a single argument, the MIME type format of the image to produce

// to return a PNG-formatted image from a canvas
{
  let drawing = document.getElementById("drawing");

  //make sure <canvas> is completely supported
  if (drawing.getContext) {
    // get data URI of the image
    let imgURI = drawing.toDataURL("image/png");

    // display the image
    let image = document.createElement("img");
    image.src = imgURI;
    document.body.appendChild(image);

    console.log("image-canvas:: ", image);
  }
}

console.log("**********THE 2D CONTEXT********");
/*the 2D drawing context provides methods for drawing simple 2D shapes such as rectangles, arcs,
and paths. The coordinates in a 2D context begin at the upper-left of the <canvas> element, which is
considered point (0, 0 */

console.log("--------Fills and Strokes--------");
/*
? There are two basic drawing operations on the 2D context: fill and stroke
* Fill:  automatically fills in the shape with a specific style (color, gradient, or image)
* stroke: colors only the edges.
! A string value indicates a color defined through: name, hex code, rgb, rgba, hsl, or hsla.
*/

{
  let drawing = document.getElementById("drawing");

  //make sure <canvas> is completely supported
  if (drawing.getContext) {
    let context = drawing.getContext("2d");
    context.strokeStyle = "red";
    context.fillStyle = "#0000ff";
  }
}
// todo run
// {
//   function isCanvasSupported() {
//     var elem = document.createElement("canvas");
//     return !!(elem.getContext && elem.getContext("2d"));
//   }

//   if (!isCanvasSupported()){
//     console.log("canvas NOT SUPPORTED....")
//   }
// }
console.log("---------Drawing Rectangles----------");
//* There are three methods for working with rectangles: fillRect(), strokeRect(), and clearRect()
{
  let drawing = document.getElementById("drawing");
  // make sure <canvas> is completely supported
  if (drawing.getContext) {
    let context = drawing.getContext("2d");
    /*
     * Based on Mozilla's documentation:
     * http:// developer.mozilla.org/en/docs/Canvas_tutorial:Basic_usage
     */

    // draw a red rectangle

    context.fillStyle = "#ff0000";
    context.fillRect(10, 10, 50, 50);

    // draw a blue rectangle that's semi-transparent
    context.fillStyle = "rgba(0,0,255, 0.5)";
    context.fillRect(30, 30, 50, 50);

    // draw a red outlined rectangle
    context.strokeRect(30, 30, 50, 50);
    context.strokeStyle = "#ff0000";
    // draw a blue outlined rectangle that's semi-transparent
    context.strokeStyle = "rgba(0,0,255,0.5)";
    context.strokeRect(10, 10, 50, 50);

    //* You can erase an area of the canvas by using the clearRect() method */

    // clear a rectangle that overlaps both of the previous rectangles
    context.clearRect(40, 40, 10, 10);
  }
}

console.log("********Drawing Paths*********");
/*
* you must first call beginPath() to indicate that a new path has begun

? arc(x, y, radius, startAngle, endAngle, counterclockwise)
? arcTo(x1, y1, x2, y2, radius)
? bezierCurveTo(c1x, c1y, c2x, c2y, x, y) 
? lineTo(x, y) 
? moveTo(x, y) 
? quadraticCurveTo(cx, cy, x, y) 
? rect(x, y,width, height) 
 */
//* consider the following code for drawing the face of a clock without the numbers:
/*
{
  let drawing = document.getElementById("drawing");

  //make sure <canvas> is completely supported
  if (drawing.getContext) {
    let context = drawing.getContext("2d");

    //start the path
    context.beginPath();

    // draw outer circle
    context.arc(100, 100, 99, 0, 2 * Math.PI, false);

    // draw inner circle
    context.moveTo(194, 100);
    context.arc(100, 100, 94, 0, 2 * Math.PI, false);

    //draw minute hand
    context.moveTo(100, 100);
    context.lineTo(100, 15);

    //draw hour hand
    context.moveTo(100, 100);
    context.lineTo(35, 100);

    //stroke the path
    context.stroke();
  }
}*/

console.log("*********Drawing Text*********");
/*
*  necessary to mix text and graphics
? There are two methods for drawing text, fillText() and strokeText()
* the string to draw, the x-coordinate, the y-coordinate, and an optional maximum pixel width to draw
*/
{
  /*
  let drawing = document.getElementById("drawing");

  //make sure <canvas> is completely supported
  if (drawing.getContext) {
    let context = drawing.getContext("2d");

    //start the path
    context.beginPath();

    // draw outer circle
    context.arc(100, 100, 99, 0, 2 * Math.PI, false);

    // draw inner circle
    context.moveTo(194, 100);
    context.arc(100, 100, 94, 0, 2 * Math.PI, false);

    //draw minute hand
    context.moveTo(100, 100);
    context.lineTo(100, 15);

    //draw hour hand
    context.moveTo(100, 100);
    context.lineTo(35, 100);

    //stroke the path
    context.stroke();

    context.font = "bold 14px Arial";
    context.textAlign = "center";

    context.textBaseline = "middle";
    context.fillText("12", 100, 20);

    //-----
    //start-aligned
    context.textAlign = "start";
    context.fillText("12", 100, 40);

    //end-aligned
    context.textAlign = "end";
    context.fillText("12", 100, 60);
  }
   */
}

//*  determine the dimensions of text via the measureText() method
{
  let drawing = document.getElementById("drawing");
  let context = drawing.getContext("2d");

  let fontSize = 100;
  context.font = fontSize + "px Arial";
  while (context.measureText("Hello world!").width > 140) {
    fontSize--;
    context.font = fontSize + "px Arial";
  }

  context.fillText("Hello world!", 10, 10);
  context.fillText("Font size is" + fontSize + "px", 10, 50);
}

// TRANSFORMATION
/*
{
  // make sure <canvas> is completely supported
  if (drawing.getContext) {
    let context = drawing.getContext("2d");
    // start the path
    context.beginPath();

    // draw outer circle
    context.arc(100, 100, 99, 0, 2 * Math.PI, false);

    // draw inner circle
    context.moveTo(194, 100);
    context.arc(100, 100, 94, 0, 2 * Math.PI, false);

    // translate to center
    context.translate(100, 100);

    // draw minute hand
    context.moveTo(0, 0);
    context.lineTo(0, -85);

    // draw hour hand
    context.moveTo(0, 0);
    context.lineTo(-65, 0);

    // stroke the path
    context.stroke();
  }
}
 */
{
  let drawing = document.getElementById("drawing");
  // make sure <canvas> is completely supported
  if (drawing.getContext) {
    let context = drawing.getContext("2d");
    // start the path
    context.beginPath();
    // draw outer circle
    context.arc(100, 100, 99, 0, 2 * Math.PI, false);
    // draw inner circle
    context.moveTo(194, 100);
    context.arc(100, 100, 94, 0, 2 * Math.PI, false);
    // translate to center
    context.translate(100, 100);
    // rotate the hands
    context.rotate(1);
    // draw minute hand
    context.moveTo(0, 0);
    context.lineTo(0, -85);
    // draw hour hand
    context.moveTo(0, 0);
    context.lineTo(-65, 0);
    // stroke the path
    context.stroke();

    context.fillStyle = "#ff0000";
    context.save();

    context.fillStyle = "#00ff00";
    context.translate(100, 100);
    context.save();

    context.fillStyle = "#0000ff";
    context.fillRect(0, 0, 100, 200); // draws blue rectangle at (100, 100)

    context.restore();
    context.fillRect(10, 10, 100, 200); // draws green rectangle at (110, 110)

    context.restore();
    context.fillRect(0, 0, 100, 200); // draws red rectangle at (0, 0)
  }
}
//! I DIDN'T FINISH CANVAS...