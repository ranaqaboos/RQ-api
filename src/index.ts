import { server } from "./server";

const port: any = process.env.PORT ?? process.env.$PORT ?? 3001;
const host = process.env.HOST || "127.0.0.1";

server
  .listen({
    port,
    host,
  })
  .catch((err) => {
    server.log.error(err);
    process.exit(1);
  });
