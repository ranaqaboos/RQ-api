import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import{prismaClient}from '../../prisma'
import{Reservation}from'@prisma/client';
import teacher from '../teacher/teacher';
import { ObjectId } from 'bson';
const Reservation = Type.Object({ 
    reservation_id: Type.String(),
   
  });
  

  export default async function (server: FastifyInstance) {   
     server.route({
    method: "DELETE",
    url: "/Reservation_id",
    schema: {
      summary: "Deletes a reservation id",
      tags: ["reservation"],
      params: Reservation,
    },
    handler: async (request, reply) => {
      const { reservation_id } = request.params as Reservation;
      if (!ObjectId.isValid(reservation_id)) {
        reply.badRequest("reservation_id should be an ObjectId!");
        return;
      }
      return prismaClient.reservation.delete({
        where: { reservation_id },
      });
    },
  });


}