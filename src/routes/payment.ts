import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
const payment = Type.Object({
    id: Type.String({ format: "uuid" }),
    course_paice: Type.Number(),
    parent_id: Type.String({ format: "uuid" }),

  });
  type payment = Static<typeof payment >;
  export let payments: payment[] = []
  export default async function (server: FastifyInstance) {
//اربط سعر المقرر واليوزرواعرض الفاتوره  

server.route({
    method: 'PUT',
    url: '/payments',
    schema: {
        summary: 'Create a feedback',
        tags: ['payments'],
        body: payment,
    },
    handler: async (request, reply) => {
        return payments;
    },
});
server.route({
    method: 'DELETE',
    url: '/payments/:id',
    schema: {
        summary: 'Deletes a parent',
        tags: ['payments'],
        params: Type.Object({
            id: Type.String({ format: 'uuid' }),
        }),
    },
    handler: async (request, reply) => {
        const id = (request.params as any).id as string;

        payments = payments.filter((c) => c.id !== id);

        return payments;
    },
});
  }
  