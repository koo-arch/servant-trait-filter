import { Field } from 'react-querybuilder';

export const FIELD_NAMES = [
    'class',
    'trait',
    'attribute',
    'orderAlignment',
    'moralAlignment',
] as const;

export type FieldName = typeof FIELD_NAMES[number];

export const FIELD_MAP:ReadonlySet<FieldName> = new Set(FIELD_NAMES);

const labelMap: Record<FieldName, string> = {
    class: 'クラス',
    trait: '特性',
    attribute: '副属性',
    orderAlignment: '属性（秩序軸）',
    moralAlignment: '属性（善軸）',
}

export const fields: Field[] = FIELD_NAMES.map((name) => ({
    name,
    label: labelMap[name],
    valueEditorType: 'select',
}));

export const isFieldName = (x: unknown): x is FieldName => {
    return typeof x === 'string' && FIELD_MAP.has(x as FieldName);
}