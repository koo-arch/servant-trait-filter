import { atom } from 'jotai';
import type { RuleGroupType } from 'react-querybuilder';

// RQBのルールツリー（ドラフト）
export const draftRulesAtom = atom<RuleGroupType>({
    combinator: 'and',
    rules: [],
    not: false,
});

export const draftPaginationAtom = atom({
    limit: 10,
    offset: 0,
});