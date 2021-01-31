import prisma from 'lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'POST': {
      const { title, author_name, subject, username } = req.body;
      const createResult = await prisma.book.create({
        data: {
          title,
          author_name,
          subject,
          User: {
            connectOrCreate: { where: { username }, create: { username } },
          },
        },
      });
      res.json(createResult);
      break;
    }
    case 'PUT': {
      const { id, complete } = req.body;
      const updateResult = await prisma.book.update({
        where: { id },
        data: { complete },
      });
      res.json(updateResult);
      break;
    }
    default:
      res.setHeader('Allow', ['POST', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
