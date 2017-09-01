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

A comparison first from left to right to check if:
- OK: lVal and rVal were considered equal
- Different: lVal and rVal were NOT considered equal
- Missing: lVal was not found on rData

Then a comparison from rData to lData will be made to check for extraneous, will return lines with Extraneous in info

These lines will be joined, resulting in an array where each element is a line of a Element or a Pair

Note that to the line bellow could represent a pair or element

{
	name: '0',
	value: 'zero',
	location: ''
}

const obj = {
	0: zero
}

const array = [
	zero
]

So to be sure if we print as element or pair, we must get info by Array.isArray(getValueByPath(data, location))
Notes:
- getValueByPath is a external library
- data could be lData or rData, depends if we are trying to print a extraneous line or a ok, different or missing line


##Adding brackets to the previous comparison (addBrackets)

For example:
`
object = {
	name: 'John'
	sons: [
		{
			firstName: 'Kathy'
		},
		'Josh',
		[
			'Brian',
			'Donatelo'
		]
	]
}
`
1.
 Kathy would be represented by a line that looks like this:
 name: 'firstName' 
 value: 'Kathy'
 location:  sons.0
 info: CONSTANT

2.
 Donatelo would be represented by a line that looks like this:
 name: '1' 
 value: 'Donatelo'
 location: sons.2
 info: CONSTANT

Considering info of 1 is ok, and it is the only line (the pair above and the lines bellow does not exist), adding brackets would be like this

Will do the process by reading location, the first one is always root

Get type of value of lData (string, number, object, array), will receive object
push this:
{
	depth: 0,
	type: 'pair' // this is a special case, a pair when name is empty will be a special type of print, only happens when it is opening the lData, if name was given, this would be string
	name: ''
	value: '{',
	info: ''
}

Get type of value of sons, will receive array
{
	depth: 1,
	type: 'pair' //get type of structure of root/lData, this is a pair because the root is a object
	name: 'sons'
	value: '[',
	info: ''
}

Get type of value of 0, will receive object
{
	depth: 2,
	type: element, //get type of sons, this is element because type of value of sons is array
	name: '0'
	value: '{',
	info: ''
}

Now that the location has been processed, push the line itself

{
	depth: 3,
	type: element, //get type of sons.0, this is pair because type of value of sons.0 is object
	name: 'firstName'
	value: 'Kathy',
	info: 'ok'
}	

The addBrackets would realize that next line does not exist and then will close everything based on location of line given to it 
the process of closing would be similar 


