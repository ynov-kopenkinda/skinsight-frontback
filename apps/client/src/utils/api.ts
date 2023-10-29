import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@kopenkinda/api";

export const api = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from "@kopenkinda/api";
