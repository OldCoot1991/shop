import React from "react";
import PaymentsClient from "./PaymentsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мои заказы | ОЗОН-ПРО",
  description: "Управление заказами и оплата",
};

export default function PaymentsPage() {
  return <PaymentsClient />;
}
