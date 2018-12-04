'use strict';

const fs = require('fs-extra');

const guards = {};

function getData(schedule, entry) {
	// All the same year
	const [, date, time, event] = entry.match(/\d{4}-([\d-]+) (\d+:\d+)\] (.+)/);
	schedule.push({
		// using 2018 so we have positive numbers for comparison
		timestamp: new Date(`2018-${date} ${time}`),
		date,
		time: time.slice(3, 5),
		event
	});
	return schedule;
}

function buildTimeline(schedule) {
	let guard, state;
	let entries = schedule.map(entry => {
		if (entry.event.includes('Guard #')) {
			guard = entry.event.match(/\d+/)[0];
			state = '.';
		} else if (entry.event.includes('wakes')) {
			state = '.';
		} else if (entry.event.includes('asleep')) {
			state = '#';
		}
		entry.guard = guard;
		entry.state = state;
		return entry;
	});

	const timeline = {};
	entries.forEach(({timestamp, date, time, guard, state}, i) => {
		let midnight = new Date(`2018-${date} 00:00`);
		if (!timeline[date]) {
			timeline[date] = [];
		}
		if (!guards[guard]) {
			guards[guard] = new Array(60).fill(0);
		}
		if (state === '#' && (!entries[i + 1] || entries[i + 1].guard === guard)) {
			let start = timestamp > midnight ? Number(time) : 0;
			let end = Number(entries[i + 1] ? entries[i + 1].time : '59');
			for (let j = start; j < end; j++) {
				timeline[date][j] = {guard, state, time: j};
				guards[guard][j] = guards[guard][j] + 1 || 1;
			}
		}
	});
}

function likeliestAsleepGuard() {
	let max = 0;
	let winner;
	Object.keys(guards).forEach(guard => {
		let slept = guards[guard].reduce((acc, time) => acc += time);
		if (slept > max) {
			max = slept;
			winner = guard;
		}
	});
	max = Math.max(...guards[winner]);
	return winner * guards[winner].findIndex(el => el === max);
}

function calc(input) {
	const schedule = input.reduce(getData, []);
	buildTimeline(schedule.sort((a, b) => a.timestamp - b.timestamp));
	return likeliestAsleepGuard();
}

fs.readFile(__dirname + '/input.txt', 'utf8')
	.then(data => data.toString().split('\n'))
	.then(input => calc(input))
	.then(result => fs.writeFile(__dirname + '/result.md', `# Result\n\n${result}\n`))
	.catch(error => console.log(error));
