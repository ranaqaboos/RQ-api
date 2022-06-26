import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
const reservation = Type.Object({
    id: Type.String({ format: "uuid" }),
    course_id: Type.String(),
    teacher_id: Type.String(),
    student_id: Type.String(),
    parent_id: Type.String(),
  });
  type reservation = Static<typeof reservation >;
  export let reservations: reservation [] = []
  export default async function (server: FastifyInstance) {
    //اربط الكورس مع اختيار الاب للكورس 
  }
  