'use strict';

const fs = require('fs-extra');

const fabric = {};
const ids = {};

function addClaim(claim) {
	const [id, x, y, w, h] = claim.split(/[#@,:x]/).slice(1).map(Number);
	ids[id] = true;
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
	// Not the most efficient method, but I'm sleepy. Optimize later
	Object.keys(fabric).forEach(row => {
		fabric[row].forEach(col => {
			if (col.length > 1) {
				col.forEach(id => {
					ids[id] = false;
				});
			}
		});
	});
	return Object.keys(ids).filter(id => ids[id]);
}

fs.readFile(__dirname + '/input.txt', 'utf8')
	.then(data => data.toString().split('\n'))
	.then(input => calc(input))
	.then(result => fs.writeFile(__dirname + '/result.md', `# Id with no overlap\n\n${result}\n`))
	.catch(error => console.log(error));
