import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
external: [
    "react",
    "react-dom",
    "zod",
    "react-hook-form",
    "@hookform/resolvers",
    "lucide-react",
    "date-fns",
    "formscn-ui"
  ]
});