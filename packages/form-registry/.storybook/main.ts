import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [],
  framework: { name: "@storybook/react-vite", options: {} },
  async viteFinal(config) {
    config.plugins = [...(config.plugins || []), tailwindcss()];
    return config;
  },
};

export default config;