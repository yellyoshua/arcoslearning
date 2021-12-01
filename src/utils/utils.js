// @ts-check

export const scores = {
	A: { value: 'A', min: 90, max: 100, color: 'green' },
	B: { value: 'B', min: 80, max: 89, color: 'black' },
	C: { value: 'C', min: 70, max: 79, color: 'black' },
	D: { value: 'D', min: 60, max: 69, color: 'black' },
	F: { value: 'F', min: 59, max: 0, color: 'red' },
};

/** @param {number} qualification */
export const personalizeScoreQualification = (qualification) => {
	if (qualification >= scores.A.min && qualification <= scores.A.max) {
		return {
			qualification,
			value: scores.A.value,
			color: scores.A.color,
		};
	}

	if (qualification >= scores.B.min && qualification <= scores.B.max) {
		return {
			qualification,
			value: scores.B.value,
			color: scores.B.color,
		};
	}

	if (qualification >= scores.C.min && qualification <= scores.C.max) {
		return {
			qualification,
			value: scores.C.value,
			color: scores.C.color,
		};
	}

	if (qualification >= scores.D.min && qualification <= scores.D.max) {
		return {
			qualification,
			value: scores.D.value,
			color: scores.D.color,
		};
	}

	return {
		qualification,
		value: scores.F.value,
		color: scores.F.color,
	};
};
