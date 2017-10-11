# TODO

- Work on new comparison
	- comparison function will now receive:
	  - left.value (from 1_getArrayOfEntries)
		- part of right object that corresponds to left.location
	- comparison function will return something like {ok, valueToPrint, receivedToPrint, appendStr}
	- lData map will generate a list of eachLikes and extraneuous verification will check fisrt on this list to check if its value is possible inside of it
- Work on new entriesToConsoleLog
	- the value will come has it need to be printed from now own, no need to make huge conversions on postProcess
- Rename the function compareArrayOfEntries, now it is receiving structures instead, renamed on test, also the describe part

The index function will receive:

lData
rData,
compareLineByLine *
{preProcessLeft, preProcessRight} *
postProcess *
appendToIndividualLines

(*) means optional
lData and rData can be array, string, number or objects

# compareLineByLine
The compareLineByLine will be passed to compareArrayOfEntries as third param
if not passed, it will assume that user wants to check for equality (===)
## Requirement
receive lVal, rVal
return true for equal, false for not equal

# preProcessLeft & preProcessRight
Will be passed to getArrayOfEntries

An example considering likeArrays would be
compareLineByLine will compare the same lPath to the rParh 
It would probably correctly identify as class or I would need to modify getType inside getArrayOfEntries
on postProcess I could change it to print the way I want it

Think about how I should print a line which last location is like ['sons', 'class'], and value is an instance of likeArray.receved(), indicating that this is actually different
it would be necessary to print like:
Sons: expected an array of exactly 3 objects like {name: string, age: number}, but on index 0 the received was {name: string, age:string}
Another possible case:
sons: expected an array of at least 3 objects like {name: string, age: number}, but on index 1 the received was {name: string, age:string}, also only two objects instead of three

Shorter versions
Expected array with: (<, >, <=, >=, =) 3 items, following pattern ${pattern}
Received typeof with ${x} items, (patterns match, the first to not match is on index ${index} and its pattern is ${pattern})

Write a intermediary, expect that the function returns something like: 
[
	['"John"', 'strong'],
	['was expected but received', 'regular'],
	['"Mary"', 'strong'],
]

Or [
	['Array with'],
	['items >= 3'],
	['pattern: pattern'],
	['was expected, but'],
	['Array has 2 items'],
	['and the pattern at index 0 is different'],
	['JSON.stringify the line'],
]

to be added after symbol and indentation (something like this: + ----)
# Notes
