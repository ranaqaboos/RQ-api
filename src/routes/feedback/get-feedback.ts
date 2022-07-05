import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import {Feedback}from'@prisma/client'
import { ObjectId } from 'bson';
import{prismaClient} from '../../prisma'
//import { format } from 'path';
const feedback = Type.Object({
    descaription:Type.Array(Type.String()),
    course_id: Type.String(),
    teacher_id:Type.String(),
    parent_id:Type.String(),
	student_id : Type.String(),

  });
  export default async function (server: FastifyInstance) {
    server.route({
		method: 'PUT',
		url: '/feedback',
		schema: {
			summary: 'view feedback ',
			tags: ['feedback'],	
		},
		handler: async (request, reply) => {
			return prismaClient.feedback.findMany();
		},
	});
  }