import { atom } from 'jotai';
import type { Expr } from '@/features/search/types';

// 確定済みExpr（検索に使う）
export const queryBuilderAtom = atom<Expr | undefined>(undefined);

export const paginationAtom = atom({
    limit: 10,
    offset: 0,
})