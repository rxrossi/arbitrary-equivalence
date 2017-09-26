# TODO
- perform a test to receive real inputs and check correct output

- Still not arbitrary equivalence, it can just show regular equivalence, think about tests before implementing, it might be too painful to test directly the string to log (final result)

The index function will receive:

lData
rData,
{compareLineByLine} *
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

# Notes
