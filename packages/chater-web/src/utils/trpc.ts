import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../chater-server/src/trpc';
export const trpc = createTRPCReact<AppRouter>();
