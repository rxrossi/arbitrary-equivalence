import colors from 'colors';
import * as infoCreators from '../infoCreators';

describe('reportToConsoleLog', () => {
	describe('individual Lines', () => {
		const example1 = [
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: '',
				value: '{',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: '',
				value: '}',
				info: infoCreators.ok()
			}
		];

		const example2 = [
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: 'city',
				value: 'NYC',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: 'state',
				value: 'NY',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'},
					{partial: 'subAddress', type: 'object'}
				],
				name: 'addtionalInfo',
				value: 'ap23',
				info: infoCreators.ok()
			},
		];

		it('prints a normal pair correctly', () => {
			const line =	{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
				info: infoCreators.ok()
			};

			const expected =
				'   '.inverse.dim
				+
				' '
				+
				'name: John'.dim;

			console.log(expected)
		})

		it('prints a missing pair correctly', () => {
			const line =	{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
				info: infoCreators.missing()
			};

			const expected =
				' + '.inverse.green
				+
				' '.green
				+
				'name: John'.green;

			console.log(expected)
		})

		it('prints a extraneous pair correctly', () => {
			const line =	{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
				info: infoCreators.extraneous()
			};

			const expected =
				' - '.inverse.red
				+
				' '.red
				+
				'name: John'.red;

			console.log(expected)
		})

		it('prints a different pair correctly', () => {
			const line =	{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
				info: infoCreators.different('Mary')
			};

			const expected =
				' ! '.inverse.yellow
				+
				' '.yellow
				+
				'name: John'.yellow
				+
				' '
				+
				'was expected, received'
				+
				' '
				+
				'Mary'.yellow


			console.log(expected)
		})

		it('prints a pair that is inside a one level deep nest', () => {
			const line = {
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: 'city',
				value: 'NYC',
				info: infoCreators.missing()
			};

			const expected =
				'   '.inverse.green
				+
				'—— '.green
				+
				'city: NYC'.green

			console.log(expected)
		})

		it('prints a pair that is inside two level deep nest', () => {
			const line = {
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'},
					{partial: 'subAddress', type: 'object'}
				],
				name: 'subCity',
				value: 'subCityVal',
				info: infoCreators.different('NYC')
			};

			const expected =
				'   '.inverse.yellow
				+
				'———— '.yellow
				+
				'city: subCityVal'.yellow
				+
				' '
				+
				'was expected, received'
				+
				' '
				+
				'NYC'.yellow

			console.log(expected)
		})

		it('prints a element on the root correctly', () => {
			const line = {
				location: [
					{partial: '', type: 'array'}
				],
				name: '',
				value: 'John',
				info: infoCreators.different('Mary')
			}

			const expected =
				'   '.inverse.yellow
				+
				'———— '.yellow
				+
				'John'.yellow
				+
				' '
				+
				'was expected, received'
				+
				' '
				+
				'Mary'.yellow

			console.log(expected);
		})

	})
})

