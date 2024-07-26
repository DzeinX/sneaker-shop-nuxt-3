import { carts } from "~/server/data/cart.data";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (body === undefined || body.userId === undefined) {
    throw createError({
      statusCode: 404,
      statusMessage: 'No User ID found',
    })
  }
  return carts.filter((cart) => cart.userId === body.userId)[0]
})