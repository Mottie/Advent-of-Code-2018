'use strict';

const fs = require('fs-extra');

function calc(input) {
	const freqs = [0];
	const len = input.length;
	let found = false;
	let index = 0;
	let freq = 0;
	while (!found) {
		freq += Number(input[index]);
		if (freqs.includes(freq)) {
			found = true;
		} else {
			freqs.push(freq);
			index = (index + 1) % len;
		}
	}
	console.log(values);
	return freq;
}

fs.readFile(__dirname + '/input.txt', 'utf8')
	.then(data => data.toString().split('\n'))
	.then(input => calc(input))
	.then(result => fs.writeFile(__dirname + '/result.md', `# First repeated frequency\n\n${result}\n`))
	.catch(error => console.log(error));
