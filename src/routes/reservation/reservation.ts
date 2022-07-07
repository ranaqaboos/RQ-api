import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import{prismaClient}from '../../prisma'
import{Reservation}from'@prisma/client';
import teacher from '../teacher/teacher';
import jwt from "jsonwebtoken";
const reservation = Type.Object({
   name: Type.String(),
   course_id: Type.String(),
   parent_id: Type.String(),
   student_id : Type.String(),
   teacher_id: Type.String(),
  });

  export default async function (server: FastifyInstance) {
   
    server.route({
      method: "POST",
      url: "/Reservation",
      schema: {
        summary: "Creates new user",
        tags: ["reservation"],
        body: reservation,
      },
      handler: async (request, reply) => {
        const reservation = request.body as Reservation;
        jwt.verify(request.headers.authorization as string,'secret',(err:any,decoded:any)=>{
          if(decoded.role!=="Parent")
          reply.send({"mas":"Invalid"})
         })
        await prismaClient.reservation.create(
          { data:{reservation_id:reservation.reservation_id,
            name:reservation.name,

    course:{
            connect:{course_id:reservation.course_id}
          } ,
    Teacher:{     
						connect:{teacher_id:reservation.teacher_id??undefined}
					  },
    student:{     
              connect:{student_id:reservation.student_id}
              }   
              ,
    parent:{     
             connect:{parent_id:reservation.parent_id??undefined}
           } 
        }}
        );
        return prismaClient.reservation.findMany();
      }
    
    })
  }
  