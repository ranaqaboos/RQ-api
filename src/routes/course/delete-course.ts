import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { Course } from "@prisma/client";
import { ObjectID, ObjectId } from "bson";
import _ from "lodash";
import jwt from"jsonwebtoken";
import { addAuthorization } from "../../hooks/auth";
const Course = Type.Object({
    course_id: Type.String(),
  });

export default async function (server: FastifyInstance) {
  addAuthorization(server)
    server.route({
        method: "DELETE",
        url: "/:course_id",
        schema: {
          summary: "Deletes a course",
          tags: ["course"],
          params: Course,
        },
        handler: async (request, reply) => {
          jwt.verify(request.headers.authorization as string,'secret',(err:any,decoded:any)=>{
           if(decoded.role!=="Teachrt")
           reply.send({"mas":"Invalid"})
          })
          const { course_id } = request.params as Course;
          if (!ObjectId.isValid(course_id)) {
            reply.badRequest("course_id should be an ObjectId!");
            return;
          }
          return prismaClient.course.delete({
            where: { course_id },
          });
        },
      });


}


