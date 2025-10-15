import axios from '@/lib/axios/public';
import { atomWithQuery } from 'jotai-tanstack-query';
import { Class, Attribute, OrderAlignment, MoralAlignment, Trait } from '@/types/master';

export const classAtom = atomWithQuery(
    () => ({
        queryKey: ['classes'],
        queryFn: async () => {
            const { data } = await axios.get<Class[]>('master/classes');
            return data;
        }
    })
);

export const attributeAtom = atomWithQuery(
    () => ({
        queryKey: ['attributes'],
        queryFn: async () => {
            const { data } = await axios.get<Attribute[]>('master/attributes');
            return data;
        }
    })
);

export const orderAlignmentAtom = atomWithQuery(
    () => ({
        queryKey: ['orderAlignments'],
        queryFn: async () => {
            const { data } = await axios.get<OrderAlignment[]>('master/order-alignments');
            return data;
        }
    })
);

export const moralAlignmentAtom = atomWithQuery(
    () => ({
        queryKey: ['moralAlignments'],
        queryFn: async () => {
            const { data } = await axios.get<MoralAlignment[]>('master/moral-alignments');
            return data;
        }
    })
);

export const traitAtom = atomWithQuery(
    () => ({
        queryKey: ['traits'],
        queryFn: async () => {
            const { data } = await axios.get<Trait[]>('master/traits');
            return data;
        }
    })
);