import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import{prismaClient} from '../../prisma'

const Parent = Type.Object({
    name: Type.String(), 
    childeren:Type.Array(Type.String()), 
	user_id:Type.String(),
  });
  export default async function (server: FastifyInstance) {
    server.route({
        method: "PUT",
        url: "/Parent",
        schema: {
          summary: "view Parent ",
          tags: ["Parent"],
        },
        handler: async (request, reply) => {
          return prismaClient.parent.findMany();
        },
      }); 
  }