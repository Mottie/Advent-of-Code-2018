'use strict';

const fs = require('fs-extra');

function diff(input1, input2) {
	let diff = 0;
	input1.split('').forEach((letter, index) => {
		if (letter !== input2[index]) {
			diff++;
		}
	});
	return diff === 1;
}

function calc(input) {
	let currentId, result, solution;
	while (!result && input.length) {
		currentId = input.shift();
		result = input.find(id => diff(currentId, id));
	}
	if (result) {
		solution = currentId.split('').filter((letter, index) => letter === result[index]).join('');
	}
	return solution;
}

fs.readFile(__dirname + '/input.txt', 'utf8')
	.then(data => data.toString().split('\n'))
	.then(input => calc(input))
	.then(result => fs.writeFile(__dirname + '/result.md', `# Result\n\n${result}\n`))
	.catch(error => console.log(error));
