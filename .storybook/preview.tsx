import type { Preview } from "@storybook/nextjs-vite";
import React from "react";
import { Provider } from "react-redux";
import { makeStore } from "../src/lib/store";
import "../src/lib/i18n";

const store = makeStore();

const preview: Preview = {
  decorators: [
    (Story: React.ComponentType) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
