import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { User } from "@prisma/client";
import { ObjectId } from "bson";

const User = Type.Object({
  username: Type.String(),
  password: Type.String(),
  role: Type.String(),
});
export default async function (server: FastifyInstance) {
  server.route({
    method: "DELETE",
    url: "/user_id",
    schema: {
      summary: "Deletes a user id",
      tags: ["user"],
      params: User,
    },
    handler: async (request, reply) => {
      const { user_id } = request.params as User;
      if (!ObjectId.isValid(user_id)) {
        reply.badRequest("user_id should be an ObjectId!");
        return;
      }
      return prismaClient.user.delete({
        where: { user_id },
      });
    },
  });
}
