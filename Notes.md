# TODO
- perform a test to receive real inputs and check correct output
-- Incorrectly reporting when comparing an Array with An Object
-- Error when comparing two arrays and the last element is missing, makes the brackets receive wrong information
-- Comparing arrays inside object, when Different, makes the brackets to not receive correct info, some cases adds info to the closing, in other cases to the opening, seems that the bracket that will receive info is closer to the issue

# Notes
Every string value should be printed with quotes
check the possibility of the key of pairs no being considered strings

## About location
To change or not too

### Pros
While taking the aproach as array ares (element position is on location and as others parts of location has types)
It could make harder to add brackets later

Ex (obj):
valueLine:
	location:
		'', obj
		'address', obj
		'city', str
	value: 'Piracicaba'

BracketLine
	location:
		'', obj
		'address', obj
	value: '{'

Ex (obj2):
location:
	'', obj
	'name', 'string'
value: John

Ex (array with no nests)
location:
	'', array
	'0', string
value: John

Ex (arr):
valueLine:
	location:
		'', obj
		'sons', array
		'0', string
	value: 'Jenny'

BracketLine
	location:
		'', obj
		'sons', arr
	value: '['

Ex (arr of elements);
[
	{ name, surname},
	{ name, surname}
]

valueLine:
	location:
		'', arr
		'0', obj
		'name', string
	value: 'Jenny'

linesToPrint
location of array bracket:
	'', arr
value: '['

location of element bracket
	'', arr
	'0', obj
value: '{'
type: 'element'

Ex of a array or arrays
location:
	'', arr
	'0', arr,
	'0', string
value: 'First Value'

location:
	'', arr
	'1', arr,
	'0', string
value: 'First Value'

To detect if the key should be printed, it is necessary to work on locations, if the location.last-1 === arr, then don't print, else print
if location.last-1 does not exist, don't print too, this means it is root
