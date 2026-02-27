import { CartApiImage, CartApiAttribute } from './cartService';

const API_BASE = '';

export interface OrderApiProduct {
    id: string;
    article: string;
    name: string;
    description: string;
    salePrice: number;
    minCount: number;
    quantity: number;
    images: CartApiImage[];
    attributes: CartApiAttribute[];
}

export type OrderStatus = 'CREATED' | 'PAID' | 'CANCELED' | 'DELIVERED';

export interface OrderItem {
    id: number;
    createdAt: string;
    amount: number;
    status: OrderStatus;
    products: OrderApiProduct[];
}

export interface OrdersListResponse {
    data: {
        pagination: {
            pageCount: number;
        };
        orders: OrderItem[];
    };
}

export interface SingleOrderResponse {
    data: {
        order: OrderItem;
    };
}

export interface BillingResponse {
    data: {
        billingUrl: string;
    };
}

// 1. Get paginated orders
export async function getOrdersRequest(page: number = 1): Promise<OrdersListResponse['data']> {
    const res = await fetch(`${API_BASE}/api/v1/orders?page=${page}`, {
        headers: { accept: 'application/json' },
        credentials: 'include',
    });
    if (!res.ok) throw new Error(`Ошибка загрузки заказов: ${res.status}`);
    const json: OrdersListResponse = await res.json();
    return json.data;
}

// 2. Get single order
export async function getOrderByIdRequest(id: string): Promise<OrderItem> {
    const res = await fetch(`${API_BASE}/api/v1/orders/${id}`, {
        headers: { accept: 'application/json' },
        credentials: 'include',
    });
    if (!res.ok) throw new Error(`Ошибка загрузки заказа: ${res.status}`);
    const json: SingleOrderResponse = await res.json();
    return json.data.order;
}

// 3. Delete order
export async function deleteOrderRequest(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/api/v1/orders/${id}`, {
        method: 'DELETE',
        headers: { accept: 'application/json' },
        credentials: 'include',
    });
    if (!res.ok) throw new Error(`Ошибка удаления заказа: ${res.status}`);
}

// 4. Cancel order
export async function cancelOrderRequest(id: number): Promise<OrderItem> {
    const res = await fetch(`${API_BASE}/api/v1/orders/cancel`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error(`Ошибка отмены заказа: ${res.status}`);
    const json: SingleOrderResponse = await res.json();
    return json.data.order;
}

// 5. Pay order
export async function payOrderRequest(id: number): Promise<string> {
    const res = await fetch(`${API_BASE}/api/v1/orders/payment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error(`Ошибка оплаты заказа: ${res.status}`);
    const json: BillingResponse = await res.json();
    return json.data.billingUrl;
}

// 6. Registration (Checkout)
export interface RegistrationPayload {
    id: string;      // Product ID
    quantity: number;
}
export async function createOrderRegistrationRequest(products: RegistrationPayload[]): Promise<string> {
    const res = await fetch(`${API_BASE}/api/v1/orders/registration`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(products),
    });
    if (!res.ok) throw new Error(`Ошибка регистрации заказа: ${res.status}`);
    const json: BillingResponse = await res.json();
    return json.data.billingUrl;
}
