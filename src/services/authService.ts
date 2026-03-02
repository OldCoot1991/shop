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

export async function getUserRequest(): Promise<AuthUser> {
    const res = await fetch(`${API_BASE}/api/v1/user`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
        credentials: 'include',
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error?.title || 'Ошибка получения данных пользователя');
    }

    const data: LoginSuccessResponse = await res.json();
    return data.data.user;
}

// ── Registration Payload Models ────────────────────────────────────────────

export interface RegisterStep1Payload {
    login: string;
}

export interface RegisterStep2Payload {
    token: string;
    code: string;
}

export interface RegisterStep3Payload {
    token: string;
    password: string;
}

export interface RegisterTokenResponse {
    data: {
        token: string;
        timeout: number;
    };
}

// ── Registration API Functions ────────────────────────────────────────────

export async function registerStep1Identification(payload: RegisterStep1Payload): Promise<RegisterTokenResponse['data']> {
    const res = await fetch(`${API_BASE}/api/v1/auth/registration/step1/identification`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error?.title || 'Ошибка(Шаг 1): Неверный запрос');
    }

    const data: RegisterTokenResponse = await res.json();
    return data.data;
}

export async function registerStep2Verification(payload: RegisterStep2Payload): Promise<RegisterTokenResponse['data']> {
    const res = await fetch(`${API_BASE}/api/v1/auth/registration/step2/verification`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error?.title || 'Ошибка(Шаг 2): Неверный код или токен');
    }

    const data: RegisterTokenResponse = await res.json();
    return data.data;
}

export async function registerStep3Confirmation(payload: RegisterStep3Payload): Promise<AuthUser> {
    const res = await fetch(`${API_BASE}/api/v1/auth/registration/step3/confirmation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error?.title || 'Ошибка(Шаг 3): Невозможно создать пользователя');
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
