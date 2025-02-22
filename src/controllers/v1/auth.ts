import Elysia from "elysia";
import { authDTO } from "@/dto/v1/auth";
import { User } from "@/models/v1/user";
import { jwt } from "@/plugins/jwt";
import { MongoError } from 'mongodb';

const auth = new Elysia()
  .use(authDTO)
  .use(jwt)
  .post(
    '/register',
    async ({ body, error }) => {
      body.email = body.email.toLowerCase();

      try {
        const user = new User(body)
        await user.save()

        return {
          status: 'success',
          message: 'User registered successfully!'
        }
      }
      catch (err) {
        if ((err as MongoError).code === 11000)
          return error(422, {
            status: 'fail',
            code: 'VALIDATION',
            message: 'Email already exists!'
          })

        return error(500, {
          status: 'fail',
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Oops! Something went wrong!',
          asd: err
        })
      }
    }, {
    body: 'register'
  })
  .post(
    '/login',
    async ({ body, error, jwt }) => {
      const user = await User.findOne({
        email: body.email.toLowerCase()
      })

      if (
        !user ||
        !(await Bun.password.verify(body.password, user.password))
      ) {
        return error(404, {
          status: 'fail',
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password!'
        })
      }

      const token = await jwt.sign({
        id: user.id,
        email: user.email
      })

      return {
        status: 'success',
        message: 'User logged in successfully!',
        data: {
          token
        }
      }
    }, {
    body: 'login'
  })

export { auth };