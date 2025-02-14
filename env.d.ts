declare module 'bun' {
  interface Env {
    MONGO_URL: string
    JWT_SECRET: string
  }
}
