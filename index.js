/**
 * @type {HTMLInputElement[]}
 */
let ranges = Array.from(document.querySelectorAll("[id^=ctf-range]")),
	max = 100,
	update = range => {
		let stop = ranges.reduce((max, r) => r.id == range.id ? max : max - r.value, max);
		if (range.value > stop) range.value = stop;
	};

ranges.forEach(r => {
	r.max = max;
	update(r);
	r.addEventListener("input", update.bind(this, r));
});