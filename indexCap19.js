console.log("******Scripting Forms*******");
/*
 * ➤➤ Understanding form basics
 * ➤➤ Text box validation and interaction
 * ➤➤ Working with other form controls
 */
console.log("-------FORM BASICS-------");
//* Web forms are represented by the <form> element in HTML and by the HTMLFormElement type in JavaScript

//* References to <form> elements can be retrieved in a number of different ways
{
  //?  treat them as any other elements and assign the id attribute
  let form = document.getElementById("form1");
  console.log(form);
  //? All forms on the page can also be retrieved from document.forms collection.
  // get the first form in the page
  let firstForm = document.forms[0];

  // ge the form with a name of form2
  let myForm = document.forms["form2"];
  console.log(myForm);
}

console.log("------Submitting Forms------");
/*
* Forms are submitted when a user interacts with a submit button or an image button

* SUBMIT BUTTONS: are defined using either 
? the <input> element
? the <button> element with a type attribute of "submit"

*  IMAGE BUTTONS: are defined using:
? <input> element with a type attribute of "image"
 */
// {
//   let form = document.getElementById("myForm");

//   form.addEventListener("submit", (event) => {
//     //prevent form submission
//     event.preventDefault();
//   });
// }

//? It’s possible to submit a form programmatically by calling the submit() method from JavaScript.
// {
//   let form = document.getElementById("myForm");

//   // submit the form
//   form.submit();
//   //? When a form is submitted via submit(), the submit event does not fire, so be sure to do data validation before calling the method.
// }

/*
* biggest issues with form submission is the possibility of submitting the form twice - d may click a submit button multiple times
? (because the server processes duplicate requests) or damaging (if the user is attempting a purchase and ends up placing multiple orders

* two ways to solve this problem:
!  DISABLE the submit button once the form is submitted, ! USE THE­ ONSUBMIT event handler to cancel any further form submissions.
*/

console.log("--------Resetting Forms--------");
//* Reset buttons are created using either the <input> or the <button> element with a type attribute of "reset"
//! When a form is reset, all of the form fields are set back to the values they had when the page was first rendered

//* When a form is reset by the user clicking a reset button, the reset event fires. This event gives you the opportunity to cancel the reset if necessary.
// {
//   let form = document.getElementById("myForm");

//   form.addEventListener("reset", (event) => {
//     event.preventDefault();
//   });
// }
//! There’s almost never a need to reset a form
//? t’s often enough to provide a cancel button that takes the user back to the previous page rather than explicitly revert all values in the form.

console.log("--------Form Fields-------");

{
  let form = document.getElementById("myForm");

  //get the first field in the form
  let field1 = form.elements[0];

  // get the field named "textbox1"
  let field2 = form.elements["textbox1"];

  //get the number of fields
  let fieldCount = form.elements.length;

  console.log("form length:: ", fieldCount);
  console.log("form-elements:: ", field1, field2);
}

//* if a name is in use by multiple forms controls, as is the case with radio buttons, then an HTMLCollection is returned containing all of the elements with the name

{
  //? radios have same name=color, elements["color"], a NodeList is returned
  let form = document.getElementById("myForm1");

  let colorFields = form.elements["color"];
  console.log("colorFields", colorFields);

  console.log(colorFields.length); // 3

  let firstColorField = colorFields[0];
  let firstFormField = form[0];
  console.log(
    "firstColorField === firstFormField::",
    firstColorField === firstFormField
  ); // true
}

console.log("*******Common Form-Field Properties******");
//* With the exception of the <fieldset> element, all form fields share a common set of properties
/*
* disabled
* form
* name
* readOnly
* tabIndex
* type
* value
? With the exception of the form property, JavaScript can change all other properties dynamically.
*/
{
  let form = document.getElementById("myForm");
  let field = form.elements[0];

  //change the value
  field.value = "Another value";

  //check the value of form
  console.log("value changed:: ", field.form === form, field.form, form); // true

  //set focus to the field
  field.focus();

  //disable the field
  field.disabled = true;

  //change the type of field (NOT RECOMMENDED, BUT POSSIBLE FOR <input>)
  field.type = "checkbox";
}

