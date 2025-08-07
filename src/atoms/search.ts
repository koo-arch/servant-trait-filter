import { atom } from 'jotai';
import { Expr } from '@/types/search';
import { SearchRequest } from '@/types/search';

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