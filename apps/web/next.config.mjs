import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "../..");

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: rootDir,
  transpilePackages: ["@fantasy/shared"],
};

export default nextConfig;