//*  common problem with web forms is users’ tendency to click the submit button twice
/*
* A very common solution to this problem is to
? DISABLE THE SUBMIT BUTTON ONCE IT’S BEEN CLICKED, which is possible by listening for the submit event
? DISABLING THE SUBMIT BUTTON WHEN IT OCCURS
 */
{
  // code to prevent multiple form submissions
  let form = document.getElementById("myForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let target = event.target;
    console.log("target:: ", target);

    // get the submit button
    let btn = target.elements["submit-btn"];

    // disable the submit button
    btn.disabled = true;
  });
}
//! it’s better to disable the submit button using the submit event.
//* the submit event is fired only by a submit button.
//? For <input> and <button> elements, the type property can be changed dynamically, whereas the <select> element’s type property is read-only

console.log("******Common Form-Field Methods******");
/*
* Each form field has two methods in common: focus() and blur()
?  THE FOCUS() METHOD: sets the browser’s focus to the form field- the field becomes active and will respond to keyboard events
? d
* focus... to call the user’s attention to some part of the page
* it's quite common , to have the focus moved to the first field in a form when the page is loaded.

 */
{
  window.addEventListener("load", (event) => {
    document.forms[1].elements[0].focus();
    console.log("FOCUSED...");
  });
}

{
  window.addEventListener("load", (event) => {
    // let element = document.forms[3].elements[0]; // same
    let element = document.forms["myForm"].elements[0]; // same
    console.log("FORM4", document.forms[3].elements[0]);

    if (element.autofocus !== true) {
      console.log("lement.autofocus:: ", element.autofocus);
      element.focus();
      console.log("JS focus");
    }
  });
}

//* blur() ~> the opposite of focus(), when blur() is called  it’s just removed from the field
//? This method was used early in web development to create read-only fields before the readonly attribute was introduced
{
  document.forms[3].elements[0].blur();
}

console.log("*****Common Form-Field Events*********");
/*
 * blur - Fires when the field loses focus
 * change - Fires when the field loses focus and the value has changed
 * focus - fires when the field gets focus
 
 ?  The change event, however, fires at different times for different controls

 * The focus event may be used to change the background color to more clearly indicate that the field has focus, the blur event can be used to remove that background color, and the change event can change the background color to red if nonnumeric characters are entered
 */
{
  let textbox = document.forms["myForm"].elements[1];

  textbox.addEventListener("focus", (event) => {
    let target = event.target;
    if (target.style.backgroundColor != "red") {
      target.style.backgroundColor = "yellow";
    }
  });

  textbox.addEventListener("blur", (event) => {
    let target = event.target;
    target.style.backgroundColor = /[^\d]/.test(target.value) ? "red" : "";
  });

  textbox.addEventListener("change", (event) => {
    let target = event.target;
    target.style.backgroundColor = /[^\d]/.test(target.value) ? "red" : "";
  });
}

console.log("----------SCRIPTING TEXT BOXES--------");
/*
* There are two ways to represent text boxes in HTML:

? a single-line version using the <input> element
? multiline version using <textarea>

* By default, the <input> element displays a text box,
 */
//* create a text box that can display 25 characters at a time but has a maximum length of 50

{
  // both types of text boxes store their contents in the value property
  let textbox = document.forms["myForm2"].elements["textbox1"];
  console.log(textbox.value);

  textbox.value = "Some new value...";
}
//!  Changes to the value property aren’t always reflected in the DOM either, so it’s best to avoid using DOM methods when dealing with text box values

console.log("*******Text Selection********");
//? Both types of text boxes support a method called select(), which selects all of the text in a text box.
{
  let textbox = document.forms["myForm2"].elements["textbox1"];
  // let textContent = textbox.select();
  // console.log(textContent);

  textbox.addEventListener("focus", (event) => {
    let content = event.target.select();
    console.log("**", content);
  });
  //! all of the text will be selected as soon as the text box gets focus.This can greatly aid the usability of forms.
}

console.log("******The select Event*****");
/*
* To accompany the select() method, there is a select event. \
? The select event fires when text is selected in the text box
! Exactly when the event fires differs from browser to browser
 */

{
  let textbox = document.forms["myForm2"].elements["textbox1"];

  textbox.addEventListener("select", (event) => {
    console.log(`text selected: ${textbox.value}`);
  });
}

