import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { prismaClient } from "../../prisma";
import { Course } from "@prisma/client";
import _ from "lodash";
import Fuse from 'fuse.js';
import jwt from "jsonwebtoken";


const Course = Type.Object({
  name: Type.String(),
  category: Type.String(),
  descaription: Type.String(),
  price: Type.Number(),
});
const GetCoursesQuery = Type.Object({
	name: Type.Optional(Type.String()),
});
type GetCoursesQuery = Static<typeof GetCoursesQuery>;
export default async function (server: FastifyInstance) {
    server.route({
		method: 'GET',
		url: '/courses/search',
		schema: {
			summary: 'Gets all course',
			tags: ['course'],
			querystring: GetCoursesQuery,
			response: {
				'2xx': Type.Array(Course),
			},
		},
		handler: async (request, reply) => {
			const query = request.query as GetCoursesQuery;

			const course = await prismaClient.course.findMany();
			if (!query.name) return course;

			const fuse = new Fuse(course, {
				includeScore: true,
				isCaseSensitive: false,
				includeMatches: true,
				findAllMatches: true,
				threshold: 1,
				keys: ['name'],
			});

			console.log(JSON.stringify(fuse.search(query.name)));

			const result: Course[] = fuse.search(query.name).map((r) => r.item);
			return result;
		},
	});
}