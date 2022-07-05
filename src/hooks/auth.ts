import { FastifyInstance } from 'fastify';
import jwt from 'jsonwebtoken';

export function addAuthorization(server: FastifyInstance) {
	server.addHook('onRequest', async (request, reply) => {
		const mySecret = 'secret'
		const token = (request.headers as any).authorization;
		

		try {
			jwt.verify(token, mySecret, (decoded:any, err:any)=> {
				if(err){
					throw err
				}
			  });
		} catch (err) {
			reply.send(err);
		}
	});

}
// import { FastifyInstance } from 'fastify';


// function verifyToken(token?: string): boolean {
// 	if (!token) return false;
// 	if (!token.includes('Bearer ')) return false;
// 	token = token.replace('Bearer ', '');

// 	if (token === '12394') return true;
// 	if (token.includes(token)) return true;

// 	return false;
// }

// export function addAuthorization(server: FastifyInstance) {
// 	server.addHook('onRequest', async (request, reply) => {
// 		const token = (request.headers as any).authorization;
// 		if (!verifyToken(token)) reply.unauthorized();
// 	});
// }
