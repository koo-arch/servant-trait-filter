'use client'
import React from 'react';
import { useRule, type RuleProps } from 'react-querybuilder';
import { ValuePicker } from './ValuePicker';
import { isFieldName } from '@/features/search/lib/helpers/field';
import { Button } from '@/components/ui/button';
import { useAtomValue } from 'jotai';
import { mastersAtom } from '@/atoms/queries/master';
import { FIELD_NAMES, type FieldName } from '@/features/search/lib/helpers/field';
import { toNumberOrNull } from '@/features/search/lib/helpers/value';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const RuleRow: React.FC<RuleProps> = (props) => {
    const r = useRule(props);
    const { path, rule, actions, disabled } = r;
    const masters = useAtomValue(mastersAtom);

    const setField = (field: string) => {
        actions.onPropChange('field', field, path);
        // ここで新フィールドの先頭値を即設定（候補なしなら null）
        const f = isFieldName(field) ? (field as FieldName) : undefined;
        const first = f ? masters[f]?.[0]?.id ?? null : null;
        actions.onPropChange('value', first, path);
    };
    const setOperator = (operator: string) => {
        actions.onPropChange('operator', operator, path);
    };
    const setValue = (value: number | null) => {
        actions.onPropChange('value', value, path);
    };
    const remove = () => {
        actions.onRuleRemove(path);
    };
    const safeField = isFieldName(rule.field) ? rule.field : undefined;

    return (
        <div className="flex items-center gap-2">
            {/* Field */}
            <Select value={safeField} onValueChange={setField} disabled={disabled}>
                <SelectTrigger className="w-40">
                    <SelectValue placeholder="Field" />
                </SelectTrigger>
                <SelectContent>
                    {FIELD_NAMES.map((field) => (
                        <SelectItem key={field} value={field}>
                            {field}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Operator */}
            <Select value={rule.operator} onValueChange={setOperator} disabled={disabled}>
                <SelectTrigger className="w-20">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="=">=</SelectItem>
                    <SelectItem value="!=">!=</SelectItem>
                </SelectContent>
            </Select>

            {/* Value */}
            <div className="w-56">
                <ValuePicker
                    key={safeField ?? 'none'}
                    field={safeField}
                    value={toNumberOrNull(rule.value)}
                    onChange={setValue}
                />
            </div>

            <Button size="sm" variant="destructive" onClick={remove} disabled={disabled}>
                Remove
            </Button>
        </div>
    );
}

export default RuleRow;