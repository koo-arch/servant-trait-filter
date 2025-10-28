'use client'
import React from 'react';
import { useAtom } from 'jotai';
import { draftRulesAtom } from '@/features/search/atoms/draft';
import { QueryBuilder } from 'react-querybuilder';
import RuleRow from './RuleRow';
import GroupToolbar from './GroupToolbar';
import { fields } from '@/features/search/lib/helpers/field';

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
                    ruleGroup: GroupToolbar,
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