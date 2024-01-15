export default function timeConverter(duration: number = 1): string {
	const minutes = Math.floor(duration / 60);

	if (minutes === 60) {
		return '1 hr'
	}

	if (minutes > 60) {
		const hours = Math.floor(minutes / 60);
		const minutesLeft = minutes % 60;

		if (minutesLeft === 0) {
			return `${hours} hrs`
		}

		return `${hours} hrs ${minutesLeft} min`
	}

	return `~${minutes} min`
}
