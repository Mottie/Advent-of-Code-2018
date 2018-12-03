'use strict';

const fs = require('fs-extra');

const fabric = {};

function addClaim(claim) {
	const [id, x, y, w, h] = claim.split(/[#@,:x]/).slice(1).map(Number);
	for (let col = x; col < x + w; col++) {
		for (let row = y; row < y + h; row++) {
			if (!fabric[row]) {
				fabric[row] = [];
			}
			if (!fabric[row][col]) {
				fabric[row][col] = [];
			}
			fabric[row][col].push(id);
		}
	}
}

function calc(input) {
	input.forEach(addClaim);
	let count = 0;
	Object.keys(fabric).forEach(row => {
		fabric[row].forEach(col => {
			count += col && col.length > 1 ? 1 : 0;
		});
	});
	return count;
}

fs.readFile(__dirname + '/input.txt', 'utf8')
	.then(data => data.toString().split('\n'))
	.then(input => calc(input))
	.then(result => fs.writeFile(__dirname + '/result.md', `# Square Inches of fabric within two or more claims\n\n${result}\n`))
	.catch(error => console.log(error));
