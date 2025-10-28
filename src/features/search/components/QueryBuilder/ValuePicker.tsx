'use client'
import React from 'react';
import { useAtomValue } from 'jotai';
import { mastersAtom } from '@/atoms/queries/master';
import { FieldName } from '@/features/search/lib/helpers/field';
import { toNumberOrNull } from '../../lib/helpers/value';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Props = {
    field?: FieldName;
    value: number | null;
    onChange: (v: number | null) => void;
};

export const ValuePicker: React.FC<Props> = ({ field, value, onChange }) => {
    const masters = useAtomValue(mastersAtom);

    if (!field) return null;

    const options = masters[field] ?? [];

    return (
        <Select value={value == null ? '' : String(value)} onValueChange={(v) => onChange(toNumberOrNull(v))}>
            <SelectTrigger>
                <SelectValue placeholder={`Select ${field}`} />
            </SelectTrigger>
            <SelectContent>
                {options.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                        {c.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export default ValuePicker;