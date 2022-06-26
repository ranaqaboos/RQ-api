export function getcourseController(courses: any[], newcourse: any) {
	const courseIndex = courses.findIndex((el) => el.id === newcourse.id);
	if (courseIndex === -1) {
		courses.push(newcourse);
	} else {
		courses[courseIndex] = {
			...courses[courseIndex],
			...newcourse,
		};
	}
	return courses;
}