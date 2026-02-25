import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LanguageSwitcher from "./LanguageSwitcher";

const meta: Meta<typeof LanguageSwitcher> = {
  title: "UI/LanguageSwitcher",
  component: LanguageSwitcher,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
