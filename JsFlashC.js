/** @license
 *
 *  JsFlashC Simple test/example for web cross-platform communication
 *  -----------------------------------------------------------------
 *
 * Copyright (c) 2011, Pawel Cyrta - Metamedia Technologies. All rights reserved.
 * Code provided under the BSD License:
 * 
 */


/*jslint white: false, onevar: true, undef: true, nomen: false, eqeqeq: true, plusplus: false, bitwise: true, regexp: false, newcap: true, immed: true */
/*global window, console, document, navigator, setTimeout, setInterval, clearInterval, Audio */

(function(window) {

var jsFlashC = null;

function JsFlashC(smURL, smID) {
}


/*
// SM2_DEFER details: http://www.schillmania.com/projects/soundmanager2/doc/getstarted/#lazy-loading
if (typeof SM2_DEFER === 'undefined' || !SM2_DEFER) {
  jsFlashC = new JsFlashC();
}
*/
// public interfaces
window.JsFlashC = JsFlashC; // constructor
window.jsFlashC = jsFlashC; // public API, flash callbacks etc

}(window));