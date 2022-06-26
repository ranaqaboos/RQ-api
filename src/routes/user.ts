import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { getuserController } from '../controller/getuser';
const user = Type.Object({
	id: Type.String({ format: 'uuid' }),
  username:Type.String(),
	password: Type.String(),
    role: Type.String(),	
});
type user = Static<typeof user >;

const GetuserQuery = Type.Object({
	username: Type.Optional(Type.String()),
});
type GetuserQuery = Static<typeof GetuserQuery>;

export let users: user[] = [
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', username: 'Lamis', password: '0511111111',role:'user' },
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa2', username: 'Amani', password: '0511111111' ,role:'teacher'},
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa3', username: 'Amal', password: '0511111111' ,role:'user'},
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa0', username: 'Azizah', password: '123123123' ,role:'admn'},
];
export default async function (server: FastifyInstance) {
	server.route({
		method: 'PUT',
		url: '/users',
		schema: {
			summary: 'Creates new user',
			tags: ['users'],
			body: user,
		},
        
		handler: async (request, reply) => {
			const newuser: any = request.body;
			return getuserController(users, newuser);
		},
	});
    server.route({
		method: 'PATCH',
		url: '/users/:id',
		schema: {
			summary: 'Update  user by id + you dont need to pass all properties',
			tags: ['users'],
			body: Type.Partial(user),
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		handler: async (request, reply) => {
			const newuser: any = request.body;
			return getuserController(users, newuser);
		},
	});
    server.route({
		method: 'GET',
		url: '/users/:id',
		schema: {
			summary: 'Returns one user or null',
			tags: ['users'],
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
			response: {
				'2xx': Type.Union([user, Type.Null()]),
			},
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;

			return users.find((c) => c.id === id) ?? null;
		},
	});
    
	// server.route({
	// 	method: 'GET',
	// 	url: '/users',
	// 	schema: {
	// 		summary: 'Gets all users',
	// 		tags: ['users'],
	// 		querystring: GetuserQuery,
	// 		response: {
	// 			'2xx': Type.Array(user),
	// 		},
	// 	},
	// 	handler: async (request, reply) => {
	// 		const query = request.query as GetuserQuery;

	// 		if (query.username) {
	// 			return users.filter((c) => c.username.includes(query.username ?? ''));
	// 		} else {
	// 			return users;
	// 		}
	// 	},
	// });
}


