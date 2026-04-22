const API_BASE = '';

// ── Category & Topic IDs from GET /api/v1/filters ────────────────────────────
export const CATEGORY_IDS = {
    doubleCards: 1000,
    badges: 1001,
    envelopes: 1002,
    magnets: 1003,
    miniCards: 1004,
    singleCards: 1005,
    stands: 1006,
    postCards: 1007,
    stickerPacks: 1008,
    stickers: 1009,
    patches: 1010,
} as const;

export interface ApiFilterItem {
    id: number;
    name: string;
}

export interface ApiFilterGroup {
    id: string;
    name: string;
    key: string;
    items: ApiFilterItem[];
}

export interface ApiFiltersResponse {
    data: {
        filters: ApiFilterGroup[];
    };
}

export async function fetchFilters(): Promise<ApiFilterGroup[]> {
    const baseUrl = typeof window === 'undefined' ? SERVER_API_BASE : (API_BASE || '');

    // Fallback to absolute URL if needed in SSR
    const url = baseUrl ? `${baseUrl}/api/v1/filters` : '/api/v1/filters';

    const res = await fetch(url, {
        headers: { accept: 'application/json' },
        credentials: 'include',
        // Next.js cache settings - cache for 1 hour
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error(`Ошибка загрузки фильтров: ${res.status}`);
    }

    const json: ApiFiltersResponse = await res.json();
    return json.data.filters;
}

export const TOPIC_IDS = {
    arkhyz: 1011,
    dombai: 1012,
    nalchik: 1013,
    sochi: 1014,
    elbrus: 1015,
    casual: 1016,
    natureMountains: 1017,
    envelopes: 1018,
    festive: 1019,
} as const;

export interface ApiProductImage {
    fullUrl: string;
    miniatureUrl: string;
    tinyUrl: string;
}

export interface ApiProductAttribute {
    name: string;
    value: string;
}

export interface ApiProduct {
    id: string;
    article: string;
    name: string;
    description: string | null;
    salePrice: number;
    minCount: number;
    quantity: number;
    images: ApiProductImage[];
    attributes: ApiProductAttribute[];
}

export interface ApiProductsPagination {
    pageCount: number;
}

export interface ApiProductsData {
    pagination: ApiProductsPagination;
    products: ApiProduct[];
}

export interface ApiProductsResponse {
    data: ApiProductsData;
}

export interface FetchProductsParams {
    page?: number;
    /** Numeric category IDs joined by comma, e.g. "1009" or "1000,1007" */
    category?: string;
    /** Numeric topic IDs joined by comma */
    topic?: string;
    sort?: string;
}

/**
 * Next.js rewrites (/api/* → https://market.eco07.ru/api/*) work only
 * for browser-initiated requests. Server Components must use the absolute URL.
 */
export const SERVER_API_BASE = 'https://ozpro.ru';

export async function fetchProductsRequest(
    params: FetchProductsParams = {},
): Promise<ApiProductsData> {
    const query = new URLSearchParams();
    query.set('page', String(params.page ?? 1));
    if (params.category) query.set('category', params.category);
    if (params.topic) query.set('topic', params.topic);
    if (params.sort) query.set('sort', params.sort);

    const baseUrl = typeof window === 'undefined' ? SERVER_API_BASE : (API_BASE || '');

    const res = await fetch(`${baseUrl}/api/v1/products?${query.toString()}`, {
        headers: { accept: 'application/json' },
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error(`Ошибка загрузки товаров: ${res.status}`);
    }

    const json: ApiProductsResponse = await res.json();
    return json.data;
}

/** Helper: get the image URL for a product image — via the Next.js /img-proxy/* proxy */
export const IMAGE_BASE = '';

export function getProductImageUrl(image: ApiProductImage, size: 'full' | 'miniature' | 'tiny' = 'miniature'): string {
    const url = size === 'full' ? image.fullUrl : size === 'miniature' ? image.miniatureUrl : image.tinyUrl;
    // API returns relative paths like /static/image/... — rewrite to /img-proxy/image/...
    if (url.startsWith('http')) return url;
    // Replace /static/ prefix with /img-proxy/ for our Next.js rewrite
    return url.replace(/^\/static\//, '/img-proxy/');
}/** Helper: get attribute value by name */
export function getAttributeValue(attributes: ApiProductAttribute[], name: string): string | undefined {
    return attributes.find((a) => a.name === name)?.value;
}

/** Price in the API is in kopecks (e.g. 4500 = 45 ₽) */
export function formatPrice(kopecks: number): string {
    const rubles = kopecks / 100;
    return rubles.toLocaleString("ru-RU", { maximumFractionDigits: 0 }) + ' ₽';
}

// ── Single product ────────────────────────────────────────────────────────────

interface ApiSingleProductResponse {
    data: {
        product: ApiProduct;
    };
}

export async function fetchProductById(id: string): Promise<ApiProduct> {
    const res = await fetch(`${SERVER_API_BASE}/api/v1/products/${id}`, {
        headers: { accept: 'application/json' },
        // Next.js: revalidate every 60s
        next: { revalidate: 60 },
    });

    if (res.status === 404) {
        throw new Error('NOT_FOUND');
    }

    if (!res.ok) {
        throw new Error(`Ошибка загрузки товара: ${res.status}`);
    }

    const json: ApiSingleProductResponse = await res.json();
    return json.data.product;
}
