import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Header from "./Header";

const meta: Meta<typeof Header> = {
  title: "Layout/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithContent: Story = {
  args: {
    header1: (
      <span style={{ fontWeight: 700, fontSize: "1.4rem" }}>🛍 My Shop</span>
    ),
    header2: (
      <nav style={{ display: "flex", gap: "24px", fontSize: "0.9rem" }}>
        <a href="#">Каталог</a>
        <a href="#">Распродажа</a>
        <a href="#">Контакты</a>
      </nav>
    ),
  },
};
