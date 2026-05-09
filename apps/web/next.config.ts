import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      ["rehype-slug"],
      [
        "rehype-pretty-code",
        {
          theme: "github-dark",
          keepBackground: true,
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
