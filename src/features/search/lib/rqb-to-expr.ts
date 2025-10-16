import type { RuleGroupType, RuleType } from 'react-querybuilder';
import type { Expr } from '@/features/search/types';
import { toNumberOrNull } from './helpers/value';
import { isFieldName } from './helpers/field';

const ruleToExpr = (rule: RuleType): Expr | null => {
    // フィールドが定義されていない、またはサポートされていない場合は無視
    if (!isFieldName(rule.field)) return null;
    // 値が未定義、または数値に変換できない場合は無視
    const valueNum = toNumberOrNull(rule.value);
    if (valueNum == null) return null;

    const base: Expr = { [rule.field]: valueNum }
    if (rule.operator === '!=') {
        return { not: base };
    }

    return base;
}

const groupToExpr = (group: RuleGroupType): Expr | null => {
    const parts: Expr[] = [];

    for (const r of group.rules ?? []) {
        if ('rules' in r) {
            const g = groupToExpr(r as RuleGroupType);
            if (g) parts.push(g);
        } else {
            const e = ruleToExpr(r as RuleType);
            if (e) parts.push(e);
        }
    }

    if (!parts.length) return null;

    let combined: Expr;
    if ((group.combinator ?? 'and') === 'or') {
        combined = { or: parts };
    } else {
        combined = { and: parts };
    }

    return group.not ? { not: combined } : combined;
}

export const rqbToExpr = (group: RuleGroupType): Expr | null => {
    return groupToExpr(group);
}