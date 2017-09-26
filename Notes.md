# TODO
- perform a test to receive real inputs and check correct output

- Still not arbitrary equivalence, it can just show regular equivalence, think about tests before implementing, it might be too painful to test directly the string to log (final result)

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
In case I decide to use a class, I would return the line and its last location part would instead of string or number, be a class, for this I would need to work on preProcessLeft and getArrayOfEntries, the solution would be to modify function createLocation inside getArrayOfEntries, but I gotta think if this is really necessary
Contrary to the previous paragraph, it would probably correctly identify as class or I would need to modify getType inside getArrayOfEntries
on postProcess I could change it to print the way I want it

Think about how I should print a line which last location is like ['sons', 'class'], and value is an instance of likeArray.receved(), indicating that this is actually different
it would be necessary to print like:
Sons: expected an array of exactly 3 objects like {name: string, age: number}, but on index 0 the received was {name: string, age:string}
Another possible case:
sons: expected an array of at least 3 objects like {name: string, age: number}, but on index 1 the received was {name: string, age:string}, also only two objects instead of three

Shorter versions
Expected array with: (<, >, <=, >=, =) 3 items, following pattern ${pattern}
Received typeof with ${x} items, (patterns match, the first to not match is on index ${index} and its pattern is ${pattern})

# Notes
