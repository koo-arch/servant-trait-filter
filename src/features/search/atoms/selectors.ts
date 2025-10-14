import { atom } from 'jotai';
import type { Expr, SearchRequest } from '@/features/search/types';
import { draftRulesAtom, draftPaginationAtom } from '@/features/search/atoms/draft';
import { queryBuilderAtom, paginationAtom } from '@/features/search/atoms/commited';
import { rqbToExpr } from '@/lib/mapping/rqb-to-expr';

// ドラフト → Expr（派生）
export const exprFromDraftAtom = atom<Expr | null>(
    (get) => {
        const rules = get(draftRulesAtom);
        return rqbToExpr(rules);
    }
);

// 確定用のアクション Atom
export const commitSearchAtom = atom(
    null,
    (get, set) => {
        set(queryBuilderAtom, get(exprFromDraftAtom));
        set(paginationAtom, get(draftPaginationAtom));
    }
);

export const searchQueryAtom = atom<SearchRequest>(
    (get) => ({
        root: get(queryBuilderAtom),
        ...get(paginationAtom),
    })
);