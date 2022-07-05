export function getteacherController(teachers: any[], newteacher: any) {
	const teacherIndex = teachers.findIndex((el) => el.id === newteacher.id);
	if (teacherIndex === -1) {
		teachers.push(newteacher);
	} else {
		teachers[teacherIndex] = {
			...teachers[teacherIndex],
			...newteacher,
		};
	}
	return teachers;
}