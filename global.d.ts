import { PrismaClient } from "@prism/client";

declare global {
  namespace globalThis {
    var prismadb: PrismaClient;
  }
}
