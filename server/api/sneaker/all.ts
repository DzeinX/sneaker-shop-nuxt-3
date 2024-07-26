import {sneakers} from "~/server/data/sneakers.data";

export default defineEventHandler((event) => {
  return sneakers
})