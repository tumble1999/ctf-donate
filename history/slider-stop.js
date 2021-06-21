/**
 * @type {HTMLInputElement[]}
 */
let ranges = Array.from(document.querySelectorAll("[id^=ctf-range]")),
	update = range => {
		range.value > 60 && (range.value = 60);
	};

ranges.forEach(r => r.addEventListener("input", update.bind(this, r)));