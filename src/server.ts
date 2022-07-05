import fastifyAutoload from '@fastify/autoload';
import fastifySwagger from '@fastify/swagger';
import { ajvTypeBoxPlugin, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify from 'fastify';
import { join } from 'path';
import fastifySensible from'@fastify/sensible'
import jwt from "jsonwebtoken"
export const server = fastify({
	logger: true,
	ajv: {
		customOptions: {
			removeAdditional: 'all',
			ownProperties: true,
		},
		plugins: [ajvTypeBoxPlugin],
	},
}).withTypeProvider<TypeBoxTypeProvider>();

// server.register(require('fastify-mongoose'), {
// 	uri: 'mongodb://localhost/test_db'
//   }),

server.register(fastifySwagger, {
	routePrefix: '/docs',
	exposeRoute: true,
	mode: 'dynamic',
	openapi: {
		info: {
			title: 'RQ',
			version: '0.0.1',
		},
		security: [
			{
				bearerAuth: [],
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
	},},
);

server.register(fastifyAutoload, {
	dir: join(__dirname, 'routes'),
});
server.register(fastifySensible);
//server.register(require('@fastify/url-data'))