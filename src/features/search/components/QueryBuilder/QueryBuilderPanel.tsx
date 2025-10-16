'use client'
import React from 'react';
import { useAtom } from 'jotai';
import { draftRulesAtom } from '@/features/search/atoms/draft';
import { QueryBuilder, Field } from 'react-querybuilder';
import RuleRow from './RuleRow';
import GroupToolbar from './GroupToolbar';
import { FIELD_MAP } from '@/features/search/lib/helpers/field';

const fields: Field[] = [
    { name: 'class', label: 'Class', valueEditorType: 'select' },
    { name: 'trait', label: 'Trait', valueEditorType: 'select' },
    { name: 'attribute', label: 'Attribute', valueEditorType: 'select' },
    { name: 'orderAlignment', label: 'Order Align', valueEditorType: 'select' },
    { name: 'moralAlignment', label: 'Moral Align', valueEditorType: 'select' },
];

const QueryBuilderPanel: React.FC = () => {
    const [rules, setRules] = useAtom(draftRulesAtom);

    return (
        <div className="space-y-2">
            <QueryBuilder
                fields={fields}
                query={rules}
                onQueryChange={setRules}
                controlElements={{
                    combinatorSelector: () => null, // GroupToolbar でまとめて
                    addGroupAction: () => null,
                    addRuleAction: () => null,
                    removeGroupAction: () => null,
                    ruleGroup: GroupToolbar as any,
                    rule: RuleRow,
                }}
                showNotToggle
                // '=' と '!=' のみ
                operators={[
                    { name: '=', label: '=' },
                    { name: '!=', label: '!=' },
                ]}
            />
        </div>
    );
};

export default QueryBuilderPanel;