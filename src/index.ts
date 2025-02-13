import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import mongoose from "mongoose";
import { apiV1 } from "@/routes/api/v1";

mongoose.connect(Bun.env.MONGO_URL)

const app = new Elysia()
  .use(swagger())
  .use(apiV1)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