console.log("*******Retrieving Selected Text*******");
{
  let textbox = document.forms["myForm2"].elements["textbox1"];

  textbox.addEventListener("select", (event) => {
    console.log(`text selected: ${textbox.value}`);
    let res = getSelectedText(textbox);
    console.log("selectionStart-selectionEnd:: ", res);
  });

  function getSelectedText(textbox) {
    return textbox.value.substring(
      textbox.selectionStart,
      textbox.selectionEnd
    );
  }
}

console.log("*****Partial Text Selection******");
{
  let textbox = document.forms["myForm2"].elements["textbox1"];

  textbox.addEventListener("focus", (event) => {
    let target = event.target;

    // textbox.value = "Hello world!";

    // select all text
    target.setSelectionRange(0, target.value.length); // "Hello world!"

    // select first three characters
    target.setSelectionRange(0, 3); // "Hel"

    // select characters 4 through 6
    target.setSelectionRange(4, 7); // "o w"
  });
}

console.log("*******Input Filtering*******");

//* Blocking Characters
/*
? a text box for the user’s phone number should not allow non-numeric values to be inserted
 */
let textbox = document.forms["myForm2"].elements["textbox1"];

{
  //? The keypress event is responsible for inserting characters into a text box. Characters can be blocked by preventing this event’s default behavior.

  //*  allows only numbers
  let textbox = document.forms["myForm2"].elements["textbox1"];

  textbox.addEventListener("keypress", (event) => {
    if (!/\d/.test(String.fromCharCode(event.charCode))) {
      event.preventDefault();
    }
  });
}

//*  In Firefox, all noncharacter keys that fire the keypress event have a character code of 0, whereas Safari versions prior to 3 give them all a character code of 8.
{
  textbox.addEventListener("keypress", (event) => {
    if (!/\d/.test(String.fromCharCode(event.charCode)) && event.charCode > 9) {
      event.preventDefault();
    }
  });
}

//* The last check, therefore, is to make sure the Ctrl key is not pressed
{
  textbox.addEventListener("keypress", (event) => {
    if (
      !/\d/.test(String.fromCharCode(event.charCode)) &&
      event.charCode > 9 &&
      !event.ctrlKey
    ) {
      event.preventDefault();
    }
  });
}

console.log("**********Dealing with the Clipboard**********");
/*
* nternet Explorer was the first browser to support events related to the clipboard and access to clipboard data from JavaScript

? six events are related to the clipboard:
* beforecopy—Fires just before the copy operation takes place.
* copy—Fires when the copy operation takes place.
* beforecut —Fires just before the cut operation takes place
* cut —Fires when the cut operation takes place
* beforepaste —Fires just before the paste operation takes place.
* paste —Fires when the paste operation takes place.
 */

//! For cross-browser compatibility, it’s best to use this object only during clipboard events

/*
* There are three methods on the clipboardData object: getData(), setData(), and clearData()

* The getData() method retrieves string data from the clipboard and accepts a single argument
? . Internet Explorer specifies two options: "text" and "URL". Firefox, Safari, and Chrome expect a MIME type but will accept "text" as equivalent to "text/plain".

*  its first argument is the data type, and its second argument is the text to place on the clipboard.
? Internet Explorer supports "text" and "URL, whereas Safari and Chrome expect a MIME type. 

*/
{
  //? ...To even out the differences, you can use the following cross-browser methods
  function getClipboardText(event) {
    var clipboardData = event.clipboardData || window.clipboardData;
    return clipboardData.getData("text");
  }

  function setClipboardText(event, value) {
    if (event.clipboardData) {
      return event.clipboardData.setData("text/plain", value);
    } else if (window.clipboardData) {
      return window.clipboardData.setData("text", value);
    }
  }
}

//? Reading text from the clipboard is helpful when you have a text box that expects only certain characters or a certain format of text.
{
  //! This onpaste handler ensures that only numeric values can be pasted into the text boxI
  function getClipboardText(event) {
    var clipboardData = event.clipboardData || window.clipboardData;
    return clipboardData.getData("text");
  }

  function setClipboardText(event, value) {
    if (event.clipboardData) {
      return event.clipboardData.setData("text/plain", value);
    } else if (window.clipboardData) {
      return window.clipboardData.setData("text", value);
    }
  }

  textbox.addEventListener("paste", (event) => {
    let text = getClipboardText(event);
    if (!/^\d*$/.test(text)) {
      event.preventDefault();
    }
  });
}

