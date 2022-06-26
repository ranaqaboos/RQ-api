import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { getcourseController } from '../controller/getcourse';

const course = Type.Object({
    id: Type.String({ format: "uuid" }),
    name : Type.String(),
    category:Type.String(),
    descaription: Type.String(),
    price: Type.Number()
  });

  type course = Static<typeof course>;

  const GetCourseQuery = Type.Object({
	category: Type.Optional(Type.String()),
});
type GetCourseQuery = Static<typeof GetCourseQuery>;

  export let courses : course [] = [
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa', name: 'math1',
     category: 'math',descaription:'......', price:100},
];
  export default async function (server: FastifyInstance) {
    // اضيف الكورس واعدل 
    server.route({
		method: 'PUT',
		url: '/courses',
		schema: {
			summary: 'Creates new course',
			tags: ['courses'],
			body: course,
		},
        
		handler: async (request, reply) => {
			const newcourse: any = request.body;
			return getcourseController(courses, newcourse);
		},
	});
    //احذف الكورس بالاي دي
    server.route({
		method: 'DELETE',
		url: '/courses/:id',
		schema: {
			summary: 'Deletes a course',
			tags: ['courses'],
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;

			courses = courses.filter((c) => c.id !== id);

			return courses;
		},
	});
    //ابحث عن الكورس بالفئة
    server.route({
		method: 'PUT',
		url: '/courses/:id',
		schema: {
			summary: 'searcha  by category',
			tags: ['courses'],
			querystring: GetCourseQuery
			
		},
        handler: async (request, reply) => {
       
        const coursequery = request.query as GetCourseQuery
        
			if (coursequery.category) {
				return courses.filter((c) => c.category.includes(coursequery.category ?? ''));
			} else {
				return courses;
			}
    
        },
  });

}

