
import { FastifyInstance } from "fastify";
import jwt from"jsonwebtoken";
const mySecret = 'secret'

  export default async function (server: FastifyInstance) {

    server.route({
        method: "POST",
        url: "/verify",
        
        handler: async (request, reply) => {
            const headers = request.headers as any;
        jwt.verify(headers.token, mySecret, (decoded:any, err:any)=> {
            if(decoded){
                return(console.log({"msg":`hello ${decoded.id}`}));
            }else{
                return(console.log(err));
            }
          });
    }});
  }