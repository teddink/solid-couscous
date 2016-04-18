//// THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF
//// ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO
//// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//// PARTICULAR PURPOSE.
////
//// Copyright (c) Microsoft Corporation. All rights reserved.

(function () {
    function initialize() {
        //  Get the div object, and assign the pointerdown event to it
        var testbox = document.getElementById("testbox");
        testbox.style.position = "absolute";

        //  Check for touch support
         if (window.PointerEvent) {
          testbox.gestureObject = null;
          //  Assign a handler for pointerdown event
          testbox.addEventListener("pointerdown", onDivPointerDown, true);

          //  Instantiate a new gesture object and assign it to the div we're going to move
          testbox.gestureObject = new MSGesture();
          testbox.gestureObject.target = testbox;

          //  Set up handlers for gesture events
          testbox.addEventListener("MSGestureChange", onDivGestureChange, false);
          testbox.addEventListener("MSGestureTap", onDivGestureTap, false);

         } else {
          testbox.innerHTML = "Sorry, your device does not support touch.";
         }
    }

    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", initialize, false);
    } else {
        window.onload = initialize;
    }

    function onDivPointerDown(e) {
      //  Assign the current pointer to the gesture object
      this.gestureObject.addPointer(e.pointerId);
    }
    
    function onDivGestureChange(e) {
      // Update the transform on this element
      var currentXform = new WebKitCSSMatrix(e.target.style.transform);
      e.target.style.transform = currentXform.translate(e.offsetX, e.offsetY).
      translate(e.translationX, e.translationY).
      translate(-e.offsetX, -e.offsetY);
    }

    function onDivGestureTap(e) {
      //  On tap (or click), change colors
      if (e.target.style.backgroundColor == "red") {
        e.target.style.backgroundColor = "green";
        }else{
        e.target.style.backgroundColor = "red";
      }
    }
})();

