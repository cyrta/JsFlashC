About
=====
 Easy way to test communication betweet Browser through FlashPlayer 
 to function implemented in C and compiled with Adobe Alchemy to
 AVM swc bytecode.



Usage
=====
 To compile:

  1. alc-on; gcc -O3 -Wall -c JsFlashC.c -swc JsFlashC.swc; alc-off;

  2. mxmlc -library-path+=./JsFlashC.swc --target-player=10.2.0 JsFlashC.as 

  3. Open index.html in browser
