import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { Payment } from "@prisma/client";
const Payment = Type.Object({
  course_paice: Type.Number(),
  parent_id: Type.String(),
  course_id: Type.String(),
});

export default async function (server: FastifyInstance) {
  server.route({
    method: "POST",
    url: "/payment",
    schema: {
      summary: "Creates new user",
      tags: ["payment"],
      body: Payment,
    },
    handler: async (request, reply) => {
      const payment = request.body as Payment;
      await prismaClient.payment.create({
        data: {
          Payment_id: payment.Payment_id,
          paice: payment.paice,

          Course: {
            connect: { course_id: payment.course_id??undefined} ,
          },
          Parent: {
            connect: { parent_id: payment.parent_id??undefined },
          },
        },
      });
      return prismaClient.payment.findMany();
    },
  });
  // server.route({
  //   method: "PUT",
  //   url: "/payment/payment",
  //   schema: {
  //     summary: "view payment ",
  //     tags: ["payment"],
  //   },
  //   handler: async (request, reply) => {
  //     return prismaClient.payment.findMany();
  //   },
  // });
  // server.route({
  //     method: 'PUT',
  //     url: '/payments',
  //     schema: {
  //         summary: 'Create a feedback',
  //         tags: ['payments'],
  //         body: payment,
  //     },
  //     handler: async (request, reply) => {
  //         return payments;
  //     },
  // });
  // server.route({
  //     method: 'DELETE',
  //     url: '/payments/:id',
  //     schema: {
  //         summary: 'Deletes a parent',
  //         tags: ['payments'],
  //         params: Type.Object({
  //             id: Type.String({ format: 'uuid' }),
  //         }),
  //     },
  //     handler: async (request, reply) => {
  //         const id = (request.params as any).id as string;

  //         payments = payments.filter((c) => c.id !== id);

  //         return payments;
  //     },
  // });
}
