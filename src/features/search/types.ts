import { Servant } from '@/types/servant';

export type Expr = {
    and?: Expr[];
    or?: Expr[];
    not?: Expr;
    class? :number;
    attribute?: number;
    orderAlignment?: number;
    moralAlignment?: number;
}

export type SearchRequest = {
    root: Expr | null;
    limit?: number;
    offset?: number;
}

export type SearchResponse = {
    total: number;
    limit: number;
    offset: number;
    items: Servant[];
}

// 共通エラー（requestId を含む）
export type ApiError = {
    error: { code: string; message: string };
    fieldErrors?: { field: string; message: string }[];
    requestId?: string;
};