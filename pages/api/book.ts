import prisma from "lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, author_name, subject, username } = req.body
  const result = await prisma.book.create({
    data: {
      title,
      author_name,
      subject,
      User: { connectOrCreate: { where: { username }, create: { username } } }
    },
  })
  res.json(result)
}