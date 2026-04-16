import type { Metadata } from 'next';
import RequisitesPage from '@/components/layout/RequisitesPage/RequisitesPage';

export const metadata: Metadata = {
  title: 'Реквизиты | ОЗОН-ПРО',
  description: 'Юридическая информация, банковские реквизиты и данные компании.',
};

export default function Requisites() {
  return <RequisitesPage />;
}
