import Elysia from "elysia";
import { authDTO } from "@/dto/v1/auth";
import { User } from "@/models/v1/user";

const auth = new Elysia()
  .use(authDTO)
  .post(
    '/register',
    async ({ body, error }) => {
      body.email = body.email.toLowerCase();

      try {
        const user = new User(body)
        await user.save()

        return {
          message: 'User registered successfully!'
        }
      }
      catch (err) {
        return error(500, {
          error: {
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Oops! Something went wrong!',
          }
        })
      }
    }, {
    body: 'register'
  })

export { auth };