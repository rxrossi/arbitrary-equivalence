export const ok = () => ({
	type: 'ok'
});

export const missing = () => ({
	type: 'missing'
});

export const different = (received) => ({
	type: 'different',
	received
})

export const extraneous = () => ({
	type: 'extraneous'
});
