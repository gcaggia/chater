import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';
import _ from 'underscore';

interface Channel {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

const channels: Channel[] = [
  { id: '1', name: 'General', description: 'General chat', createdAt: '2023-02-08T00:00:00.000Z' },
  { id: '2', name: 'Random', description: 'Random chat', createdAt: '2023-02-08T00:00:00.000Z' },
  { id: '3', name: 'Tech', description: 'Tech chat', createdAt: '2023-02-08T00:00:00.000Z' },
  { id: '4', name: 'Music', description: 'Music chat', createdAt: '2023-02-08T00:00:00.000Z' },
  { id: '5', name: 'Movies', description: 'Movies chat', createdAt: '2023-02-08T00:00:00.000Z' },
  { id: '6', name: 'Sports', description: 'Sports chat', createdAt: '2023-02-08T00:00:00.000Z' },
  { id: '7', name: 'Food', description: 'Food chat', createdAt: '2023-02-08T00:00:00.000Z' },
  { id: '8', name: 'Travel', description: 'Travel chat', createdAt: '2023-02-08T00:00:00.000Z' },
  { id: '9', name: 'News', description: 'News chat', createdAt: '2023-02-08T00:00:00.000Z' },
  { id: '10', name: 'Politics', description: 'Politics', createdAt: '2023-02-08T00:00:00.000Z' },
  { id: '11', name: 'Science', description: 'Science chat', createdAt: '2023-02-08T00:00:00.000Z' },
  { id: '12', name: 'Gaming', description: 'Gaming chat', createdAt: '2023-02-08T00:00:00.000Z' },
  { id: '13', name: 'Books', description: 'Books chat', createdAt: '2023-02-08T00:00:00.000Z' },
  { id: '14', name: 'Art', description: 'Art chat', createdAt: '2023-02-08T00:00:00.000Z' },
  { id: '15', name: 'History', description: 'History chat', createdAt: '2023-02-08T00:00:00.000Z' },
  { id: '16', name: 'Movies', description: 'Movies chat', createdAt: '2023-02-08T00:00:00.000Z' },
  { id: '17', name: 'TV', description: 'TV chat', createdAt: '2023-02-08T00:00:00.000Z' },
  { id: '18', name: 'Movies', description: 'Movies chat', createdAt: '2023-02-08T00:00:00.000Z' },
];

// trpc
export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();

export const trpcAppRouter = t.router({
  getChannels: t.procedure.query(() => {
    return channels;
  }),
  getChannel: t.procedure.input(z.string()).query((req) => {
    console.log({ reqInput: req.input });

    const channel = _.findWhere(channels, { id: req.input });
    return channel[0];
  }),
  //   createChannel: t.procedure.input(z.object({ name: z.string().min(5) })).mutation(async (req) => {
  //     // use your ORM of choice
  //     return await UserModel.create({
  //       data: req.input,
  //     });
  //   }),
});

// export type definition of API
export type AppRouter = typeof trpcAppRouter;

export default trpcAppRouter;
