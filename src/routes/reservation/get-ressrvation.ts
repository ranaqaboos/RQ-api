import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import{prismaClient}from '../../prisma'
import{Reservation}from'@prisma/client';
import teacher from '../teacher/teacher';
const reservation = Type.Object({
   name: Type.String(),
   course_id: Type.String(),
   parent_id: Type.String(),
   student_id : Type.String(),
   teacher_id: Type.String(),
  });

  export default async function (server: FastifyInstance) {
    server.route({
        method: "GET",
        url: "/Reservation",
        schema: {
          summary: "view Reservation ",
          tags: ["reservation"],
        },
        handler: async (request, reply) => {
          return prismaClient.reservation.findMany();
        },
      });
  }