import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ThemeToggle from "./ThemeToggle";

const meta: Meta<typeof ThemeToggle> = {
  title: "UI/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {
  decorators: [
    (Story) => (
      <div
        style={{ background: "#1a1a2e", padding: "24px", borderRadius: "8px" }}
      >
        <Story />
      </div>
    ),
  ],
};