console.log("********Automatic Tab Forward********");
//* To aid in usability and speed up the data-entry process, you can automatically move focus to the next element as soon as the maximum number of characters has been entered.
{
  function tabForward(event) {
    let target = event.target;
    // console.log("target:: ", target);

    if (target.value.length == target.maxLength) {
      let form = target.form;

      console.log("form***", form);
      for (let i = 0, len = form.elements.length; i < len; i++) {
        if (form.elements[i] == target) {
          if (form.elements[i + 1]) {
            form.elements[i + 1].focus();
          }
          return;
        }
      }
    }
  }

  let inputIds = ["txtTel1", "txtTel2", "txtTel3"];

  for (let id of inputIds) {
    let textbox = document.getElementById(id);
    textbox.addEventListener("keyup", tabForward);
  }

  let textbox1 = document.getElementById("txtTel1");
  let textbox2 = document.getElementById("txtTel2");
  let textbox3 = document.getElementById("txtTel3");
}

console.log("*****HTML5 Constraint Validation API*******");
//* Required Fields
{
  let isUsernameRequired =
    document.forms["myForm2"].elements["username"].required;
  console.log("----> ", isUsernameRequired);

  //! You can also test to see if the browser supports the required attribute using this code snippet:
  let isRequiredSupported = "required" in document.createElement("input");
  console.log("isREquired:: ", isRequiredSupported);
}

console.log("*****Alternate Input Types******");
//* the type attribute on an <input> element... type of data expected but also provide some default validation
//! "-@-" is considered a valid e-mail address.

{
  let form = document.getElementById("myForm2");
  let input = document.createElement("input");
  input.type = "email";
  input.value = "patricia@test.com";

  // input.appendChild(document.getElementById("body"));
  let isEmailSupported = input.type == "email";
  console.log("type-eamil:: ", isEmailSupported, input.value);
}

console.log("********Numeric Ranges********");
// {
//   let pattern = document.forms[0].elements["count"].pattern;

//   let isPatternSupported = "pattern" in document.createElement("input");
// }

console.log("********Checking Validity*********");

{
  let selectbox = document.forms["myForm3"].elements["location"];

  // preferred
  let text = selectbox.options[0].text; // option text
  let value = selectbox.options[0].value; // option value
}
//! When dealing with options, it’s best to use the option-specific properties because they are well supported across all browsers.

console.log("******Options Selection********");
//* the easiest way to access the selected option is by using the select box’s selectedIndex property to retrieve the option,

let selectbox = document.forms["myForm3"].elements["location"];

{
  let selectbox = document.forms["myForm3"].elements["location"];

  // preferred
  let text = selectbox.options[0].text; // option text
  let value = selectbox.options[0].value; // option value

  let selectedIndex = selectbox.selectedIndex;
  let selectedOption = selectbox.options[selectedIndex];
  console.log(
    `Selected index: $[selectedIndex}\n` +
      `Selected text: ${selectedOption.text}\n` +
      `Selected value: ${selectedOption.value}`
  );

  selectbox.options[2].selected = true;

  // TODO IMPORTANT!
  //? To get all of the selected options, you can loop over the options collection and test the selected property

  function getSelectedOptions(selectbox) {
    let result = new Array();

    for (let option of selectbox.options) {
      if (option.selected) {
        result.push(option);
      }
    }

    return result;
  }

  let resSelectOptions = getSelectedOptions(selectbox);
  console.log("res-SelectOptions:: ", resSelectOptions);

  //* This can be used for select boxes that allow single or multiple selection
  let selectedOptions = getSelectedOptions(selectbox);
  let message = "";
  for (let option of selectedOptions) {
    message +=
      `Selected index: ${option.index}\n` +
      `Selected text: ${option.text}\n` +
      `Selected value: ${option.value}\n`;
  }
  console.log("***message***", message);
}

console.log("********Adding Options********");

