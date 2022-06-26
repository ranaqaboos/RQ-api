import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
//import { format } from 'path';
const teacher = Type.Object({
    id: Type.String({ format: "uuid" }),
    name:Type.String(),
    user_id: Type.String(),// كيف احدد نوع اليوزر احتاج المدرس والاب 
    descaription:Type.Array(Type.String()),
    course_id:Type.String({ format:'uuid'}),
  });
  type teacher = Static<typeof teacher >;

  export let teachers: teacher [] = []

  export default async function (server: FastifyInstance) {}
  