export const getPageQuery = () => {
	const query = new URLSearchParams(window.location.search);
	return Object.fromEntries(query);
}