//* The first way is to use the DOM as follows:
{
  let newOption = document.createElement("option");
  newOption.appendChild(document.createTextNode("Option text"));
  newOption.setAttribute("value", "Option value");

  selectbox.appendChild(newOption);
  //? This code creates a new <option> element, adds some text using a text node, sets its value attribute, and then adds it to a select box. The new option shows up immediately after being created.
}
//* New options can also be created using the Option constructor, which is a holdover from pre-DOM browsers
//*  The Option constructor accepts two arguments, the text and the value, though the  argument is optional.
{
  let newOption = new Option("Option text", "Option value"); // though the second argument is optional.
  selectbox.appendChild(newOption); // problems in IE <= 8
}

//* Another way to add a new option is to use the select box’s add() method
/*
  * The DOM specifies that this method accepts two arguments: 
  ? the new option to add
  ?  the option before which the new option should be inserted.
  ? To add an option at the end of the list, the second argument should be null.
  */
{
  let newOption = new Option("Option text", "Option value");
  selectbox.add(newOption, undefined); // best solution
}

console.log("******Removing Options*********");

{
  //* You can use the DOM ­ removeChild() method and pass in the option to remove
  selectbox.removeChild(selectbox.options[0]); // remove first option

  //* the second to use the select box’s remove() method
  selectbox.remove(0); // remove first option

  //* The last way is to simply set the option equal to null
  selectbox.options[0] = null; // remove first option

  //* To clear a select box of all options, you need to iterate over the options and remove each one
  function clearSelectbox(selectbox) {
    for (let option of selectbox.options) {
      selectbox.remove(0);
    }
  }

  //! This function simply removes the first option in a select box repeatedly. Because removing the first option automatically moves all of the options up one spot, this removes all options.
}

console.log("********Moving and Reordering Options*******");
//* The serialize() function begins by defining an array called parts to hold the parts of the string that will be created

{
  let myForm3 = document.forms["myForm3"];
  //* The serialize() function outputs the string in query string format, though it can easily be adapted to serialize the form into another format.

  function serialize(form) {
    let parts = [];
    let optValue;
    for (let field of form.elements) {
      switch (field.type) {
        case "select-one":
        case "select-multiple":
          if (field.name.length) {
            for (let option of field.options) {
              if (option.selected) {
                if (option.hasAttribute) {
                  optValue = option.hasAttribute("value")
                    ? option.value
                    : option.text;
                } else {
                  optValue = option.attributes["value"].specified
                    ? option.value
                    : option.text;
                }
                parts.push(encodeURIComponent(field.name)) +
                  "=" +
                  encodeURIComponent(optValue);
              }
            }
          }
          break;
        case undefined: // fieldset
        case "file": // file input
        case "submit": // submit button
        case "reset": // reset button
        case "button": // custom button
          break;
        case "radio": // radio button
        case "checkbox": // checkbox
          if (!field.checked) {
            break;
          }
        default:
          // don't include form fields without names
          if (field.name.length) {
            parts.push(
              `${encodeURIComponent(field.name)}=` +
                `${encodeURIComponent(field.value)}`
            );
          }
      }
      return parts.join("&");
    }
  }

  let formSerialized = serialize(myForm3);
  console.log("formSerialized:: ", formSerialized);
}

console.log("********RICH TEXT EDITING**********");
/*
* One of the most requested features for web applications was the ability to edit rich text on a web page (also called what you see is what you get, or WYSIWYG, editing)

? The basic technique is to embed an iframe containing a blank HTML file in the page.
?  Through the designMode property, this blank document can be made editable, at which point you’re editing the HTML of the page’s <body> element.
 */
//! interesting... look at richText.html file
{
  window.addEventListener("load", () => {
    frames["richedit"].document.designMode = "on";
  });
}

console.log("*********Using contenteditable********");
//*  You can also toggle the editing mode on or off by setting the contentEditable property on an element
{
  let div = document.getElementById("richedit");
  richedit.contentEditable = "true";

  //! there are three possible values for contentEditable: "true" to turn on, "false" to turn off, or "inherit" to inherit the setting from a parent
}

console.log("*********Interacting with Rich Text*******");

{
  let result = frames["richedit"].document.queryCommandEnabled("bold");

  let isBold = frames["richedit"].document.queryCommandState("bold");

  let fontSize = frames["richedit"].document.queryCommandValue("fontsize");
}

console.log("*******Rich Text Selections******");
// ...
