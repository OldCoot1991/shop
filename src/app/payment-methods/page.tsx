import PaymentMethodsPage from "@/components/layout/PaymentMethodsPage/PaymentMethodsPage";

export const metadata = {
  title: "Способы оплаты | ShopHub",
  description: "Узнайте о доступных способах оплаты покупок: ЮKassa, Уралсиб, банковские карты.",
};

export default function Page() {
  return <PaymentMethodsPage />;
}
