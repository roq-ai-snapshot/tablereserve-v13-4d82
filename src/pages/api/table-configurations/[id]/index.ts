import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { tableConfigurationValidationSchema } from 'validationSchema/table-configurations';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.table_configuration
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTableConfigurationById();
    case 'PUT':
      return updateTableConfigurationById();
    case 'DELETE':
      return deleteTableConfigurationById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTableConfigurationById() {
    const data = await prisma.table_configuration.findFirst(convertQueryToPrismaUtil(req.query, 'table_configuration'));
    return res.status(200).json(data);
  }

  async function updateTableConfigurationById() {
    await tableConfigurationValidationSchema.validate(req.body);
    const data = await prisma.table_configuration.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteTableConfigurationById() {
    const data = await prisma.table_configuration.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
