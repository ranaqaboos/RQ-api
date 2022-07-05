import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { getteacherController } from '../../controller/getteacher';
//import { format } from 'path';
import {prismaClient} from '../../prisma';

import {Teacher } from '@prisma/client'

const Teacher = Type.Object({
	user_id:Type.String(), 
    name:Type.String(), 
    descaription:Type.String(),
  });

  export default async function (server: FastifyInstance) {
    server.route({
        method: "GET",
        url: "/teacher",
        schema: {
          summary: "view teacher ",
          tags: ["teacher"],
        },
        handler: async (request, reply) => {
          return prismaClient.teacher.findMany();
        },
      });
  }
