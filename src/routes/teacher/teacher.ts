import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { getteacherController } from '../../controller/getteacher';
//import { format } from 'path';
import {prismaClient} from '../../prisma';

import {Teacher } from '@prisma/client'

const Teacher = Type.Object({
	user_id:Type.String(), 
    name:Type.String(), 
    descaription:Type.String(),
  });

  export default async function (server: FastifyInstance) {
    server.route({
    method: 'POST',
      url: '/teacher',
      schema: {
        summary: 'Creates new user',
        tags: ['teacher'],
        body: Teacher,
      },
      handler: async (request, reply) => {
        const teacher = request.body as Teacher;
        await prismaClient.teacher.create({data :teacher },)
          return prismaClient.teacher.findMany();
        
      },
        
  })
  //   server.route({
  //     method: 'PUT',
  //     url: '/teachers',
  //     schema: {
  //       summary: 'Creates new teacher',
  //       tags: ['teacher'],
  //       body: teacher,
  //     },
          
  //     handler: async (request, reply) => {
  //       const newteacher: any = request.body;
  //       return getteacherController(teachers, newteacher);
  //     },
  //   });
  //   server.route({
  //   method: 'DELETE',
	// 	url: '/teachers/:id',
	// 	schema: {
	// 		summary: 'Deletes a teacher',
	// 		tags: ['teacher'],
	// 		params: Type.Object({
	// 			id: Type.String({ format: 'uuid' }),
	// 		}),
	// 	},
	// 	handler: async (request, reply) => {
	// 		const id = (request.params as any).id as string;

	// 		teachers = teachers.filter((c) => c.id !== id);

	// 		return teachers;
	// 	},
  // })
  // server.route({
	// 	method: 'PUT',
	// 	url: '/teachers/:id',
	// 	schema: {
	// 		summary: 'searcha  by name',
	// 		tags: ['teacher'],
	// 		querystring: GetteachereQuery
			
	// 	},
  //       handler: async (request, reply) => {
       
  //       const teacherquery = request.query as GetteachereQuery
        
	// 		if (teacherquery.name) {
	// 			return teachers.filter((c) => c.name.includes(teacherquery.name ?? ''));
	// 		} else {
	// 			return teachers;
	// 		}
    
  //       },
  // });


// server.route({
//     method: "GET",
//     url: "/teacher",
//     schema: {
//       summary: "view teacher ",
//       tags: ["teacher"],
//     },
//     handler: async (request, reply) => {
//       return prismaClient.teacher.findMany();
//     },
//   });
}
  