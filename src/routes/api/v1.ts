import { auth } from "@/controllers/v1/auth";
import cors from "@elysiajs/cors";
import Elysia from "elysia";

const apiV1 = new Elysia()
  .group("/api/v1", (app) =>
    app
      .use(cors())
      .onError(({ code, error }) => {
        if (code === 'VALIDATION')
          return {
            status: 'fail',
            code: error.code,
            message: error.message
          }
      })
      .use(auth)
  )

export { apiV1 };