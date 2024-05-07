import { Post } from '@nestjs/common';
import { PrismaClient, Prisma, Message } from '@prisma/client';

const prismaClient = new PrismaClient({});
export const extendedPrismaClient = prismaClient.$extends({
  // model: {
  //   $allModels: {
  //     softDelete<T, A>(
  //       this: T,
  //       args: Prisma.Exact<A, Prisma.Args<T, 'update'>>,
  //     ): Prisma.Result<T, A, 'update'> {
  //       const context = Prisma.getExtensionContext(this);
  //       return (context as any).update(args);
  //     },
  //     softDeleteMany<T, A>(
  //       this: T,
  //       args: Prisma.Exact<A, Prisma.Args<T, 'updateMany'>>,
  //     ): Prisma.Result<T, A, 'updateMany'> {
  //       const context = Prisma.getExtensionContext(this);
  //       return (context as any).updateMany(args);
  //     },
  //   },
  // },
  query: {
    message: {
      findUnique({ query, args }) {
        args.where.createdAt = null;
        return prismaClient.message.findFirst(args);
      },
      findFirst({ args, query }) {
        args.where.createdAt = null;
        return query(args);
      },
      findMany({ args, query }) {
      //  console.log('args : ', args);
      //  console.log('query : ', query(args));
      //  console.log('prismaClient.message.findMany() : ', prismaClient.message.findMany());
       
       return query(args);
      },
      update({ query, args }) {
        args.where.createdAt = null;
        return query(args);
      },
      updateMany({ query, args }) {
        if (args.where !== undefined) {
          args.where.createdAt = null;
        } else {
          args.where = { createdAt: null };
        }
        return query(args);
      },
      create({ query, args }) {
        return query(args);
      },
      delete({ query, args }) {
        return query(args);
      },
    },
   
  },
});

export type ExtendedPrismaClient = typeof extendedPrismaClient;