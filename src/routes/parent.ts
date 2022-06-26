import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
//import { format } from 'path';
import { getparentController } from '../controller/getparent';
const parent = Type.Object({
    id: Type.String({ format: "uuid" }),
    name: Type.String(),// كيف احدد نوع اليوزر احتاج المدرس والاب 
    childeren:Type.Array(Type.String()),
    user_id:Type.String({format:'uuid'}),
    
  });
  type parent = Static<typeof parent >;
  export let parents: parent[] = []
  export default async function (server: FastifyInstance) {
    server.route({
		method: 'PUT',
		url: '/parents',
		schema: {
			summary: 'Creates new parent',
			tags: ['parents'],
			body: parent,
		},
        
		handler: async (request, reply) => {
			const newparent: any = request.body;
			return getparentController(parents, newparent);
		},
	});
    server.route({
		method: 'DELETE',
		url: '/parents/:id',
		schema: {
			summary: 'Deletes a parent',
			tags: ['parents'],
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;

			parents = parents.filter((c) => c.id !== id);

			return parents;
		},
	});

  }
  