'use strict';

const fs = require('fs-extra');

function isLowerCase(a) {
	return a.charCodeAt(0) > 96;
}

function checkReaction(a, b) {
	return a.toLowerCase() === b.toLowerCase() && (
		isLowerCase(a) && !isLowerCase(b) ||
		!isLowerCase(a) && isLowerCase(b)
	);
}

function calcForUnits(string, unit) {
	let done = false;
	let index = 0;
	let polymer = string.replace(new RegExp(unit, 'gi'), '').split('');
	while (!done) {
		if (index + 1 >= polymer.length) {
			done = true;
		} else if (checkReaction(polymer[index], polymer[index + 1])) {
			polymer.splice(index, 2);
			index = 0;
		} else {
			index++;
		}
	}
	return polymer.length;
}


function calc(polymer) {
	const results = 'abcdefghijklmnopqrstuvwxyz'.split('').map(unit => calcForUnits(polymer, unit));
	return Math.min(...results);
}

fs.readFile(__dirname + '/input.txt', 'utf8')
	.then(data => data.toString())
	.then(input => calc(input))
	.then(result => fs.writeFile(__dirname + '/result.md', `# Result\n\n${result}\n`))
	.catch(error => console.log(error));
