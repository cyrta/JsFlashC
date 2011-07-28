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


/*
 echo(str)  	- return what was given
 inc(counter)   - increment a given number
 memset(array, value)  - give every item of array given value
 
 malloc(size)
 free(ptr)
 
 callJsCallback(jsFunc)

*/


//File doublesum.c
#include <stdlib.h>
#include <stdio.h>

//Header file for AS3 interop APIs
//this is linked in by the compiler (when using flaccon)
#include "AS3.h"



static AS3_Val echo(void* self, AS3_Val args)
{
    char* val = NULL;
    AS3_ArrayValue(args, "StrType", &val);
    if(val == NULL)
    {
        char* nullString = "null";
        return AS3_String(nullString);
    }
	return AS3_String(val);
}


static AS3_Val incValue(void* self, AS3_Val args)
{
	return AS3_Int(0);
}

static AS3_Val memorySet(void* self, AS3_Val args)
{
	return AS3_Int(0);
}

static AS3_Val memAlloc(void* self, AS3_Val args)
{
	return AS3_Int(0);
}

static AS3_Val memFree(void* self, AS3_Val args)
{
	return AS3_Int(0);
}


static AS3_Val callJsCallback(void* self, AS3_Val args)
{
	return AS3_Int(0);
}

//entry point for code
int main()
{
	AS3_Val echoMethod = AS3_Function(NULL, echo);

    AS3_Val result = AS3_Object("echo: AS3ValType", echoMethod);

    AS3_Release(echoMethod);

    AS3_LibInit(result);
	// should never get here!
	return 0;
}

