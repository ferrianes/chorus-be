import { auth } from "@/controllers/v1/auth";
import cors from "@elysiajs/cors";
import Elysia from "elysia";

const apiV1 = new Elysia()
  .group("/api/v1", (app) =>
    app
      .use(cors())
      .use(auth)
  )

export { apiV1 };