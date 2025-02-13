import { auth } from "@/controllers/v1/auth";
import Elysia from "elysia";

const apiV1 = new Elysia()
  .group("/api/v1", (app) =>
    app
      .use(auth)
  )

export { apiV1 };