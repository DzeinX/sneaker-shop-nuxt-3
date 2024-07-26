import {sneakers} from "~/server/data/sneakers.data";

export default defineEventHandler((event) => {
  const article = getRouterParam(event, 'article')

  if (article === undefined || article === '') {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    })
  }
  return sneakers.filter((sneaker) => {return sneaker.article === article})[0]
})

