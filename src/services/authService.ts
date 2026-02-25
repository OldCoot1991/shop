const API_BASE = '';

export interface LoginPayload {
    login: string;
    password: string;
}

export interface AuthUser {
    id: number;
    email: string;
    phone: string | null;
    firstName: string | null;
    lastName: string | null;
}

export interface LoginSuccessResponse {
    data: {
        user: AuthUser;
    };
}

export interface LoginErrorResponse {
    error: {
        code: number;
        title: string;
    };
}

export async function loginRequest(payload: LoginPayload): Promise<AuthUser> {
    const res = await fetch(`${API_BASE}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const errorData: LoginErrorResponse = await res.json();
        throw new Error(errorData?.error?.title || 'Ошибка авторизации');
    }

    const data: LoginSuccessResponse = await res.json();
    return data.data.user;
}

export async function logoutRequest(): Promise<void> {
    // Best-effort — clear local state even if the request fails
    await fetch(`${API_BASE}/api/v1/auth/logout`, {
        method: 'POST',
        headers: { accept: '*/*' },
    }).catch(() => { });
}
