import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const mySecret = "secret";
const saltRounds = 10;

const User = Type.Object({
  username: Type.String(),
  password: Type.String(),
  role: Type.String(),
});
export default async function (server: FastifyInstance) {
  server.route({
    method: "POST",
    url: "/register",
    schema: {
      summary: "Creates new user",
      tags: ["user"],
      body: User,
    },
    handler: async (request, reply) => {
      const User = request.body as any;
      const password = bcrypt.hashSync(User.password, saltRounds);
      await prismaClient.user.create({ data: { ...User, password: password } });
      return prismaClient.user.findMany();
    },});
  server.route({
    method: "POST",
    url: "/login",
    schema: {
      summary: "Creates new user",
      tags: ["user"],
      body: User,
	},
    handler: async (request, reply) => {
      const User = request.body as any;
      const password = bcrypt.hashSync(User.password, saltRounds);
      let datauser = await prismaClient.user.findFirst({
        where: { username: User.username },
      });
      let result = bcrypt.hashSync(User.password, saltRounds);
      if (result) {
        let token = jwt.sign(
          { username: User.username, role: User.role },
          mySecret
        );
        return { msg: "User logged in", token: token };
      } else { return { msg: "Invalid username" }; }
}, });}
