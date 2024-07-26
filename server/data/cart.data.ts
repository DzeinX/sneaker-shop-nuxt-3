import {ISneaker, sneakers} from "~/server/data/sneakers.data";

export interface ICart {
  userId: number,
  sneakers: ISneakerCart[]
}

export interface ISneakerCart {
  entity: ISneaker,
  amount: number,
  size: number,
}

export const carts: ICart[] = [
  {
    userId: 1,
    sneakers: [
      {
        entity: sneakers[0],
        amount: 1,
        size: 41,
      },
      {
        entity: sneakers[1],
        amount: 2,
        size: 41.5,
      },
    ]
  },
  {
    userId: 2,
    sneakers: [
      {
        entity: sneakers[3],
        amount: 2,
        size: 42,
      },
    ]
  },
]
