/**
 * @type {HTMLInputElement[]}
 */
let ranges = Array.from(document.querySelectorAll("[id^=ctf-range]")),
	max = 100,
	update = range => {
		let stop = ranges.reduce((max, r) => r.id == range.id ? max : max - r.value, max);
		if (range.value != stop) {
			//range.value = stop;
			let dif = (range.value - stop) / (ranges.length - 1),
				sum = max - stop;
			//Move based on sizes
			//ranges.forEach(r => r.id != range.id && (r.value -= r.value / sum * dif));

			//Move evely
			ranges.forEach(r => r.id != range.id && (r.value -= dif));
		}
	};

ranges.forEach(r => {
	r.value = max / ranges.length;
	r.max = max;
	update(r);
	r.addEventListener("input", update.bind(this, r));
});