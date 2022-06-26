export function getparentController(parents: any[], newparent: any) {
	const parentIndex = parents.findIndex((el) => el.id === newparent.id);
	if (parentIndex === -1) {
		parents.push(newparent);
	} else {
		parents[parentIndex] = {
			...parents[parentIndex],
			...newparent,
		};
	}
	return parents;
}