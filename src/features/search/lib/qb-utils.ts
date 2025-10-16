import type { Field, OptionGroup } from 'react-querybuilder';

type FieldOrGroup = Field | OptionGroup<Field>;
const isOptionGroup = (x: FieldOrGroup): x is OptionGroup<Field> => 'options' in x;

export const flattenFields = (arr?: FieldOrGroup[]): Field[] =>
    (arr ?? []).flatMap(item => (isOptionGroup(item) ? item.options : [item]));
