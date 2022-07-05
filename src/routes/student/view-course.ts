import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import {ViewCourse} from'@prisma/client'
//import {viewCourse} from'@prisma/client'
//import { format } from 'path';
//const prismaClient =new PrismaClient();
const ViewCourse = Type.Object({
    student_id: Type.String(),
    course_id:Type.String(),
  });
  //type ViewCourse = Static<typeof ViewCourse >;

  const viewCourse = Type.Object({
    name:Type.String(),

  });
  //type viewCourse = Static<typeof viewCourse >;

  export default async function (server: FastifyInstance) {
    // server.route({
    //   method: 'GET',
    //   url: '/viewCourses',
    //   schema: {
    //     summary: 'viewCourses ',
    //     tags: ['viewCourses'],
      
    //      body: ViewCourse,
    //   },
          
    //   handler: async (request, reply) => {
    
    //     return ViewCourse;
    //   },
    // });
  }
  