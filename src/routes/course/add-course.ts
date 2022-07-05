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

  })}


