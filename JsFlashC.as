/** @license
 *
 *  JsFlashC Simple test/example for web cross-platform communication
 *  -----------------------------------------------------------------
 *
 * Copyright (c) 2011, Pawel Cyrta - Metamedia Technologies. All rights reserved.
 * Code provided under the BSD License.
 *
 * @author Pawel Cyrta - pawel.cyrta@metamedia.pl
 *
 */


package
{
	import flash.display.Sprite;
	import flash.external.ExternalInterface; // woo
	import flash.utils.ByteArray;
	
	import flash.system.System;
	
    import cmodule.JsFlashC.CLibInit;
  	
  	
  	
    public class JsFlashC extends Sprite 
    {
    
    	public var version:String = "V0.1.0";
    	public var version_as:String = "(AS3/Flash 10)";

    /*
    *  Cross-domain security options
    *  HTML on foo.com loading .swf hosted on bar.com? Define your "HTML domain" here to allow JS+Flash communication to work.
    *  // allow_xdomain_scripting = true;
    *  // xdomain = "foo.com";
    *  For all domains (possible security risk?), use xdomain = "*"; which ends up as System.security.allowDomain("*");
    *  When loading from HTTPS, use System.security.allowInsecureDomain();
    *  See http://livedocs.adobe.com/flash/9.0/ActionScriptLangRefV3/flash/system/Security.html#allowDomain()
    */
   		public var allow_xdomain_scripting:Boolean = false;
   		public var xdomain:String = "*";

    	// externalInterface references (for Javascript callbacks)
    	public var baseJSController:String = "jsFlashC";
    	public var baseJSObject:String = baseJSController + ".sounds";
    
			public var didSandboxMessage: Boolean = false;
      public var debugEnabled: Boolean = true; // Flash debug output enabled by default, disabled by JS call
    	public var flashDebugEnabled: Boolean = false; // Flash internal debug output (write to visible SWF in browser)
      public var caughtFatal: Boolean = false;
    
    	public var messages:Array = [];
     //   public var textField: TextField = null;
	   // public var textStyle: TextFormat = new TextFormat();
    
    	/** For Sharing */
    	public const Memory: ByteArray = new ByteArray();
    	
			/** connector to alchemy C code/methods */
			private var _lib:Object = null;
			
      public function JsFlashC()
			{
	    	var loader:CLibInit = new CLibInit;
	    	_lib = loader.init();
	    	
	    	 if (ExternalInterface.available) {
        		flashDebug('ExternalInterface available');
        		try {
        	  		flashDebug('Adding ExternalInterface callbacks...');
        			ExternalInterface.addCallback('echo', _echo);
         			ExternalInterface.addCallback('inc', _inc);
       			 } catch(e: Error) {
          			flashDebug('Fatal: ExternalInterface error: ' + e.toString());
       			 }
      		} else {
        		flashDebug('Fatal: ExternalInterface (Flash &lt;-&gt; JS) not available');
     		 };
     		 
     	/*	 // call after delay, to be safe (ensure callbacks are registered by the time JS is called below)
      		var timer: Timer = new Timer(20, 0);
     		 timer.addEventListener(TimerEvent.TIMER, function() : void {
       			 timer.reset();
        		_externalInterfaceTest(true);
        		// timer.reset();
        		// flashDebug('Init OK');
      			});
      		timer.start();
      		// delayed, see above
      		// _externalInterfaceTest(true);
					*/
		}
		
		
		    
    // interface (for JS)
    // -----------------------------------
    
		private function _echo(str:String) :String {
			var s:String = _lib.echo(str);
			trace(s);
			return s;
		}
		
		private function _inc(value:int)	:int {
			_lib.inc(value);
			trace(value);
			return value;
		}
		
		//public function memset
		//public function malloc
		//public function free
		//public function callJsCallback
		
		
		
	    
    // methods
    // -----------------------------------
		
		
	public function flashDebug (txt:String) : void {
      // <d>
      messages.push(txt);
    /*  if (this.flashDebugEnabled) {
        var didCreate: Boolean = false;
        textStyle.font = 'Arial';
        textStyle.size = 12;
        // 320x240 if no stage dimensions (happens in IE, apparently 0 before stage resize event fires.)
       var w:Number = this.stage.width?this.stage.width:320;
       var h:Number = this.stage.height?this.stage.height:240;
        if (textField == null) {
          didCreate = true;
          textField = new TextField();
          textField.autoSize = TextFieldAutoSize.LEFT;
          textField.x = 0;
          textField.y = 0;
          textField.multiline = true;
          textField.textColor = 0;
          textField.wordWrap = true;
        }
        textField.htmlText = messages.join('\n');
        textField.setTextFormat(textStyle);
        textField.width = w;
        textField.height = h;
        if (didCreate) {
          this.addChild(textField);
        }
      }
      */
			// </d>
    } //end of flashDebug
    
    


    public function writeDebug (s:String, bTimestamp: Boolean = false) : Boolean {
      if (!debugEnabled) return false;
      // <d>
      ExternalInterface.call(baseJSController + "['_writeDebug']", "(Flash): " + s, null, bTimestamp);
      // </d>
      return true;
    }

    public function onLoadError(oSound:Object) : void {
      // something went wrong. 404, bad format etc.
      ExternalInterface.call(baseJSObject + "['" + oSound.sID + "']._onload", 0);
    }
    
    public function _externalInterfaceTest(isFirstCall: Boolean) : Boolean {
      var sandboxType:String = flash.system.Security['sandboxType'];
      if (!didSandboxMessage && sandboxType != 'localTrusted' && sandboxType != 'remote') {
        didSandboxMessage = true;
        flashDebug('<br><b>Fatal: Security sandbox error: Got "' + sandboxType + '", expected "remote" or "localTrusted".<br>Additional security permissions need to be granted.<br>See <a href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html">flash security settings panel</a> for non-HTTP, eg., file:// use.</b><br>http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html');
      }
      try {
        if (isFirstCall == true) {
          flashDebug('Testing Flash -&gt; JS...');
          var d: Date = new Date();
          ExternalInterface.call(baseJSController + "._externalInterfaceOK", d.getTime());
          flashDebug('Flash -&gt; JS OK');
        } else {
          writeDebug('SM2 SWF ' + version + ' ' + version_as);
          flashDebug('JS -> Flash OK');
          ExternalInterface.call(baseJSController + "._setSandboxType", sandboxType);
          writeDebug('JS to/from Flash OK');
        }
      } catch(e: Error) {
        flashDebug('Fatal: Flash &lt;-&gt; JS error: ' + e.toString());
        writeDebug('_externalInterfaceTest: Error: ' + e.toString());
        if (!caughtFatal) {
          caughtFatal = true;
        }
        return false;
      }
      return true; // to verify that a call from JS to here, works. (eg. JS receives "true", thus OK.)
    }

    public function _disableDebug() : void {
      // prevent future debug calls from Flash going to client (maybe improve performance)
      writeDebug('_disableDebug()');
      debugEnabled = false;
    }
    
    public function _getMemoryUse() : String {
      return System.totalMemory.toString();
    }

    // -----------------------------------
    // end methods


		
    } //JsFlashC
    
} //package