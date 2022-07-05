import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { Course } from "@prisma/client";
import { ObjectID, ObjectId } from "bson";
import _ from "lodash";


const Course = Type.Object({
  name: Type.String(),
  category: Type.String(),
  descaription: Type.String(),
  price: Type.Number(),
});

export default async function (server: FastifyInstance) {
  
  server.route({
    method: "POST",
    url: "/course",
    schema: {
      summary: "Creates new user",
      tags: ["course"],
      body: Course,
    },
    handler: async (request, reply) => {
      const course = request.body as Course;
      await prismaClient.course.create({ data: course });
      return prismaClient.course.findMany();
    },
    // const course = request.body as courseID;

    // return prismaClient.course.update({
    // 	where: { course_id },
    // 	data: Course,
    // });
  })}
    // server.route({
    //   method: "DELETE",
    //   url: "/course/:course_id",
    //   schema: {
    //     summary: "Deletes a course",
    //     tags: ["course"],
    //     params: CousreParams,
    //   },
    //   handler: async (request, reply) => {
    //     const { course_id } = request.params as CousreParams;
    //     if (!ObjectId.isValid(course_id)) {
    //       reply.badRequest("course_id should be an ObjectId!");
    //       return;
    //     }
    //     return prismaClient.course.delete({
    //       where: { course_id },
    //     });
    //   },
    // });
  // server.route({
  //   method: "GET",
  //   url: "/course/course",
  //   schema: {
  //     summary: "view course ",
  //     tags: ["course"],
  //   },
  //   handler: async (request, reply) => {
  //     return prismaClient.course.findMany();
  //   },
  // });
//   server.route({
//     method: 'DELETE',
//     url: '/course/course_id',
//     schema: {
//         summary: 'Deletes a course',
//         tags: ['course'],
//         params:CousreParams  ,
//     },
//     handler: async (request, reply) => {
//         const { course_id } = request.params as CousreParams;
//         if (!ObjectID.isValid(course_id)) {
//             reply.badRequest('course_id should be UUID!');
//             return;
//         }
//         return prismaClient.course.delete({
//             where: { course_id },
//         });
//     },
// });

  // server.route({
  //   method: "PATCH",
  //   url: "/course",
  //   schema: {
  //     summary: "Update  user by id + you dont need to pass all properties",
  //     tags: ["course"],
  //     body: Type.Partial(Course),
  //     params: Type.Object({
  //       id: Type.String(),
  //     }),
  //   },
  //   handler: async (request, reply) => {
  //     const { course_id } = request.params as Course;
  //     if (!ObjectId.isValid(course_id)) {
  //       reply.badRequest("course_id should be an ObjectId!");
  //       return;
  //     } else if (ObjectId.isValid(course_id)) {
  //       prismaClient.course.findMany();
  //     }
  //   },
  // });
  

