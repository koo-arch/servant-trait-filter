export const FIELD_NAMES = [
    'class',
    'trait',
    'attribute',
    'orderAlignment',
    'moralAlignment',
] as const;

export type FieldName = typeof FIELD_NAMES[number];

export const FIELD_MAP:ReadonlySet<FieldName> = new Set(FIELD_NAMES);

export const isFieldName = (x: unknown): x is FieldName => {
    return typeof x === 'string' && FIELD_MAP.has(x as FieldName);
}