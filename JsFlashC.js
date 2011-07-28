/** @license
 *
 *  JsFlashC Simple test/example for web cross-platform communication
 *  -----------------------------------------------------------------.
 *
 * Copyright (c) 2011, Pawel Cyrta Metamedia Technologies.All rights reserved.
 * Code provided under the BSD License.
 *
 * @author Pawel Cyrta - pawel.cyrta@metamedia.pl
 *
 */


/*jslint white: false, onevar: true, undef: true, nomen: false, eqeqeq: true,
plusplus: false, bitwise: true, regexp: false, newcap: true, immed: true */

/*global window, console, document, navigator, setTimeout, setInterval,
clearInterval, Audio */

(function(window) {

var jsFlashC = null;

function JsFlashC(id) {

  this.version = null;
  this.versionNumber = 'V0.1.0';
  this.swfLoaded = false;
  this.enabled = false;

  this.id = (id || 'flash-container');
  this.eventlogId = "log-list";

  this.didFlashBlock = false;

  this.debugMode = true;
  this.useConsole = this.debugMode;
  this.useConsoleOnly = false;
  this.showTimestampOnLog = true;

  var _js = this,
      _hasConsole = (typeof console !== 'undefined' &&
                     typeof console.log !== 'undefined'),
      _doc = window.document,
      _win = window,
      _slice = Array.prototype.slice,
      _debugLevels = ['log', 'info', 'warn', 'error'];




// --- public API methods ---

  this.ok = function() {

  };

  this.test = function() {
    _js._wD('Log: initialized.');
    var hasFlash = _checkFlashPlugin();
    if (hasFlash) {
      _createSwfObject();
      _checkFlashToJs();
      _checkJsToFlash();
      _checkJsToC();
      _checkCToJs();
      _checkSound();
    }
  }

  //flash
  //echo
  //inc
  //memset
  //alloc
  //free
  //callJsCallback


///


 /****** Testing **********/

 _checkFlashPlugin = function() {
   var fd = FlashDetect;
   var hasFlash = fd.installed;
   //var isSupported = (hasFlash && fd.major >= soundManager.flashVersion);
   var flashVersion = fd.major + '.' + fd.minor + '.' + fd.revisionStr;
   if (hasFlash) {
     _js._wD('Flash Player version:  ' + flashVersion);
     return true;
   } else {
     _js._wD('Flash Player: missing!!!', 3);
     return false;
   }
 };

 _createSwfObject = function() {
   if (swfobject.hasFlashPlayerVersion('10.2')) {
     var att = { data: 'JsFlashC.swf', width: '1', height: '1' };
     var par = { menu: 'false' };
     var id = 'flashObjectContainer';
     var myFlashContent = swfobject.createSWF(att, par, id);
     if (typeof myFlashContent === 'undefined') {
       _js._wD('[ERROR] SWF Object: not created.');
     } else {
       _js._wD('SWF Object: created.');
     }
    } else {
      _js._wD('SWF Object: need Flash Player' +
                        'version 10.0 or greater.', 3);
    }
    //
    return false;
  };

  _checkFlashToJs = function() {
    //PushEventLogText("Flash->JS:  version=0.1 ");
    return false;
  };

  _checkJsToFlash = function() {
    //PushEventLogText("JS->Flash:  version=0.1 ");
    return false;
  };

  _checkJsToC = function() {
    //PushEventLogText("JS->C:  version=0.1 ");
    return false;
  };

  _checkCToJs = function() {
    //PushEventLogText("C->JS:  version=0.1 ");
    return false;
  };

  _checkSound = function() {
    //PushEventLogText("Sound check:  ... ");
    return false;
  };
  
// ---- other helpers -----

  _getDocument = function() {
    return (_doc.body ? _doc.body : (_doc._docElement ?
               _doc.documentElement : _doc.getElementsByTagName('div')[0]));
  };

  _id = function(sID) {
    return _doc.getElementById(sID);
  };

  _doNothing = function() {
    return false;
  };

 

  _pushEventLogText = function(str) {
    var list = _id(_js.eventlogId);
    if (typeof list != 'undefined' || list != null) {
      list.innerHTML += '<li class="log-event"> <div>' + str + '</div></li>';
    }
  };

  this._writeDebug = function(sText, sType, bTimestamp) {
    // pseudo-private console.log()-style output
    if (!_js.debugMode) {
        return false;
    }
    if (this.showTimestampOnLog || 
          (typeof bTimestamp !== 'undefined' && bTimestamp)) {
      var d = new Date();
      sText = '[' + d.toLocaleTimeString() + '.' + d.getMilliseconds()+
              '] ' + sText ;
    }
    if (_hasConsole && _js.useConsole) {
      sMethod = _debugLevels[sType];
      if (typeof console[sMethod] !== 'undefined') {
        console[sMethod](sText);
      } else {
        console.log(sText);
      }
      if (_js.useConsoleOnly) {
        return true;
      }
  }
  _pushEventLogText(sText);
  };
  this._wD = this._writeDebug; //alias

  this._complain = function(sMsg) {
    if (typeof console !== 'undefined' &&
        typeof console.warn !== 'undefined') {
      console.warn(sMsg);
    } else {
      _js._wD(sMsg);
    }
  };

};


/*
// SM2_DEFER details:
http://www.schillmania.com/projects/soundmanager2/doc/getstarted/#lazy-loading
if (typeof SM2_DEFER === 'undefined' || !SM2_DEFER) {
  jsFlashC = new JsFlashC();
}
*/
// public interfaces
window.JsFlashC = JsFlashC; // constructor
window.jsFlashC = jsFlashC; // public API, flash callbacks etc

}(window));
