import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import{prismaClient}from '../../prisma'
import{Reservation}from'@prisma/client';
import teacher from '../teacher/teacher';
import jwt from"jsonwebtoken";
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
          jwt.verify(request.headers.authorization as string,'secret',(err:any,decoded:any)=>{
            if(decoded.role!=="Parent")
            reply.send({"mas":"Invalid"})
           }) 
          return prismaClient.reservation.findMany();
        },
      });
  }