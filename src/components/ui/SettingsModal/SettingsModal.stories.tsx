import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SettingsModal from "./SettingsModal";

const meta: Meta<typeof SettingsModal> = {
  title: "UI/SettingsModal",
  component: SettingsModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    onClose: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};
