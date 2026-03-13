const API_BASE = '';

export interface CartApiImage {
    fullUrl: string;
    miniatureUrl: string;
    tinyUrl: string;
}

export interface CartApiAttribute {
    name: string;
    value: string;
}

export interface CartApiProduct {
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

export interface CartApiData {
    count: number;
    totalPrice: number;
    products: CartApiProduct[];
}

export interface CartApiResponse {
    data: CartApiData;
}

export async function fetchCartRequest(): Promise<CartApiData> {
    const res = await fetch(`${API_BASE}/api/v1/cart`, {
        headers: { accept: 'application/json' },
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error(`Ошибка загрузки корзины: ${res.status}`);
    }

    const json: CartApiResponse = await res.json();
    return json.data;
}

export interface AddToCartPayload {
    id: string; // Swagger says "id", not "productId"
    quantity: number;
}

export async function addToCartRequest(payload: AddToCartPayload): Promise<CartApiData> {
    const res = await fetch(`${API_BASE}/api/v1/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error(`Ошибка добавления в корзину: ${res.status}`);
    }

    const json: CartApiResponse = await res.json();
    return json.data;
}

export async function addMultipleToCartRequest(payload: AddToCartPayload[]): Promise<CartApiData> {
    const res = await fetch(`${API_BASE}/api/v1/cart/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error(`Ошибка добавления товаров в корзину: ${res.status}`);
    }

    const json: CartApiResponse = await res.json();
    return json.data;
}

export async function removeFromCartRequest(productId: string): Promise<CartApiData> {
    const res = await fetch(`${API_BASE}/api/v1/cart/${productId}`, {
        method: 'DELETE',
        headers: { accept: 'application/json' },
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error(`Ошибка удаления из корзины: ${res.status}`);
    }

    const json: CartApiResponse = await res.json();
    return json.data;
}

export async function clearCartRequest(): Promise<CartApiData> {
    const res = await fetch(`${API_BASE}/api/v1/cart/empty`, {
        method: 'DELETE',
        headers: { accept: 'application/json' },
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error(`Ошибка очистки корзины: ${res.status}`);
    }

    const json: CartApiResponse = await res.json();
    return json.data;
}
