The process is to compare lData to rData, returning a single string that is multi lines using '\n', to be used directly to single a console.log(), the purpose is to show how many discrepancies there are and display a comparison line by line

##Parameters

lData
rData,
{compareLineByLine} *
{preProcessLeft, preProcessRight} *
postProcess *

(*) means optional
lData and rData can be array, string, number or objects

##Returns
string

Example: 
Calling console.log(string) will print the bellow:

`
Discrepancies: 3

{
	' ' name: 'Jhon'
	'!' surname: 'Doe' was expected, received string 'Jones'
	'+' street: 'Avenue one'
	'-' state: 'New York'
}
`

' ' means okay
'!' means different
'-' means extraneous (should be removed)
'+' means missing (should be added)



##compareLineByLine
###Parameters
 lVal, rVal

###Returns
true if considered equal
false if considered false

###Notes
if lVal does not exist on the structure of rData, this function will not be called

##Types of lines
To find the best format it is necessary to think about that could be necessary to print

###Objects
Opening
	{

Named opening
	name: {

Closing
	}

Pair
 name: value

###Arrays
Opening
	[

Named opening 
	name: [

Closing
	]

Element
 value

If we assume that brackets fits on the values field, the following format for lines would be good enough

`
{
	depth: number,
	type: 'pair or element'
	name: 'string'
	value: 'string, number or brackets',
	info: 'uses a info creator'
}
`

##Comparing lData and rData
The comparison is made value by value by the function passed as parameter.
As stated, the function is optional, if one is not given by the user the comparison will be made using '==='

A comparison runs first from left to right to check if:
- OK: lVal and rVal were considered equal
- Different: lVal and rVal were NOT considered equal
- Missing: lVal was not found on rData

Then a comparison from rData to lData will be made to check for extraneous values, will return lines with Extraneous in info

These lines will be joined, resulting in an array where each element is a line of a Element or a Pair

