import { defineConfig } from "tsup";
import { copyFileSync } from "fs";
import { join } from "path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  async onSuccess() {
    copyFileSync(
      join(__dirname, "src/index.css"),
      join(__dirname, "dist/index.css")
    );
  },
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