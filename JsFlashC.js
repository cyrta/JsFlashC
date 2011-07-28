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

function JsFlashC(urlSWF, id) {

  this.version = null;
  this.versionNumber = 'V2.97a.20110706';
  
   this.url = (urlSWF || null);
   this.swfLoaded = false;
  this.enabled = false;
  
    this.id = (id || 'jsFlashC-movie');
    
      this.didFlashBlock = false;
      
     var  _js = this, _hasConsole = (typeof console !== 'undefined' && typeof console.log !== 'undefined'), _isFocused = (typeof _doc.hasFocus !== 'undefined'?_doc.hasFocus():null), _tryInitOnFocus = (typeof _doc.hasFocus === 'undefined' && _isSafari), _okToDisable = !_tryInitOnFocus, _flashMIME = /(mp3|mp4|mpa)/i;
_fV = this.flashVersion, _doc = document,
_getDocument, _id

_debugLevels = ['log', 'info', 'warn', 'error']

// --- public API methods ---

  this.ok = function() {
    return (_needsFlash?(_didInit && !_disabled):(_s.useHTML5Audio && _s.hasHTML5));
  };
  
// ---- other helpers -----

  _getDocument = function() {
    return (_doc.body?_doc.body:(_doc._docElement?_doc.documentElement:_doc.getElementsByTagName('div')[0]));
  };

  _id = function(sID) {
    return _doc.getElementById(sID);
  };
}


  _complain = function(sMsg) {
    if (typeof console !== 'undefined' && typeof console.warn !== 'undefined') {
      console.warn(sMsg);
    } else {
      _s._wD(sMsg);
    }
  };

  _doNothing = function() {
    return false;
  };



 _detectFlash = function() {

    // hat tip: Flash Detect library (BSD, (C) 2007) by Carl "DocYes" S. Yestrau - http://featureblend.com/javascript-flash-detection-library.html / http://featureblend.com/license.txt

    if (_hasFlash !== undefined) {
      // this work has already been done.
      return _hasFlash;
    }

    var hasPlugin = false, n = navigator, nP = n.plugins, obj, type, types, AX = _win.ActiveXObject;

    if (nP && nP.length) {

      type = 'application/x-shockwave-flash';
      types = n.mimeTypes;
      if (types && types[type] && types[type].enabledPlugin && types[type].enabledPlugin.description) {
        hasPlugin = true;
      }

    } else if (typeof AX !== 'undefined') {

      try {
        obj = new AX('ShockwaveFlash.ShockwaveFlash');
      } catch(e) {
        // oh well
      }
      hasPlugin = (!!obj);

    }

    _hasFlash = hasPlugin;

    return hasPlugin;

  };
  
  
  _go = function(sURL) {
    // where it all begins.
    if (sURL) {
      _s.url = sURL;
    }
    _initMovie();
  };
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