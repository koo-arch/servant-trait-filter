import axios from '@/lib/axios/public';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';
import { Expr, SearchResponse, SearchRequest } from '@/features/search/types';

const defaultPagination = {
    limit: 10,
    offset: 0,
};

// 特性などが選択された時にクエリを保持するatom
export const queryDraftAtom = atom<Expr>({});

// APIに送信するクエリを保持するatom
export const queryBuilderAtom = atom<Expr>({});

export const paginationAtom = atom(defaultPagination);

// 検索リクエストを組み立て
export const searchQueryAtom = atom<SearchRequest>(
    (get) => ({
        root: get(queryBuilderAtom),
        ...get(paginationAtom),
    })
);

/* “検索” ボタン用のアクション Atom
      - ドラフト → 本番へコピー
      - ページングをリセット */
export const commitSearchAtom = atom(
    null,
    (get, set) => {
        set(queryBuilderAtom, get(queryDraftAtom));
        set(paginationAtom, defaultPagination);
    }
);

export const searchAtom = atomWithQuery(
    (get) => {
        const body = get(searchQueryAtom);
        return {
            queryKey: ['search', JSON.stringify(body)],
            queryFn: async () => {
                const { data } = await axios.post<SearchResponse>('/servants/search', body);
                return data;
            },
            staleTime: 30_000, // 30 seconds
        }
    }
);