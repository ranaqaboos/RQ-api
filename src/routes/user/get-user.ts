import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";

const User = Type.Object({
  username: Type.String(),
  password: Type.String(),
  role: Type.String(),
});
export default async function (server: FastifyInstance) {
    server.route({
		method: "GET",
		url: "/user",
		schema: {
		  summary: "view user ",
		  tags: ["user"],
		},
		handler: async (request, reply) => {
		  return prismaClient.user.findMany();
		},
	  }); 
}