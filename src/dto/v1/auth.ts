import Elysia, { t } from "elysia";

const authDTO = new Elysia().model({
  register: t.Object({
    name: t.String({
      minLength: 2,
    }),
    email: t.String(),
    password: t.String({
      minLength: 8,
    }),
  }),
})

export { authDTO };
