import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
//import { format } from 'path';
const student = Type.Object({
    id: Type.String({ format: "uuid" }),
    user_id: Type.String(),// كيف احدد نوع اليوزر احتاج المدرس والاب 
    name:Type.String(),
    teacher_id:Type.String({format:'uuid'}),
    course_id:Type.Array(Type.String({ format:'uuid'})),
  });
  type student = Static<typeof student >;
  export let students: student [] = []

  export default async function (server: FastifyInstance) {}
  