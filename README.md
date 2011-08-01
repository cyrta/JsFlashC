About
=====
 Easy way to test communication betweet Browser through FlashPlayer 
 to function implemented in C and compiled with Adobe Alchemy to
 AVM swc bytecode.



Usage
=====
 To compile:

  1. alc-on; gcc -O3 -Wall JsFlashC.c -swc -o JsFlashC.swc; alc-off;

  2. mxmlc -library-path+=./JsFlashC.swc --target-player=10.2.0 JsFlashC.as 

  3. Open index.html in browser


Dev
===

 While developing use JsLint to find javascript errorse.g.:
     gjslint  JsFlashC.js



References
==========

 1. Adobe ActionScript ExternalInterface API documentation
 http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/external/ExternalInterface.html




It is good to use Flex Ajax Bridge - FABridge
  http://livedocs.adobe.com/flex/3/html/help.html?content=ajaxbridge_2.html
TODO: need to look into it.

There is also JSObject
  http://code.google.com/p/jsobject/