import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { Payment } from "@prisma/client";
import { ObjectId } from "bson";
const Payment = Type.Object({
    payment_id: Type.String(),
  });
  
export default async function (server: FastifyInstance) {   
    server.route({
   method: "DELETE",
   url: "/Payment_id",
   schema: {
     summary: "Deletes a Payment id",
     tags: ["payment"],
     params: Payment,
   },
   handler: async (request, reply) => {
     const { Payment_id } = request.params as Payment;
     if (!ObjectId.isValid(Payment_id)) {
       reply.badRequest("Payment_id should be an ObjectId!");
       return;
     }
     return prismaClient.payment.delete({
       where: { Payment_id },
     });
   },
 });


}