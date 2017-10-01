# TODO
- Work on visual representation when
-- comparing objects to arrays
-- comparing strings and this will probably fit an eachLike as root
- perform a test to receive real inputs and check correct output

- Still not arbitrary equivalence, it can just show regular equivalence, think about tests before implementing, it might be too painful to test directly the string to log (final result)

- I need to use preProcessLeft to work on like objects?
	I will need to correctly print to console log

- Work on how to use class as value, how to compare and then how to print it
-- how to use:
The value will be passed normally, as string or number
-- how to compare
The comparison function should be able to handle that this is a class and not a regular string or value
Would be clever to modify location, there is a getType function on getArrayOfEntries for this, used on createLocation
I could create a method on the class that returns true or false, meaning equal or not, such method would receive R value
-- how to print
I should get a function to see when location is a class, or the value type itself is a class (using instanceof maybe?) then modify the printValue and printReceived (check on entriesToConsoleLog)

The index function will receive:

lData
rData,
compareLineByLine *
{preProcessLeft, preProcessRight} *
postProcess *

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
