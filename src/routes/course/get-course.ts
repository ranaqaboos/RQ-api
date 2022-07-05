import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { Course } from "@prisma/client";

import _ from "lodash";

const Course = Type.Object({
    name: Type.String(),
    category: Type.String(),
    descaription: Type.String(),
    price: Type.Number(),
  });
  export default async function (server: FastifyInstance) {
    server.route({
        method: "GET",
        url: "/course",
        schema: {
          summary: "view course ",
          tags: ["course"],       
        },
        handler: async (request, reply) => {
          return prismaClient.course.findMany();
        },
      });
  }