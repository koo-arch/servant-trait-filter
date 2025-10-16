import { atom } from 'jotai';
import { Class, Attribute, OrderAlignment, MoralAlignment, Trait } from '@/types/master';

export type Masters = {
    class: Class[];
    trait: Trait[];
    attribute: Attribute[];
    orderAlignment: OrderAlignment[];
    moralAlignment: MoralAlignment[];
};

// Hydratorで初期値注入
export const mastersAtom = atom<Masters>({
    class: [],
    trait: [],
    attribute: [],
    orderAlignment: [],
    moralAlignment: [],
});