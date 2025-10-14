import { serverFetch, FetchOptions } from "./serverClient";

export const api = {
    get: <T>(path: string, options?: FetchOptions) =>
        serverFetch<T>(path, { 
            ...options,
            method: 'GET' 
    }),
    post: <T>(path: string, body?: unknown, options?: FetchOptions) =>
        serverFetch<T>(path, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body),
        }),
    put: <T>(path: string, body?: unknown, options?: FetchOptions) =>
        serverFetch<T>(path, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body),
        }),
    patch: <T>(path: string, body?: unknown, options?: FetchOptions) =>
        serverFetch<T>(path, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(body),
        }),
    delete: <T>(path: string, options?: FetchOptions) =>
        serverFetch<T>(path, { 
            ...options,
            method: 'DELETE' 
        }),
};