import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
//import { format } from 'path';
const feedback = Type.Object({
    id: Type.String({ format: "uuid" }),
    user_id: Type.String(),// كيف احدد نوع اليوزر احتاج المدرس والاب 
    descaription:Type.Array(Type.String()),
    teacher_id:Type.String({format:'uuid'}),
    parent_id:Type.String({ format:'uuid'}),
  });
  type feedback = Static<typeof feedback >;

  export let feedbacks: feedback[] = []

  export default async function (server: FastifyInstance) {
    server.route({
		method: 'PUT',
		url: '/feedbacks',
		schema: {
			summary: 'Create a feedback',
			tags: ['feedbacks'],
			body: feedback,
		},
		handler: async (request, reply) => {
			return feedbacks;
		},
	});
    server.route({
		method: 'DELETE',
		url: '/feedbacks/:id',
		schema: {
			summary: 'Deletes a parent',
			tags: ['feedbacks'],
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;

			feedbacks = feedbacks.filter((c) => c.id !== id);

			return feedbacks;
		},
	});
  }
  