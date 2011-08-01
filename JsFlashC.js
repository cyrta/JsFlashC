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
  this.swfReady = false;
  this.enabled = false;

  this.id = (id || 'flash-container');
  this.eventlogId = 'log-list';

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
      _ua = navigator.userAgent,
        _is_pre = _ua.match(/pre\//i);
        _is_iDevice = _ua.match(/(ipad|iphone|ipod)/i),
        _isMobile = (_ua.match(/mobile/i) || _is_pre || _is_iDevice),
        _isIE = _ua.match(/msie/i), _isWebkit = _ua.match(/webkit/i),
        _isSafari = (_ua.match(/safari/i) && !_ua.match(/chrome/i)),
        _isOpera = (_ua.match(/opera/i)),
      _slice = Array.prototype.slice,
      _event = null,
      _funcQueue = [],
      _swf = 'JsFlashC.swf',
      _flashWrapper = null,
      _flashElement = null,
      _flashVersion = '',
      _debugLevels = ['log', 'info', 'warn', 'error'],
      _id = null,
      _getDocument = null,
      _doNothing = null;




// --- public API methods ---

  this.getMovie = function(objID) {
    return _isIE ? _win[objID] : (_isSafari ? _id(objID) ||
                                  _doc[objID] : _id(objID));
  };

  this.test = function() {
    if ( _js.swfLoaded && _js.swfReady) {
      _js._wD("Test: done.");
    } else {
      _addToFuncQueue(this.test, this, arguments);
      _js._wD("Test: function called to early." +
              " It was queue for later execution.");
    }
    //_js._wD('Log: initialized.');
    //var hasFlash = _checkFlashPlugin();
    //if (hasFlash) {
      //_createSwfObject();
      //_checkFlashToJs();
      //_checkJsToFlash();
      //_checkJsToC();
     // _checkCToJs();
     // _checkSound();
    //}
  }

  this.testqueue = function() {
    _event.add(_win, 'load', function() { console.log('testqueu');});
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

 
 // synchronization to overcame race condition when loading dynamically object
 // and calling flash function
 _checkIfSwfLoadedAndReady = function() {
   var result = false;
   if (!_js.swfLoaded) {
    _event.add(_win, 'load', function() { _checkIfSwfLoadedAndReady(); });
    return false;
   }

   if (_js.swfLoaded && _js.swfReady) {
     result = true;
     _onLoadedAndReady();
   } else {
     //busy waiting ...
     var busyWait = function() {
      if (_js.swfLoaded && _js.swfReady) {
        _onLoadedAndReady();   
        return true;
      } else {
        setTimeout(busyWait, 20);
        return false;
      }
     }
     setTimeout(busyWait, 20);
   }
   return result;
 }

 _checkFlashPlugin = function() {
   var fd = FlashDetect;
   var hasFlash = fd.installed;
   //var isSupported = (hasFlash && fd.major >= soundManager.flashVersion);
   _js._flashVersion = fd.major + '.' + fd.minor + '.' + fd.revisionStr;
   if (hasFlash) {
     _js._wD('Flash Player version:  ' + _js._flashVersion);
     return true;
   } else {
     _js._wD('Flash Player: missing!!!', 3);
     return false;
   }
 };

 _createSwfObject = function() {
   var result = null;
   if (swfobject.hasFlashPlayerVersion('10.2')) {
     _flashWrapper = _doc.createElement('div');
     _flashWrapper.id = 'JsFlashC-wrapper' + _js.id;
    // Credit to SoundManager2 for this:
    var s = _flashWrapper.style;
    s['position'] = 'fixed';
    // must be at least 6px for flash to run fast
    s['width'] = s['height'] = '8px';
    s['bottom'] = s['left'] = '0px';
    s['overflow'] = 'hidden';
    _flashElement = _doc.createElement('div');
    _flashElement.id = 'JsFlashC-object-' + _js.id;
    _flashWrapper.appendChild(_flashElement);
    _doc.body.appendChild(_flashWrapper);

    //http://www.bobbyvandersluis.com/swfobject/generator/index.html
    swfobject.embedSWF(
      _swf,
      _flashElement.id,
      '8',
      '8',
      '10.0.0',
      'expressInstall.swf',
      { 'debugMode': _js.debugMode }, //flashvars
      {'allowScriptAccess': 'always', 'menu': 'false', 'quality': 'high',
      'wmode' : 'transparent',
      'hasPriority': 'true' },
      // http://help.adobe.com/en_US/as3/mobile/
      //            WS4bebcd66a74275c36cfb8137124318eebc6-7ffd.html
      null,
      function(e) {
        //_js._flashElement = e.ref;
        if (e.success)
          console.log('swf loaded: success');
        else {
          //console.error("swf loaded: error " + e );
          _js._wD('[ERROR] SWF Object: not created.');
        }
        if (_isWebkit) { // soundcloud-reported render/crash fix, safari 5
          _flashElement.style.zIndex = 10000;
        }
      }
    );
    //callback is not relaible to count on it while using flag semaphore
    // bind an event on window object when all thing ended loading
    _event.add(_win, 'load', function() {
        _js._flashElement = swfobject.getObjectById('JsFlashC-object-' +
                                                    _js.id);
        _js.swfLoaded = true;
        _js._wD('SWF Object: created.');
    });


    } else {
      _js._wD('SWF Object: need Flash Player' +
                        'version 10.0 or greater.', 3);
    }
    //
    return _flashElement;
  };

  _checkFlashToJs = function() {
    //PushEventLogText("Flash->JS:  version=0.1 ");
  };

  _checkJsToFlash = function() {
    //PushEventLogText("JS->Flash:  version=0.1 ");
    var str = '';
    if (!_flashElement) {
      _js._wD('JS->Flash: swf object reference is null', 3);
    }
    str = _flashElement['version']();
    if (str === '') {
      _js._wD('JS->Flash: not connected', 3);
      return false;
    } else {
      _js._wD('JS->Flash: version=' + str);
      return true;
    }
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

// ----- ExternalInteraface for Flash  ------

 /** Flash indicating that it succesfully called JS method namely this one
  */
 this._onFlashReady = function() {
   if (_js.ping() === "pong") {
    _js._wD("[Javascript] JS->Flash: Init OK. Flash interface ready.");
    _js.swfReady = true;
   } else {
     _js._wD("[Javascript] JS->Flash: Init FAILED. Flash didn't aswer or" + 
                                                " done it was incorrent.");
     _js.swfReady = false;
   }
 };

 /*method for Flash Actioncript loading procedure -checking if javascript 
  * has loaded swfobject */
 this._isJsReady = function() {
   return _js.swfLoaded ;
 }
 
 
 _onLoadedAndReady = function() {
   if (!_js.debugMode) {
     _js.flashElement._disableDebug();
   }
   //empty the queue of function that were called before fully loaded
   var funcObj = null;
   while (_funcQueue.length> 0) {
     funcObj = _funcQueue.pop();
     funcObj.method.apply( funcObj.scope, funcObj.arguments );
   }
   
 }
 /** need to populate queue of functions,it is called when flash is ready */
 _addToFuncQueue = function(method, scope, arguments) {
      _funcQueue.push({
            'method': method,
            'scope': (scope || null),
            'arguments': arguments
          });
 }
 
 
 /** simple method to test interface*/
 this.ping = function() {
   return _js._flashElement.ping();
 }

// ----- Event Handling  ------
 //with a little help from SoundManager2
_event = (function() {

    var old = (_win.attachEvent),
    evt = {
      add: (old ? 'attachEvent' : 'addEventListener'),
      remove: (old ? 'detachEvent' : 'removeEventListener')
    };

    function getArgs(oArgs) {
      var args = _slice.call(oArgs), len = args.length;
      if (old) {
        args[1] = 'on' + args[1]; // prefix
        if (len > 3) {
          args.pop(); // no capture
        }
      } else if (len === 3) {
        args.push(false);
      }
      return args;
    }

    function apply(args, sType) {
      var element = args.shift(),
          method = [evt[sType]];
      if (old) {
        element[method](args[0], args[1]);
      } else {
        element[method].apply(element, args);
      }
    }

    function add() {
      apply(getArgs(arguments), 'add');
    }

    function remove() {
      apply(getArgs(arguments), 'remove');
    }

    return {
      'add': add,
      'remove': remove
    };

  }());
// ------ Debuging ------

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
      sText = '[' + d.toLocaleTimeString() + '.' + d.getMilliseconds() +
              '] ' + sText;
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


  _init = function() {
    
    var hasFlash = _checkFlashPlugin();
    try {
     if (hasFlash) {
         _createSwfObject();
       }
       //check if JS and Flash are ready to continue 
       // sync by delaying and busy waiting 
       _checkIfSwfLoadedAndReady();
     
     } catch(e) {
      _js._wD("Fatal: error while initialization (" + e +")", 3);
      //_cleanup();
     }
  };
  _init();
  
  
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
