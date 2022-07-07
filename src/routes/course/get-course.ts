import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { Course } from "@prisma/client";
import jwt from "jsonwebtoken";
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
          jwt.verify(request.headers.authorization as string,'secret',(err:any,decoded:any)=>{
            if(decoded.role!=="Teachrt")
            reply.send({"mas":"Invalid"})
           })
          return prismaClient.course.findMany();
        },
      });
  }