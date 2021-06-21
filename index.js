//@ts-check
/**
 * @type {HTMLInputElement[]}
 */
let ranges = Array.from(document.querySelectorAll(".ctf-range")),
	max,
	values = [],
	getSum = () => ranges.reduce((sum, r) => sum + parseInt(r.value), 0),
	getId = range => ranges.findIndex(r => (r.id || r.name) == (range.id || range.name)),
	update = range => {
		let dif = max - getSum(),
			applicableRanges = ranges.sort((a, b) => (parseInt(a.value) - parseInt(b.value)) * (dif / Math.abs(dif)))
				//Remove all of the ons at 0 if you are taking away
				// and the ones set at max if you are adding
				.filter(r => dif > 0 ? parseInt(r.value) < max : r.value != "0");
		if (range != void 0) applicableRanges = applicableRanges.filter(r => (r.id || r.name) != (range.id || range.name));
		dif /= applicableRanges.length;
		let difList = [Math.ceil(dif), Math.floor(dif)].sort((a, b) => Math.abs(b) - Math.abs(a));

		console.log({ value: range ? parseInt(range.value) : undefined, max, sum: getSum(), difList });
		//Move evenly
		//b-a:descending order
		//a-b:ascending order
		applicableRanges.sort((a, b) => (parseInt(a.value) - parseInt(b.value)) * (dif / Math.abs(dif)))

			//Remove all of the ons at 0 if you are taking away
			// and the ones set at max if you are adding
			.filter(r => dif > 0 ? parseInt(r.value) < max : r.value != "0")
			//for each range
			.forEach(r => {
				if (max == getSum()) return;
				for (let i = 0; i < difList.length; i++) {
					let dif = difList[i];
					if ((getSum() + dif) == max || i < (difList.length - 1)) {
						console.log(`[${i}] adding ${dif} to ${r.id || r.name}`);
						r.value = parseInt(r.value) + dif;
						return;
					}

				}

			});
		if (getSum() != max) throw "Sum is != max";
		if (getSum() != max) update();
		//ranges.forEach(r => r.id != range.id && (r.value -= dif));
	},
	setMax = m => {
		values = [];
		max = m;
		let sum = 0, v = max / ranges.length, vBig = Math.ceil(v), vSmall = Math.floor(v);
		//console.log({ sum, v, vSmall, vBig, max });

		ranges.forEach(r => {
			r.id = r.id || r.name;
			//console.log(`(${sum} + ${vBig}) <= ${max}: ${(sum + vBig) <= max}`);
			//console.log(`(${sum} + ${vSmall}) <= ${max}: ${(sum + vSmall) <= max}`);
			if ((sum + vBig) <= max) {
				r.value = vBig;
			} else if ((sum + vSmall) <= max) {
				r.value = vSmall;
			} else {
				r.value = 0;
			}
			sum += parseInt(r.value);
			r.min = 0;
			r.max = max;
			values.push(parseInt(r.value));
			//update(r);
		});
	};

ranges.forEach(r => {
	r.addEventListener("input", update.bind(this, r));
});
setMax(1);