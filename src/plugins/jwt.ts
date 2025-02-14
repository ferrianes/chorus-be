import Elysia from "elysia";
import { jwt as elysiaJwt } from '@elysiajs/jwt'

const jwt = new Elysia()
  .use(
    elysiaJwt({
      name: 'jwt',
      secret: Bun.env.JWT_SECRET
    })
  )

export { jwt };