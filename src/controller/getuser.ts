export function getuserController(users: any[], newuser: any) {
	const userIndex = users.findIndex((el) => el.id === newuser.id);
	if (userIndex === -1) {
		users.push(newuser);
	} else {
		users[userIndex] = {
			...users[userIndex],
			...newuser,
		};
	}
	return users;
}