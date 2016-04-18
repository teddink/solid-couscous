//// THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF
//// ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO
//// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
//// PARTICULAR PURPOSE.
////
//// Copyright (c) Microsoft Corporation. All rights reserved.

(function () {
    function initialize() {
        var testbox = document.getElementById("testbox");
        testbox.style.position = "absolute";

        //  Check for multi-touch support 
        if (navigator.msMaxTouchPoints > 1) {
            //  The pointerdown is the first step to using a gesture 
            testbox.addEventListener("pointerdown", onDivPointerDown, true);

            testbox.gestureObject = new MSGesture(); //  Create a new gesture object for the <div>
            testbox.gestureObject.target = testbox; //  Assign the div back as the target

            //  as the user interacts with the element, show the action
            testbox.addEventListener("MSGestureChange", onDivGestureChange, false);
            testbox.addEventListener("MSGestureTap", onDivGestureTap, false);
        } else {
          //  Sorry, multitouch isn't available
          testbox.innerHTML = "Sorry, your device doesn't support multi-touch.";
        }
    }

    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", initialize, false);
    } else {
        window.onload = initialize;
    }

    function onDivPointerDown(e) {
        //  Update the div's gesture object with the pointerId
        this.gestureObject.addPointer(e.pointerId);
    }

    function onDivGestureChange(e) {
        //  Uncomment out the following code if you want to disable the built-in inertia provided by dynamic gesture recognition
        // if (e.detail == e.MSGESTURE_FLAG_INERTIA)
        // return;

        //  Update the transform on the div element
        var currentXform = new MSCSSMatrix(e.target.style.transform);  //  Get the latest CSS transform for the div element

        //  Keep scale from getting too small (else user can lose track of it!)
        currentScale = Math.sqrt(currentXform.m11 * currentXform.m22 - currentXform.m12 * currentXform.m21);

        if (e.scale * currentScale >= 0.1) {
            //  Scale is ok, so assign the scale property to the transform
            e.target.style.transform = currentXform.translate(e.offsetX, e.offsetY)  //  Move the transform origin under the center of the gesture
            .rotate(e.rotation * 180 / Math.PI)  //  Apply rotation
            .scale(e.scale)  // apply scale
            .translate(e.translationX, e.translationY) // Apply translation
            .translate(-e.offsetX, -e.offsetY);  // Move the transform origin back
            console.log("offsetX: " + e.offsetX + "   offsetY: " + e.offsetY);
        } else {
            //  Scale is too small, so ignore scale
            e.target.style.transform = currentXform.translate(e.offsetX, e.offsetY). // Move the transform origin under the center of the gesture   
            rotate(e.rotation * 180 / Math.PI).  //  Apply rotation
            translate(e.translationX, e.translationY). // Apply translation
            translate(-e.offsetX, -e.offsetY);  // Move the transform origin back
        }
      }

    function onDivGestureTap(e) {
        //  Restore original size
        var currentXform = new MSCSSMatrix(e.target.style.transform);
        currentScale = Math.sqrt(currentXform.m11 * currentXform.m22 - currentXform.m12 * currentXform.m21);
        
        //  Modify the transform
        e.target.style.transform = currentXform.translate(e.offsetX, e.offsetY).
          scale(1.0 / currentScale).
          translate(-e.offsetX, -e.offsetY);
      }
})();

