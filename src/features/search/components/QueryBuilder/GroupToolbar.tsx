'use client'
import React from 'react';
import {
    useRuleGroup,
    RuleGroupBodyComponents,
    type RuleGroupProps
} from 'react-querybuilder';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useAtomValue } from 'jotai';
import { mastersAtom } from '@/atoms/queries/master';
import { flattenFields } from '@/features/search/lib/qb-utils';
import { type FieldName } from '@/features/search/lib/helpers/field';

const GroupToolbar: React.FC<RuleGroupProps> = (props) => {
    const rg = useRuleGroup(props);
    const { path, ruleGroup, schema, actions, disabled } = rg;

    const masters = useAtomValue(mastersAtom);

    const setComb = (v: 'and' | 'or') => {
        actions.onPropChange('combinator', v, path);
    };
    const toggleNot = () => {
        actions.onPropChange('not', !ruleGroup.not, path);
    }
    const addRule = () => {
        const defaultField = flattenFields(schema.fields)[0]?.name as FieldName;
        const firstValue = masters[defaultField]?.[0]?.id ?? null;
        actions.onRuleAdd({ field: defaultField, operator: '=', value: firstValue }, path);
    }
    const addGroup = () => actions.onGroupAdd(schema.createRuleGroup(), path);
    const removeGroup = () => actions.onGroupRemove(path);

    return (
        <div className="rounded-md border p-3 space-y-3">
            <div className="flex items-center gap-2">
                <ToggleGroup
                    type="single"
                    value={ruleGroup.combinator ?? 'and'}
                    onValueChange={(v) => v && setComb(v as 'and' | 'or')}
                    disabled={disabled}
                >
                    <ToggleGroupItem value="and">AND</ToggleGroupItem>
                    <ToggleGroupItem value="or">OR</ToggleGroupItem>
                </ToggleGroup>

                <div className="flex items-center gap-2 ml-2">
                    <span>NOT</span>
                    <Switch checked={!!ruleGroup.not} onCheckedChange={toggleNot} />
                </div>

                <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" onClick={addRule} disabled={disabled}>+ Rule</Button>
                    <Button size="sm" variant="secondary" onClick={addGroup} disabled={disabled}>+ Group</Button>
                    <Button size="sm" variant="destructive" onClick={removeGroup} disabled={disabled}>Remove</Button>
                </div>
            </div>

            <RuleGroupBodyComponents {...rg} />
        </div>
    );
}

export default GroupToolbar;