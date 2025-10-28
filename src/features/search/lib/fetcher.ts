import 'server-only'
import { api } from '@/lib/api/client';
import { Masters } from '@/atoms/queries/master';
import type { Class, Attribute, OrderAlignment, MoralAlignment, Trait } from '@/types/master';

export async function getClasses() {
    return await api.get<Class[]>('/master/classes');
}

export async function getAttributes() {
    return await api.get<Attribute[]>('/master/attributes');
}

export async function getOrderAlignments() {
    return await api.get<OrderAlignment[]>('/master/order-alignments');
}

export async function getMoralAlignments() {
    return await api.get<MoralAlignment[]>('/master/moral-alignments');
}

export async function getTraits() {
    return await api.get<Trait[]>('/traits');
}

export const fetchMasters = async (): Promise<Masters> => {
    const [classes, attributes, orderAlignments, moralAlignments, traits] = await Promise.all([
        getClasses(),
        getAttributes(),
        getOrderAlignments(),
        getMoralAlignments(),
        getTraits(),
    ]);
    return {
        class: classes,
        attribute: attributes,
        orderAlignment: orderAlignments,
        moralAlignment: moralAlignments,
        trait: traits,
    }
}