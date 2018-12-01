'use strict';

const fs = require('fs-extra');

function calc(input) {
	return input;
}

fs.readFile(__dirname + '/input.txt', 'utf8')
	.then(data => data.toString().split('\n'))
	.then(input => calc(input))
	.then(result => fs.writeFile(__dirname + '/result.md', `# Result\n\n${result}\n`))
	.catch(error => console.log(error));
