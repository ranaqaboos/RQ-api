import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import{prismaClient} from '../../prisma'
import{Parent}from'@prisma/client'
import { userInfo } from 'os';
const Parent = Type.Object({
    name: Type.String(), 
    childeren:Type.Array(Type.String()), 
	user_id:Type.String(),
  });
  //type parent = Static<typeof parent >;

//   const GetparenteQuery = Type.Object({
//     name: Type.Optional(Type.String()),
// 	childeren: Type.Optional(Type.String()),
//   });
  
//   type  GetparenteQuery= Static<typeof GetparenteQuery>;
  
  //export let parents: parent[] = []
  export default async function (server: FastifyInstance) {
//     server.route({
// 		method: 'PUT',
// 		url: '/parents',
// 		schema: {
// 			summary: 'Creates new parent',
// 			tags: ['parents'],
// 			body: parent,
// 		},
        
// 		handler: async (request, reply) => {
// 			const newparent: any = request.body;
// 			return getparentController(parents, newparent);
// 		},
// 	});
//     server.route({
// 		method: 'DELETE',
// 		url: '/parents/:id',
// 		schema: {
// 			summary: 'Deletes a parent',
// 			tags: ['parents'],
// 			params: Type.Object({
// 				id: Type.String({ format: 'uuid' }),
// 			}),
// 		},
// 		handler: async (request, reply) => {
// 			const id = (request.params as any).id as string;

// 			parents = parents.filter((c) => c.id !== id);

// 			return parents;
// 		},
// 	});
// 	//يبحث عن اسم الطفل 
// 	server.route({
// 		method: 'PUT',
// 		url: '/parents/:id',
// 		schema: {
// 			summary: 'searcha  by name',
// 			tags: ['parents'],
// 			querystring: GetparenteQuery
			
// 		},
//         handler: async (request, reply) => {
       
//         const childerenquery = request.query as GetparenteQuery
        
// 			if (childerenquery.name) {
// 				return parents.filter((c) => c.name.includes(childerenquery.name ?? ''));
// 			} else {
// 				return parents;
// 			}
    
//         },
//   });

server.route({
	method: "POST",
	url: "/Parent",
	schema: {
	  summary: "Creates new user",
	  tags: ["Parent"],
	  body: Parent,
	},
	handler: async (request, reply) => {
	  const parent = request.body as Parent;
	  await prismaClient.parent.create({data:parent})
	  return prismaClient.parent.findMany();
	}
  
  })
 
}

  
  