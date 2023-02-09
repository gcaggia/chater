import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import httpContext from 'express-http-context';
import http, { Server as HttpServer } from 'http';
import * as trpcExpress from '@trpc/server/adapters/express';
import trpcAppRouter, { createContext } from './trpc';

const PORT = process.env.PORT || 8001;
console.log(`Setting up Chater Server on port ${PORT}...`);

const app: Application = express();
app.set('port', PORT);
const httpServer: HttpServer = http.createServer(app);

app.use(httpContext.middleware);
app.use(express.json());

app.use(
  cors({
    origin: '*',
  }),
);

// trpc
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: trpcAppRouter,
    createContext,
  }),
);

app.get('/', (req: Request, res: Response) => {
  res.send('Chater Server Service');
});

app.get('/healthcheck', (req: Request, res: Response) => {
  const payload = {
    status: 'ok',
    test: 'received',
    datetime: new Date().toISOString(),
  };
  console.log(`🟢 healthcheck request received`, { payload });

  res.json(payload);
});

httpServer.listen(PORT, () => {
  console.log(`Chater Server is now running on port ${PORT}`);
});

export default app;
