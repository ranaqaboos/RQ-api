import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { Feedback } from "@prisma/client";
import { prismaClient } from "../../prisma";

const feedback = Type.Object({
  descaription: Type.Array(Type.String()),
  course_id: Type.String(),
  teacher_id: Type.String(),
  parent_id: Type.String(),
  student_id: Type.String(),
});
const feedbackID = Type.Object({
  feedback_id: Type.String(),
  descaription: Type.Array(Type.String()),
});

export default async function (server: FastifyInstance) {
  server.route({
    method: "POST",
    url: "/feedback",
    schema: {
      summary: "Creates new user",
      tags: ["feedback"],
      body: feedback,
    },
    handler: async (request, reply) => {
      const feedback = request.body as Feedback;
      await prismaClient.feedback.create({
        data: {
          descaription: feedback.descaription,
		
          parent: {
            connect: { parent_id: feedback.parent_id ?? undefined },
          },

          teacher: {
            connect: { teacher_id: feedback.teacher_id ?? undefined },
          },
        },
      });
      return prismaClient.feedback.findMany();
    },
  });

  // const feedback = request.body as feedbackParams;
  // return prismaClient.course.update({
  // 	where: { feedback_id },
  // 	data: Feedback,
  // });
  // 	}),

  // server.route({
  // 	method: 'DELETE',
  // 	url: '/feedbacks/:id',
  // 	schema: {
  // 		summary: 'Deletes a parent',
  // 		tags: ['feedbacks'],
  // 		params: Type.Object({
  // 			id: Type.String({ format: 'uuid' }),
  // 		}),
  // 	},
  // 	handler: async (request, reply) => {
  // 		const id = (request.params as any).id as string;

  // 		feedbacks = feedbacks.filter((c) => c.id !== id);

  // 		return feedbacks;
  // 	},
  // });
  // server.route({
  // 	method: 'PUT',
  // 	url: '/feedback',
  // 	schema: {
  // 		summary: 'view feedback ',
  // 		tags: ['feedback'],
  // 	},
  // 	handler: async (request, reply) => {
  // 		return prismaClient.feedback.findMany();
  // 	},
  // });
}
