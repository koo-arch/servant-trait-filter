import { v4 as uuidv4 } from 'uuid';

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

export interface FetchOptions extends RequestInit {
    baseURL?: string;
    headers?: Record<string, string>;
}

export async function serverFetch<T = unknown>(
    path: string,
    options: FetchOptions = {}
): Promise<T> {
    const url = `${options.baseURL ?? BASE_URL}${path}`;

    // interceptor風：リクエストIDを付与
    const requestId = uuidv4();

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-Request-ID': requestId,
        ...(options.headers || {}),
    };

    const res = await fetch(url, {
        ...options,
        headers,
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, body: ${text}, requestId: ${requestId}`);
    }

    // 204 / 非JSON / 空ボディのガード
    if (res.status === 204) {
        throw new Error(`No Content (204). requestId=${requestId}`);
    }

    const ct = res.headers.get('content-type') || '';
    if (!ct.includes('application/json')) {
        const text = await res.text();
        throw new Error(`Unexpected Content-Type: ${ct}. body=${text}, requestId=${requestId}`);
    }

    const raw = await res.text();
    if (!raw.trim()) {
        throw new Error(`Empty JSON body. requestId=${requestId}`);
    }

    try {
        return JSON.parse(raw) as T;
    } catch (e) {
        throw new Error(`Invalid JSON: ${(e as Error).message}. requestId=${requestId}`);
    }
}