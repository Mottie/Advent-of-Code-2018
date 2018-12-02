'use strict';

const fs = require('fs-extra');

function calc(input) {
	let twice = 0;
	let thrice = 0;
	input.forEach(id => {
		let current = {};
		id.split('').forEach(letter => current[letter] = (current[letter] || 0) + 1);
		twice += Object.keys(current).filter(letter => current[letter] === 2).length ? 1 : 0;
		thrice += Object.keys(current).filter(letter => current[letter] === 3).length ? 1 : 0;
	});
	return twice * thrice;
}

fs.readFile(__dirname + '/input.txt', 'utf8')
	.then(data => data.toString().split('\n'))
	.then(input => calc(input))
	.then(result => fs.writeFile(__dirname + '/result.md', `# Checksum\n\n${result}\n`))
	.catch(error => console.log(error));
