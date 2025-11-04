import 'server-only';

const BASE_URL = process.env.SERVER_API_URL;

export interface FetchOptions extends RequestInit {
    baseURL?: string;
    headers?: Record<string, string>;
}

export async function serverFetch<T = unknown>(
    path: string,
    options: FetchOptions = {}
): Promise<T> {
    const url = `${options.baseURL ?? BASE_URL}${path}`;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };

    const res = await fetch(url, {
        ...options,
        headers
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, body: ${text}`);
    }

    // 204 / 非JSON / 空ボディのガード
    if (res.status === 204) {
        throw new Error(`No Content (204).`);
    }

    const ct = res.headers.get('content-type') || '';
    if (!ct.includes('application/json')) {
        const text = await res.text();
        throw new Error(`Unexpected Content-Type: ${ct}. body=${text}`);
    }

    const raw = await res.text();
    if (!raw.trim()) {
        throw new Error(`Empty JSON body.`);
    }

    try {
        return JSON.parse(raw) as T;
    } catch (e) {
        throw new Error(`Invalid JSON: ${(e as Error).message}.`);
    }
}