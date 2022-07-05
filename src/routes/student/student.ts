import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import {Student} from '@prisma/client'
const Student = Type.Object({
  user_id:Type.String(),
    name:Type.String(),
  });

  export default async function (server: FastifyInstance) {
    server.route({
      method: 'POST',
      url: '/student',
      schema: {
        summary: 'Creates new student',
        tags: ['student'],
        body: Student,
      },
      handler: async (request, reply) => {
        const student = request.body as Student;
        await prismaClient.student.create({data :student  })
          return prismaClient.student.findMany();
        
      },
    })
    server.route({
      method: "GET",
      url: "/student/student",
      schema: {
      summary: "view student ",
      tags: ["student"],
      },
      handler: async (request, reply) => {
      return prismaClient.student.findMany();
      },
    });
  }
  