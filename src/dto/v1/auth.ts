import Elysia, { t } from "elysia";

const authDTO = new Elysia().model({
  register: t.Object({
    name: t.String({
      minLength: 2,
      error: 'Name must be at least 2 characters long'
    }),
    email: t.String({
      format: 'email',
      error: 'Invalid email'
    }),
    password: t.String({
      minLength: 8,
      error: 'Password must be at least 8 characters long'
    }),
  }),
  login: t.Object({
    email: t.String(),
    password: t.String(),
  }),
})

export { authDTO };
