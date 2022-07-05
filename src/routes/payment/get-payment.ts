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
        method: "GET",
        url: "/payment/payment",
        schema: {
          summary: "view payment ",
          tags: ["payment"],
        },
        handler: async (request, reply) => {
          return prismaClient.payment.findMany();
        },
      });
}