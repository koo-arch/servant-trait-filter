import 'server-only'
import { api } from '@/lib/api/client';
import { Masters } from '@/atoms/queries/master';
import type { Class, Attribute, OrderAlignment, MoralAlignment, Trait } from '@/types/master';

const CACHE_DURATION = 60 * 60 * 24; // 24 hours

export const TAG = {
    classes: 'masters:classes',
    attributes: 'masters:attributes',
    order: 'masters:order-alignments',
    moral: 'masters:moral-alignments',
    traits: 'masters:traits',
} as const;

export async function getClasses() {
    return await api.get<Class[]>('/master/classes', {
        next: { revalidate: CACHE_DURATION, tags: [TAG.classes] },
    });
}

export async function getAttributes() {
    return await api.get<Attribute[]>('/master/attributes', {
        next: { revalidate: CACHE_DURATION, tags: [TAG.attributes] },
    });
}

export async function getOrderAlignments() {
    return await api.get<OrderAlignment[]>('/master/order-alignments', {
        next: { revalidate: CACHE_DURATION, tags: [TAG.order] }
    });
}

export async function getMoralAlignments() {
    return await api.get<MoralAlignment[]>('/master/moral-alignments', {
        next: { revalidate: CACHE_DURATION, tags: [TAG.moral] }
    });
}

export async function getTraits() {
    return await api.get<Trait[]>('/traits', {
        next: { revalidate: CACHE_DURATION, tags: [TAG.traits] }
    });
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