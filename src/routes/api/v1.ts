import Elysia from "elysia";

const apiV1 = new Elysia()
  .group("/api/v1", (app) =>
    app.get("/hello", () => {
      return { message: "Hello, World!" };
    })
  )

export { apiV1 };