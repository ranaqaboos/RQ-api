import { Static, Type } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { getuserController } from "../../controller/getuser";
import { prismaClient } from "../../prisma";
import { User } from "@prisma/client";
import { ObjectId } from "bson";
import jwt from"jsonwebtoken";
import bcrypt from "bcrypt";
const mySecret = 'secret'
const saltRounds = 10;

const User = Type.Object({
  username: Type.String(),
  password: Type.String(),
  role: Type.String(),
});
// export const tokens: string[] = [];
// export const tokenUsers: { [token: string]: string } = {};
//type User = Static<typeof User >;

// const GetuserQuery = Type.Object({
// 	username: Type.Optional(Type.String()),
// });
// type GetuserQuery = Static<typeof GetuserQuery>;

// export let users: User[] = [
// 	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', username: 'Lamis', password: '0511111111',role:'User' },
// 	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa2', username: 'Amani', password: '0511111111' ,role:'teacher'},
// 	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa3', username: 'Amal', password: '0511111111' ,role:'user'},
// 	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa0', username: 'Azizah', password: '123123123' ,role:'admn'},
// ];

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
		  const password=bcrypt.hashSync(User.password,saltRounds);
		  await prismaClient.user.create({data:{...User,password:password}});
		  return prismaClient.user.findMany();
		},	
	});
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
      let datauser =await prismaClient.user.findFirst({where:{username:User.username}});
     let result =bcrypt.hashSync(User.password,saltRounds);
		if(result){
			let token =jwt.sign({username:User.username ,role:User.role},mySecret);
			return ({"msg":"User logged in","token":token});
		}else{
			return({"msg":"Invalid username"})
		}
	
      // 	await prismaClient.user.create({data :user  })
      // 		return prismaClient.user.findMany();

      // },
      // const newToken = new ObjectId().toHexString();

      // 	tokens.push(newToken);
      // 	tokenUsers[newToken] = username;

      // 	return newToken;
    },
  });
//   server.route({
//     method: "POST",
//     url: "/verify",
  
// 	handler: async (request, reply) => {
// 		const headers = request.headers as any;
//     jwt.verify(headers.token, mySecret, function(err, decoded) {
//         if(decoded){
//             return({"msg":`hello ${decoded.id}`});
//         }else{
//             return({"msg":"invalid token"});
//         }
//       });
// });
	  server.route({
		method: "GET",
		url: "/user",
		schema: {
		  summary: "view user ",
		  tags: ["user"],
		},
		handler: async (request, reply) => {
		  return prismaClient.user.findMany();
		},
	  });    

}
